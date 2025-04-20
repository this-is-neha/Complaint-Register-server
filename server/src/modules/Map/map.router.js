const MapCtrl = require('../Map/map.controller')
const Maprouter = require("express").Router();

Maprouter.post("/coordinates",MapCtrl.MapController)
Maprouter.get("/complaints",MapCtrl.getAll)
Maprouter.get('/getid',MapCtrl.getId );
Maprouter.delete('/delete/:id',MapCtrl.deleteMessage);
Maprouter.get('/:userid', MapCtrl.getByUserId);
Maprouter.get('/unseencount',MapCtrl.read)
module.exports=Maprouter