/**
 * Starts a new transaction using the current hub with the provided transaction options and custom configuration.
 *
 * @param {Object} transactionOptions - An object containing options for the transaction (e.g., name, operation, etc.).
 * @param {Object} [customConfig] - Optional configuration to further customize the transaction behavior.
 * @returns {Object} The newly started transaction object.
 */
function startTransactionWithOptions(transactionOptions, customConfig) {
  // Retrieve the current hub instance and start a new transaction
  // Spread the transactionOptions to ensure all properties are passed
  return KQ.getCurrentHub().startTransaction({
    ...transactionOptions
  }, customConfig);
}

module.exports = startTransactionWithOptions;