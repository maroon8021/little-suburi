import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

type Logs = {
  updateOrder10StartTime?: Date;
  updateOrder10EndTime?: Date;
  updateOrder100StartTime?: Date;
  updateOrder100EndTime?: Date;
  updateOrder1000StartTime?: Date;
  updateOrder1000EndTime?: Date;
  updateOrder10000StartTime?: Date;
  updateOrder10000EndTime?: Date;
  updateOrder100000StartTime?: Date;
  updateOrder100000EndTime?: Date;
};

const logs: Logs = {};

const now = new Date();

const dummyBase = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  customerId: 1,
  orderDate: now,
  totalAmount: i * 1,
  status: "UNCOMPLETED",
  shippingAddress: "123 Main St",
}));
console.log("dummyBase.length", dummyBase.length);

const reset = async () => {
  await prisma.order.deleteMany();
  await prisma.order.createMany({
    data: dummyBase,
  });
};

async function main() {
  const now = new Date();
  console.log("---------- start: insert data of Order ----------");
  console.log(`Start time: ${now.toISOString()}`);
  await reset();

  console.log("---------- end: insert data of Order ----------");

  const dummyOrder10 = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 10,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));

  console.log("---------- start: update data of Order 10 ----------");
  logs.updateOrder10StartTime = new Date();

  await prisma.$transaction(
    dummyOrder10.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.updateOrder10EndTime = new Date();
  console.log("---------- end: update data of Order 10 ----------");

  // reset
  await reset();

  const dummyOrder100 = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 100,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));

  console.log("---------- start: update data of Order 100 ----------");
  logs.updateOrder100StartTime = new Date();

  await prisma.$transaction(
    dummyOrder100.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.updateOrder100EndTime = new Date();
  console.log("---------- end: update data of Order 100 ----------");

  // reset
  await reset();

  const dummyOrder1000 = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 1000,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));

  console.log("---------- start: update data of Order 1000 ----------");
  logs.updateOrder1000StartTime = new Date();

  await prisma.$transaction(
    dummyOrder1000.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.updateOrder1000EndTime = new Date();
  console.log("---------- end: update data of Order 1000 ----------");

  // reset
  await reset();

  const dummyOrder10000 = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 10000,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));

  console.log("---------- start: update data of Order 10000 ----------");
  logs.updateOrder10000StartTime = new Date();

  await prisma.$transaction(
    dummyOrder10000.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.updateOrder10000EndTime = new Date();
  console.log("---------- end: update data of Order 10000 ----------");

  // reset
  await reset();

  const dummyOrder100000 = Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 100000,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));

  console.log("---------- start: update data of Order 100000 ----------");
  logs.updateOrder100000StartTime = new Date();

  await prisma.$transaction(
    dummyOrder100000.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.updateOrder100000EndTime = new Date();
  console.log("---------- end: update data of Order 100000 ----------");

  // show logs

  console.log("---------- logs ----------");
  console.log(
    `updateOrder10StartTime: ${logs.updateOrder10StartTime?.toISOString()}`
  );
  console.log(
    `updateOrder10EndTime: ${logs.updateOrder10EndTime?.toISOString()}`
  );
  // duration
  console.log(
    `update order 10 duration: ${
      logs.updateOrder10EndTime?.getTime() -
      logs.updateOrder10StartTime?.getTime()
    }ms`
  );
  console.log("--------------------");

  console.log(
    `updateOrder100StartTime: ${logs.updateOrder100StartTime?.toISOString()}`
  );
  console.log(
    `updateOrder100EndTime: ${logs.updateOrder100EndTime?.toISOString()}`
  );
  console.log(
    `update order 100 duration: ${
      logs.updateOrder100EndTime?.getTime() -
      logs.updateOrder100StartTime?.getTime()
    }ms`
  );
  console.log("--------------------");

  console.log(
    `updateOrder1000StartTime: ${logs.updateOrder1000StartTime?.toISOString()}`
  );
  console.log(
    `updateOrder1000EndTime: ${logs.updateOrder1000EndTime?.toISOString()}`
  );
  console.log(
    `update order 1000 duration: ${
      logs.updateOrder1000EndTime?.getTime() -
      logs.updateOrder1000StartTime?.getTime()
    }ms`
  );
  console.log("--------------------");

  console.log(
    `updateOrder10000StartTime: ${logs.updateOrder10000StartTime?.toISOString()}`
  );
  console.log(
    `updateOrder10000EndTime: ${logs.updateOrder10000EndTime?.toISOString()}`
  );
  console.log(
    `update order 10000 duration: ${
      logs.updateOrder10000EndTime?.getTime() -
      logs.updateOrder10000StartTime?.getTime()
    }ms`
  );
  console.log("--------------------");

  console.log(
    `updateOrder100000StartTime: ${logs.updateOrder100000StartTime?.toISOString()}`
  );
  console.log(
    `updateOrder100000EndTime: ${logs.updateOrder100000EndTime?.toISOString()}`
  );
  console.log(
    `update order 100000 duration: ${
      logs.updateOrder100000EndTime?.getTime() -
      logs.updateOrder100000StartTime?.getTime()
    }ms`
  );
  console.log("--------------------");

  console.log("---------- end: logs ----------");

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
