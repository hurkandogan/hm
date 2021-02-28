const express = require('express');
const route = express.Router();
const Object = require('../controller/object.controller');

route.get('/', Object.getAllObjects);
route.get('/:id', Object.getSingleObject); // Not yet implemented
route.post('/', Object.createObject);
route.patch('/update/:id', Object.updateObject); // Not yet implemented
route.delete('/delete/:id', Object.deleteObject);

module.exports = route;