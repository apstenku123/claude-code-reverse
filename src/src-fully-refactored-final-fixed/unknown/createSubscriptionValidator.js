/**
 * Creates a subscription validator function based on a source observable name and an optional required suffix.
 *
 * @param {string} sourceObservableName - The name of the source observable to validate against.
 * @param {string} [requiredSuffix=""] - Optional. If provided, the validator will also check if the subscription name ends with this suffix.
 * @returns {Function} a validator function. If no suffix is provided, returns a function that validates the subscription name based on the source observable. If a suffix is provided, returns a function that validates both the source observable and the suffix.
 */
const createSubscriptionValidator = (sourceObservableName, requiredSuffix = "") => {
  // Create a base validator using the source observable name
  const baseValidator = createSubscriptionLengthAndPrefixValidator([sourceObservableName]);

  // If no suffix is provided, return the base validator directly
  if (!requiredSuffix) {
    return baseValidator;
  }

  // If a suffix is provided, return a validator that checks both the base and the suffix
  return (subscriptionName) => {
    // Validate with base validator and check if the subscription name ends with the required suffix
    return baseValidator(subscriptionName) && subscriptionName.endsWith(requiredSuffix);
  };
};

module.exports = createSubscriptionValidator;
