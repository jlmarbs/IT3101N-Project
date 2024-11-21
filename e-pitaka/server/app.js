const express = require("express");
const app = express();
const port = 3000;
const sql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(require("cors")());
const {
  findUserById,
  updateUserBalance,
  saveTransaction,
  saveAdminTransaction,
  checkIfSummaryExists,
  updateSummary,
  insertNewSummary,
} = require("./mysqlUtility");

const saltRounds = 10;
const secretKey = "31415";

const conn = sql.createConnection({
  host: "localhost",
  password: "",
  user: "root",
  database: "epitaka-db",
});

const generateToken = (username) => {
  return jwt.sign({ username }, secretKey, { expiresIn: "1h" });
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const authToken = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token Missing" });
  }

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Token is Invalid" });
    }
    req.username = decoded.username;
    next();
  });
};

const checkUsername = (username) => {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT * FROM `account` WHERE `Username` = ?",
      [username],
      (err, data) => {
        if (err) {
          console.error("Error Checking Username:", err);
          reject(err);
          return;
        }
        resolve(data.length > 0);
      }
    );
  });
};

app.post("/sign-up", async (req, res) => {
  // const [firstName, lastName, username, password] = req.body
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const userExists = await checkUsername(username);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (userExists) {
    return res.json({ error: "User already Exists" });
  }
  conn.query(
    "INSERT INTO `account` (`Username`, `Password`, `FName`, `LName`, `Email`) VALUES (?, ?, ?, ?, ?)",
    [username, hashedPassword, firstName, lastName, email],
    (err, data) => {
      if (err) {
        console.error("Error inserting into 'user' table:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert into 'user' table" });
      }
      const token = generateToken(username);
      console.log("Token:", token);
      res.json({ token });
      console.log("Inserted Successfully");
    }
  );
  console.log(req.body);
});

app.get("/check-username/:username", (req, res) => {
  const username = req.params.username;
  conn.query(
    "SELECT * FROM `account` WHERE `Username` = ?",
    [username],
    (err, data) => {
      if (err) {
        console.error("Failed to Check for Username:", err);
        return;
      }
      const usernameExists = data.length > 0;
      const userInfo = usernameExists
        ? {
          id: data[0].Account_ID,
          username: data[0].Username,
          password: data[0].Password,
          balance: data[0].Balance,
          firstName: data[0].FName,
          lastName: data[0].LName,
          user_type: data[0].User_type
        }
        : null;

      console.log(userInfo);
      res.json({ usernameExists, userInfo });
    }
  );
});

app.get("/check-email/:email", (req, res) => {
  const email = req.params.email;
  conn.query(
    "SELECT * FROM `account` WHERE `Email` = ?",
    [email],
    (err, data) => {
      if (err) {
        console.error("Failed to Check for Email:", err);
        return res.status(500).json({ error: "Failed to check for email." });
      }
      const emailExists = data.length > 0;
      res.json({ emailExists });
    }
  );
});

//login endpoint
app.post("/check-username/:username", async (req, res) => {
  const username = req.params.username;
  const passwordInput = req.body.password;

  conn.query(
    "SELECT * FROM `account` WHERE `Username` = ?",
    [username],
    async (err, data) => {
      if (err) {
        console.error("Failed to Check for Username:", err);
        return res.status(500).json({ error: "Failed to check for username." });
      }

      if (data.length > 0) {
        const storedHashedPassword = data[0].Password;
        const passwordMatch = await bcrypt.compare(
          passwordInput,
          storedHashedPassword
        );
        const usernameExists = true;
        const userInfo = usernameExists
          ? { username: data[0].Username, password: data[0].Password, user_type: data[0].User_type }
          : null;

        if (passwordMatch) {
          console.log("Password is correct");
          const token = generateToken(username);
          console.log("JWT Token:", token);
          res.json({ usernameExists, userInfo, token }); //another parameter here ,token
        } else {
          console.log("Incorrect password");
          res.json({
            usernameExists: false,
            userInfo: null,
            error: "Incorrect password",
          });
        }
      } else {
        console.log("User not found");
        res.json({
          usernameExists: false,
          userInfo: null,
          error: "User not found",
        });
      }
    }
  );
});

