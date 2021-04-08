import "./App.css";
//import "./Header.css";
import React from "react";

function Header() {
  return (
    <div class="container">
      <h1 class="banner">UF Trail Gators</h1>
      <ul class="nav nav-expand-lg nav-justified">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/signup">
            Signup
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;