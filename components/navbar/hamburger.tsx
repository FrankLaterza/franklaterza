import React, {useLayoutEffect, useState, useEffect} from "react";
import styles from "./navbar.module.css";
import {Navlink} from ".";
import Image from "next/image";
import {MdClose} from "react-icons/md";
import {FiMenu} from "react-icons/fi";
import {BiHome, BiLink, BiAtom, BiBrain} from "react-icons/bi";
import chibi from "/public/images/me/frank_logo.png";
import Link from "next/link";

function Hamburger() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  // break scroll while tab is open
  useEffect(() => {
    (document.body.style.overflow = navbarOpen ? "hidden" : ""),
      (document.body.style.position = navbarOpen ? "fixed" : "");
  }, [navbarOpen]);
  return (
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
      <nav className={styles.burger}>
        <button onClick={handleToggle}>
          {navbarOpen ? (
            <MdClose
              style={{color: "rgb(0,0,0)", width: "2rem", height: "2rem"}}
            />
          ) : (
            <FiMenu
              style={{color: "rgb(0,0,0)", width: "2rem", height: "2rem"}}
            />
          )}
        </button>
        <div
          onClick={handleToggle}
          className={`${styles.menuNav} ${
            navbarOpen ? `${styles.showMenu}` : ""
          }`}
        >
          <Navlink name="About Me" link="/" icon={<BiHome />} />
          <Navlink name="Projects" link="/projects" icon={<BiBrain />} />
          <Navlink
            name="Interactive"
            link="/interactive/pid"
            icon={<BiAtom />}
          />
          <Navlink name="Links" link="/links" icon={<BiLink />} />
        </div>
      </nav>
    </div>
  );
}

export {Hamburger};
