import React from "react";

function AppointmentNewHOA(){
    return(<div class="container">
  
    <h2>Google Material Design in CSS3<small>Inputs</small></h2>
    <form>
      
      <div class="group">      
        <input type="text" required></input>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Name</label>
      </div>
        
      <div class="group">      
        <input type="text" required></input>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Email</label>
      </div>
      
    </form>
        
    <p class="footer">
      a <a href="https://scotch.io/tutorials/css/google-material-design-input-boxes-in-css3" target="_blank">tutorial</a> by <a href="https://scotch.io" target="_blank">scotch.io</a>
    </p>
    
  </div>)
};

export default AppointmentNewHOA;