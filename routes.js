const express = require('express')
// import express from "express"
const router = express.Router()
// import { test } from "./db.js"
const { test, logger, reimburse, payroll_period } = require('./db.js')

const { v4 } = require('uuid');

router.use((req, res, next) => {
    const ip = req.ip;
    const url = req.originalUrl;
    const timestamp = new Date().toISOString();

    logger(ip, url, req.body || "", v4());
    console.log(`[${timestamp}] ${ip} requested ${url} - ${v4()}`);

    next();
})

router.get('/dealls', (req, res) => {
    return res.json({
        status: 200,
        ok: true,
        message: "YOURE IN"
    })
})

router.post('/reimburse', (req, res) => {
    const amount = req.body.amount;
    const reason = req.body.reason;

    if (!amount || !reason) {
        return res.json({
            status: 422,
            ok: false,
            message: `Please provide Amount and Reason`
        })
    }

    const reimbursed = reimburse(0, amount, reason);

    return res.json({
        status: 200,
        ok: true,
        message: `Accepted Reimbursement of $${amount} for ${reason}`
    })
})

router.post('/payroll-period', (req, res) => {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    if (start_date >= end_date) {
        return res.json({
            status: 422,
            ok: false,
            message: `Start Date is bigger than End Date`
        })
    }

    if (!start_date || !end_date) {
        return res.json({
            status: 422,
            ok: false,
            message: `Please provide Start and End dates`
        })
    }

    const payroll_p = payroll_period(start_date, end_date);

    return res.json({
        status: 200,
        ok: true,
        message: `Payroll Period Created`
    })
})

router.use((req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});


module.exports = router;


