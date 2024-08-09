import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

type PostPointBody = {
  userId: number;
  point: number;
};

fastify.post<{ Body: PostPointBody }>("/point", async (request, reply) => {
  const { userId, point } = request.body;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return reply.status(404).send({ error: "user not found" });
  }
  const transactionHistory = await prisma.transactionHistory.create({
    data: {
      userId: user.id,
      point,
    },
  });
  const point = await prisma.point.create({
    data: {
      userId: user.id,
      point: body.point,
    },
  });
  return point;
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
