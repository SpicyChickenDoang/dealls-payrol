
const { queries } = require("./model/db_model.js");
const { timestamp } = require("./helper/helper.js");

exports.logger = async (ip, url, body, uuid) => {
    const res = await queries(`INSERT INTO logs (ip_address, endpoint, body, request_id) VALUES ($1, $2, $3, $4)`, [ip, url, body, uuid]);
    return res.status ? true : false;
}

exports.reimburse = async (account_id, amount, reason, payroll_period_id) => {
    const res = await queries(`INSERT INTO reimburse (account_id, amount, reason, payroll_period_id) VALUES ($1, $2, $3, $4)`, [account_id, amount, reason, payroll_period_id]);
    return res.status ? true : false;
}

exports.payroll_period = async (start, end, created_by = 999) => {
    const res = await queries(`INSERT INTO payroll_period (start_period, end_period, created_by) VALUES ($1, $2, $3)`, [start, end, created_by]);
    return res.status ? true : false;
}

exports.find_payroll_period = async (time = null) => {
    return await queries(`SELECT * FROM payroll_period WHERE $1 BETWEEN start_period AND end_period AND status = 1 LIMIT 1`, [time.substring(0, 10)]);
}

exports.attendance = async (account_id, payroll_id, types) => {
    const res = await queries(`INSERT INTO attendance (account_id, payroll_period_id, types) VALUES ($1, $2, $3)`, [account_id, payroll_id, types]);
    return res.status ? true : false;
}

exports.overtime = async (account_id, start_time, end_time, count, payroll_period_id) => {
    const res = await queries(`INSERT INTO overtime (created_by, start_ot, end_ot, count_ot, status, updated_by, payroll_period_id ) VALUES ($1, $2, $3, $4, $5, $1, $6)`, [account_id, start_time, end_time, count, 0, payroll_period_id]);
    return res.status ? true : false;
}

exports.finalized_overtime = async (account_id, overtime_id) => {
    const res = await queries(`UPDATE overtime SET status = $1 WHERE created_by = $2 AND id = $3`, [1, account_id, overtime_id]);
    return res.status ? true : false;
}

exports.find_overtime = async (account_id, overtime_id) => {
    const overtime =  await queries(`SELECT * FROM overtime WHERE created_by = $1 AND id = $2 AND status = $3`, [account_id, overtime_id, 0]);
    return overtime.data.length > 0;
}

exports.find_payroll_period_id = async (payroll_period_id) => {
    return await queries(`SELECT * FROM payroll_period WHERE $1 LIMIT 1`, [payroll_period_id]);
}

exports.finalized_payroll_period = async (payroll_period_id) => {
    const res = await queries(`UPDATE payroll_period SET status = $1 WHERE id = $2`, [0, payroll_period_id]);
    return res.status ? true : false;
}