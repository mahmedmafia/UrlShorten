import React from 'react'
import {Link} from 'react-router-dom';
import classes from './navbar.module.css';
export default function NavBar() {
    return (
        <nav>
            <div className={classes.container}>
             <h2>Shorten Url</h2>
          <ul>
             
            <li>
              <Link to="/shorten">shorten</Link>
            </li>
            <li>
              <Link to="/shortlinks">all</Link>
            </li>
          </ul>
          </div>
        </nav>
    )
}
