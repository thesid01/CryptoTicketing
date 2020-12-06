import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import EventContract from './contracts/Events.json'
import EventTicketContract from './contracts/EventTicket.json'
import getWeb3 from "./getWeb3";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Header from './components/header/Header'
import SideBar from './components/sidebar/SideBar'
import MainContent from './components/mainContent/MainContent'

import "./App.css";

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
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

      const deployedNetwork = EventContract.networks[networkId];

      const EventInstance = new web3.eth.Contract(
        EventContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      const EventTicketInstance = new web3.eth.Contract(
        EventTicketContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: {'event':EventInstance, 'ticket':EventTicketInstance} }, this.runExample);
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
  };

  render() {
    if (!this.state.web3) {
      return <div className="App App-header">
        Loading Web3, accounts, and contract...
        <Loader
            type="TailSpin"
            color="#8D3B72"
            height={100}
            width={100}
            // timeout={6000}
        />
        </div>;
    }
    return (
      <Router>
        <ToastProvider>
          <div className="App">
            <Header open={this.state.menuOpen} toggleMenu={this.toggleMenu}></Header>
            <SideBar open={this.state.menuOpen} toggleMenu={this.toggleMenu} ></SideBar>
            <MainContent bc={{accounts:this.state.accounts, contracts: this.state.contract}}></MainContent>
          </div>
        </ToastProvider>
      </Router>
    );
  }
}

export default App;
