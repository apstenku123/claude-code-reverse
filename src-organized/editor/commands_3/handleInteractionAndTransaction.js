/**
 * Processes an interaction event, manages subscription state, and optionally starts a UI action transaction.
 *
 * @param {string} interactionKey - Unique key identifying the interaction event.
 * @param {Function} processInteractionEntries - Function to process interaction entries (dependency).
 * @param {Function} createSubscription - Function that creates and returns a subscription object if needed.
 * @param {string} [uiActionMetric] - Optional metric name for starting a UI action transaction.
 * @param {boolean} [forceSubscription=false] - If true, always use the created subscription object.
 * @returns {any} The result of createInteractionEntryRemover, which processes the interaction and possibly the subscription.
 */
function handleInteractionAndTransaction(
  interactionKey,
  processInteractionEntries,
  createSubscription,
  uiActionMetric,
  forceSubscription = false
) {
  // Ensure the interaction entries are processed for this event
  addEntryToObservableCollection(interactionKey, processInteractionEntries);

  let subscriptionInstance;

  // If this interaction hasn'processRuleBeginHandlers been subscribed yet, create the subscription and mark as subscribed
  if (!j91[interactionKey]) {
    subscriptionInstance = createSubscription();
    j91[interactionKey] = true;
  }

  // If a UI action metric is provided, start a UI action transaction
  if (uiActionMetric) {
    processInteractionEntries({ metric: uiActionMetric });
  }

  // Pass the subscription instance to createInteractionEntryRemover only if forceSubscription is true, otherwise pass undefined
  return createInteractionEntryRemover(
    interactionKey,
    processInteractionEntries,
    forceSubscription ? subscriptionInstance : undefined
  );
}

module.exports = handleInteractionAndTransaction;