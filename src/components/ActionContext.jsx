import React, { createContext, useContext, useState } from 'react';

const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <ActionContext.Provider value={{ selectedAction, setSelectedAction }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => useContext(ActionContext);
