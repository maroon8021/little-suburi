import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = Array.from({ length: 10 }, (_, i) => ({
  name: `${i}: user`,
}));

async function main() {
  const organization = await prisma.organization.create({
    data: {
      name: "organization 1",
    },
  });
  await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: {
          ...user,
          organizationId: organization.id,
        },
      })
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
