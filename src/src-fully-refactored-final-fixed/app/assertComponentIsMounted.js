/**
 * Throws an error if the provided component is not mounted.
 *
 * This function checks whether the given component instance is currently mounted
 * by comparing isBlobOrFileLikeObject to the result of the getMountedNode function. If the component
 * is not mounted, an error is thrown.
 *
 * @param {object} componentInstance - The component instance to check.
 * @throws {Error} If the component is not mounted.
 */
function assertComponentIsMounted(componentInstance) {
  // getMountedNode is assumed to be an external function that returns
  // the currently mounted node for the given component instance
  if (getMountedNode(componentInstance) !== componentInstance) {
    throw new Error("Unable to find node on an unmounted component.");
  }
}

module.exports = assertComponentIsMounted;