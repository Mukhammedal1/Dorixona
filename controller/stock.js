const db = require("../config/db");

const getStock = (req, res) => {
  db.query(`select * from Stock`, (error, results) => {
    if (error) {
      console.log("Selecting Stock error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewStock = (req, res) => {
  const { pharmacy_id, medicine_id, quantity } = req.body;
  db.query(
    `insert into Stock(pharmacy_id, medicine_id, quantity)
    values (?,?,?)`,
    [pharmacy_id, medicine_id, quantity],
    (error, results) => {
      if (error) {
        console.log("Adding Stock error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Adding succesfully" });
    }
  );
};

const updateStockById = (req, res) => {
  const id = req.params.id;
  const { pharmacy_id, medicine_id, quantity } = req.body;
  db.query(
    `update Stock
    set pharmacy_id=?, medicine_id=?,quantity=?
    where id=?`,
    [pharmacy_id, medicine_id, quantity, id],
    (error, results) => {
      if (error) {
        console.log("Update Stock error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Updated succesfully" });
    }
  );
};

const deleteStockById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from Stock
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete Stock error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Deleted successfully" });
    }
  );
};

const findStockByAnyParams = (req, res) => {
  const { pharmacy_id, medicine_id } = req.body;
  let where = "true";

  if (pharmacy_id) {
    where += ` AND pharmacy_id = ${pharmacy_id}`;
  }
  if (medicine_id) {
    where += ` AND medicine_id = ${medicine_id}`;
  }

  if (where !== "true") {
    db.query(`SELECT * FROM Stock WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting stock:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Stock not found" });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ message: "Qidirish parametrini kiriting!" });
  }
};

module.exports = {
  getStock,
  addNewStock,
  updateStockById,
  deleteStockById,
  findStockByAnyParams,
};
