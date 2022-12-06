import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTypedTranslation } from "../hooks/useTypedTranslation";

type Props = {
  title: string;
};

const Home: NextPage<Props> = ({ title }) => {
  const { t } = useTypedTranslation("common");
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        <p>
          translated text: {t("sample.text")}, {t("sample.text4")}
        </p>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale = "ja",
}) => {
  return {
    props: {
      title: "i18next-with-type",
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
