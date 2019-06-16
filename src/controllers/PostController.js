const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');

//Files System
const fs = require('fs');
//Para exportar os métodos do controler
module.exports = {
    //Para listar as postagens
    async index(req, res) {
        //Para retornar com base na data de criação e de forma decrescente
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    //Para cadastrar uma nova postagem
    async store(req, res) {
        console.log(req.body);
        console.log(req.file);
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        const [nome] = image.split('.');
        const fileName = `${nome}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            );

        fs.unlinkSync(req.file.path);
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });
        req.io.emit('post', post);

        return res.json(post);
    },

};