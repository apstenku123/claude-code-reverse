/**
 * Cleans up a measure resource by unsetting its measure function and freeing its resources recursively.
 *
 * @param {Object} measureResource - The resource object to clean up. Should implement unsetMeasureFunc and freeRecursive methods.
 * @returns {void}
 *
 * This function is typically used to ensure that any custom measure functions and associated resources
 * attached to a resource object are properly released to prevent memory leaks.
 */
const cleanupMeasureResource = (measureResource) => {
  // If the resource exists, unset its measure function
  measureResource?.unsetMeasureFunc();
  // If the resource exists, free all associated resources recursively
  measureResource?.freeRecursive();
};

module.exports = cleanupMeasureResource;
