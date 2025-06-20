/**
 * Starts a new UI action click transaction for user interaction tracing.
 * Initializes the transaction object, sets up headers, and applies configuration and subscription.
 *
 * @param {Object} sourceObservable - The observable or source object containing headersList.
 * @param {Object} config - Configuration object to be attached to the transaction.
 * @param {Object} subscription - Subscription or additional data to be applied to the transaction.
 * @returns {Object} The initialized UI action click transaction object.
 */
function createUiActionClickTransaction(sourceObservable, config, subscription) {
  // Create a new transaction object using the transaction constructor and a global transaction type
  const transaction = new m8(gY1);

  // Assign the source observable to the transaction'createInteractionAccessor main property
  transaction[zB] = sourceObservable;

  // Attach the configuration object to the transaction
  transaction[vY1] = config;

  // Initialize the headers list for the transaction
  transaction[LF] = new fp0(gY1);

  // Populate the headers list with the source observable'createInteractionAccessor headers
  vp0(transaction[LF], sourceObservable.headersList);

  // Apply the subscription or additional data to the headers list
  uu1(transaction[LF], subscription);

  return transaction;
}

module.exports = createUiActionClickTransaction;