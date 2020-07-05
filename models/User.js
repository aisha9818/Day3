const mongoose = require('../config/DBconnection');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const val = require('validator');
const uuid = require('uuid');

// build the user schema
const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 50,
        minlength: 5
    },
    lastname:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 50,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        validate: [new RegExp(/[^@]+@[^\.]+\..+/), 'not a valid email'],
        unique:true
    },
    passwordHash: { type: String, required: true },
    active: { type: Boolean, default: true, required: true },
    lastUpdatedBy: { type: String, required: true, default: 'System' },
    lastUpdatedDate: { type: Date, required: true, default: new Date() },
    passwordResetToken: String,
    passwordResetExpiration: Date,
    emailConfirmationToken: { type: String, default: uuid() },
    lastIPAddress: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
})


//password hashing
userSchema.virtual('password')
    .get(function () {
        return this._password;
    })
    .set(function (value) {
        this._password = value;
        var salt = bcrypt.genSaltSync(12);
        this.passwordHash = bcrypt.hashSync(value, salt);
    });

// set the password confirmation
userSchema.virtual('passwordConfirmation')
    .get(function () {
        return this._passwordConfirmation;
    })
    .set(function (value) {
        this._passwordConfirmation = value;
    });

    //start point of password hashing and validation
userSchema.path('passwordHash').validate(function (v) {
    if (this._password || this._passwordConfirmation) {
        if (!val.isLength(this._password , {min:6,max:undefined})) {
            this.invalidate('password', 'must be at least 6 characters.');
        }
        if (this._password !== this._passwordConfirmation) {
            this.invalidate('passwordConfirmation', 'must match confirmation.');
        }
    }

    if (this.isNew && !this._password) {
        this.invalidate('password', 'required');
    }
}, null);


// export as model with name User
module.exports = mongoose.model('User' ,userSchema);