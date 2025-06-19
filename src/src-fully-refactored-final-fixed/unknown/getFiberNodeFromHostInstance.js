/**
 * Retrieves the React Fiber node associated with a given host DOM instance.
 *
 * @param {HTMLElement} hostInstance - The host DOM node (such as a native HTML element) for which to find the corresponding React Fiber node.
 * @returns {Object|null} The React Fiber node associated with the given host instance, or null if not found.
 */
function getFiberNodeFromHostInstance(hostInstance) {
  // Use the external React internals to find the Fiber node for the DOM instance
  return f.findFiberByHostInstance(hostInstance);
}

module.exports = getFiberNodeFromHostInstance;