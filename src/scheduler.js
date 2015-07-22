window.CYCLES_PER_MINUTE = 120 / 4;
window.MS_PER_CYCLE = 1000 * (60 / window.CYCLES_PER_MINUTE);
window.LOOKAHEAD = 40;

/* Comparer required for scheduling priority */
function comparer (x, y) {
    if (x > y) { return 1; }
    if (x < y) { return -1; }
    return 0;
}

var scheduler = new Rx.VirtualTimeScheduler(0, comparer);

/**
 * Adds a relative time value to an absolute time value.
 * @param {Any} absolute Absolute virtual time value.
 * @param {Any} relative Relative virtual time value to add.
 * @return {Any} Resulting absolute virtual time sum value.
 */
scheduler.add = function (absolute, relative) {
    return absolute + relative;
};

/**
 * Converts an absolute time to a number
 * @param {Number} The absolute time in ms
 * @returns {Number} The absolute time in ms
 */
scheduler.toDateTimeOffset = function (absolute) {
    return new Date(absolute).getTime();
};

/**
 * Converts the time span number/Date to a relative virtual time value.
 * @param {Number} timeSpan TimeSpan value to convert.
 * @return {Number} Corresponding relative virtual time value.
 */
scheduler.toRelative = function (timeSpan) {
    return timeSpan;
};

export default scheduler;
