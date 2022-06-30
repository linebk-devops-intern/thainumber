import express from "express";
import { convertToThaiNum, convertToBaht, convertToRead } from "../lib/thainum";

const router = express.Router();

router.post("/thainumber", (req, res) => {
  const input = req.body.input;

  if (input === undefined) {
    res.status(400).send("Error");
    return;
  }

  const thaiNum = convertToThaiNum(input);
  const text = convertToRead(input);
  const currencyText = convertToBaht(input);

  res.send({ thaiNum, text, currencyText });
});

export default router;