
import React, { useLayoutEffect, useState, useEffect } from 'react';
import styles from './navbar.module.css'
import { Navlink } from '.';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"


function Hamburger () {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {

        setNavbarOpen(!navbarOpen)

      
    }
    // break scroll while tab is open
    useEffect(() => {document.body.style.overflow  = (navbarOpen) ? 'hidden' : 'auto';});



    return (
      <nav className={styles.navBar}>

      <button onClick={handleToggle}>
        {navbarOpen ? 
          (<MdClose style={{ color: 'rgb(0,0,0)', width: "2rem", height: "2rem" }} />)
          : (<FiMenu style={{ color: 'rgb(0,0,0)', width: "2rem", height: "2rem" }} />)
        }
      </button>
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