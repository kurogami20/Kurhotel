import sequelize from "../../data/client.js";
import Room from "./roomModels.js";
import Client from "./clientModels.js";
import Booking from "./bookingModel.js";

Room.belongsToMany(Client, {
  through: Booking,
  foreignKey: "room_id",
  otherKey: "client_id",
  as: "client",
});
Client.belongsToMany(Room, {
  through: Booking,
  foreignKey: "client_id",
  otherKey: "room_id",
  as: "room",
});
export { sequelize, Room, Client, Booking };
