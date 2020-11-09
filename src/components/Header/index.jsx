import React from "react";
import {Link} from 'react-router';

import './Header.scss';

export default function Header({
  user
}) {
  return <div className="Header">
    <h1 className="AppTitle">Tweeto</h1>
    <div className="Header__links">
      {user._id &&  <div className="Header__links-left">
        <span>User: {user.email}</span>
        <a href="/api/logout">Logout</a>
      </div>}
    </div>
  </div>
}