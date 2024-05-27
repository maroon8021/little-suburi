import { GetServerSideProps, NextPage } from "next";

type Props = {
  filename: string;
};

export const Page3: NextPage<Props> = ({ filename }) => {
  return <div>{filename}</div>;
};

export default Page3;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      filename: __filename,
    },
  };
};
