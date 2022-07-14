import styles from './navbar.module.css'
import { Hamburger } from './hamburger';
import Link from 'next/link';
import React, { useLayoutEffect, useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}



function NavBar( ){

    // detects screen size
    const [width, height] = useWindowSize();
    let hamburger;
    if (width > 800) {      
        hamburger = 
            <div className={styles.main}>
                <div className={styles.navBar}>
                    <Navlink name='About Me' link='/'/> 
                    <Navlink name='Projects' link='/projects'/>
                    <Navlink name='Interactive' link='/interactive'/>
                    <Navlink name='Contact' link='/contact'/>
                </div>
            </div>
    }
    else{
        hamburger = <Hamburger/>
    }

    return(
        // bar arossed
        <div className={styles.bar}> 
            {/* main */}
            {useEffect(() => {
            document.body.style.overflow = "auto";
            })}
            <div className={styles.main}>
                {/* name */}
                
                <div style={{display: 'flex', flexDirection: 'row', gap: '0.2rem'}}>
                    <b>Frank </b> <span style={{color: 'grey'}}>Laterza</span>
                </div>

                {/* renderes the hamburger */}
                {hamburger}

            </div>
        </div>
    );
}

function Navlink( props: {name: string, link: string} ) {
    return (
    <Link href={props.link}>        
        <a className={styles.navLink}>
            {props.name}
        </a>
    </Link>
    );
}



export { NavBar, Navlink }