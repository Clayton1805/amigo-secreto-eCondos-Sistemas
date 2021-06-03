## Objetivo:
Criar um sisteminha simples de amigo secreto com cadastro de pessoas (CRUD completo) contendo nome e email apenas. Além do cadastro criar um botão para realizar o sorteio. Ao realizar o sorteio um email é enviado dizendo para a pessoa quem ela deve presentear.

Pré requisitos:

  1. use nodejs para o backend e algum framework web ou mobile para o frontend (angular, react, vuejs, ionic, etc)
  2. armazene os dados em algum bd free (mongodb, postgres, etc)
  3. use algum smtp free para o envio do email (ethereal.email ou algo do tipo)

## Rodar projeto:
### requisitos:
 - Ter o Node.js instalado na sua maquina e também o MongoDB.
### passo a passo:
Clone o projeto vá até o diretório front_end pelo terminal e rode o comando npm install, faça o mesmo no diretório de back_end, logo apos isso vá no diretório back_end e crie um arquivo com o nome .env e dentro dele escreva o seguinte:

SECRET=minha_senha_super_secreta
  
substituindo o minha_senha_super_secreta pela frase sem espaços que você preferir, isso vai ser usado como segredo para encriptar o nosso token JWT.
depois de configurar tudo abra um terminal no diretório back_end e outro no diretório front_end e rode o seguinte comando nos dois terminais npm start, dessa forma você poderá acessar pelo seu browser a rota http://localhost:3000/ que contem a aplicação de sorteio de amigo secreto.

## Funcionalidades:
Para começar você precisa criar uma conta então vá até a pagina de cadastro e crie uma conta, os dados fornecidos por você passam por algumas validações, então caso você fuja das regras ou cadastre uma conta que já existe ao clicar no botão cadastrar serão mostradas mensagens explicando os erros para você, quando os dados estiverem corretos uma mensagem dirá que um email de validação lhe foi enviado, porém por estar usando o Ethereal para simular o envio de email o que você vai ter que fazer é é ir no terminal que está rodando o back_end e lá vai aparecer "Preview URL: uma_url" entre nessa URL e lá estar o email enviado, clique no botão para validar a conta e assim você será redirecionado para a pagina de sorteio, caso você queira receber a URL do email no terminal novamente clique no link da pagina de cadastro e você será redirecionado para uma pagina em que você pode enviar o email de validação novamente, na pagina de sorteio se clicando no botão que existe nela você recebera um email contendo o nome do seu amigo secreto.

(obs: caso o numero de usuários cadastrados com o email validado seja impar um usuário ficara sem um amigo secreto)
