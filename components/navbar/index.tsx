import styles from "./navbar.module.css";
import {Hamburger} from "./hamburger";
import Link from "next/link";
import React, {Component, useEffect, useState} from "react";
import Image from "next/image";
import chibi from "/public/images/me/frank_logo.png";
import {BiHome, BiLink, BiAtom, BiBrain} from "react-icons/bi";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function NavBar() {
  // detects screen size
  const [width, height] = useWindowSize();
  let hamburger;
  if (width > 700) {
    hamburger = (
      <div className={styles.main}>
        {/* name */}
        <Link href={"/"}>
          <a className={styles.name} style={{cursor: "pointer"}}>
            <Image
              style={{borderRadius: "20px"}}
              src={chibi}
              width={40}
              height={40}
            />
            Frank
          </a>
        </Link>

        {/* nav items */}
        <div className={styles.navBar}>
          <Navlink name="About Me" link="/" icon={<BiHome />} />
          <Navlink name="Projects" link="/projects" icon={<BiBrain />} />
          <Navlink
            name="Interactive"
            link="/interactive/wheel"
            icon={<BiAtom />}
          />
          <Navlink name="Links" link="/links" icon={<BiLink />} />
        </div>
      </div>
    );
  } else {
    hamburger = <Hamburger />;
  }

  return (
    // bar arossed
    <div className={styles.bar}>
      <div className={styles.header}>{hamburger}</div>
    </div>
  );
}

function Navlink(props: {name: string; link: string; icon: any}) {
  return (
    <Link href={props.link}>
      <a className={styles.navLink}>
        {props.icon}
        {props.name}
      </a>
    </Link>
  );
}

export {NavBar, Navlink};
