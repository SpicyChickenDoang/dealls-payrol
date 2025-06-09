const { Pool } = require("pg");
const { poolConfig } = require("../config.js");

const client = new Pool(poolConfig)

exports.queries = async (query, values = []) => {
    const query_obj = {
        text: query,
        values: values
    }

    let data, status;

    try {
        const res = await client.query(query_obj);
        console.log('Query result:', res.rows);
        data = res.rows;
        status = true;

    } catch (err) {
        console.error('Query error:', err);
        data = err;
        status = false;
    }

    return {
            data: data,
            status: status
        };
}