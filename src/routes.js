const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const routes = new express.Router();
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const upload = multer(uploadConfig);
//upload.single('image') para recuperar o campo que esta a imagem
routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);



//Interceptando requisições na rota raiz
//Res: retorna algo para o cliente
//Req: recebe parametro da requisição. localhost:3333?nome=Fernando
routes.get('/', (req, res) => {
    return res.send(`Hello ${req.query.nome}`);
});



module.exports = routes;