import express from "express";
import roomController from "./controllers/room.js";

const router = express.Router();

function room() {
  router.get("/api/v1/room", roomController.allRoom);
  router.get("/api/v1/room/:id", roomController.roomById);
}
room();
export default router;
