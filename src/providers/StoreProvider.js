import { createContext, useContext } from "react";

const context = createContext({});

const useStore = () => useContext(context);

export default context.Provider;
export { useStore };
