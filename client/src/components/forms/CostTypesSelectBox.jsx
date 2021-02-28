import React, { useState } from 'react';

function CostTypeSelectBox(props) {
    const [costTypesBool, setCostTypesBool] = useState(false);

    const costTypesSelectBox = () => {
        setCostTypesBool(props.costTypesSelection);
        if(costTypesBool){
            return(
                <option>Test True</option>
            );
        } else {
            return (
                <option>Test False</option>
            );
        }
    }



    return (
        <div>
            <select>
                { costTypesSelectBox }
            </select>
        </div>
    );
}

export default CostTypeSelectBox;