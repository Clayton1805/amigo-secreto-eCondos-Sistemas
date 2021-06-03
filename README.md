## Objetivo:
criar um sisteminha simples de amigo secreto com cadastro de pessoas (CRUD completo) contendo nome e email apenas. Além do cadastro criar um botão para realizar o sorteio. Ao realizar o sorteio um email é enviado dizendo para a pessoa quem ela deve presentear.

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
