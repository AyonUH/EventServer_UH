const express = require("express");
const router = express.Router();

const {
  addEventData,
  fetchEventsData,
  findEventsData,
  updateEventData,
  deleteEventData,
} = require("./../controllers/eventDataController");

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await addEventData(JSON.stringify(req.body));
  res.send(response);
});

router.get("/", async (req, res) => {
  res.send(await fetchEventsData());
});

router.get("/search", async (req, res) => {
  const dataToSend = await findEventsData(req.query.q);
  res.send(dataToSend).end();
});

router.put("/update", async (req, res) => {
  const dataResponse = await updateEventData(req.query.q, req.body);
  console.log(req.body);
  res.send(dataResponse).end();
});

router.delete("/delete", async (req, res) => {
  const deletedResponse = await deleteEventData(req.query.q);
  res.send(deletedResponse).end();
});

module.exports = router;
