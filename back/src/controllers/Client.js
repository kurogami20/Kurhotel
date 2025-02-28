import { Client, Booking } from "../models/index.js";
import z, { date } from "zod";

const clientController = {
  async findBook(req, res) {
    const data = req.body;
    const bookSchema = z.object({
      email: z.string().nonempty(),
      date: z.number().positive().min(1),
      client_id: z.number().positive().min(1),
      room_id: z.number().positive().min(1).optional(),
    });

    const verif = bookSchema.parse(data);
    if (!verif.id_room) {
      // on vérifie si la réservation existe
      const book = await Booking.findAll({
        where: { date: verif.date, client_id: verif.client_id },
        attributes: ["room_id"],
      });

      if (!book) {
        throw new Error();
      }

      console.log(book);
      // on envoie la réservation (client plus les chambres)
      const client = await Client.findByPk(verif.client_id);
      const rooms = await Promise.all(
        book.map(async (b) => {
          return await Client.findOne({
            where: { id: verif.client_id, lastname: verif.lastname },
            attributes: [],
            include: [
              {
                association: "room",
                where: { id: b.room_id },
              },
            ],
          });
        })
      );
      rooms.unshift(client);
      res.status(200).json(rooms);
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
  async book(req, res) {
    // cas si le visiteur etais déja client
    const data = req.body;
    const bookSchema = z.object({
      lastname: z.string().nonempty(),
      firstname: z.string().nonempty(),
      email: z.string().nonempty(),
      address: z.string().optional(),
      phoneNumber: z.number().positive().min(1).optional(),
      date: z.number().positive().min(1),
      room_id: z.number().positive().min(1),
    });

    const verif = bookSchema.parse(data);
    // on verifie si le client existe
    const client = await Client.findOne({ where: { email: verif.email } });

    if (!client) {
      // on créée la résa et le client
      await Client.create(verif);
      const id = await Client.max("id");

      const newBook = await Booking.create({
        date: verif.date,
        room_id: verif.room_id,
        client_id: id,
      });
      res.json(newBook);
    } else {
      // on créée la résa
      const newBook = await Booking.create({
        date: verif.date,
        room_id: verif.room_id,
        client_id: client.id,
      });
      res.json(newBook);
    }
  },
};
export default clientController;
