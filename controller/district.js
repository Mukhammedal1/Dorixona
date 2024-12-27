const db = require("../config/db");

const getDistrict = (req, res) => {
  db.query(`select * from District`, (error, results) => {
    if (error) {
      console.log("Selecting District error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewDistrict = (req, res) => {
  const { name, region_id } = req.body;
  db.query(
    `insert into District(name, region_id)
    values (?,?)`,
    [name, region_id],
    (error, results) => {
      if (error) {
        console.log("Adding District error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Adding succesfully" });
    }
  );
};

const updateDistrictById = (req, res) => {
  const id = req.params.id;
  const { name, region_id } = req.body;
  db.query(
    `update District
    set name=?, region_id=?
    where id=?`,
    [name, region_id, id],
    (error, results) => {
      if (error) {
        console.log("Update District error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Updated succesfully" });
    }
  );
};

const deleteDistrictById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from District
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete District error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "Deleted successfully" });
    }
  );
};

const findDistrictByAnyParams = (req, res) => {
  const { name, region_id } = req.body;
  let where = "true";

  if (name) {
    where += ` and name LIKE '%${name}%'`;
  }
  if (region_id) {
    where += ` and region_id = ${region_id}`;
  }

  if (where !== "true") {
    db.query(`SELECT * FROM District WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting districts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "District not found" });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ message: "Qidirish parametrini kiritng" });
  }
};

module.exports = {
  getDistrict,
  addNewDistrict,
  updateDistrictById,
  deleteDistrictById,
  findDistrictByAnyParams,
};
