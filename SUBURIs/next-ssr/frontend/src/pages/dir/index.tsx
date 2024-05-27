import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getPages } from "../../utils/get-pages";
import path from "path";

type Props = {
  paths: string[];
};

const Home: NextPage<Props> = ({ paths }) => {
  return (
    <div>
      <h1>dir</h1>
      <ul>
        {paths.map((path) => (
          <li key={path}>
            <Link href={`/dir/${path}`}>{path}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const currentDir = __dirname;
  const dir = path.join(__dirname, "../../../src/pages/dir");
  console.log("currentDir", dir);
  const paths = getPages(`${dir}`);

  return {
    props: {
      paths,
    },
  };
};
