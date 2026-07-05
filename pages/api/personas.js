// pages/api/personas.js
import personasData from "../../data/personas.json";

export default function handler(req, res) {
  res.status(200).json(personasData);
}
