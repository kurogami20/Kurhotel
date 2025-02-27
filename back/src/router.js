import express from "express";
import roomController from "./controllers/room.js";
import clientController from "./controllers/Client.js";
const router = express.Router();

function room() {
  router.get("/api/v1/room", roomController.allRoom);
  router.get("/api/v1/room/:id", roomController.roomById);
}
function client() {
  router.get("/api/v1/booking", clientController.findBook);
}

client();
room();
export default router;
