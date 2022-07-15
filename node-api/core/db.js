const mongoose = require("mongoose");
exports.createDBConnection = () => {
  mongoose.Promise = global.Promise;
  const connect = mongoose.connect(
    // "mongodb://localhost:27017/shoppingMart",
    'mongodb+srv://aleyka:XM1gueD9pphpEikk@cluster0.t66iaok.mongodb.net/shoppingMart',
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
  );
  return connect;
};