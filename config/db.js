const mongoose = require("mongoose");

mongoose
  .connect(
    `${process.env.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => console.log("failed to connect mDB", err));

