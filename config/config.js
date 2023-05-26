const mongoose = require("mongoose");
// zflUz3GKZfbPy5vv
const connect = async () => {
  await mongoose
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((response) => {
      console.log("Mongoose Connected");
    })
    .catch((error) => {
      console.log("Mongoose Error");
    });
};

module.exports = connect;
