import { sequelize, Room, Client, Booking } from "../src/models/index.js";

async function seed() {
  try {
    // Synchroniser les modèles avec la base de données
    // await sequelize.sync({ force: true });
    // console.log("Base de données synchronisée");

    // Insérer 10 chambres
    const rooms = await Room.bulkCreate([
      { name: "Chambre Simple 101", price: 80 },
      { name: "Chambre Double 102", price: 120 },
      { name: "Suite Junior 103", price: 180 },
      { name: "Chambre Simple 201", price: 85 },
      { name: "Chambre Double 202", price: 125 },
      { name: "Suite Exécutive 203", price: 250 },
      { name: "Chambre Simple 301", price: 90 },
      { name: "Chambre Double 302", price: 130 },
      { name: "Suite Présidentielle 303", price: 350 },
      { name: "Chambre Familiale 401", price: 200 },
    ]);
    console.log("10 chambres ont été créées");

    // Insérer 3 clients
    const clients = await Client.bulkCreate([
      {
        lastname: "Dupont",
        firstname: "Jean",
        address: "15 rue de Paris, 75001 Paris",
        country: "France",
        phoneNumber: 61020304,
      },
      {
        lastname: "Martin",
        firstname: "Sophie",
        address: "25 avenue des Champs-Élysées, 75008 Paris",
        country: "France",
        phoneNumber: 67080910,
      },
      {
        lastname: "Dubois",
        firstname: "Pierre",
        address: "5 place de la République, 69001 Lyon",
        country: "France",
        phoneNumber: 62345678,
      },
    ]);
    console.log("3 clients ont été créés");

    // Créer des dates pour les réservations (timestamp Unix en secondes)
    const today = Math.floor(Date.now() / 1000);
    const tomorrow = today + 86400;
    const dayAfterTomorrow = today + 172800;

    // Insérer les réservations pour chaque client
    await Booking.bulkCreate([
      { date: today, client_id: 1, room_id: 1 },
      { date: tomorrow, client_id: 2, room_id: 5 },
      { date: dayAfterTomorrow, client_id: 3, room_id: 9 },
    ]);
    console.log("3 réservations ont été créées");

    console.log("Données insérées avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
  } finally {
    await sequelize.close();
  }
}

seed();
