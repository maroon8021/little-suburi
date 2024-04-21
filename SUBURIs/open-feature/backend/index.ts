import express, { Request, Response } from "express";
import cors from "cors";
import {
  OpenFeature,
  InMemoryProvider,
  AsyncLocalStorageTransactionContextPropagator,
} from "@openfeature/server-sdk";
import { falgs } from "./flags";

const server = express();
server.use(cors());

const featureFlags = OpenFeature.getClient();
const featureFlagProvider = new InMemoryProvider(falgs);

OpenFeature.setTransactionContextPropagator(
  new AsyncLocalStorageTransactionContextPropagator()
);

OpenFeature.setProvider(featureFlagProvider);

const main = async () => {
  server.use((request: Request, _, next) => {
    const canUseNewFeature = toBoolean(request.query.can_use_new_feature);
    OpenFeature.setTransactionContext(
      { flag: canUseNewFeature ? "on" : "off" },
      () => {
        // The transaction context is used in any flag evaluation throughout the whole call chain of next
        next();
      }
    );
  });
  server.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  server.get<{
    Querystring: {
      can_use_new_feature: boolean;
    };
  }>("/permission", async (request, reply) => {
    const context = OpenFeature.getTransactionContext();
    const canUseNewFeature = await featureFlags.getBooleanValue(
      "canUseNewFeature",
      false,
      context
    );

    reply.type("application/json").send({ canUseNewFeature });
  });

  server.get<{
    Querystring: {
      can_use_new_feature: boolean;
    };
  }>("/feature", async (request, reply) => {
    const context = OpenFeature.getTransactionContext();
    const newFeatureText = await featureFlags.getObjectValue(
      "newFeatureText",
      "---",
      context
    );

    reply.type("application/json").send({ text: newFeatureText?.toString() });
    console.log("----------");
  });

  await server.listen({ port: 3000 });
};

main();

const toBoolean = (value: unknown) => {
  return value === "true";
};
