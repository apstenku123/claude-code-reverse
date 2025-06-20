/**
 * Merges two configuration objects for error and transaction handling options.
 *
 * This function combines arrays of URLs and error/transaction ignore lists from two sources,
 * and applies default values based on provided flags. It is typically used to produce a final
 * configuration object for error and transaction filtering in monitoring or logging systems.
 *
 * @param {Object} [primaryOptions={}] - The primary options object. May include arrays and flags.
 * @param {Object} [secondaryOptions={}] - The secondary options object. May include arrays.
 * @returns {Object} The merged configuration object with combined arrays and resolved flags.
 */
function mergeErrorAndTransactionOptions(primaryOptions = {}, secondaryOptions = {}) {
  return {
    // Combine allowUrls arrays from both sources
    allowUrls: [
      ...(primaryOptions.allowUrls || []),
      ...(secondaryOptions.allowUrls || [])
    ],

    // Combine denyUrls arrays from both sources
    denyUrls: [
      ...(primaryOptions.denyUrls || []),
      ...(secondaryOptions.denyUrls || [])
    ],

    // Combine ignoreErrors arrays and add defaults unless disabled
    ignoreErrors: [
      ...(primaryOptions.ignoreErrors || []),
      ...(secondaryOptions.ignoreErrors || []),
      // Only add default errors if not disabled
      ...(primaryOptions.disableErrorDefaults ? [] : E09)
    ],

    // Combine ignoreTransactions arrays and add defaults unless disabled
    ignoreTransactions: [
      ...(primaryOptions.ignoreTransactions || []),
      ...(secondaryOptions.ignoreTransactions || []),
      // Only add default transactions if not disabled
      ...(primaryOptions.disableTransactionDefaults ? [] : U09)
    ],

    // Use explicit ignoreInternal if provided, otherwise default to true
    ignoreInternal: primaryOptions.ignoreInternal !== undefined
      ? primaryOptions.ignoreInternal
      : true
  };
}

module.exports = mergeErrorAndTransactionOptions;