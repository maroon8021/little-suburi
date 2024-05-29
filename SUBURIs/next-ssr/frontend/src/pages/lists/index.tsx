import { NextPage } from "next";
import { Provider, Store } from "../../components/ListState";
import { use, useContext, useEffect } from "react";
import Link from "next/link";

const Lists: NextPage = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    if (state.length === 0) {
      dispatch({ type: "SET_LIST" });
    }
  }, [dispatch, state.length]);

  return (
    <>
      <h1>Lists</h1>
      <ul>
        {state.map((list) => (
          <Link href={`/lists/${list.id}`} key={list.id}>
            <li>{list.title}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Lists;
