const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
    },
  ],
});

//Transforms the db entries to a more desirable API format
//removing unwanted fields and converting the "_id" to "id".
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
