import { Room } from "../models/index.js";

const roomController = {
  async allRoom(req, res) {
    const allRoom = await Room.findAll();
    res.status(200).json(allRoom);
  },
  async roomById(req, res) {
    const id = Number.parseInt(req.params.id);
    const room = await Room.findByPk(id);
    res.status(200).json(room);
  },
};

export default roomController;
