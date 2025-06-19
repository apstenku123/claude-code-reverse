/**
 * Wraps an observable subscription with a span and conditionally adds an activity if not finished.
 *
 * @param {any} span - The span object to set on the subscription (e.g., for tracing or timing).
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the activity stack if the process is not finished.
 * @returns {any} The result of the withOptionalScope function, which likely manages the subscription lifecycle.
 */
function withSpanAndActivity(span, addActivityIfNotFinished) {
  return withOptionalScope(subscription => {
    // Set the provided span on the subscription for tracing or timing purposes
    subscription.setSpan(span);
    // Add a new activity if the process is not finished
    return addActivityIfNotFinished(subscription);
  });
}

module.exports = withSpanAndActivity;