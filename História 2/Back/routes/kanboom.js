const router = require("express").Router();

const pool = require("../database/database");

router.post("/users", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  console.log(user_name, user_email, user_password);
  const newUser = await pool.query(
    "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
    [user_name, user_email, user_password]
  );

  return res
    .status(200)
    .json({ message: "Usuário inserido com sucesso.", data: newUser.rows[0] });
});

module.exports = router;
