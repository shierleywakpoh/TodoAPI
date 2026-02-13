const db = require("../config/db");
let create = (req, res) => {
  const { title, description } = req.body;
  if (title === undefined || title.trim().length === 0)
    return res.status(400).json({ message: "title is required" });
  if (description === undefined || description.trim().length === 0)
    return res.status(400).json({ message: "description is required" });

  let sql = "INSERT INTO item (title,description) VALUES (?,?)";
  db.query(sql, [title, description], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error" });
    sql = " SELECT * FROM item WHERE title = ? AND description = ?";
    db.query(sql, [title, description], (err, result) => {
      if (err) return res.status(500).json({ message: "Database Error" });
      return res.status(201).json(result);
    });
  });
};

let update = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if (title === undefined || title.trim().length === 0)
    return res.status(400).json({ message: "title is required" });
  if (description === undefined || description.trim().length === 0)
    return res.status(400).json({ message: "description is required" });

  let sql = "UPDATE item  SET title = ? , description = ? WHERE id = ?";
  db.query(sql, [title, description, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database cant update" });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    let sqln = "SELECT * FROM item WHERE id = ?";
    db.query(sqln, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Database cant show" });
      return res.status(201).json({ result });
    });
  });
};

let dlt = (req, res) => {
  const id = req.params.id;
  let sql = "DELETE FROM item WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database cant delete" });
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    return res.json({ message: "succesfully" });
  });
};

let pfs = (req, res) => {
  let { limit, page, column, value, sort } = req.query;
  if (limit && page) {
    if (limit.trim().length === 0)
      return res.status(400).json({ message: "limit is required" });
    if (page.trim().length === 0)
      return res.status(400).json({ message: "page is required" });

    limit = Number(limit);
    page = Number(page);
    if (isNaN(limit) || isNaN(page))
      return res.status(400).json({ message: "limit and page must be number" });
    const page1 = (page - 1) * limit;
    const sql = "SELECT * FROM item LIMIT ? OFFSET ?";
    db.query(sql, [limit, page1], (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Database Error saat mencari data" });
      return res
        .status(201)
        .json({ data: result, page: page, limit: limit, total: result.length });
    });
  } else if (column && value) {
    if (column.trim().length === 0)
      return res.status(400).json({ message: "column is required" });
    if (value.trim().length === 0)
      return res.status(400).json({ message: "value is required" });

    if (column == "id") {
      value = Number(value);
      if (isNaN(value))
        return res.status(400).json({ message: "id must be number" });
    }

    value = `%${value}%`;
    const sql = `SELECT * FROM item WHERE ${column} LIKE ? `;
    db.query(sql, [value], (err, result) => {
      if (err) return res.status(500).json({ message: "Database Error" });
      return res.status(201).json({ result });
    });
  } else if (column && sort) {
    if (column.trim().length === 0)
      return res.status(400).json({ message: "column is required" });
    if (sort.trim().length === 0)
      return res.status(400).json({ message: "sort is required" });
    const sql = `SELECT * FROM item ORDER BY ${column} ${sort.toUpperCase()}`;
    db.query(sql, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Database Error saat mengurutkan data" });

      return res.status(201).json({ result });
    });
  } else {
    return res.status(400).json({
      message: "you must input values of limit,page,column,value,sort",
    });
  }
};

module.exports = { create, update, dlt, pfs };
