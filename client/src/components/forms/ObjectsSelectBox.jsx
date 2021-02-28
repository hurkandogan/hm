import React, { useState, useEffect } from 'react';
import findAllObjects from "../../services/object.service";
// TODO: Not yet implemented
// TODO: Needs to be cleaner

function ObjectSelectBox(){
// Bringing Objects for selectbox
const [objectsList, setObject] = useState([]);
const [selectedObject, setSelectedObject] = useState('');
const [costTypesList, setCostTypeList] = useState('');

useEffect(() => {
    objectData();
}, []);

const objectData = () => {
    findAllObjects()
        .then(response => {
            const objects = response.data
            setObject(objects);
        })
        .catch(err => console.log("Sidebar#Sidebar#retrieveObjects: " + err));
}
const objectsSelectBox = (data) => {
    // On change cannot be here. It should be in Select tag
    return (
        <option value={data.id}>{data.key}{data.name}</option>
    );
}

const selectedObjectHandler = (event) => {
    setSelectedObject(event.target.value);
};

const costTypes = () => {
    objectsList.forEach((element) => {
        if(element.id === selectedObject){
            if(element.hasCostTypes){
                setCostTypeList(
                    <select className="form-label" id="costType">
                        <option value="28e5a600-5040-11eb-b5b3-0ddba2819351">Erhaltungsaufwendungen</option>
                        <option value="2d7d2f80-5040-11eb-b5b3-0ddba2819351">Nebenkosten</option>
                        <option value="3361ab60-5040-11eb-b5b3-0ddba2819351">Weitere Aufwendungen</option>
                        <option value="38ea2490-5040-11eb-b5b3-0ddba2819351">Versicherungen</option>
                    </select>
                );
            } else{
                setCostTypeList(
                    <select className="form-label" id="costType">
                        <option value="241706f0-5040-11eb-b5b3-0ddba2819351">General</option>
                    </select>
                );
            }
        }
        return costTypesList;
    });
};


return (
    <div>
    <div className="mb-3">
    <label className="form-label" htmlFor="objects">Object:</label>
    <select className="form-select" id="objects" onChange={ selectedObjectHandler }>
        { objectsList.map(objectsSelectBox) }
    </select>
</div>
    <div className="mb-3">
        <label className="form-label" htmlFor="cost-types">Cost Type:</label>
        <select className="form-select" id="costType">
            <option value="241706f0-5040-11eb-b5b3-0ddba2819351">General (Only: Verwaltungskosten, Carls Aufw. und Praxis)</option>
            <option value="28e5a600-5040-11eb-b5b3-0ddba2819351">Erhaltungsaufwendungen</option>
            <option value="2d7d2f80-5040-11eb-b5b3-0ddba2819351">Nebenkosten</option>
            <option value="3361ab60-5040-11eb-b5b3-0ddba2819351">Weitere Aufwendungen</option>
            <option value="38ea2490-5040-11eb-b5b3-0ddba2819351">Versicherungen</option>
        </select>
    </div>
    </div>
);
}

export default ObjectSelectBox;