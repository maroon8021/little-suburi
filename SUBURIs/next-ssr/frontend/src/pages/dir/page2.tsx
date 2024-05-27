import { GetServerSideProps, NextPage } from "next";

type Props = {
  filename: string;
};

export const Page2: NextPage<Props> = ({ filename }) => {
  return <div>{filename}</div>;
};

export default Page2;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      filename: __filename,
    },
  };
};
