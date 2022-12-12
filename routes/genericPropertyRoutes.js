const express = require("express");
const router = express.Router();
const {
  addGenericProperty,
  fetchGenericProperties,
  findGenericProperties,
  updateGenericProperty,
  deleteGenericProperty,
} = require("../controllers/genericPropertyController");

router.get("/", async (req, res) => {
  res.send(await fetchGenericProperties());
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await addGenericProperty(JSON.stringify(req.body));
  res.send(response);
});

router.get("/search", async (req, res) => {
  const dataToSend = await findGenericProperties(req.query.q);
  res.send(dataToSend).end();
});

router.put("/update", async (req, res) => {
  const dataResponse = await updateGenericProperty(req.query.q, req.body);
  console.log(req.body);
  res.send(dataResponse).end();
});

router.delete("/delete", async (req, res) => {
  const deletedResponse = await deleteGenericProperty(req.query.q);
  res.send(deletedResponse).end();
});

module.exports = router;
