/**
 * Retrieves the span context from the activity associated with the provided source.
 *
 * @param {any} sourceActivity - The source activity or context from which to extract the span context.
 * @returns {any} The span context if available, otherwise undefined.
 */
function getSpanContextFromActivity(sourceActivity) {
  // Retrieve the activity configuration using the external Uf1 function
  const activityConfig = Uf1(sourceActivity);
  // If activityConfig exists, return its spanContext; otherwise, return undefined
  return activityConfig?.spanContext();
}

module.exports = getSpanContextFromActivity;