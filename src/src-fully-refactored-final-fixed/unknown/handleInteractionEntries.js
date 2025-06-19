/**
 * Processes interaction entries by invoking the provided handler function with appropriate arguments.
 * If the handler function expects two arguments, isBlobOrFileLikeObject is called with the subscription and the result of sWA(interactionInfo).
 * Otherwise, isBlobOrFileLikeObject is called with the subscription, config, and the result of sWA(interactionInfo).
 *
 * @param {Function} processInteractionEntries - Handler function to process interaction entries. Signature may vary.
 * @param {Object} config - Configuration object for processing interactions.
 * @param {Object} subscription - Subscription or context object for the interaction.
 * @param {any} interactionInfo - Information about the interaction to be processed.
 * @returns {any} The result of invoking the handler function.
 */
function handleInteractionEntries(processInteractionEntries, config, subscription, interactionInfo) {
  // Determine the arguments to pass based on the handler'createInteractionAccessor expected arity
  let result;
  if (processInteractionEntries.length === 2) {
    // Handler expects only subscription and processed interaction info
    result = processInteractionEntries(subscription, sWA(interactionInfo));
  } else {
    // Handler expects subscription, config, and processed interaction info
    result = processInteractionEntries(subscription, config, sWA(interactionInfo));
  }
  return result;
}

module.exports = handleInteractionEntries;