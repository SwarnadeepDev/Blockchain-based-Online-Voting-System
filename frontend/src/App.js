import logo from './logo.svg';
import './App.css';
// import abi from "./contract/Ballot.json";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
// import RegistrationForm from './components/RegistrationForm';
// import ElectionCreation from './components/ElectionCreation';
import SidebarContent from './components/SidebarContent';
import SearchBar from './components/SearchBar';
import Menu from './components/Menu';
import Footer from './components/footer';
function App({elections,setFilteredElections,updateSetState,updateConnected}) {
  return (
    <div className="App">
      <Navbar elections={elections} setFilteredElections={setFilteredElections}/>
      <Menu/>
      {/* <ElectionCreation/> */}
      <SearchBar/>
      <SidebarContent/>
      {/* <RegistrationForm /> */}
      <Footer/>
    </div>
  );
}

export default App;
