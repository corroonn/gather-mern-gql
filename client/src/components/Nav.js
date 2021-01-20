import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function Nav() {
  const context = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  console.log(context.user);

  return (
    <Menu secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to={"/"}
      />

      <Menu.Menu position="right">
        {context.user === null ? (
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to={"/login"}
          />
        ) : (
          <Menu.Item
            name="logout"
            active={activeItem === "home"}
            onClick={() => context.logout()}
            as={Link}
            to={"/login"}
          />
        )}

        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to={"/register"}
        />
      </Menu.Menu>
    </Menu>
  );
}
