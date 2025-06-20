/**
 * Resets the global subscription variable to undefined.
 *
 * This function is typically used to clear the current subscription reference,
 * allowing for cleanup or re-initialization elsewhere in the application.
 *
 * @returns {void} Does not return a value.
 */
function resetSubscription() {
  // Set the global subscription variable to undefined to clear its value
  globalSubscription = undefined;
}

module.exports = resetSubscription;