/**
 * Defers execution and returns either the config or subscription based on the result of processing interaction entries.
 *
 * @param {Function} processInteractionEntries - Function that processes interaction entries and returns a boolean indicating whether to use config or subscription.
 * @param {*} config - The value to return if processInteractionEntries returns true.
 * @param {*} subscription - The value to return if processInteractionEntries returns false.
 * @returns {*} The config if processInteractionEntries returns true, otherwise the subscription.
 */
function deferBasedOnInteractionEntries(processInteractionEntries, config, subscription) {
  // Use zO9.defer to delay execution until subscription time
  return zO9.defer(() => {
    // If processing interaction entries returns true, use config; otherwise, use subscription
    return processInteractionEntries() ? config : subscription;
  });
}

module.exports = deferBasedOnInteractionEntries;