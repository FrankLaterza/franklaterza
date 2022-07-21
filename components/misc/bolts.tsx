import { AiOutlineMinusCircle } from "react-icons/ai"

// make sure parent has position: relative;
function Bolts (){
  return (
    <div>
    <AiOutlineMinusCircle style={{ top: '0.5rem', left: '0.5rem', transform: 'rotate(-45deg)', color: 'black', position: 'absolute', width: "1rem", height: "1rem" }}/>
    <AiOutlineMinusCircle style={{ top: '0.5rem', right : '0.5rem', transform: 'rotate(45deg)', color: 'black', position: 'absolute', width: "1rem", height: "1rem" }}/>
    <AiOutlineMinusCircle style={{ bottom: '0.5rem', left: '0.5rem', transform: 'rotate(45deg)', color: 'black', position: 'absolute', width: "1rem", height: "1rem" }}/>
    <AiOutlineMinusCircle style={{ bottom : '0.5rem', right: '0.5rem', transform: 'rotate(-45deg)', color: 'black', position: 'absolute', width: "1rem", height: "1rem" }}/>
  </div>
  )
}

export {Bolts};