app.post(
  "/logout",
  /*verifyToken,*/(req, res) => {
    res.json({ success: true, message: "Logout is Successful" });
  }
);

app.get(
  "/user-balance/:username",
  /*verifyToken,*/(req, res) => {
    const username = req.params.username;
    conn.query(
      "SELECT `Balance` FROM `account` WHERE `Username` = ?",
      [username],
      (err, data) => {
        if (err) {
          console.error("Failed to retrieve User Balance:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve User Balance." });
        }
        const userBalance = data.length > 0 ? data[0].Balance : null;
        res.json({ userBalance });
      }
    );
  }
);

app.post("/api/transfer", async (req, res) => {
  const { senderID, receiverID, amount, note } = req.body;
  const currentDate = new Date();
  const currentDay = currentDate.getDay()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  try {
    const sender = await findUserById(senderID);
    const receiver = await findUserById(receiverID);

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid sender or receiver ID" });
    }

    if (sender.Balance < amount || sender.balance <= 0) {
      return res.json({ success: false, error: "Insufficient Balance" });
    }

    await updateUserBalance(
      senderID,
      parseFloat(sender.balance) - parseFloat(amount)
    );
    await updateUserBalance(
      receiverID,
      parseFloat(receiver.balance) + parseFloat(amount)
    );

    await saveTransaction(senderID, receiverID, amount, note);

    const entryExistsSender = await checkIfSummaryExists(currentYear, currentMonth, senderID)
    const entryExistsReceiver = await checkIfSummaryExists(currentYear, currentMonth, receiverID);

    if (entryExistsSender) {
      await updateSummary(currentYear, currentMonth, parseFloat(sender.balance) - parseFloat(amount), senderID)
    } else {
      await insertNewSummary(currentYear, currentMonth, currentDay, parseFloat(sender.balance), parseFloat(sender.balance) - parseFloat(amount), senderID)
    }

    if (entryExistsReceiver) {
      await updateSummary(currentYear, currentMonth, parseFloat(receiver.balance) + parseFloat(amount), receiverID)
    } else {
      await insertNewSummary(currentYear, currentMonth, currentDay, parseFloat(receiver.balance), parseFloat(receiver.balance) + parseFloat(amount), receiverID)
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error Processing Money Transaction:", err);
    res.send({ error: "Internal Server Error" });
  }
});

app.post("/api/admin-transfer", async (req, res) => {
  const { amount, transaction_type, account_id } = req.body;
  const currentDate = new Date();
  const currentDay = currentDate.getDay()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  try {
    const account = await findUserById(account_id);

    if (!account) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid account ID" });
    }

    if (transaction_type === "deposit") {
      await updateUserBalance(
        account_id,
        parseFloat(account.balance) + parseFloat(amount)
      );
    } else if (transaction_type === "withdraw") {
      if (account.balance < amount) {
        return res.json({ success: false, error: "Insufficient Balance" });
      } else {
        await updateUserBalance(
          account_id,
          parseFloat(account.balance) - parseFloat(amount)
        );
      }
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid transaction type" });
    }

    await saveAdminTransaction(amount, transaction_type, account_id);

    const entryExists = await checkIfSummaryExists(currentYear, currentMonth, account_id)

    if (transaction_type === "deposit") {
      if (entryExists) {
        await updateSummary(currentYear, currentMonth, parseFloat(account.balance) + parseFloat(amount), account_id)
      } else {
        await insertNewSummary(currentYear, currentMonth, currentDay, parseFloat(account.balance), parseFloat(account.balance) + parseFloat(amount), account_id)
      }
    } else {
      if (entryExists) {
        await updateSummary(currentYear, currentMonth, parseFloat(account.balance) - parseFloat(amount), account_id)
      } else {
        await insertNewSummary(currentYear, currentMonth, currentDay, parseFloat(account.balance), parseFloat(account.balance) - parseFloat(amount), account_id)
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error Processing Money Transaction:", err);
    res.send({ error: "Internal Server Error" });
  }
});

app.get("/user-transactions/:username", (req, res) => {
  const username = req.params.username;
  conn.query(
    `WITH CombinedTransactions AS(
      SELECT
          UT.uTransaction_ID AS Transaction_ID,
          NULL AS Transaction_type,
          UT.Sender_ID AS Source_ID,
          S.Username AS Source_username,
          S.FName AS Source_fname,
          S.LName AS Source_lname,
          UT.Receiver_ID AS Destination_ID,
          R.Username AS Destination_username,
          R.FName AS Destination_fname,
          R.LName AS Destination_lname,
          UT.Note AS Message,
          UT.Amount,
          UT.Date
      FROM user_transaction UT
      LEFT JOIN account S ON UT.Sender_ID = S.Account_ID
      LEFT JOIN account R ON UT.Receiver_ID = R.Account_ID
  
      UNION ALL
  
      SELECT 
          ADT.aTransaction_ID AS Transaction_ID,
          ADT.aTransaction_type AS Transaction_type, 
          ADT.Account_ID AS Source_ID,
          A.Username AS Source_username,
          A.FName AS Source_fname,
          A.LName AS Source_lname,
          NULL AS Destination_ID,
          NULL AS Destination_username,
          NULL AS Destination_fname,
          NULL AS Destination_lname,
          NULL AS Message,
          ADT.Amount,
          ADT.Date
      FROM admin_transaction ADT JOIN account A ON ADT.Account_ID = A.Account_ID 
    )
  
    SELECT * FROM CombinedTransactions CT WHERE CT.Source_username = ? OR CT.Destination_username = ? ORDER BY CT.Date DESC`,
    [username, username],
    (err, data) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Failed to retrieve User Transactions." });
      }
      res.json(data);
    }
  );
});

