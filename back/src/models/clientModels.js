import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Client extends Model {}

Client.init(
  {
    lastname: { type: DataTypes.TEXT, allowNull: false },
    firstname: { type: DataTypes.TEXT },
    address: { type: DataTypes.TEXT },
    email: { type: DataTypes.TEXT },
    country: { type: DataTypes.TEXT },
    phoneNumber: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "client",
  }
);
export default Client;
