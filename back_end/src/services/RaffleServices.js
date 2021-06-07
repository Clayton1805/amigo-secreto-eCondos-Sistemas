const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const { OK } = require('../utils/allStatusCode');
const { getTokenId } = require('../utils/JWT');
const sendMail = require('../utils/nodemailer');

const RaffleServices = async (req, res) => {
  const { authorization: token } = req.headers;

  const id = getTokenId(token);

  let secretFriend;

  let user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(OK).json({ err: 'Usuário não está cadastrado' });
  }

  if (user.secretFriend) {
    secretFriend = await User.findOne({ _id: user.secretFriend });
  } else {
    const [raffleFriend] = await User.aggregate([
      {
        $match: {
          _id: { $not: { $eq: ObjectId(id) } },
          isRaffle: false,
          secretFriend: { $not: { $exists: true } },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    if (raffleFriend) {
      secretFriend = raffleFriend;
    } else {
      // console.log("Entrou");
      const [raffleFriend2] = await User.aggregate([
        {
          $match: {
            _id: { $not: { $eq: ObjectId(id) } },
            isRaffle: false,
          },
        },
        {
          $sample: { size: 1 },
        },
      ]);

      secretFriend = raffleFriend2;
    }

    if (!secretFriend) {
      return res.status(OK).json({
        err: 'No momento todos os amigos secretos já foram sorteados tente de novo mais tarde.',
      });
    }
    const { _id } = secretFriend;

    user = await User.findOneAndUpdate({ _id: id }, { secretFriend: _id });
    await User.updateOne({ _id }, { isRaffle: true });
  }

  const message = {
    from: 'Amigo_secreto@gmail.com',
    to: user.email,
    subject: 'O seu eu amigo secreto é...',
    html: `<p>O seu amigo secreto é...</p>
    <p>🎉 <b>${secretFriend.name}</b> 🎉</p>
    <p>Shiii é segredo não conte para ninguém 🤐</p>`,
  };

  sendMail(message);

  res.status(OK).json(secretFriend);
};

module.exports = RaffleServices;
