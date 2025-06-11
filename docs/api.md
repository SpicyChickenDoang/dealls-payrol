# 📘 API Endpoints Documentation

## ✅ `POST /reimburse`

* **Description**: Employee submits a reimbursement for the period.
* **Request**:

```json
{
  "amount": 150000,
  "reason": "Medic Purposes",
  "account_id": 999
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Accepted Reimbursement of $150000 for Medic Purposes"
}
```

---

## ✅ `POST /admin/payroll-period`

* **Description**: Admin creates a payroll period.
* **Request**:

```json
{
  "account_id": 999,
  "start_date": "2026-09-01",
  "end_date": "2026-09-25"
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Payroll Period Created"
}
```

---

## ✅ `POST /attendance`

* **Description**: Employee submits check-in or check-out.
* **Request**:

```json
{
  "account_id": 999,
  "clockin": false,
  "clockout": true
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Clock Out Success"
}
```

---

## ✅ `POST /overtime`

* **Description**: Employee proposes an overtime session.
* **Request**:

```json
{
  "account_id": 999,
  "start": "2026-09-14 18:20:00",
  "end": "2026-09-14 20:00:00"
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Overtime proposed success"
}
```

---

## ✅ `POST /final-overtime`

* **Description**: Employee closes (takes) the overtime.
* **Request**:

```json
{
  "account_id": 999,
  "overtime_id": 1
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Overtime closed"
}
```

---

## ✅ `POST /admin/payroll`

* **Description**: Admin closes the payroll period and calculates salaries, overtimes, and reimbursements.
* **Request**:

```json
{
  "account_id": 1001,
  "payroll_period_id": 1
}
```

* **Response**:

```json
{
  "ok": true,
  "message": "Payroll Processed"
}
```

---

## ✅ `POST /payslip`

* **Description**: Employee views their payslip for a payroll period.
* **Request**:

```json
{
  "account_id": 999,
  "payroll_period_id": 1
}
```

* **Response**:

```json
{
  "ok": true,
  "message": {
    "overtime": {
      "hourly": "69444.44",
      "overtime_taken": 1,
      "overtime": 69444.44
    },
    "reimburse": {
      "reimburse": 150000,
      "reimburse_lit": [
        {
          "reason": "Medic Purposes",
          "amount": 150000
        }
      ]
    },
    "attendance": {
      "hourly": "69444.44",
      "attendance": 2
    },
    "thp": 1330555.48
  }
}
```

---

## ✅ `POST /admin/payroll-summary`

* **Description**: Admin checks all employee payslips and total salaries combined for a payroll period.
* **Request**:

```json
{
  "account_id": 1001,
  "payroll_period_id": 1
}
```

* **Response**:

```json
{
  "ok": true,
  "message": {
    "account_data": [
      {
        "name": "Meesa",
        "total": 150000,
        "type": "3"
      },
      {
        "name": "Meesa",
        "total": 69444.44,
        "type": "2"
      },
      {
        "name": "Meesa",
        "total": 1111111.04,
        "type": "1"
      }
    ],
    "total": 1330555.48
  }
}
```

---
