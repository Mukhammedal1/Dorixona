const db = require("../config/db");

const getRegion = (req, res) => {
  db.query(`select * from Region`, (error, results) => {
    if (error) {
      console.log("Selecting Region error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewRegion = (req, res) => {
  const { name } = req.body;
  db.query(
    `insert into Region(name)
    values (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log("Adding Region error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Adding succesfully" });
    }
  );
};

const updateRegionById = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  db.query(
    `update Region
    set name=?
    where id=?`,
    [name, id],
    (error, results) => {
      if (error) {
        console.log("Update Region error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Updated succesfully" });
    }
  );
};

const deleteRegionById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from Region
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete Region error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Deleted successfully" });
    }
  );
};

const findRegionByAnyParams = (req, res) => {
  const { name } = req.body;
  let where = "true";

  if (name) {
    where += ` AND name LIKE '%${name}%'`;
  }

  if (where !== "true") {
    db.query(`SELECT * FROM Region WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting regions:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Region not found" });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ message: "Qidirish parametrini kiriting!" });
  }
};

module.exports = {
  getRegion,
  addNewRegion,
  updateRegionById,
  deleteRegionById,
  findRegionByAnyParams,
};
