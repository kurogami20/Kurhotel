import { Client } from "../models/index.js";
import z, { date } from "zod";

const clientController = {
  async findBook(req, res) {
    const data = req.body;
    const bookSchema = z.object({
      lastname: z.string().nonempty(),
      date: z.number().positive().min(1),
      id_client: z.number().positive().min(1),
      id_room: z.number().positive().min(1).optional(),
    });

    const verif = bookSchema.parse(data);
    if (!verif.id_room) {
      const book = await Client.findOne({
        where: { id: verif.id_client, lastname: verif.lastname },
        include: [
          {
            association: "room",
          },
        ],
      });

      res.status(200).json(book);
    } else {
      const book = await Client.findOne({
        where: { id: verif.id_client, lastname: verif.lastname },
        include: [
          {
            association: "room",
            where: {
              id: verif.id_room,
            },
          },
        ],
      });

      res.status(200).json(book);
    }
  },
  async book(req, res) {},
};
export default clientController;
