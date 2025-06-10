exports.currentDate = () => {
    const date = new Date();
    return (`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
}

exports.timestamp = () => {
    return new Date();
}

exports.after_five_pm = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return hours > 17 || (hours === 17 && minutes > 0);
}

exports.isWeekend = () => {
    let today = new Date();
    if (today.getDay() == 6 || today.getDay() == 0) return true;

    return false;
}

exports.countWeekend = (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);
    let saturdays = 0, sundays = 0;

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay();
        if (day === 6) saturdays++;
        if (day === 0) sundays++;
    }

    return saturdays + sundays;
}

exports.countDays = (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);

    const diff_time = end - start;
    return Math.floor(diff_time / (1000 * 60 * 60 * 24)) + 1;
}

exports.countHours = (start_time, end_time) => {
    const start = new Date(start_time);
    const end = new Date(end_time);

    const diff_ms = end - start; // Difference in milliseconds
    const diff_hours = diff_ms / (1000 * 60 * 60); // Convert to hours

    return Math.floor(diff_hours).toFixed(0);
}