const express = require('express')
const router = express.Router()
const { logger, reimburse, payroll_period, find_payroll_period, attendance } = require('./controller.js')
const { countWeekend, countDays, countHours } = require('./helper.js')
const { v4 } = require('uuid');

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

    const reimbursed = await reimburse(0, amount, reason);

    return res.status(200).json({
        ok: true,
        message: `Accepted Reimbursement of $${amount} for ${reason}`
    })
})

router.post('/payroll-period', async (req, res) => {
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
    const payroll = await find_payroll_period(time_to_check);

    if (!payroll) {
        return res.status(400).json({
            ok: false,
            message: `Payroll Period not found!`
        })
    }

    const payroll_id = payroll.data[0].id;
    let clock = clockin ? 1 : 2;

    const success = attendance(999, payroll_id, clock)

    return res.status(200).json({
        ok: true,
        message: success
    })
})

router.post('/overtime1', async (req, res) => {

    // const start_time;
    // const end_time;

    return res.json({
        status: 200,
        ok: true,
        message: ""
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

    const hours = countHours(start, end);
    if (hours > 3 || hours < 1) {
        if (start >= end) {
            return res.status(422).json({
                ok: false,
                message: `Invalid Overtime request`
            })
        }
    }

    const overtime = overtime(999, start, end, hours);

    return res.status(200).json({
        ok: true,
        message: countHours(start, end)
    })
})

router.use((req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});


module.exports = router;


