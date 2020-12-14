import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import ApplicationClassError from './errors/ApplicationClassError';

import './database';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/user';

const app = express();

const main = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof ApplicationClassError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  app.listen(3333, () => {
    console.log('🚀 Your server is started on port 3333!');
  });
}

main().catch(error => {
  console.log(error);
});
