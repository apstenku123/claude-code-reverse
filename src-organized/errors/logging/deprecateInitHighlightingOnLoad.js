/**
 * Logs a deprecation warning for the initHighlightingOnLoad function and sets the deprecation flag.
 *
 * This function notifies users that 'initHighlightingOnLoad()' is deprecated and recommends using 'highlightAll()' instead.
 * It also sets a flag indicating that the deprecation warning has been triggered.
 *
 * @returns {void} This function does not return a value.
 */
function deprecateInitHighlightingOnLoad() {
  // Log the deprecation warning with version and message
  logDeprecationOnce(
    "10.6.0",
    "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."
  );

  // Set the deprecation flag to true
  deprecationWarningTriggered = true;
}

module.exports = deprecateInitHighlightingOnLoad;