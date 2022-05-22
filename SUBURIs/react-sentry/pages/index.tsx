import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <p>hoge</p>
      {/* unexpected error to set :methodDoesNotExist */}
      <button onClick={() => {} /*methodDoesNotExist*/}>Break the world</button>
    </>
  );
};

export default Home;
