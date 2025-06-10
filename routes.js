const express = require('express')
const router = express.Router()
const { logger, reimburse, payroll_period,
    find_payroll_period, attendance, overtime,
    finalized_overtime, find_overtime, find_payroll_period_id,
    finalized_payroll_period, get_accounts, get_employee_attendance,
    get_employee_reimbursements, get_employee_overtimes, insert_payslip } = require('./controller/controller.js')
const { countWeekend, countDays, countHours, after_five_pm, currentDate, timestamp } = require('./helper/helper.js')
const { v4 } = require('uuid');
const dayjs = require('dayjs');


// middleware logger
router.use((req, res, next) => {
    const ip = req.ip;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();

    logger(ip, url, req.body || "", v4());
    console.log(`[${timestamp}] ${ip} requested ${url} - ${v4()}`);

    next();
})

router.post('/reimburse', async (req, res) => {
    const amount = req.body.amount;
    const reason = req.body.reason;

    if (!amount || !reason) {
        return res.status(422).json({
            ok: false,
            message: `Please provide Amount and Reason`
        })
    }

    const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const payroll = await find_payroll_period(datetime);

    if (!payroll.data.length) {
        return res.status(404).json({
            ok: false,
            message: `Payroll Period not found!`
        })
    }
    const payroll_period_id = payroll.data[0].id;
    const reimbursed = await reimburse(999, amount, reason, payroll_period_id);

    return res.status(200).json({
        ok: true,
        message: `Accepted Reimbursement of $${amount} for ${reason}`
    })
})

router.post('/admin/payroll-period', async (req, res) => {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    if (!start_date || !end_date) {
        return res.status(422).json({
            ok: false,
            message: `Please provide Start and End dates`
        })
    }

    if (start_date >= end_date) {
        return res.status(422).json({
            ok: false,
            message: `Start Date is bigger than End Date`
        })
    }

    const payroll_p = await payroll_period(start_date, end_date);

    return res.status(200).json({
        ok: true,
        message: `Payroll Period Created`
    })
})

// TODO
router.post('/attendance', async (req, res) => {
    const clockin = req.body.clockin;
    const clockout = req.body.clockout;

    if ((clockin && clockout) || (!clockin && !clockout)) {
        return res.status(422).json({
            ok: false,
            message: `Attendance Failed`
        })
    }

    const time_to_check = clockin || clockout;
    const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const payroll = await find_payroll_period(datetime);

    if (!payroll) {
        return res.status(400).json({
            ok: false,
            message: `Payroll Period not found!`
        })
    }

    const payroll_period_id = payroll.data[0].id;
    let attendance_type = clockin ? 1 : 2;

    const success = attendance(999, payroll_period_id, attendance_type)

    return res.status(200).json({
        ok: true,
        message: attendance_type == 1 ? "Clock In Success" : "Clock Out Success"
    })
})

router.post('/overtime', async (req, res) => {

    const start = req.body.start;
    const end = req.body.end;

    if (!start || !end) {
        return res.status(422).json({
            ok: false,
            message: `Please provide Start and End times`
        })
    }

    if (start >= end) {
        return res.status(422).json({
            ok: false,
            message: `Start Time is bigger than End Time`
        })
    }

    const is_after_five = after_five_pm(start);
    if (!is_after_five) {
        return res.status(422).json({
            ok: false,
            message: `Start Time should be after 5 PM`
        })
    }

    const hours = countHours(start, end);
    if (hours > 3 || hours < 1) {
        if (start >= end) {
            return res.status(422).json({
                ok: false,
                message: `Invalid Overtime request`
            })
        }
    }

    const payroll = await find_payroll_period(start);

    if (!payroll) {
        return res.status(400).json({
            ok: false,
            message: `Payroll Period not found!`
        })
    }

    const payroll_period_id = payroll.data[0].id;

    const overtime_ = await overtime(999, start, end, hours, payroll_period_id);

    return res.status(200).json({
        ok: true,
        message: overtime_
    })
})

router.post('/final-overtime', async (req, res) => {

    // const account_id = req.body.account_id;
    const overtime_id = req.body.overtime_id;

    const f_overtime = await find_overtime(999, overtime_id);

    if (!f_overtime) {
        return res.status(404).json({
            ok: false,
            message: 'Overtime Not Found!'
        });
    }

    const overtime = await finalized_overtime(999, overtime_id);

    return res.status(200).json({
        ok: true,
        message: overtime
    })
})

router.post('/admin/payroll', async (req, res) => {
    const payroll_period_id = req.body.payroll_period_id;

    let payroll = await find_payroll_period_id(payroll_period_id);

    if (!payroll.data.length) {
        return res.status(400).json({
            ok: false,
            message: `Payroll Period not found!`
        })
    }

    const accounts = await get_accounts();
    if (!accounts.data.length) {
        return res.status(400).json({
            ok: false,
            message: `No accounts found!`
        })
    }

    payroll = payroll.data[0];
    const start = payroll.start_period;
    const end = payroll.end_period;

    let days = countDays(start, end); // total hari periode
    let weekends = countWeekend(start, end); // total weekend periode
    let weekdays = days - weekends; // total hari kerja

    let attendances, reimbursements, overtimes, total_payslip, prorate_obj, total_employee_salaries = 0, overtime_obj, reimburse_obj;
    // 1 day is 8 hours of work time

    const { process_attendance, process_overtime, process_reimburse } = require('./helper/payroll.js');

    for (const account of accounts.data) {
        attendances = await get_employee_attendance(account.id, payroll.id);
        if (attendances.data.length === 0) continue;

        prorate_obj = process_attendance(attendances.data.length, weekdays, account.salary);
        await insert_payslip(account.id, payroll.id, prorate_obj, 1, prorate_obj.actual_salary);

        // Process overtime
        overtimes = await get_employee_overtimes(account.id, payroll.id);
        if (overtimes.data.length > 0) {
            overtime_obj = process_overtime(overtimes.data, prorate_obj.hourly);
            if (overtime_obj.total_overtime > 0) {
                await insert_payslip(account.id, payroll.id, overtime_obj, 2, overtime_obj.total_overtime);
            }
        }

        // Process reimbursements
        reimbursements = await get_employee_reimbursements(account.id, payroll.id);
        if (reimbursements.data.length > 0) {
            reimburse_obj = process_reimburse(reimbursements.data);
            if (reimburse_obj.total_reimburse > 0) {
                await insert_payslip(account.id, payroll.id, reimburse_obj, 3, reimburse_obj.total_reimburse);
            }
        }

        total_payslip = Math.ceil(prorate_obj.actual_salary + reimburse_obj.total_reimburse + overtime_obj.total_overtime);
        total_employee_salaries += total_payslip;
    }

    const f_payroll_period = finalized_payroll_period(payroll.id);

    return res.status(200).json({
        ok: true,
        message: `Payroll Processed!`
    })
})

router.post('/payslip', async (req, res) => {

    return res.status(200).json({
        ok: true,
        message: overtime
    })
})

router.post('/admin/payroll-summary', async (req, res) => {

    return res.status(200).json({
        ok: true,
        message: overtime
    })
})

router.use((req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});


module.exports = router;


