/**
 * Invokes the provided processInteractionEntries function.
 *
 * @param {Function} processInteractionEntries - Function that processes an array of interaction entries, mapping each to a route name and storing associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify.
 * @returns {*} The result of invoking processInteractionEntries.
 */
const invokeProcessInteractionEntries = (processInteractionEntries) => {
  // Directly invoke the processInteractionEntries function and return its result
  return processInteractionEntries();
};

module.exports = invokeProcessInteractionEntries;