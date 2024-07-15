import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import {
  doLoginRealm,
  doGetData,
  doGetYourPostsOnly,
  doGetUserProfileData,
} from "../Helpers/Mongo";

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const { logout, currentUser } = useAuth();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [justYourData, setJustYourData] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  useEffect(() => {
    async function loadData() {
      // some logic to load data after mongo realm is setup
      // https://realm.mongodb.com/

      await doLoginRealm();
      const data = await doGetData();
      const justYourData = await doGetYourPostsOnly(currentUser.uid);
      const userProfileData = await doGetUserProfileData(currentUser.uid);
      setData(data);
      setJustYourData(justYourData);
      setUserProfileData(userProfileData);
      setIsLoadingData(false);
    }

    loadData();
  }, [submitTrigger]);

  // Function to trigger useEffect on post submit/edit
  const handleSubmitTrigger = () => {
    setSubmitTrigger((prevState) => !prevState);
  };

  return (
    <DataContext.Provider
      value={{
        isLoadingData,
        data,
        justYourData,
        userProfileData,
        handleSubmitTrigger,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
