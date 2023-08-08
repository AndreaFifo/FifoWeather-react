import GeneralInfo from "./GeneralInfo/GeneralInfo";
import Forecast from "./Forecast/Forecast";
import Graph from "./Graph/Graph";
import { MainContext } from "../../App";
import "./main.css"
import { useContext } from "react";


const Main = () => {
  const {data} = useContext(MainContext);
  console.log(data);

  return (
    <main>
      <GeneralInfo/>
      <Forecast/>
      <Graph/>
    </main>
  )
}

export default Main;