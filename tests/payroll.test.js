const { process_attendance, process_overtime, process_reimburse } = require('../helper/payroll.js');

test('Attendances and Prorate Salaries', () => {
    expect(process_attendance(18, 20, 10000000)).toStrictEqual({ hourly: 62500.00, actual_salary: 4500000, real_attendance: 9 });
});

test('Process Overtime to see how many hours the employee has taken', () => {
    expect(process_overtime([{ count_ot: 3 }, { count_ot: 5 }], 62500)).toStrictEqual({ hourly: 62500, total_overtime: 500000, total_overtime_hour: 8 });
});

test('Process Reimbursement employee request', () => {
    expect(process_reimburse([{ reason: "Medic", amount: 500000 }])).toStrictEqual({ total_reimburse: 500000, reimburse_obj: [{ reason: "Medic", amount: 500000 }] });
});