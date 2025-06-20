/**
 * Merges two configuration objects for error and transaction handling.
 *
 * This function combines arrays of allowed URLs, denied URLs, ignored errors, and ignored transactions
 * from two configuration sources. It also applies default values for ignored errors and transactions
 * unless explicitly disabled in the primary configuration. The ignoreInternal flag is determined by the
 * primary configuration or defaults to true if not specified.
 *
 * @param {Object} primaryConfig - The primary configuration object. May contain:
 *   - allowUrls {string[]}: URLs to allow
 *   - denyUrls {string[]}: URLs to deny
 *   - ignoreErrors {string[]}: Errors to ignore
 *   - ignoreTransactions {string[]}: Transactions to ignore
 *   - disableErrorDefaults {boolean}: If true, do not use default ignored errors
 *   - disableTransactionDefaults {boolean}: If true, do not use default ignored transactions
 *   - ignoreInternal {boolean}: Whether to ignore internal errors (defaults to true)
 * @param {Object} secondaryConfig - The secondary configuration object. May contain the same properties as primaryConfig.
 * @returns {Object} The merged configuration object with combined arrays and resolved flags.
 */
function mergeErrorAndTransactionConfig(primaryConfig = {}, secondaryConfig = {}) {
  // External defaults for ignored errors and transactions
  // E09: Default ignored errors array
  // U09: Default ignored transactions array
  // These should be defined/imported elsewhere in your codebase
  
  return {
    // Combine allowed URLs from both configs
    allowUrls: [
      ...(primaryConfig.allowUrls || []),
      ...(secondaryConfig.allowUrls || [])
    ],
    // Combine denied URLs from both configs
    denyUrls: [
      ...(primaryConfig.denyUrls || []),
      ...(secondaryConfig.denyUrls || [])
    ],
    // Combine ignored errors from both configs, add defaults unless disabled
    ignoreErrors: [
      ...(primaryConfig.ignoreErrors || []),
      ...(secondaryConfig.ignoreErrors || []),
      // Only add default ignored errors if not disabled
      ...(primaryConfig.disableErrorDefaults ? [] : E09)
    ],
    // Combine ignored transactions from both configs, add defaults unless disabled
    ignoreTransactions: [
      ...(primaryConfig.ignoreTransactions || []),
      ...(secondaryConfig.ignoreTransactions || []),
      // Only add default ignored transactions if not disabled
      ...(primaryConfig.disableTransactionDefaults ? [] : U09)
    ],
    // Use ignoreInternal from primary config if defined, otherwise default to true
    ignoreInternal: primaryConfig.ignoreInternal !== undefined
      ? primaryConfig.ignoreInternal
      : true
  };
}

module.exports = mergeErrorAndTransactionConfig;