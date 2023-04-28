import { useContext} from "react";
import { Context } from "../../../App";

const Units = () => {
    const { unit } = useContext(Context);

    return (
        <div className="units">
            <p className={unit.unit === 'c' ? 'selected' : ''} id='c' onClick={unit.unitHandle}>C</p>
                |
            <p className={unit.unit === 'f' ? 'selected' : ''} id='f' onClick={unit.unitHandle}>F</p>
        </div>
    )
}

export default Units