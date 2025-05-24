import { Guest } from "./entities/guest.entity";
import { Hotel } from "./entities/hotel.entity";
import { Reservation } from "./entities/reservation.entity";
import { Room, RoomType } from "./entities/room.entity";
import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: 5432,
    username: "hotel",
    password: "hotel",
    database: "hotel",
    entities: [
      Room,
      RoomType,
      Hotel,
      Guest,
      Reservation,
    ],
    synchronize: false,
    migrations: ["*-database-sync.ts"],
    logging: true
})
