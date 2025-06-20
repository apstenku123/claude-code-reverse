/**
 * Throws an error if the provided component node is not mounted in the DOM.
 *
 * @param {any} componentNode - The node or reference representing the component to check.
 * @throws {Error} If the node is not found on a mounted component.
 */
function assertComponentNodeIsMounted(componentNode) {
  // findRootWithTag is assumed to be a function that returns the mounted node for a given componentNode
  // If the returned node is not the same as the input, the component is unmounted
  if (findRootWithTag(componentNode) !== componentNode) {
    throw new Error("Unable to find node on an unmounted component.");
  }
}

module.exports = assertComponentNodeIsMounted;