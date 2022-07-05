import express from "express";
import convert from "./routes/convert";
import dotenv from "dotenv";
import { AddressInfo } from "net";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(express.json());
app.use("/main", convert);

app.get("/", (req, res) => {
  res.send("Hello World");
});

let listener = app.listen(PORT, () => {
  const addr = listener.address() as AddressInfo;
  console.log(`server listening on port` , addr.port);
  console.log(addr.port);
});