import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import Header from './components/header/Header'
import SideBar from './components/sidebar/SideBar'
import MainContent from './components/mainContent/MainContent'

import "./App.css";

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      menuOpen: false,
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  toggleMenu = () => {
    if(window.outerWidth>600)
      return
    var newState = !this.state.menuOpen
    this.setState({menuOpen: newState});
    
    var sidebar = document.getElementsByClassName('sideBar')[0]
    if(!this.state.menuOpen){
        sidebar.style.display = 'flex';
    }else{
        sidebar.style.display = 'none';
    }
  }

  closeMenu = () => {
    this.setState({menuOpen: false});
  }

  runExample = async () => {
    // const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: 5 });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router>
        <div className="App">
          <Header open={this.state.menuOpen} toggleMenu={this.toggleMenu}></Header>
          <SideBar open={this.state.menuOpen} toggleMenu={this.toggleMenu} ></SideBar>
          <MainContent open={this.state.menuOpen} closeMenu={this.closeMenu}></MainContent>
        </div>
      </Router>
    );
  }
}

export default App;
