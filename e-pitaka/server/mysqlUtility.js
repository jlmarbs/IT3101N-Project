const sql = require('mysql2')

const conn = sql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'epitaka-db'
})


// For the Send Functionality
async function findUserById(userId) {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT * FROM account WHERE Account_ID = ?",
            [userId],
            (err, data) => {
                const userInfo = {
                    id: data[0].Account_ID,
                    username: data[0].Username,
                    password: data[0].Password,
                    balance: data[0].Balance,
                    firstName: data[0].FName,
                    lastName: data[0].LName
                }
                resolve(userInfo);
            }
        )
    })
}

async function updateUserBalance(userId, newBalance) {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE account SET Balance = ? WHERE Account_ID = ?",
            [newBalance, userId],
            (err, data) => {
                if (err) {
                    console.error("Failed to Update User Balance")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

async function saveTransaction(senderID, receiverID, amount, note) {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO user_transaction (Sender_ID, Receiver_ID, Amount, Date, Note) VALUES (?, ?, ?, NOW(), ?)',
            [senderID, receiverID, amount, note],
            (err, data) => {
                if (err) {
                    console.error("Failed to Insert into User Transaction")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

async function saveAdminTransaction(amount, transaction_type, account_id) {
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO admin_transaction (Amount, Date, aTransaction_type, Account_ID) VALUES (?, NOW(), ?, ?)',
            [amount, transaction_type, account_id],
            (err, data) => {
                if (err) {
                    console.error("Failed to Insert into Admin Transaction")
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

// For the Charts
async function checkIfSummaryExists(year, month, account_id) {
    const sql = `
        SELECT COUNT(*) AS count
        FROM summary
        WHERE YEAR(Month) = ${year} AND MONTH(Month) = ${month} AND Account_ID = ${account_id}
    `;

    const [result] = await conn.promise().query(sql);
    return result[0].count > 0;
}

async function updateSummary(year, month, endBalance, account_id) {
    const sql = `
        UPDATE summary
        SET End_Value = ${endBalance}
        WHERE YEAR(Month) = ${year} AND MONTH(Month) = ${month} AND Account_ID = ${account_id}
    `;

    await conn.promise().query(sql);
}

async function insertNewSummary(year, month, day, startBalance, endBalance, account_id) {
    const sql = `
        INSERT INTO summary (Month, Init_Value, End_Value, Account_ID)
        VALUES ('${year}-${month}-${day}', ${startBalance}, ${endBalance}, ${account_id})
    `;

    await conn.promise().query(sql);
}

module.exports = {
    findUserById,
    updateUserBalance,
    saveTransaction,
    saveAdminTransaction,
    checkIfSummaryExists,
    updateSummary,
    insertNewSummary,
};