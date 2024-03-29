import React, { useState, useEffect } from "react";

import { doLoginRealm, doGetData } from "../Helpers/Mongo";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      // some logic to load data after mongo realm is setup
      // https://realm.mongodb.com/

      await doLoginRealm();
      const data = await doGetData();
      setData(data);

      setIsLoadingData(false);
    }

    loadData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoadingData,
        data,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
