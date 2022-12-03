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
    if (width > 800) {      
        hamburger = 
            <div className={styles.main}>
                {/* name */}
                <div className={styles.name}>
                    <b>Frank </b> <span style={{color: 'grey'}}>Laterza</span>
                </div>
                <div className={styles.navBar}>
                    <Navlink name='About Me' link='/'/> 
                    <Navlink name='Projects' link='/projects'/>
                    <Navlink name='Interactive' link='/interactive/wheel'/>
                </div>
                <div className={styles.contact}>
                        <Navlink name='Links' link='/links'/>
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

                {/* renderes the hamburger */}

                {/* <canvas style={{backgroundColor: 'white', width: "100vw", height: "0.5rem" }}></canvas> */}
                
                <div className={styles.header}>
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