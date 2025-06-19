/**
 * Starts or continues a UI interaction transaction based on the current observable state.
 * If the observable is already in a transaction (as determined by isInTransaction),
 * isBlobOrFileLikeObject returns the current transaction. Otherwise, isBlobOrFileLikeObject starts a new transaction using the provided config
 * and subscription functions.
 *
 * @param {object} sourceObservable - The observable or context to operate on.
 * @param {function} startTransaction - Function to start a new transaction for the observable.
 * @param {function} getSubscription - Function to get a subscription or fallback for the observable.
 * @returns {any} The current or newly started transaction, or the result of applying the subscription.
 */
function handleInteractionTransaction(sourceObservable, startTransaction, getSubscription) {
  // Start a new transaction for the source observable
  const transaction = startTransaction(sourceObservable);

  // If the observable is already in a transaction, return the current transaction
  if (isInTransaction(sourceObservable)) {
    return transaction;
  }

  // Otherwise, apply the subscription logic and return the result
  return applySubscription(transaction, getSubscription(sourceObservable));
}

module.exports = handleInteractionTransaction;
