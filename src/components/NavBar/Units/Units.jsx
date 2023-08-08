import { useContext } from "react";
import { GlobalContext } from "../../../App";

const Units = () => {
    const { unit } = useContext(GlobalContext);

    return (
        <div className="units">
            <p className={unit.unit === 'C' ? 'selected' : ''} id='C' onClick={(e) => {unit.unitHandle(e)}}>C</p>
                |
            <p className={unit.unit === 'F' ? 'selected' : ''} id='F' onClick={(e) => {unit.unitHandle(e)}}>F</p>
        </div>
    )
}

export default Units