import { NextPage } from "next";
import { Provider, Store } from "../../components/ListState";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

const List: NextPage = () => {
  const { state } = useContext(Store);
  console.log("List", state);
  const router = useRouter();
  const { id } = router.query;
  console.log("List", id);
  const currentIndex = state.findIndex((list) => list.id === id);
  const previous = state[currentIndex - 1];
  const next = state[currentIndex + 1];
  console.log("List", previous, next);

  return (
    <>
      <h1>List: {id}</h1>
      {previous && (
        <button onClick={() => router.push(`/lists/${previous.id}`)}>
          Previous: {previous.title}
        </button>
      )}
      {next && (
        <button onClick={() => router.push(`/lists/${next.id}`)}>
          Next: {next.title}
        </button>
      )}
    </>
  );
};

export default List;
