const mongoose = require("mongoose");

const ErrorSchema = new mongoose.Schema(
    {
        errname: { type: String },
        errmsg: { type: String },
        customerror: { type: String },
    },
    { timestamps: true }
);
const errorlogModel = mongoose.model("errorlog", ErrorSchema);
module.exports = errorlogModel;