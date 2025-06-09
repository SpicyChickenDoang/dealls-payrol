exports.currentDate = () => {
    const date = new Date();
    return (`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
}