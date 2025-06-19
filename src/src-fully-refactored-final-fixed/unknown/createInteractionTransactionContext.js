/**
 * Creates and configures a new interaction transaction context object.
 *
 * @param {Object} sourceObservable - The source observable or object containing headersList.
 * @param {Object} config - Configuration object for the transaction context.
 * @param {any} subscription - Subscription or additional data to attach to the context.
 * @returns {Object} The fully constructed and configured transaction context object.
 */
function createInteractionTransactionContext(sourceObservable, config, subscription) {
  // Create a new transaction context object using the m8 constructor and gY1 as a parameter
  const transactionContext = new m8(gY1);

  // Assign the source observable to the transaction context using the zB property key
  transactionContext[zB] = sourceObservable;

  // Assign the configuration object to the transaction context using the vY1 property key
  transactionContext[vY1] = config;

  // Create a new headers context using fp0 and assign isBlobOrFileLikeObject to the LF property key
  transactionContext[LF] = new fp0(gY1);

  // Populate the headers context with the headersList from the source observable
  vp0(transactionContext[LF], sourceObservable.headersList);

  // Attach the subscription or additional data to the headers context
  uu1(transactionContext[LF], subscription);

  // Return the fully constructed transaction context object
  return transactionContext;
}

module.exports = createInteractionTransactionContext;