exports.process_attendance = (attendances, weekdays, salary) => {
    const hours_per_day = 8
    const real_attendance = attendances / 2;
    let actual_hours, actual_salary = 0;

    const work_hours = weekdays * hours_per_day;
    const hourly = parseFloat(salary / work_hours).toFixed(2);

    if (real_attendance == weekdays) {
        actual_salary = salary;
    } else {
        actual_hours = Math.ceil(real_attendance) * hours_per_day;
        actual_salary = (hourly * actual_hours).toFixed(2);
    }

    actual_salary = parseFloat(actual_salary);

    return { hourly, actual_salary, real_attendance }
}

exports.process_overtime = (overtimes, hourly) => {
    let total_overtime, total_overtime_hour = 0;

    parseInt(overtimes.reduce((acc, ot) => acc + ot.count_ot, 0) * hourly);
    overtimes.forEach(ot => {
        total_overtime_hour += ot.count_ot;
    })
    total_overtime = total_overtime_hour * hourly;

    return { hourly, total_overtime, total_overtime_hour }
}

exports.process_reimburse = (reimburses) => {
    let total_reimburse = 0, reason, amount;
    let reimburse_obj = [];
    reimburses.forEach(re => {
        reason = re.reason;
        amount = re.amount;
        total_reimburse += amount;
        reimburse_obj.push({ reason, amount })
    });

    return { total_reimburse, reimburse_obj }
}