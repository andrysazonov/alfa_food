import * as React from "react";
import "./index.scss";
interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  return (
    <div className="nav-bar">
      <div className="title">АльфаЕда </div>
    </div>
  );
};

export default NavBar;
