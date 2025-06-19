/**
 * Extracts arrays of words from the 'value' properties of items in each subscription of an observable set.
 *
 * @param {Observable} sourceObservable - The source observable to be wrapped by bL6.
 * @param {Object} config - Configuration object for bL6.
 * @returns {string[][]} An array of arrays, where each inner array contains words extracted from the joined 'value' properties of each subscription.
 */
function extractValueWordsFromObservableSet(sourceObservable, config) {
  // Create a new bL6 instance with the provided observable and config
  const observableSetWrapper = new bL6(sourceObservable, config);

  // Map over each subscription in the set
  return observableSetWrapper.set.map(subscription => {
    // For each subscription, map over its items to extract the 'value' property
    // Join all values into a single string, trim whitespace, and split into words
    return subscription
      .map(item => item.value)
      .join(' ')
      .trim()
      .split(' ');
  });
}

module.exports = extractValueWordsFromObservableSet;