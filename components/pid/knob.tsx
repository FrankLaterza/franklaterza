// import {useEffect, useState} from "react";
// import {Group, Arc, Text} from "react-konva";

// function Knob() {
//   const [angle, setAngle] = useState(0);

//   const handleMouseUp = () => {
//     setAngle(Math.random() * 360);
//   };

//   return (
//     <Group x={window.innerWidth / 2} y={window.innerHeight / 2}>
//       <Arc
//         angle={angle}
//         onMouseUp={handleMouseUp}
//         innerRadius={100}
//         outerRadius={200}
//         fill="#66bb6a"
//         stroke="#333"
//         strokeWidth={4}
//         rotation={-90}
//         shadowBlur={10}
//         shadowOffset={{x: 3, y: 3}}
//         shadowOpacity={0.5}
//       />
//       <Text
//         text="Spin the Wheel"
//         fontSize={30}
//         fill="#333"
//         align="center"
//         width={200}
//         x={-100}
//         y={-15}
//       />
//     </Group>
//   );
// }

// export {Knob};
