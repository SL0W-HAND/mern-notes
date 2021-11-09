import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,},
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      numberOfNotes:{
        type: Number,
        default: 0,
      },
      notes: []
});

UserSchema.methods.matchPassword = async function (password) {
  if (this.password === password) {
    return true;
  }
  return false;
};

export default model("User", UserSchema);