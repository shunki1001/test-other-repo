import React, { useState } from "react";

import DataTable from "./components/DataTable";

import LabelOnTable from "./components/LabelOnTable";
import HomeLayout from "../Layout/HomeLayout";
import CreateModal from "./components/CreateModal";

const Home = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [newData, setNewData] = useState({
    enterprise: "",
    email: "",
    password: "",
    address: "",
    numberOfSite: 1,
    subscriptionStartYear: 2022,
    subscriptionStartMonth: 1,
    numberOfAccount: 1,
    subscriptionCost: "",
    subscriptionDuration: "",
    isAgreement: true,
  });
  return (
    <HomeLayout>
      <LabelOnTable setNewOpen={setNewOpen} />
      <DataTable
        newOpen={newOpen}
        setNewOpen={setNewOpen}
        setNewData={setNewData}
      />
      <CreateModal
        newOpen={newOpen}
        setNewOpen={setNewOpen}
        newData={newData}
        setNewData={setNewData}
      />
    </HomeLayout>
  );
};

export default Home;
