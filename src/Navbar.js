import { Link } from "react-router-dom";
import { ethers } from "ethers";
import factoryabi from "./Factoryabi.json";

import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "0xFbCfa71Edfa6a7C4145A11b5417C4bc571F6f851";

const Navbar = () => {

  



  return (
  
    <div class="navbar w-nav">
    <div class="container-2 w-container">
      <a href="#" class="w-nav-brand"><img src="/src/Yanft-logo.svg" loading="lazy" width="121" alt="" class="image-2"></img></a>
      <nav role="navigation" class="w-nav-menu">
      <Link to="/"><p aria-current="page" class="nav-items w-nav-link w--current">Home</p></Link>
      <Link to="/deploy"><p class="nav-items w-nav-link">Deploy</p></Link>
      <Link to="/voting"><p class="nav-items w-nav-link">Vote</p></Link>
      <Link to="/locknft"><p class="nav-items w-nav-link">Lock</p></Link>
      <Link to="/poap"><p class="nav-items w-nav-link">POAP</p></Link>
      
      </nav>
    </div>
  </div>
    
  );
}
 
export default Navbar;