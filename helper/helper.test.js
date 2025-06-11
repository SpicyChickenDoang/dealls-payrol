const { afterFivePM, countWeekend, countDays, countHours } = require('./helper');

test('After 5 PM', () => {
    expect(afterFivePM("2026-09-14 18:20:00")).toBe(true);
});

test('Before 5 PM', () => {
    expect(afterFivePM("2026-09-14 16:20:00")).toBe(false);
});

test('Number of Weekend of a Period', () => {
    expect(countWeekend("2025-06-01", "2025-06-30")).toBe(9);
});

test('Number of Weekdays of a Period', () => {
    expect(countDays("2025-06-01", "2025-06-30") - countWeekend("2025-06-01", "2025-06-30")).toBe(21);
});

test('Number of Hours of a Period', () => {
    expect(countHours("2025-06-01 17:00:00", "2025-06-01 19:00:00")).toBe("2");
});