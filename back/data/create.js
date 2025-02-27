import { sequelize } from "../src/models/index.js";

await sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");
