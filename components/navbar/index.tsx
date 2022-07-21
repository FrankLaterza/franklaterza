import styles from './navbar.module.css'
import { Hamburger } from './hamburger';
import Link from 'next/link';
import React, { useLayoutEffect, useState } from 'react';

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
    if (width > 970) {      
        hamburger = 
            <div className={styles.main}>
                <div className={styles.navBar}>
                    <Navlink name='About Me' link='/'/> 
                    <Navlink name='Projects' link='/projects'/>
                    <Navlink name='Interactive' link='/interactive/wheel'/>
                </div>
                <div className={styles.contact}>
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
            {/* get meta tags */}
            {/* main */}
            <div className={styles.barLine} >
                <div className={styles.main}>
                    {/* name */}
                    <div style={{display: 'flex', flexDirection: 'row', gap: '0rem'}}>
                        <b>Frank </b> <span style={{color: 'grey'}}>Laterza</span>
                    </div>

                    {/* renderes the hamburger */}
                    {hamburger}

                </div>
                <canvas style={{backgroundColor: 'white', width: "100vw", height: "0.5rem" }}></canvas>
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