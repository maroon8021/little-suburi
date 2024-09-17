import { PrismaClient as UserDB } from "./prisma/generated/db1";
import { PrismaClient as OrganizationDB } from "./prisma/generated/db2";

const userDb = new UserDB();
const oganizationDb = new OrganizationDB();

const main = async () => {
  const now = new Date();
  let userId: number | null = null;
  try {
    const user = await userDb.user.create({
      data: { name: `User: ${now.getTime()}` },
    });
    userId = user.id;
    const organization = await oganizationDb.organization.create({
      data: {
        name: `Organization: ${now.getTime()}`,
      },
    });
    console.log("User created:", user);
    console.log("Organization created:", organization);
    console.log("Prisma: All operations completed successfully");
  } catch (error) {
    console.error("Prisma: Error occurred:", error);
    if (userId) {
      try {
        await userDb.user.delete({ where: { id: userId } });
      } catch (rollbackError) {
        console.error("Prisma: Rollback error:", rollbackError);
      }
    }
  }
};

main()
  .catch((error) => {
    console.error("Prisma: Error occurred:", error);
  })
  .finally(async () => {
    await userDb.$disconnect();
    await oganizationDb.$disconnect();
  });
