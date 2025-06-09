
const { _insert } = require("./db_model.js");
const { timestamp } = require("./helper.js");

exports.logger = async (ip, url, body, uuid) => {
    const res = await _insert(`INSERT INTO logs (ip_address, endpoint, body, request_id) VALUES ($1, $2, $3, $4)`, [ip, url, body, uuid]);
    return res.status ? true : false;
}

exports.reimburse = async (account_id, amount, reason) => {
    const res = await _insert(`INSERT INTO reimburse (account_id, amount, reason) VALUES ($1, $2, $3)`, [account_id, amount, reason]);
    return res.status ? true : false;
}

exports.payroll_period = async (start, end, created_by = 999) => {
    const res = await _insert(`INSERT INTO payroll_period (start_period, end_period, created_by) VALUES ($1, $2, $3)`, [start, end, created_by]);
    return res.status ? true : false;
}

exports.find_payroll_period = async (time = null) => {
    return await _insert(`SELECT * FROM payroll_period WHERE $1 BETWEEN start_period AND end_period AND status = 1 LIMIT 1`, [time.substring(0, 10)]);
}

exports.attendance = async (account_id, payroll_id, types) => {
    const res = await _insert(`INSERT INTO attendance (account_id, payroll_period_id, types) VALUES ($1, $2, $3)`, [account_id, payroll_id, types]);
    return res.status ? true : false;
}

exports.overtime = async (account_id, start_time, end_time, count) => {
    const res = await _insert(`INSERT INTO overtime (account_id, start_ot, end_ot, count_ot, status ) VALUES ($1, $2, $3, $4, $5)`, [account_id, start_time, end_time, count, 'proposed']);
    return res.status ? true : false;
}