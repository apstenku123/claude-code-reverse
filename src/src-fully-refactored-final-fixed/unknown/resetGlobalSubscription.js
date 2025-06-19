/**
 * Resets the global subscription variable to undefined.
 *
 * This function is intended to clear the current global subscription reference,
 * effectively unsubscribing or marking the subscription as inactive.
 *
 * @returns {void} Does not return a value.
 */
function resetGlobalSubscription() {
  // Set the global subscription variable to undefined
  globalSubscription = undefined;
}

module.exports = resetGlobalSubscription;