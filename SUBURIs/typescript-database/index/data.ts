import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"],
});

type Logs = {
  insertOrderStartTime?: Date;
  insertOrderEndTime?: Date;
  insertOrder2StartTime?: Date;
  insertOrder2EndTime?: Date;
  selectOrderStartTime?: Date;
  selectOrderEndTime?: Date;
  selectOrder2StartTime?: Date;
  selectOrder2EndTime?: Date;
};

const logs: Logs = {};

async function main() {
  const now = new Date();
  console.log("---------- start: insert data of Order ----------");
  console.log(`Start time: ${now.toISOString()}`);

  const dummyOrder = Array.from({ length: 300000 }, (_, i) => ({
    id: i + 1,
    customerId: 1,
    orderDate: now,
    totalAmount: i * 10,
    status: "COMPLETED",
    shippingAddress: "123 Main St",
  }));
  logs.insertOrderStartTime = new Date();

  // await prisma.order.updateMany({
  //   data: dummyOrder,
  // });
  await prisma.$transaction(
    dummyOrder.map((d) =>
      prisma.order.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );

  logs.insertOrderEndTime = new Date();

  console.log("---------- end: insert data of Order ----------");

  console.log("---------- start: insert data of Order2 ----------");
  logs.insertOrder2StartTime = new Date();

  // await prisma.order2.updateMany({
  //   data: dummyOrder,
  // });
  await prisma.$transaction(
    dummyOrder.map((d) =>
      prisma.order2.update({
        where: {
          id: d.id,
        },
        data: d,
      })
    )
  );
  logs.insertOrder2EndTime = new Date();

  console.log("---------- end: insert data of Order2 ----------");

  // ------------------
  console.log("---------- start: select data of Order ----------");
  logs.selectOrderStartTime = new Date();

  const orders = await prisma.order.findMany({
    where: {
      customerId: 1,
    },
  });
  console.log(`orders.length: ${orders.length}`);

  logs.selectOrderEndTime = new Date();
  console.log("---------- end: select data of Order ----------");

  console.log("---------- start: select data of Order2 ----------");
  logs.selectOrder2StartTime = new Date();

  const orders2 = await prisma.order2.findMany({
    where: {
      customerId: 1,
    },
  });
  console.log(`orders2.length: ${orders2.length}`);

  logs.selectOrder2EndTime = new Date();
  console.log("---------- end: select data of Order2 ----------");

  console.log("---------- logs ----------");
  console.log(
    `insertOrderStartTime: ${logs.insertOrderStartTime?.toISOString()}`
  );
  console.log(`insertOrderEndTime: ${logs.insertOrderEndTime?.toISOString()}`);
  console.log(
    `insertOrder2StartTime: ${logs.insertOrder2StartTime?.toISOString()}`
  );
  console.log(
    `insertOrder2EndTime: ${logs.insertOrder2EndTime?.toISOString()}`
  );
  console.log("--------------------");
  console.log(
    `order duration: ${
      logs.insertOrderEndTime?.getTime() - logs.insertOrderStartTime?.getTime()
    }ms`
  );
  console.log(
    `order2 duration: ${
      logs.insertOrder2EndTime?.getTime() -
      logs.insertOrder2StartTime?.getTime()
    }ms`
  );
  console.log(
    `order and order2 duration: ${
      logs.insertOrder2EndTime?.getTime() - logs.insertOrderStartTime?.getTime()
    }ms`
  );
  console.log("--------------------");
  console.log(
    `selectOrderStartTime: ${logs.selectOrderStartTime?.toISOString()}`
  );
  console.log(`selectOrderEndTime: ${logs.selectOrderEndTime?.toISOString()}`);
  console.log(
    `selectOrder2StartTime: ${logs.selectOrder2StartTime?.toISOString()}`
  );
  console.log(
    `selectOrder2EndTime: ${logs.selectOrder2EndTime?.toISOString()}`
  );
  console.log("--------------------");
  console.log(
    `select order duration: ${
      logs.selectOrderEndTime?.getTime() - logs.selectOrderStartTime?.getTime()
    }ms`
  );
  console.log(
    `select order2 duration: ${
      logs.selectOrder2EndTime?.getTime() -
      logs.selectOrder2StartTime?.getTime()
    }ms`
  );
  console.log(
    `select order and order2 duration: ${
      logs.selectOrder2EndTime?.getTime() - logs.selectOrderStartTime?.getTime()
    }ms`
  );

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
