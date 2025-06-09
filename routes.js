const express = require('express')
// import express from "express"
const router = express.Router()
// import { test } from "./db.js"
const { test, logger, reimburse } = require('./db.js')

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
    res.json({
        status: 200,
        ok: true,
        message: "YOURE IN"
    })
})

router.get('/test', (req, res) => {
    test();
    res.json(200)
})

router.post('/reimburse', (req, res) => {
    const amount = req.body.amount;
    const reason = req.body.reason;

    const reimbursed = reimburse(0, amount, reason)

    if (!amount || !reason) {
        res.json({
            status: 422,
            ok: false,
            message: `Please provide Amount and Reason`
        })
    }

    res.json({
        status: 200,
        ok: true,
        message: `Accepted Reimbursement of $${amount} for ${reason}`
    })
})

router.use((req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});


module.exports = router;


