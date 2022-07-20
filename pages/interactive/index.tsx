import styles from './interactive.module.css'
import { randSVG } from '../../lib/random_background';
import React, { useRef, useState } from "react";

const setOnceSVG = randSVG()

export default function Interactive() {

  return (
    <div className={styles.container} style={{backgroundImage: `url("${setOnceSVG}")` }} >
      <div className={styles.main}>
              
        welcome to the interactive page
        
        
      </div>
    </div>
  );
}