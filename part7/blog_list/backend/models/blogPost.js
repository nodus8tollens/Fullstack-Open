const mongoose = require("mongoose");

//The user field uses mongoose ObjectId and ref to refference and associate the
//blogPost schema with the User schema. Furthermore, it uses the .populate and the user.id variable
//to parse the corresponding user with their blog posts.
const blogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//Converts the blogPost schema toa more desirable API-appropriate format.
blogPostSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
