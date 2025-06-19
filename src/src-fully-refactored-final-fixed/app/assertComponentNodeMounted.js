/**
 * Throws an error if the provided component instance is not currently mounted in the DOM.
 *
 * @param {object} componentInstance - The component instance to check for mounting status.
 * @throws {Error} Throws an error if the component is unmounted or its node cannot be found.
 */
function assertComponentNodeMounted(componentInstance) {
  // findRootWithTag is assumed to be a function that retrieves the DOM node for the component instance
  // If the retrieved node does not match the provided instance, the component is unmounted
  if (getComponentNode(componentInstance) !== componentInstance) {
    throw new Error("Unable to find node on an unmounted component.");
  }
}

// Alias for the external function findRootWithTag, assumed to retrieve the DOM node for a component instance
// Replace this with the actual import or implementation as needed
const getComponentNode = findRootWithTag;

module.exports = assertComponentNodeMounted;