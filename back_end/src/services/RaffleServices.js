const { User } = require('../models');
const { OK, BAD_REQUEST } = require('../utils/allStatusCode');
const { getTokenId } = require('../utils/JWT');

const RaffleServices = async (req, res) => {
  const { email, password } = req.body;
  const { authorization: token } = req.headers;

  const id = getTokenId(token);
  console.log('id', id)

  const secretFriend = await User.aggregate([
    {
      $match: {
        _id: { $not: { $eq: id } },
        isRaffle: false,
      },
    },
    {
      $sample: { size: 1 },
    },
  ]);

  res.status(OK).json(secretFriend);
};

module.exports = RaffleServices;
