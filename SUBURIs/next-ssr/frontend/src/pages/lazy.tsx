import { LazyParent } from "../components/LazyParent";

const Page = () => {
  console.log("Page: start");
  return (
    <>
      <h1>Lazy Test? `</h1>
      <LazyParent />
    </>
  );
};

export default Page;
