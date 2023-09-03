import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!!!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })