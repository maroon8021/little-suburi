import { Dispatch, ReactNode, createContext, useReducer } from "react";

type ListState = {
  id: string;
  title: string;
};

type ContextValue = {
  state: ListState[];
  dispatch: Dispatch<{ type: string }>;
};

function reducer(state: ListState[], action: { type: string }) {
  switch (action.type) {
    case "SET_LIST":
      return [...dummyData];
    default:
      return state;
  }
}

export const Store = createContext<ContextValue>({
  state: [],
  dispatch: () => null,
});

export const Provider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export const dummyData = [
  { id: "1", title: "title1" },
  { id: "2", title: "title2" },
  { id: "3", title: "title3" },
  { id: "4", title: "title4" },
  { id: "5", title: "title5" },
];
