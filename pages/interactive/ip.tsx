import styles from './sudoku.module.css'
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

        <div className={styles.box}>
            
            <div>{data.country_name}</div>
            <div>{data.state}</div>
            <div>{data.city}</div>
            <div>{data.postal}</div>
            <div>latitude: {data.latitude}, longitude:{data.longitude}</div>
            <div>IPv4: {data.IPv4}</div>

        </div>
      </div>
    </div>
  );
}