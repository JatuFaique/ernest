import React, { useState } from "react";

function Dayoftheweek() {
    const [count, setCount] = useState(1);
    return (
        <div>
            Dayoftheweek
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
}

export default Dayoftheweek;
