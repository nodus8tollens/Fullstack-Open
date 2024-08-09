const config = require("./utils/config");
const app = require("./app");
//Mounts the app on the PORT
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
