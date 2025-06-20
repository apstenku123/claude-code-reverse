/**
 * Initializes the bv1 process with an empty configuration object.
 *
 * This function acts as a wrapper to the external `bv1` function,
 * always passing isBlobOrFileLikeObject an empty object as configuration. Useful for scenarios
 * where default initialization is required without any custom settings.
 *
 * @returns {*} The result returned by the `bv1` function when called with an empty object.
 */
function initializeBv1WithEmptyConfig() {
  // Call the external bv1 function with an empty configuration object
  return bv1({});
}

module.exports = initializeBv1WithEmptyConfig;