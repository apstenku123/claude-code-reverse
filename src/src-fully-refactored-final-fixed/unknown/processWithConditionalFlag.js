/**
 * Processes the given source observable and configuration, passing them to createEvaluationResult with a conditional flag.
 * The flag is true if the subscription object exists and its 'value' property is strictly true.
 *
 * @param {Observable} sourceObservable - The main observable to process.
 * @param {Object} config - Configuration object for processing.
 * @param {Object|null|undefined} subscription - Optional subscription object that may contain a 'value' property.
 * @returns {any} The result of calling createEvaluationResult with the provided arguments and the computed flag.
 */
function processWithConditionalFlag(sourceObservable, config, subscription) {
  // Determine if the subscription exists and its 'value' property is strictly true
  const isActive = (subscription?.value) === true;
  // Pass all arguments along with the computed flag to createEvaluationResult
  return createEvaluationResult(sourceObservable, config, subscription, isActive);
}

module.exports = processWithConditionalFlag;