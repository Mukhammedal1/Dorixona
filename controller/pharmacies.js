const db = require("../config/db");

const getPharmacies = (req, res) => {
  db.query(`select * from Pharmacies`, (error, results) => {
    if (error) {
      console.log("Selecting Pharmacies error");
      return res.status(500).json({
        msg: "Interval Server error",
      });
    }
    res.json(results);
  });
};

const addNewPharmacies = (req, res) => {
  const { name, address, location, phone, email, region_id, district_id } =
    req.body;
  db.query(
    `insert into Pharmacies(name,address,location,phone,email,region_id,district_id)
    values (?,?,?,?,?,?,?)`,
    [name, address, location, phone, email, region_id, district_id],
    (error, results) => {
      if (error) {
        console.log("Adding Pharmacies error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "adding succesfully" });
    }
  );
};

const updatePharmaciesById = (req, res) => {
  const id = req.params.id;
  const { name, address, location, phone, email, region_id, district_id } =
    req.body;
  db.query(
    `update Pharmacies
    set name=?,address=?,location=?, phone=?, email=?, region_id=?, district_id=?
    where id=?`,
    [name, address, location, phone, email, region_id, district_id, id],
    (error, results) => {
      if (error) {
        console.log("Update Pharmacies error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "updated succesfully" });
    }
  );
};

const deletedPharmaciesById = (req, res) => {
  const id = req.params.id;
  db.query(
    `delete from Pharmacies
    where id=?`,
    [id],
    (error, results) => {
      if (error) {
        console.log("delete Pharmacies error");
        return res.status(500).json({
          msg: "Interval Server error",
        });
      }
      res.json({ msg: "deleted succesfully" });
    }
  );
};

const findPharmacyByAnyParams = (req, res) => {
  const { name, address, region_id, district_id } = req.body;
  let where = "true";

  if (name) {
    where += ` AND name LIKE '%${name}%'`;
  }
  if (address) {
    where += ` AND address LIKE '%${address}%'`;
  }
  if (region_id) {
    where += ` AND region_id = ${region_id}`;
  }
  if (district_id) {
    where += ` AND district_id = ${district_id}`;
  }

  if (where !== "true") {
    db.query(`SELECT * FROM Pharmacies WHERE ${where}`, (error, results) => {
      if (error) {
        console.error("Error selecting pharmacies:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Pharmacy not found" });
      }
      res.json(results);
    });
  } else {
    return res.status(400).json({ message: "Qidirish parametrini kiriting!" });
  }
};

module.exports = {
  getPharmacies,
  addNewPharmacies,
  updatePharmaciesById,
  deletedPharmaciesById,
  findPharmacyByAnyParams,
};
