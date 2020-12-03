import React, { useState, useEffect } from "react";
import { Header } from "./Components/header";
import { GlobalStyle, Body } from "./GlobalStyle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./Components/main";
import { UsePanelUser } from "./Components/usePanel";
import Web3 from "web3";
import Alex from "./abis/Alex.json";
import { DataContext } from "./DataContext";
import { GetApartmentInfo } from "./functions/getApartment/info";
import { GetApartmentsIdInfo } from "./functions/getApartmentsId/info";
import { GetRentInfo } from "./functions/getRent/info";

const App = () => {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [userRole, setUserRole] = useState(1);

  const metaMask = async () => {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  };

  const loadData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Alex.networks[networkId];
    const contract = new web3.eth.Contract(Alex.abi, networkData.address);
    setContract(contract);
  };

  useEffect(() => {
    metaMask().then((r) => r);
    loadData().then((r) => r);
  }, []);

  window.ethereum.on("accountsChanged", (accounts) => {
    setAccount(accounts);
  });

  const getUsersRole = async () => {
    const role = await contract.methods.getUsersRole().call({ from: account });
    setUserRole(role);
  };

  return (
    <div>
      <Router>
        <DataContext.Provider
          value={{ account, contract, getUsersRole, userRole }}
        >
          <GlobalStyle />
          <Header />
          <Switch>
            <Body>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/user">
                <UsePanelUser />
              </Route>
              <Route path="/GetApartment">
                <GetApartmentInfo />
              </Route>
              <Route path="/GetApartmentsId">
                <GetApartmentsIdInfo />
              </Route>
              <Route path="/GetRent">
                <GetRentInfo/>
              </Route>
            </Body>
          </Switch>
        </DataContext.Provider>
      </Router>
    </div>
  );
};

export default App;
