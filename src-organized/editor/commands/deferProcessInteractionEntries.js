/**
 * Defers the execution of the provided processInteractionEntries function using DA.asap.
 * Returns a function that, when called with any arguments, schedules processInteractionEntries
 * to run asynchronously with those arguments.
 *
 * @param {Function} processInteractionEntries - The function to process interaction entries.
 * @returns {Function} a function that, when invoked with any arguments, schedules processInteractionEntries to run asynchronously with those arguments.
 */
const deferProcessInteractionEntries = (processInteractionEntries) => {
  return (...interactionEntries) => {
    // Schedule the processing of interaction entries asynchronously
    DA.asap(() => processInteractionEntries(...interactionEntries));
  };
};

module.exports = deferProcessInteractionEntries;