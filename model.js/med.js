const mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')   ;
const FoodSchema = mongoose.Schema({
    username:{
     type:String,
     require:true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobilenumber: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false        
    },
    photo: {
        type: String,
    },
    photo_path: {
        type: String
    },
    description: {
        type: String,
    },
    quantities: {
        type: String,
    },
    price: {
        type: String,
    },

})
FoodSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err); // Exit if error is found
        user.password = hash; // Assign the hash to the user's password so it is saved in database encrypted
        next(); // Exit Bcrypt function
    });
});

FoodSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); 
};  
const Lol = mongoose.model("Lol" ,FoodSchema)
module.exports = Lol;