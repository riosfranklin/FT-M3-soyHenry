const express = require("express");
const app = express();
const { sumArray } = require("./extra");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.status(200).send({
    message: "hola",
  });
});
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "test",
  });
});

app.post("/sum", (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});
app.post("/product", (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post("/sumArray", (res, req) => {
  const { array, num } = req.body;
  res.status(200).send({ result: sumArray(array, num) });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
