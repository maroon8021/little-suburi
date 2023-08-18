import ky from "ky-universal";

type Item = { id: number; name: string };

export type PageProps = {
  items: Item[];
};

const onBeforeRender = async () => {
  const result = await ky.get(`http://localhost:3000/api/items`);
  const json = await result.json<Item[]>();
  return { pageContext: { pageProps: { items: json } } }; // [Wrong Usage] The onBeforeRender() hook defined by /pages/index/index.page.server.ts > `export { onBeforeRender }` returned an object with following unknown keys: ['data']. Only following keys are allowed: ['pageContext'].
};

export { onBeforeRender };

export const passToClient = ["pageProps"];