//retrieves all regular users
app.get("/user-list", (req, res) => {
  conn.query(
    `SELECT * FROM account WHERE User_type = 'regular'`,
    (err, data) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve User List." });
      }
      res.json(data);
    }
  );
});

app.get("/get-summaries/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    conn.query(
      "SELECT * FROM summary WHERE Account_ID = ?",
      [userId],
      (err, data) => {
        if (err) {
          console.error("Failed to fetch summary");
          return res.status(500).json({ error: "Failed to fetch summary" })
        }
        res.json({data})
      }
    )
  } catch (err) {
    console.error("Error fetching summaries:", err);
    return res.status(500).json({ error: "Internal server error" })
  }
})

app.patch("/edit-user/:username", async (req, res) => {
  const username = req.params.username;
  const { firstName, lastName } = req.body;

  try {
    const updateFields = [];
    const updateValues = [];

    if (firstName) {
      updateFields.push("`FName` = ?");
      updateValues.push(firstName);
    }

    if (lastName) {
      updateFields.push("`LName` = ?");
      updateValues.push(lastName);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const updateQuery = `UPDATE \`account\` SET ${updateFields.join(
      ", "
    )} WHERE \`Username\`=?`;
    const updateParams = [...updateValues, username];

    await conn.promise().execute(updateQuery, updateParams);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

app.put("/change-password/:username", async (req, res) => {
  const username = req.params.username;
  const newPassword = req.body.newPassword
  const currentPassword = req.body.currentPassword

  conn.query(
    "SELECT `Password` FROM `account` WHERE `Username` = ?",
    [username],
    async (err, data) => {
      if (err) {
        console.error("Failed to retrieve current password:", err)
        return res.status(500).json({ error: "Failed to change password." })
      }

      if (data.length === 0) {
        return res.status(404).json({ error: "User not found." })
      }

      const storedPassword = data[0].Password
      const passwordMatch = await bcrypt.compare(currentPassword, storedPassword)

      if (!passwordMatch) {
        return res.status(401).json({ error: "Current password is incorrect." })
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
      conn.query(
        "UPDATE `account` SET `Password` = ? WHERE `Username` = ?",
        [hashedPassword, username],
        (updateErr, updateData) => {
          if (updateErr) {
            console.error("Failed to change password:", updateErr)
            return res.status(500).json({ error: "Failed to change password." })
          }
          res.json({ success: true })
        }
      )
    }
  )
})

app.delete("/delete-user/:username", async (req, res) => {
  
  try {
    const { username } = req.params;
    const deleteQuery = "DELETE FROM `account` WHERE `Username`=?";
    await conn.promise().query(deleteQuery, [username]);

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ success: false, error: "Failed to delete user account" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
