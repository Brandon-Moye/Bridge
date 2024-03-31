import React, { useState, useEffect } from "react";

import { doLoginRealm, doGetData, doGetYourPostsOnly } from "../Helpers/Mongo";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [justYourData, setJustYourData] = useState([]);

  useEffect(() => {
    async function loadData() {
      // some logic to load data after mongo realm is setup
      // https://realm.mongodb.com/

      await doLoginRealm();
      const data = await doGetData();
      const justYourData = await doGetYourPostsOnly(
        "QDsshy85yWUM8Z953g3jmyiZi223"
      );
      setData(data);
      setJustYourData(justYourData);
      setIsLoadingData(false);
    }

    loadData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        isLoadingData,
        data,
        justYourData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
