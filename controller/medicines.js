const db = require("../config/db");

const getMedicines = (req, res) => {
  db.query(`select * from Medicines`, (error, results) => {
    if (error) {
      console.log("Selecting Medicines error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewMedicine = (req, res) => {
  const { name, manufacturer, medicine_type_id, price, expiry_date, info } =
    req.body;
  db.query(
    `insert into Medicines(name, manufacturer, medicine_type_id, price, expiry_date, info)
    values (?,?,?,?,?,?)`,
    [name, manufacturer, medicine_type_id, price, expiry_date, info],
    (error, results) => {
      if (error) {
        console.log("Adding Medicines error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Adding succesfully" });
    }
  );
};

const updateMedicinesById = (req, res) => {
  const id = req.params.id;
  const { name, manufacturer, medicine_type_id, price, expiry_date, info } =
    req.body;
  db.query(
    `update Medicines
    set name=?, manufacturer=?,medicine_type_id=?, price=?, expiry_date=?, info=?
    where id=?`,
    [name, manufacturer, medicine_type_id, price, expiry_date, info, id],
    (error, results) => {
      if (error) {
        console.log("Update Medicines error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Updated succesfully" });
    }
  );
};

const deletedMedicinesById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from Medicines
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete Medicines error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Deleted successfully" });
    }
  );
};

const getExpiry_dateMedicines = (req, res) => {
  const { pharmacie_name, expiry_date } = req.body;
  db.query(
    `SELECT p.name, m.name, m.expiry_date FROM Stock s
    JOIN Pharmacies p ON s.pharmacy_id = p.id
    JOIN Medicines m ON s.medicine_id = m.id
    WHERE p.name = ? AND m.expiry_date < ?`,
    [pharmacie_name, expiry_date],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json(results);
    }
  );
};

const getCountMedicines = (req, res) => {
  const { pharmacie_name, medicine_name } = req.body;
  db.query(
    `SELECT p.name, m.name, s.quantity FROM Stock s
    JOIN Pharmacies p ON s.pharmacy_id = p.id
    JOIN Medicines m ON s.medicine_id = m.id
    WHERE p.name = ? AND m.name = ?`,
    [pharmacie_name, medicine_name],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json(results);
    }
  );
};

const getMedicinesByName = (req, res) => {
  const { medicine_name } = req.body;
  db.query(
    `SELECT p.name, p.address, m.name, m.price, s.quantity FROM Stock s
    JOIN Pharmacies p ON s.pharmacy_id = p.id
    JOIN Medicines m ON s.medicine_id = m.id
    WHERE m.name = ?
    ORDER BY m.price ASC`,
    [medicine_name],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json(results);
    }
  );
};

const findMedicineByAnyParams = (req, res) => {
  const { name, manufacturer, start_price, finish_price } = req.body;
  let where = "true";
  if (name) {
    where += ` and name like '%${name}%'`;
  }
  if (manufacturer) {
    where += ` and manufacturer like '%${manufacturer}%'`;
  }
  if (start_price && finish_price) {
    where += ` and price BETWEEN ${start_price} and ${finish_price}`;
  } else if (start_price) {
    where += ` and price = ${start_price}`;
  }

  if (where !== "true") {
    db.query(`SELECT * FROM Medicines WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting medicines:", error);
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      if (results.length === 0) {
        return res.status(404).json({
          message: "Medicine not found",
        });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({
      message: "Qidirish parametrini kiriting",
    });
  }
};

module.exports = {
  getMedicines,
  addNewMedicine,
  updateMedicinesById,
  deletedMedicinesById,
  getExpiry_dateMedicines,
  getCountMedicines,
  getMedicinesByName,
  findMedicineByAnyParams,
};
