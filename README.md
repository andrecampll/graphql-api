<p align="center">
  <img src="https://dowhile.rocketseat.com.br/logo.svg" />
</p>

# DoWhile Project 🚀
Esse repositório é referente ao desafio 1 proposto no evento DoWhile, da Rocketseat 🚀 <br />

# Proposta 🔥
Motivado pelo Workshop "Criando API GraphQL em Node.js e Typescript com TypeGraphQL", da querida Daniele Evangelista, da Rocketseat, a API proposta nesse projeto
implementa um sistema de cadastro e autenticação de usuários utilizando as Queries e Mutations do GraphQL. Para tal, foi utilizado o TypeORM como ORM para
pôr em prática a ótima integração com o TypeGraphQL, o qual define os Fields, Args, InputTypes e ObjectTypes utilizados nas mutations e os integra com os models da aplicação,
tal como o model de User, estratégia que permite um maior controle e previsibilidade de possíveis erros. <br />

Para o design pattern da nossa API, foi escolhido a utilização de Repositories e Services, os quais, respectivamente, se responsabilizam pelas operações nos bancos
de dados (seguindo sua respectiva entidade) e a regra de negócio da aplicação, como a validação de Tokens JWT. Tal estratégia foi escolhida para experimentar e ver
na prática a flexibilidade dos Resolvers, os quais atuam, nesse projeto, quase equivalementemente como Routes e Controllers em um modelo REST tradicional. <br/>

Outro ponto importante é a implementação da autenticação por Token JWT, gerando e devolvendo o token para o usuário, ao utilizar a mutation de Login. <br />

# Tecnologias 🚀
GraphQL ⚛️ <br />
Express 🚂 <br />
Type-GraphQL ⚛️ <br />
TypeORM ⚛️ <br />
Postgres 🐘<br />
JSON Web Token 🔐 <br />
Typescript 🦕

# Como conseguir esse repositório 🤔
Siga os passos:
1. Clone esse repositório usando <code> git clone </code>.
2. Rode o comando <code> yarn </code> na pasta raíz do projeto.
3. Use as credenciais de acesso do seu banco de dados Postgres no arquivo ormconfig.json
4. Rode o comando <code> yarn typeorm migration:run </code> para subir as migrations
5. Rode o comando <code> yarn dev:server </code> inicializar o servidor.
6. Acesse <code> localhost:3333/graphql </code> no seu navegador para testar as queries e mutations no playground.

# Mutations e Queries disponíveis 🤓
Cadastro:
```graphql
  mutation {
    register(options: {	name:"andre", email: "john@doe.com", password: "teste123" }) {
      user {
        name,
        email,
        created_at,
        updated_at
      }
      errors {
        field,
        message
      }
    }
  }
```

Login:
```graphql
  mutation {
    login(options: { email: "john@doe.com", password: "teste123" }) {
      user {
        name,
        email,
        created_at,
        updated_at
      }
      token
      errors {
        field,
        message
      }
    }
  }
```

# Como contribuir? 😍
```bash
# Bifurque esse repositório

# Clone seu fork
$ git clone url-do-seu-fork && cd graphql-api

# Crie a sua branch com o bugfix ou nova feature
$ git checkout -b my-branch

# Dê um commit nas suas modificações
$ git commit -m 'my changes'

# Dê um push na sua branch
$ git push origin my-branch
```

Delete sua branch, se quiser, quando o merge do seu Pull Request for feito <br />

Made with 💜 by <a href="https://www.linkedin.com/in/andrecampll/" target="_blank"> andrecampll </a>. <br />
<br />

