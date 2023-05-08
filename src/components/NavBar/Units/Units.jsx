import { useContext } from "react";
import { GlobalContext } from "../../../App";

const Units = () => {
    const { unit, searching } = useContext(GlobalContext);

    return (
        <div className="units">
            <p className={unit.unit === 'c' ? 'selected' : ''} id='c' onClick={(e) => {unit.unitHandle(e); !searching.searching ? searching.setSearching(true) : null}}>C</p>
                |
            <p className={unit.unit === 'f' ? 'selected' : ''} id='f' onClick={(e) => {unit.unitHandle(e); !searching.searching ? searching.setSearching(true) : null}}>F</p>
        </div>
    )
}

export default Units