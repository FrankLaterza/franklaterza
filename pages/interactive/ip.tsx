import styles from './ip.module.css'
import { randSVG } from '../../lib/random_background';
import React, { useEffect, useState } from 'react';
import { Bolts } from '../../components/misc/bolts'; 
import { stdin, stdout } from 'node:process';
import axios from 'axios'

const setOnceSVG = randSVG()


export default function Ip() {

    //creating IP state
    const [data, setData] = useState('');

    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        
        setData(res.data)
    }
    
    useEffect( () => {
        //passing getData method to the lifecycle method
        getData()

    }, [])

  return (
    <div className={styles.container} style={{backgroundImage: `url("${setOnceSVG}")` }} >
      <div className={styles.main}>

        {/* header */}
        <div className={styles.header}>
          <Bolts/>
          <h1>
            Your location
          </h1>
          <p className={styles.undergraph}>
            lists your Location and IP
            
          </p>
        </div>

        <div className={styles.box}>
            {Object.values(data).map((value, index) => {
            return (
            <div key={index}>
                <h2 style={{marginTop: '0', marginBottom: '1rem'}}>
                    {value}
                </h2>
            </div>
            );
        })}
            <div>🤓</div>

        </div>
      </div>
    </div>
  );
}