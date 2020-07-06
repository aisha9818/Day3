const mongoose = require("../config/DBconnection");
const Schema = mongoose.Schema;

var ProfileSchema = new mongoose.Schema({
  gender: { type: Number, max: 3, min: 0, default: GENDERS.Unspecified },
  user: { type: Schema.ObjectId, ref: "User", required: true },
  age: Number,
  education: [
    {
      type: String,
      detail: {
        major: String,
        degree: String,
        grade: String,
        startdate: Date,
        enddate: Date,
        remarks: String,
      },
    },
  ],
  experience: [
    {
      type: String,
      detail: {
        position: String,
        company: String,
        dateofjoin: String,
        dateofretire: String,
        location: String,
        responsibilities: [{ type: String }],
        description: String,
      },
    },
  ],
});

module.exports = mongoose.model("profile", ProfileSchema);
