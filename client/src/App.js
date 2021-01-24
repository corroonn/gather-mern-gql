import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import AuthReqRoute from "./util/AuthReqRoute";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TriggrHome from "./pages/TriggrHome";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Nav />
          <Route exact path="/" component={Home} />
          <AuthReqRoute exact path="/app" component={TriggrHome} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
