import { Inter } from "next/font/google";
import { View1 } from "@/components/View1";
import { View2 } from "@/components/View2";
import { View3 } from "@/components/View3";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>tankstack query</h1>
      <hr />
      <h2>Same queryKey</h2>
      <View1 />
      <View2 />

      <hr />
      <h2>Different queryKey</h2>
      <View1 />
      <View3 />
    </div>
  );
}
