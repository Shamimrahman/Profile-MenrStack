import React, { createContext, useReducer } from "react";
import Herosec from "./Components/Herosection/Herosec";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import { Route, Switch } from "react-router-dom";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import Registraion from "./Components/Registration/Registraion";
import Users from "./Components/User/Users";
import Logout from "./Components/Logout/Logout";
import Adminreg from "./Components/Admin/Adminreg";
import Adminlogin from "./Components/Admin/Adminlogin";

import { reducer, initialState } from "./reducer/userreducer";

export const userContext = createContext();
//ai user context nexttym login a lagbe logout a lagbe

const Routing = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/registration" component={Registraion}></Route>
        <Route exact path="/users" component={Users}></Route>

        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/adminreg" component={Adminreg}></Route>
        <Route exact path="/adminlogin" component={Adminlogin}></Route>

        <Route exact path="/" component={Herosec}></Route>
      </Switch>
      ;
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <userContext.Provider value={{ state, dispatch }}>
        {/**ekhn amader dispatch and state er jonno useReducer use korte hobe */}
        <Navbar></Navbar>
        <Routing></Routing>
      </userContext.Provider>
    </div>
  );
};

export default App;
