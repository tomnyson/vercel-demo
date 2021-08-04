import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TokenSale from "./App";
// import một component Uload vào Router.js
import UloadIPFS from "./UploadIFS";
import styled from "styled-components";

// ở đây mình có sử dụng react-router-dom để chia thành nhiều page

const RouterApp = () => {
  return (
    <Router>
      <NavStyled>
        <ul>
          <li>
            <Link to="/">Token Sale</Link>
          </li>
          <li>
            <Link to="/ipfs">Upload IPFS</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </NavStyled>
      <div>
        <Switch>
        <Route path="/ipfs">
            <UloadIPFS />
          </Route>
          <Route path="/">
            <TokenSale />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
const NavStyled = styled.nav`
  display: flex;
  width: 100%;
  background: #ccc;
  ul {
    list-style: none;
    display: flex;
    li {
      padding: 0 20px;
      a {
        text-decoration: none;
        text-transform: uppercase;
        color: #000;
        hover: {
          color: red;
        }
      }
    }
  }
`;

export default RouterApp;
