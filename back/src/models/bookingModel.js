import { DataTypes, Model } from "sequelize";
import sequelize from "../../data/client.js";

class Booking extends Model {}

Booking.init(
  {
    date: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      primaryKey: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "booking",
  }
);
export default Booking;
