/**
 * Executes a scheduled task if a source observable is provided; otherwise, executes a fallback callback.
 *
 * @param {Object|null} sourceObservable - The observable or data source to process. If provided, the schedule will be executed.
 * @param {Function} fallbackCallback - The callback function to execute if no source observable is provided.
 * @param {Object} scheduleConfig - The configuration or schedule to execute with the observable.
 * @returns {void}
 */
function executeScheduleOrFallback(sourceObservable, fallbackCallback, scheduleConfig) {
  if (sourceObservable) {
    // If a source observable is provided, execute the schedule with the given config
    KR9.executeSchedule(scheduleConfig, sourceObservable, fallbackCallback);
  } else {
    // If no observable is provided, execute the fallback callback
    fallbackCallback();
  }
}

module.exports = executeScheduleOrFallback;