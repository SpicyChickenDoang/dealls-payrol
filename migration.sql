create database payroll;

create TABLE logs (
	id serial PRIMARY key,
	ip_address VARCHAR(255) not null,
	request_id TEXT NOT NULL,
	body TEXT NOT NULL,
	endpoint VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE overtime (
  id SERIAL PRIMARY KEY,
  start_ot TIMESTAMP NOT NULL,
  end_ot TIMESTAMP NOT NULL,
  count_ot INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) DEFAULT 'proposed',  -- 'proposed', 'finish'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL
);

CREATE TABLE reimburse (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  reason VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_period (
  id SERIAL PRIMARY KEY,
  start_period Date NOT NULL,
  end_period Date NOT NULL,
  status SMALLINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL
);

create table account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email varchar(255) NOT NULL,
    salary BIGINT NOT NULL DEFAULT 1000000,
    types SMALLINT NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

create table attendance (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL,
    payroll_period_id INTEGER NOT NULL DEFAULT 0,
    types SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

  payroll: id, account_id, account_id, total_salary, payroll_period, created_at, created_by
  payslip: id, account_id, type(salary, overtime, reimburse), total, created_at, created_by