const db = require("../config/db");

const getMedicine_Type = (req, res) => {
  db.query(`select * from MedicineType`, (error, results) => {
    if (error) {
      console.log("Selecting MedicineType error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewMedicine_Type = (req, res) => {
  const { name } = req.body;
  db.query(
    `insert into MedicineType(name)
    values (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log("Adding MedicineType error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Adding succesfully" });
    }
  );
};

const updateMedicine_TypeById = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  db.query(
    `update MedicineType
    set name=?
    where id=?`,
    [name, id],
    (error, results) => {
      if (error) {
        console.log("Update MedicineType error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Updated succesfully" });
    }
  );
};

const deleteMedicine_TypeById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from MedicineType
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete MedicineType error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Deleted successfully" });
    }
  );
};

const findMedicineTypeByAnyParams = (req, res) => {
  const { name } = req.body;
  let where = "true";

  if (name) {
    where += ` and name LIKE '%${name}%'`;
  }

  if (where !== "true") {
    db.query(`select * from MedicineType WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting medicine types:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "MedicineType not found" });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ message: "Qidirish parametrini kiritng" });
  }
};

module.exports = {
  getMedicine_Type,
  addNewMedicine_Type,
  updateMedicine_TypeById,
  deleteMedicine_TypeById,
  findMedicineTypeByAnyParams,
};
