import { GetServerSideProps, NextPage } from "next";

type Props = {
  filename: string;
};

export const Page4: NextPage<Props> = ({ filename }) => {
  return <div>{filename}</div>;
};

export default Page4;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      filename: __filename,
    },
  };
};
