/**
 * Merges two configuration objects for URL allow/deny lists, error and transaction ignore lists,
 * and internal ignore flag. Incorporates default error and transaction ignore lists unless disabled.
 *
 * @param {Object} [primaryConfig={}] - The primary configuration object. Can include:
 *   - allowUrls: Array of URLs to allow
 *   - denyUrls: Array of URLs to deny
 *   - ignoreErrors: Array of error patterns to ignore
 *   - ignoreTransactions: Array of transaction patterns to ignore
 *   - ignoreInternal: Boolean flag to ignore internal errors
 *   - disableErrorDefaults: Boolean flag to disable default error ignore list
 *   - disableTransactionDefaults: Boolean flag to disable default transaction ignore list
 * @param {Object} [secondaryConfig={}] - The secondary configuration object. Same structure as primaryConfig.
 * @returns {Object} The merged configuration object with combined allow/deny lists, ignore lists, and flags.
 */
function mergeUrlAndErrorConfig(primaryConfig = {}, secondaryConfig = {}) {
  // Merge allowUrls arrays from both configs
  const allowUrls = [
    ...(primaryConfig.allowUrls || []),
    ...(secondaryConfig.allowUrls || [])
  ];

  // Merge denyUrls arrays from both configs
  const denyUrls = [
    ...(primaryConfig.denyUrls || []),
    ...(secondaryConfig.denyUrls || [])
  ];

  // Merge ignoreErrors arrays and include defaults unless disabled
  const ignoreErrors = [
    ...(primaryConfig.ignoreErrors || []),
    ...(secondaryConfig.ignoreErrors || []),
    // Only include default error ignores if not disabled
    ...(primaryConfig.disableErrorDefaults ? [] : E09)
  ];

  // Merge ignoreTransactions arrays and include defaults unless disabled
  const ignoreTransactions = [
    ...(primaryConfig.ignoreTransactions || []),
    ...(secondaryConfig.ignoreTransactions || []),
    // Only include default transaction ignores if not disabled
    ...(primaryConfig.disableTransactionDefaults ? [] : U09)
  ];

  // Determine ignoreInternal flag: use primaryConfig if defined, otherwise default to true
  const ignoreInternal =
    primaryConfig.ignoreInternal !== undefined
      ? primaryConfig.ignoreInternal
      : true;

  return {
    allowUrls,
    denyUrls,
    ignoreErrors,
    ignoreTransactions,
    ignoreInternal
  };
}

module.exports = mergeUrlAndErrorConfig;
