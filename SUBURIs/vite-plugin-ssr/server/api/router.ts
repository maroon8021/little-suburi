import express from "express";

const router = express.Router();

router.get("/items", async (req, res) => {
  res.json([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ]);
});

export { router };
