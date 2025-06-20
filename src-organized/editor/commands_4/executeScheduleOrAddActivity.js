/**
 * Executes a schedule if a source observable is provided; otherwise, adds an activity if not finished.
 *
 * @param {Function|null} sourceObservable - The observable or function representing user interactions to map to routes. If null or undefined, the fallback action is executed.
 * @param {Function} addActivityIfNotFinished - Callback to add a new activity to the stack if the process is not finished.
 * @param {any} scheduleConfig - The configuration or subscription object to be passed to the schedule executor.
 * @returns {void}
 */
function executeScheduleOrAddActivity(sourceObservable, addActivityIfNotFinished, scheduleConfig) {
  if (sourceObservable) {
    // If a source observable is provided, execute the schedule with the given config
    KR9.executeSchedule(scheduleConfig, sourceObservable, addActivityIfNotFinished);
  } else {
    // If no observable is provided, attempt to add the activity if not finished
    addActivityIfNotFinished();
  }
}

module.exports = executeScheduleOrAddActivity;