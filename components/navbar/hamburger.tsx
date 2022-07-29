
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
    useEffect(() => {document.body.style.overflow = (navbarOpen) ? 'hidden' : '', 
                     document.body.style.position = (navbarOpen) ? 'fixed' : ''},[navbarOpen]);
    return (
      <div className={styles.main}>
        {/* name */}
        <div className={styles.name}>
            <b>Frank </b> <span style={{color: 'grey'}}>Laterza</span>
        </div>
        <nav className={styles.burger}>

        <button onClick={handleToggle}>
          {navbarOpen ? 
            (<MdClose style={{ color: 'rgb(0,0,0)', width: "2rem", height: "2rem" }} />)
            : (<FiMenu style={{ color: 'rgb(0,0,0)', width: "2rem", height: "2rem" }} />)
          }
        </button>
          <div onClick={handleToggle} className={`${styles.menuNav} ${navbarOpen ? `${styles.showMenu}` : ""}`}>
            <Navlink name='About Me' link='/'/> 
            <Navlink name='Projects' link='/projects'/>
            <Navlink name='Interactive' link='/interactive/wheel'/>
            <Navlink name='Links' link='/links'/>
          </div>
        </nav>
      </div>
    )



}




export { Hamburger } 