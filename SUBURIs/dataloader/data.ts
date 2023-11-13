import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

const users = Array.from({ length: 100 }, (_, i) => ({
  name: nanoid(),
}));
const dummys = Array.from({ length: 100 });

async function main() {
  await Promise.all(users.map((user) => prisma.user.create({ data: user })));

  await Promise.all(
    dummys.map(() =>
      prisma.post.create({ data: { title: nanoid(), userId: 1 } })
    )
  );

  await Promise.all(
    dummys.map(() =>
      prisma.article.create({ data: { content: nanoid(), userId: 1 } })
    )
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
