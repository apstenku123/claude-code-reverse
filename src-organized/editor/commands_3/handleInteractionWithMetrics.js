/**
 * Handles an interaction event, manages its subscription, and optionally starts a metrics transaction.
 *
 * @param {string} interactionKey - Unique key identifying the interaction event.
 * @param {Function} interactionHandler - Handler function to process the interaction event.
 * @param {Function} createSubscription - Function to create and return a subscription for the interaction.
 * @param {string} [metricName] - Optional metric name to start a click interaction transaction.
 * @param {boolean} [useCachedSubscription=false] - Whether to use a cached subscription if available.
 * @returns {any} The result of createInteractionEntryRemover, typically related to the interaction'createInteractionAccessor processing.
 */
function handleInteractionWithMetrics(
  interactionKey,
  interactionHandler,
  createSubscription,
  metricName,
  useCachedSubscription = false
) {
  // Ensure the interaction is registered and valid
  addEntryToObservableCollection(interactionKey, interactionHandler);

  let subscriptionInstance;

  // If there is no existing subscription for this interaction, create one and mark as initialized
  if (!j91[interactionKey]) {
    subscriptionInstance = createSubscription();
    j91[interactionKey] = true;
  }

  // If a metric name is provided, start a click interaction transaction
  if (metricName) {
    interactionHandler({ metric: metricName });
  }

  // Call createInteractionEntryRemover with the interaction key, handler, and optionally the subscription instance
  return createInteractionEntryRemover(
    interactionKey,
    interactionHandler,
    useCachedSubscription ? subscriptionInstance : undefined
  );
}

module.exports = handleInteractionWithMetrics;