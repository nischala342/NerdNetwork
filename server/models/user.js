const mongoose =  require('mongoose')
const {ObjectId} = mongoose.Schema.Types
 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  connectors: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  connectees: [
    {
      type: ObjectId,
      ref: "user",
    },
  ],
  pic: {
    type: String,
    default:
      "https://www.securityindustry.org/wp-content/uploads/sites/3/2018/05/noimage.png",
  },
});

mongoose.model("user",userSchema)