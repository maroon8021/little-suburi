import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { DataSource, In } from "typeorm";
import { Post, User, Article } from "./entity";
import DataLoader from "dataloader";

const userLoader = new DataLoader(async (keys: readonly number[]) => {
  const users = await AppDataSource.manager.find(User, {
    where: {
      id: In(keys),
    },
  });
  return users;
});

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 59000,
  username: "superuser",
  password: "superuserpass",
  database: "dataloader",
  entities: [User, Post, Article],
  logging: true,
});

AppDataSource.initialize();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  # graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    id: Int!
    name: String
  }

  type User2 {
    id: Int!
    name: String
  }

  type Post {
    id: Int!
    title: String!
    content: String
    published: Boolean!
    user: User!
  }

  type Article {
    id: Int!
    content: String!
    user: User!
    user2: User!
  }

  

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User!]
    posts: [Post!]
    articles: [Article!]
  }
`;

type UserType = {
  id: number;
  name: string;
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    posts: async () => {
      const posts = await prisma.post.findMany({
        orderBy: { id: "asc" },
      });
      return posts;
    },
    articles: async () => {
      const articles = await prisma.article.findMany({
        orderBy: { id: "asc" },
      });
      return articles;
    },
  },
  // ↓ こうではない
  // User: async (parent: any): Promise<User> => {
  //   console.log(parent);
  //   const user = await prisma.user.findUnique({
  //     where: { id: parent.userId },
  //   });
  //   return user ?? ({} as User);
  // },
  Post: {
    user: async (parent: any) => {
      // console.log(parent);
      console.log("in Post/user");
      const user = await prisma.user.findUnique({
        where: { id: parent.userId },
      });
      return user ?? ({} as UserType);
    },
  },
  Article: {
    user: async (parent: any) => {
      console.log("in Article/user");
      const user = await AppDataSource.manager.findOneOrFail(User, {
        where: { id: parent.userId },
      });
      return user ?? ({} as UserType);
    },
    user2: async (parent: any) => {
      console.log("in Post/user2");
      const user = await userLoader.load(parent.userId);
      return user ?? ({} as UserType);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: http://localhost:4000`);
