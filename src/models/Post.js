const mongoose = require('mongoose');
//Para indicar quais tabelas estarão disponiveis no BD
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
        //Para armazenar data de criação de cada registro, bem com, de modificações
        timestamps: true,
    });


module.exports = mongoose.model('Post', PostSchema);