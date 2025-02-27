import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Room extends Model {}

Room.init(
  {
    name: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "room",
  }
);
export default Room;
