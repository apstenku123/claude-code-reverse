/**
 * Schedules the emission of a 'session_expired' event from a Statsig instance after a specified delay.
 *
 * @param {any} statsigInstanceKey - The key or identifier used to retrieve the Statsig instance.
 * @param {number} delayMilliseconds - The delay in milliseconds before emitting the event.
 * @returns {number} The timeout updateSnapshotAndNotify returned by setTimeout, which can be used to cancel the scheduled event.
 */
function scheduleSessionExpiredEvent(statsigInstanceKey, delayMilliseconds) {
  return setTimeout(() => {
    // Safely retrieve the Statsig instance using the provided key
    const statsigInstance = __STATSIG__?.instance(statsigInstanceKey);
    if (statsigInstance) {
      // Emit the 'session_expired' event if the instance exists
      statsigInstance.$emt({ name: "session_expired" });
    }
  }, delayMilliseconds);
}

module.exports = scheduleSessionExpiredEvent;