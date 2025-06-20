/**
 * Retrieves the instance and style properties associated with a given key from a map.
 *
 * @param {any} key - The key used to look up the entry in the map.
 * @returns {{ instance: any, style: any }} An object containing the instance and style (if available) for the given key.
 */
function getInstanceAndStyleFromMap(key) {
  // Retrieve the entry from the map using the provided key
  const entry = createIterableHelper.get(key);

  let instance = null;
  let style = null;

  if (entry != null) {
    // Extract the instance from the entry, if available
    instance = entry._instance || null;

    // Extract the style property from the current element'createInteractionAccessor props, if available
    const currentElement = entry._currentElement;
    if (currentElement != null && currentElement.props != null) {
      style = currentElement.props.style || null;
    }
  }

  return {
    instance,
    style
  };
}

module.exports = getInstanceAndStyleFromMap;