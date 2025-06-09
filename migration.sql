DROP TABLE logs;
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
  status VARCHAR(20) DEFAULT 'proposed',  -- 'proposed', 'final'
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

payroll_period: id, start, end, 
                    status(active: 1, inactive/over: 2), 
                    created_at, created_by
CREATE TABLE payroll_period (
  id SERIAL PRIMARY KEY,
  start_period Date NOT NULL,
  end_period Date NOT NULL,
  status SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL
);


    account: id, name, email, type (1: admin, 2: employee)
    payroll_period: id, start, end, status(active: 1, inactive/over: 2), created_at, created_by
    attendance_logs: id, account_id, attendance_id, created_at, type (clockin: 1, clockout: 2), created_at
    reimburse: id, account_id, amount, type, created_at
    payroll: id, account_id, account_id, total_salary, payroll_period, created_at, created_by
    payslip: id, account_id, type(salary, overtime, reimburse), total, created_at, created_by