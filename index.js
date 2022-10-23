/**
 * Title: Driver segment of this project
 * Description: All driver level task execute here
 * Author: Hasibul Islam
 * Date: 23/10/2022
 */

/* external imports */
const mongoose = require("mongoose");
require("dotenv").config();

/* internal import */
const app = require("./app");

/* database connection */
mongoose
  .connect(process.env.DB_LOCAL, {
    dbName: "skill-nao",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Success: Establishing DB Connection`))
  .catch((error) => console.log(`Error: ${error.name}`));

/* establish server port */
app.listen(process.env.PORT, () => {
  console.log(`Success: App listening on Port :: ${process.env.PORT}`);
});
