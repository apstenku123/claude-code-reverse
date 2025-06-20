/**
 * Retrieves an interaction entry from the global tH5 object using the provided key.
 *
 * @param {string} interactionKey - The key used to access the interaction entry in tH5.
 * @param {object} config - Configuration object (unused in this function, reserved for future use).
 * @param {object} subscription - Subscription object (unused in this function, reserved for future use).
 * @param {object} context - Context object (unused in this function, reserved for future use).
 * @returns {*} The interaction entry corresponding to the provided key from tH5.
 */
const getInteractionEntry = (interactionKey, config, subscription, context) => {
  // Access the global tH5 object using the interactionKey
  return tH5[interactionKey];
};

module.exports = getInteractionEntry;
