const { Pool } = require("pg");
const { poolConfig } = require("./config.js");

const client = new Pool(poolConfig)

exports.test = async () => {
    const query = {
        text: `select * from testing where id = $1`,
        values: [2]
    }

    try {
        const res = await client.query(query);
        console.log('Query result:', res.rows);
        return res.rows;
    } catch (err) {
        console.error('Query error:', err);
        throw err;
    }
}

exports.logger = async (ip, url, body, uuid) => {
    const query = {
        text: `INSERT INTO logs (ip_address, endpoint, body, request_id) VALUES ($1, $2, $3, $4)`,
        values: [ip, url, body, uuid]
    }

    try {
        const res = await client.query(query);
        console.log('Query result:', res.rows);
        return res.rows;
    } catch (err) {
        console.error('Query error:', err);
        throw err;
    }
}

exports.reimburse = async (account_id, amount, reason) => {
    const query = {
        text: `INSERT INTO reimburse (account_id, amount, reason) VALUES ($1, $2, $3)`,
        values: [account_id, amount, reason]
    }

    try {
        const res = await client.query(query);
        console.log('Query result:', res.rows);
        return true
    } catch (err) {
        console.error('Query error:', err);
        return false
    }
}