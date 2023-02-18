import styles from "./wheel.module.css";
import React, {useRef, useState} from "react";
// what type of graph?
import {Line} from "react-chartjs-2";
// imports for Graph
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// make sure to register them
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// interface dataInterface {
//   labels: number[];
//   datasets: {
//     // label: string;
//     data: number[];
//   }[];
// }

// const data = {
//   labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//   datasets: [
//     {
//       data: [123, 132, 232, 153, 64, 153, 63],
//     },
//   ],
// };

const options: any = {
  scales: {
    y: {
      min: 0,
      max: 400,
    },
  },
  animation: false,
  plugins: {
    legend: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0,
      boarderWidth: 2,
      borderColor: "rgba(47,97,68, 0.3)",
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
};

function LineGraph(props: {data: any}) {
  return <Line data={props.data} width={100} height={125} options={options} />;
}

export {LineGraph};
