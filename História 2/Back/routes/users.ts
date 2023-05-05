const router = require("express").Router();

import pool from "../database/database.";

router.post("/", async (req: any, res: any) => {
  const { userName, userEmail, userPassword } = req.body;
  console.log(userName, userEmail, userPassword);
  const newUser = await pool.query(
    "INSERT INTO beats (user_name, user_email, user_password,) VALUES ($1,$2,$3) RETURNING *",
    [userName, userEmail, userPassword]
  );

  return res
    .status(200)
    .json({ message: "Usuário inserido com sucesso.", data: newUser.rows[0] });
});

module.exports = router;
