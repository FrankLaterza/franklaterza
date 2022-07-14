
import React, { useLayoutEffect, useState } from 'react';
import styles from './navbar.module.css'
import { Navlink } from '.';

function Hamburger () {


    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
      }
    return (
        <nav className={styles.navBar}>
          <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
          <div className={`${styles.menuNav} ${navbarOpen ? `${styles.showMenu}` : ""}`}>

            <Navlink name='About Me' link='/'/> 
            <Navlink name='Projects' link='/projects'/>
            <Navlink name='Interactive' link='/interactive'/>
            <Navlink name='Contact' link='/contact'/>


          </div>
        </nav>
      )



}




export { Hamburger } 