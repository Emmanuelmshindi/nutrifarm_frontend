import React, { createContext } from "react";

export const NutriplansContext = createContext(null);

const NutriplansContextProvider = (props) => {
  const contextValue = {};
  return (
    <NutriplansContext.Provider value={contextValue}>
      {props.children}
    </NutriplansContext.Provider>
  );
};

export default NutriplansContextProvider;
