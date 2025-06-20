/**
 * Emits the most recent value from the source Observable after a specified duration,
 * using the provided scheduler for timing. This is an accessor function that applies
 * an audit operator with a timer duration.
 *
 * @param {number} duration - The duration in milliseconds to wait before emitting the most recent value.
 * @param {SchedulerLike} [scheduler=UT9.asyncScheduler] - Optional scheduler to manage the timers.
 * @returns {OperatorFunction<BugReportForm, BugReportForm>} An Observable that emits the most recent value after the specified duration.
 */
function auditWithTimer(duration, scheduler = UT9.asyncScheduler) {
  // Use the audit operator, passing a function that returns a timer Observable
  // The timer waits for the specified duration using the given scheduler
  return NT9.audit(() => {
    return $T9.timer(duration, scheduler);
  });
}

module.exports = auditWithTimer;