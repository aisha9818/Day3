const mongoose = require('../config/DBconnection');
const Schema = mongoose.Schema;


// build the comment schema
const CommentSchema = new Schema({

    postid: { type: String, ref: 'Post', required: true },

    content: { 
        type: String,
        required: true,
    },

    
});


// export as model with name Comment
module.exports = mongoose.model('Comment' ,CommentSchema);
