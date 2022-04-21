const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs');
const BookSchema = mongoose.Schema({
    username: {
        type: String,
    },

    email: {
        type: String,
        unique:true
    },
    mobilenumber: {
        type: String,
    },
    password: {
        type: String,
        select: false
    },
    photo: {
        type:String
    },
    photo_path: {
        type: String
    }


})
BookSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err); // Exit if error is found
        user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
        next(); // Exit Bcrypt function
    });
});

BookSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const Food = mongoose.model("Food", BookSchema)
module.exports = Food;