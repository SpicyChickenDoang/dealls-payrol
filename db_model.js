const { Pool } = require("pg");
const { poolConfig } = require("./config.js");

const client = new Pool(poolConfig)

exports._insert = async (query, values = []) => {
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

exports._find = async (query, values = []) => {
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

// SELECT * 
// FROM payroll_period 
// WHERE '2026-09-26' BETWEEN start_period AND end_period AND status = 1;