import GeneralInfo from "./GeneralInfo/GeneralInfo";
import Forecast from "./Forecast/Forecast";
import Graph from "./Graph/Graph";
import "./main.css"

const Main = () => {
  return (
    <main>
      <GeneralInfo/>
      <Forecast/>
      <Graph/>
    </main>
  )
}

export default Main;