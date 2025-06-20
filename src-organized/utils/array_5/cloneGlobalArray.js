/**
 * Creates and returns a shallow copy of the global array 'globalArrayToClone'.
 *
 * This function is useful when you need a separate copy of the array to avoid mutating the original.
 *
 * @returns {Array<any>} a shallow copy of the global array 'globalArrayToClone'.
 */
function cloneGlobalArray() {
  // Return a shallow copy of the global array to prevent direct mutations
  return [...globalArrayToClone];
}

module.exports = cloneGlobalArray;