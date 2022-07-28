import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h1>This is Heading</h1>
      <h2>This is H2</h2>
      <p data-testid="test-sample-text">Sample Text</p>
    </div>
  );
};

export default Home;
