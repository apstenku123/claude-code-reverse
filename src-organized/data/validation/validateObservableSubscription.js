/**
 * Validates an observable'createInteractionAccessor subscription based on configuration and size constraints.
 * Throws errors if the observable or its subscription exceed allowed limits.
 *
 * @param {Array} sourceObservable - The observable array to validate.
 * @param {Object} config - Configuration object, checked for prior validation.
 * @param {Object} subscription - Subscription context or options for validation.
 * @throws {Error} If the observable or its subscription exceed allowed limits.
 */
async function validateObservableSubscription(sourceObservable, config, subscription) {
  // Check if the config has not been validated and the observable exceeds the allowed length
  if (!cV1.has(config) && sourceObservable.length > lV1) {
    throw new Error(Fo1(sourceObservable.length));
  }

  // Get the size of the observable (getInteractionEntryCount returns a size or null/undefined)
  const observableSize = getInteractionEntryCount(sourceObservable);

  // If the observable size exists and is greater than a quarter of 'ye', perform further validation
  if (observableSize && observableSize > ye / 4) {
    // Await the result of sendUserMessage, which likely checks the subscription size or status
    const subscriptionSize = await sendUserMessage(sourceObservable, subscription);
    // If the subscription size exists and exceeds 'ye', throw an error
    if (subscriptionSize && subscriptionSize > ye) {
      throw new Error(getFileContentTokenLimitMessage(subscriptionSize));
    }
  }
}

module.exports = validateObservableSubscription;