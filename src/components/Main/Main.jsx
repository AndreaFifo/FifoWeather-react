import GeneralInfo from "./GeneralInfo/GeneralInfo";
import Forecast from "./Forecast/Forecast";
import Graph from "./Graph/Graph";
import { MainContext } from "../../App";
import { useContext} from "react";
import "./main.css"



const Main = () => {
  const { skeletonLoading,} = useContext(MainContext);
  
  return (
    <main className={skeletonLoading ? 'skeleton' : null}>
      <GeneralInfo />
      <Forecast />
      <Graph />
    </main>
  )
}

export default Main;