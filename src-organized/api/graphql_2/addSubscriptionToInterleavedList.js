/**
 * Adds a subscription to the interleaved list of a subject and triggers notification logic.
 *
 * @param {Object} sourceObservable - The observable or subject to which the subscription is being added.
 * @param {Object} subject - The subject object that manages the interleaved subscription list.
 * @param {Object} newSubscription - The subscription object to add to the interleaved list.
 * @param {any} notificationValue - The value to pass to the notification handler.
 * @returns {any} The result of the notification handler or the addValueToGlobalArray fallback function.
 */
function addSubscriptionToInterleavedList(sourceObservable, subject, newSubscription, notificationValue) {
  // Get the current interleaved subscription (if any)
  const currentInterleaved = subject.interleaved;

  if (currentInterleaved === null) {
    // If there are no interleaved subscriptions, make newSubscription self-referential
    newSubscription.next = newSubscription;
    // Call the fallback handler (addValueToGlobalArray)
    return addValueToGlobalArray(subject);
  } else {
    // Insert newSubscription into the circular linked list after currentInterleaved
    newSubscription.next = currentInterleaved.next;
    currentInterleaved.next = newSubscription;
  }

  // Update the subject'createInteractionAccessor interleaved reference to the new subscription
  subject.interleaved = newSubscription;

  // Trigger the notification handler
  return _W(sourceObservable, notificationValue);
}

module.exports = addSubscriptionToInterleavedList;