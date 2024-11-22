import React from "react";
import "./Mode.css"

const Mode = ({ handleChange, isChecked}) => {

    return (
        <div className="mode-container">
            <input id="check"
            className="mode"
            type="checkbox"
            onClick={handleChange}
            checked={isChecked} />
            <label htmlFor="check"></label>

        </div>
    )
}
export default Mode