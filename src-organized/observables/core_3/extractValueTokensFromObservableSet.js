/**
 * Extracts arrays of value tokens from the set property of a bL6 instance.
 *
 * @param {Observable} sourceObservable - The source observable to be wrapped by bL6.
 * @param {Object} config - Configuration object passed to the bL6 constructor.
 * @returns {string[][]} An array of arrays, where each inner array contains tokens (words) extracted from the 'value' properties of items in each subscription.
 */
function extractValueTokensFromObservableSet(sourceObservable, config) {
  // Create a new bL6 instance with the provided observable and configuration
  const bL6Instance = new bL6(sourceObservable, config);

  // Map over the 'set' property, which is assumed to be an array of subscriptions
  return bL6Instance.set.map(subscription => {
    // For each subscription, extract the 'value' property from each item
    // Join all values into a single string separated by spaces
    // Trim whitespace and split the string back into an array of tokens
    return subscription.map(item => item.value)
      .join(' ')
      .trim()
      .split(' ');
  });
}

module.exports = extractValueTokensFromObservableSet;