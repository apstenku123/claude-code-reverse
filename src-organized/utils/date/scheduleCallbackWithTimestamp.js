/**
 * Schedules a callback to be executed after a specified delay, passing the current timestamp.
 *
 * @function scheduleCallbackWithTimestamp
 * @param {function(number): void} callback - The function to execute, receives the current timestamp as an argument.
 * @param {number} delayMilliseconds - The delay in milliseconds before executing the callback.
 * @returns {void}
 *
 * The function uses an external scheduler (d30) to delay the execution of the callback, passing the current time
 * (retrieved via Y_4.unstable_now) as its argument. This is useful for scheduling time-based events or updates.
 */
function scheduleCallbackWithTimestamp(callback, delayMilliseconds) {
  // Schedule the callback to run after the specified delay, passing the current timestamp
  d30(function () {
    callback(Y_4.unstable_now());
  }, delayMilliseconds);
}

module.exports = scheduleCallbackWithTimestamp;