import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { countries } from "../db/schema";

const queryClient = postgres(process.env.DATABASE_URL || "");

const db = drizzle(queryClient);

const main = async () => {
  const now = new Date();
  const result = await db.transaction(async (tx) => {
    await tx.insert(countries).values({ name: now.getTime().toString() });

    return tx.select().from(countries);
  });
  console.log(result);
};

main().catch((error) => {
  console.error("Drizzle: Error occurred:", error);
});
