import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("----------clean up----------");
  await prisma.order.deleteMany();
  await prisma.order2.deleteMany();
  console.log("----------end of clean up----------");

  const now = new Date();
  console.log("----------start----------");
  console.log(`Start time: ${now.toISOString()}`);

  const totalOrders = 1000000;
  const batchSize = 1000;

  let id = 1;

  for (let i = 0; i < totalOrders; i += batchSize) {
    const batch = Array.from({ length: batchSize }, (_, j) => ({
      id: id++,
      customerId: 1,
      orderDate: now,
      totalAmount: (i + j) * 10,
      status: "PENDING",
      shippingAddress: "123 Main St",
    }));

    await Promise.all([
      prisma.order.createMany({
        data: batch,
      }),
      prisma.order2.createMany({
        data: batch,
      }),
    ]);

    console.log(`Inserted batch ${i / batchSize + 1}`);
  }
  console.log("----------end----------");
  const endTime = new Date();
  console.log(`End time: ${endTime.toISOString()}`);
  console.log(
    `Total time taken: ${(endTime.getTime() - now.getTime()) / 1000} seconds`
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
