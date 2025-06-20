/**
 * Constructs a unique accessor key string by concatenating specific global and parameter values.
 *
 * @param {string} sourceObservable - The source observable identifier to include in the key.
 * @param {string} config - The configuration identifier to include in the key.
 * @returns {string} The constructed accessor key string.
 */
function buildAccessorKey(sourceObservable, config) {
  // These variables are assumed to be defined in the module'createInteractionAccessor scope
  // an, nn, gb are likely global constants or variables
  // The order and repetition are preserved to match the original behavior
  return [
    an,        // global variable 'an'
    "8",      // static string
    nn,        // global variable 'nn'
    nn,        // global variable 'nn' (repeated)
    config,    // parameter 'config'
    gb,        // global variable 'gb'
    sourceObservable, // parameter 'sourceObservable'
    an,        // global variable 'an' (repeated)
    "8",      // static string (repeated)
    nn,        // global variable 'nn' (repeated)
    nn,        // global variable 'nn' (repeated)
    gb         // global variable 'gb' (repeated)
  ].join("");
}

module.exports = buildAccessorKey;