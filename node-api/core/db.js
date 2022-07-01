const mongoose = require("mongoose");
exports.createDBConnection = () => {
  mongoose.Promise = global.Promise;
  const connect = mongoose.connect(
    "mongodb://localhost:27017/shoppingMart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
  );
  return connect;
};