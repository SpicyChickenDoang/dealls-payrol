# Dealls Payroll

## Overview
Payroll API, created for Dealls technical test

## Getting Started
1. Clone the repo
2. `npm install`
3. `npm start`

## Folder Structure
- `./routes.js`: Express route definitions and logics
- `./server.js`: HTTP Server (localhost)
- `./migrations.sql`: SQL queries for starting the databases
- `./controller/controller.js`: Insertion into the database
- `./helper`: Helper funtions to simplify and be reused in multiple places if needed
- `./model`: Holds connections pool into the postgres database
- `./.env`: Holds keys for models