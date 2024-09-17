import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, DataSource } from "typeorm";

@Entity({
  name: "User",
})
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

@Entity({
  name: "Organization",
})
class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

const main = async () => {
  const userDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 59010,
    username: "u",
    password: "p",
    database: "db1",
    entities: [User],
  });

  const organizationDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 59011,
    username: "u",
    password: "p",
    database: "db2",
    entities: [Organization],
  });

  // https://dev.classmethod.jp/articles/typeorm-introduction-challenges/#toc-driver-not-connected-
  await userDataSource.initialize();
  await organizationDataSource.initialize();

  const userQueryRunner = userDataSource.createQueryRunner();
  const organizationQueryRunner = organizationDataSource.createQueryRunner();

  await userQueryRunner.connect();
  await organizationQueryRunner.connect();

  await userQueryRunner.startTransaction();
  await organizationQueryRunner.startTransaction();

  try {
    const now = new Date();
    // User作成（DB1）
    const userRepository = userQueryRunner.manager.getRepository(User);
    const user = userRepository.create({ name: `User: ${now.getTime()}` });
    const savedUser = await userRepository.save(user);

    // Organization作成（DB2）
    const organizationRepository =
      organizationQueryRunner.manager.getRepository(Organization);
    const organization = organizationRepository.create({
      name: `Organization: ${now.getTime()}`,
    });
    const savedOrganization = await organizationRepository.save(organization);

    await userQueryRunner.commitTransaction();
    await organizationQueryRunner.commitTransaction();

    console.log("User created:", savedUser);
    console.log("Organization created:", savedOrganization);

    console.log("All transactions committed successfully");
  } catch (err) {
    await userQueryRunner.rollbackTransaction();
    await organizationQueryRunner.rollbackTransaction();
    console.log("Error occurred, all transactions rolled back:", err);
  } finally {
    await userQueryRunner.release();
    await organizationQueryRunner.release();
  }
};

main().catch(console.error);
