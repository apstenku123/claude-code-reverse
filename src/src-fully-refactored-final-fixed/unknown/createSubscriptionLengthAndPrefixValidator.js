/**
 * Creates a validator function that checks if a given subscription string
 * matches the length of the source observable'createInteractionAccessor name and does not start with a dot.
 *
 * @param {string} sourceObservableName - The name of the source observable to compare against.
 * @returns {(subscriptionName: string) => boolean} Validator function that returns true if the subscription name
 *   has the same length as the source observable'createInteractionAccessor name and does not start with a dot.
 */
const createSubscriptionLengthAndPrefixValidator = (sourceObservableName) => {
  // Store the length of the source observable'createInteractionAccessor name for comparison
  const sourceLength = sourceObservableName.length;

  /**
   * Validates the subscription name based on length and prefix.
   *
   * @param {string} subscriptionName - The subscription name to validate.
   * @returns {boolean} True if the subscription name matches the length and does not start with a dot.
   */
  return (subscriptionName) => {
    // Check if the subscription name has the same length and does not start with a dot
    return subscriptionName.length === sourceLength && !subscriptionName.startsWith(".");
  };
};

module.exports = createSubscriptionLengthAndPrefixValidator;
