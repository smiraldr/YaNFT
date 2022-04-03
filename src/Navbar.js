import { Link } from "react-router-dom";
import { ethers } from "ethers";
import factoryabi from "./Factoryabi.json";

import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "0xFbCfa71Edfa6a7C4145A11b5417C4bc571F6f851";

const Navbar = () => {

  



  return (
  
    <div class="navbar w-nav">
    <div class="container-2 w-container">
      <a href="/"><img src="https://assets.website-files.com/623cdb6cabbcc2187cf3c9db/62402ee7856247337c3acc4c_Yanft-logo.svg" loading="lazy" width="121px" height="48px" alt="" class="image-2"></img></a>
      <nav role="navigation" class="w-nav-menu">
      <Link to="/"><a aria-current="page" class="nav-items w-nav-link">Home</a></Link>
      <Link to="/deploy"><a class="nav-items w-nav-link">Deploy</a></Link>
      <Link to="/voting"><a class="nav-items w-nav-link">Vote</a></Link>
      <Link to="/locknft"><a class="nav-items w-nav-link">Lock</a></Link>
      <Link to="/poap"><a class="nav-items w-nav-link">POAP</a></Link>
      
      </nav>
    </div>
  </div>
    
  );
}
 
export default Navbar;