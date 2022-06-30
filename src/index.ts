import express from 'express';
import convert from './routes/convert';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use("/main", convert); 

app.get("/", (req, res) =>  {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
