import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 3, max: 20, unique: true},
    email: {type: String, required: true, unique: true, max: 50},
    password: {type: String, required: true},
    profilePicture: {type: String, default: ""},
    coverPicture: {type: String, default: ""},
    followers:{type: Array, default: []},
    followings:{type: Array, default: []},
    isAdmin: {type: Boolean, default: false},
    desc: {type: String, max: 50},
    city: {type: String, max: 50},
    from : {type: String, max: 50},
    relationship: {type: Number, enum: [1, 2, 3],},
},
{
    timestamps: true
}
    );

    const User = mongoose.model("User", userSchema);
export default User;