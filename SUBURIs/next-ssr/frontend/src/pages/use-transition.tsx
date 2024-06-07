import { NextPage } from "next";
import Head from "next/head";
import { useState, useTransition } from "react";

type Tabs = "simple" | "delayed";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Use Transition</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <UseTransitionView />
          </div>
          <div style={{ width: "50%" }}>
            <NoUseTransitionView />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

const UseTransitionView = () => {
  const [tab, setTab] = useState<Tabs>("simple");
  const [isPending, startTransition] = useTransition();

  const handleClick = (tab: Tabs) => {
    startTransition(() => {
      setTab(tab);
    });
  };

  return (
    <div>
      <h2>Use Transition</h2>
      <div>
        <button onClick={() => handleClick("simple")}>Simple</button>
        <button onClick={() => handleClick("delayed")}>Delayed</button>
      </div>
      <div>
        <input type="text" />
        {isPending ? (
          <p>Loading...</p>
        ) : tab === "simple" ? (
          <SimpleView />
        ) : (
          <DelayedView />
        )}
      </div>
    </div>
  );
};

const NoUseTransitionView = () => {
  const [tab, setTab] = useState<Tabs>("simple");

  const handleClick = (tab: Tabs) => {
    setTab(tab);
  };

  return (
    <div>
      <h2>No Use Transition</h2>
      <div>
        <button onClick={() => handleClick("simple")}>Simple</button>
        <button onClick={() => handleClick("delayed")}>Delayed</button>
      </div>
      <input type="text" />
      <div>{tab === "simple" ? <SimpleView /> : <DelayedView />}</div>
    </div>
  );
};

const DelayedView = () => {
  let items = [];
  for (let i = 0; i < 1000; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
};

function SlowPost({ index }: { index: number }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
}

const SimpleView = () => {
  return <p>Simple View</p>;
};