import * as React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  return (
    <div className="nav-bar">
      <div className="title">АльфаЕда </div>
      <div className="block">
        
          <Link to="/">
            <UserIcon />
            username
          </Link>
        

        <button>Выйти</button>
      </div>
    </div>
  );
};

const UserIcon = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 28.25C22.3178 28.25 28.25 22.3178 28.25 15C28.25 7.68223 22.3178 1.75 15 1.75C7.68223 1.75 1.75 7.68223 1.75 15C1.75 22.3178 7.68223 28.25 15 28.25Z"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M15 17.25C18.1756 17.25 20.75 14.6756 20.75 11.5C20.75 8.32436 18.1756 5.75 15 5.75C11.8244 5.75 9.25 8.32436 9.25 11.5C9.25 14.6756 11.8244 17.25 15 17.25Z"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M5.34082 24.07C6.04932 22.0748 7.35827 20.348 9.08783 19.1268C10.8174 17.9056 12.8827 17.25 14.9999 17.25C17.1171 17.25 19.1824 17.9056 20.912 19.1268C22.6415 20.348 23.9505 22.0748 24.659 24.07"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  );
};

export default NavBar;
