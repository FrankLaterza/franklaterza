import styles from './navbar.module.css'
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
    const [width, height] = useWindowSize();
    let hamburger;
    if (width > 800) {      
        hamburger = 
            <div className={styles.main}>
                <div className={styles.navbar}>
                <Navlink name='About Me' link='/'/> 
                <Navlink name='Projects' link='/projects'/>
                <Navlink name='Interactive' link='/interactive'/>
                </div>
                <div className={styles.contact}>Contact</div>
            </div>
    }
    else{
        hamburger
    }
    


    return(
        // bar arossed
        <div className={styles.bar}> 
            {/* main */}
            <div className={styles.main}>
                {/* name */}
                <div className={styles.myName}>
                    <b>Frank</b> <span style={{color: 'grey'}}>Laterza</span>
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
        <a className={styles.navlink}>
            {props.name}
        </a>
    </Link>
    );
}



export { NavBar }