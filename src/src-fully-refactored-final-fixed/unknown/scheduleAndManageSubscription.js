/**
 * Schedules a subscription callback with optional delay and manages its lifecycle.
 *
 * @param {Object} subscriptionManager - Manages active subscriptions (must have an add method).
 * @param {Object} scheduler - Scheduler object with a schedule method for delayed execution.
 * @param {Function} callback - Function to execute when scheduled.
 * @param {number} [delay=0] - Delay in milliseconds before executing the callback.
 * @param {boolean} [repeat=false] - If true, reschedules the callback after execution; otherwise, unsubscribes.
 * @returns {Object|undefined} The scheduled subscription object if repeat is false; otherwise, undefined.
 */
function scheduleAndManageSubscription(
  subscriptionManager,
  scheduler,
  callback,
  delay = 0,
  repeat = false
) {
  // Schedule the callback using the provided scheduler
  const scheduledSubscription = scheduler.schedule(function () {
    callback();
    if (repeat) {
      // If repeat is true, reschedule the callback after the specified delay
      subscriptionManager.add(this.schedule(null, delay));
    } else {
      // Otherwise, unsubscribe after the first execution
      this.unsubscribe();
    }
  }, delay);

  // Add the scheduled subscription to the manager
  subscriptionManager.add(scheduledSubscription);

  // If not repeating, return the scheduled subscription for further management
  if (!repeat) {
    return scheduledSubscription;
  }
}

module.exports = scheduleAndManageSubscription;
