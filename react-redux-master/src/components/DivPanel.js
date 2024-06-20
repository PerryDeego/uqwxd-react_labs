import React from "react";
import { useSelector } from "react-redux";

const DivPanel = () => {
    let counterVal = useSelector(state => state.counter);

    return (
        <div className="show-counter">
            The  present value of the counte is: { counterVal }
        </div>
    );
}

export default DivPanel
