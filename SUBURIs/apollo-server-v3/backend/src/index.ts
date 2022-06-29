import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type StringValue {
    value: String
  }

  type IntValue {
    value: Int
  }
  union UnionValue = StringValue | IntValue

  type Book {
    title: String
    author: String
    unionValue: UnionValue
  }

  input BookLengthInput {
    length: Int
  }

  input BookNameInput {
    name: String
  }

  # これは動かない
  # https://github.com/graphql/graphql-spec/issues/488
  # union BookInput = BookLengthInput | BookNameInput

  type Query {
    books(input: BookLengthInput): [Book!]!
    # books(input: BookNameInput): [Book!]! <- 重複はできない
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    unionValue: {
      __typename: "StringValue",
      value: "hoge",
    },
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    unionValue: {
      __typename: "IntValue",
      value: 1,
    },
  },
];

const resolvers = {
  Query: {
    books: (_: any, a: any) => {
      console.log(a);
      console.log("hoge");
      return books;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
