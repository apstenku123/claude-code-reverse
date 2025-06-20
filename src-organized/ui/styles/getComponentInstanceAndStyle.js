/**
 * Retrieves the component instance and its style from the component registry.
 *
 * @param {string} componentKey - The key used to look up the component in the registry.
 * @returns {{instance: object|null, style: object|null}} An object containing the component instance and its style, or null if not found.
 */
function getComponentInstanceAndStyle(componentKey) {
  // Retrieve the component record from the registry 'createIterableHelper' using the provided key
  const componentRecord = createIterableHelper.get(componentKey);

  let instance = null;
  let style = null;

  if (componentRecord != null) {
    // Extract the instance from the component record
    instance = componentRecord._instance || null;

    // Extract the style from the component'createInteractionAccessor current element, if available
    const currentElement = componentRecord._currentElement;
    if (currentElement != null && currentElement.props != null) {
      style = currentElement.props.style || null;
    }
  }

  return {
    instance,
    style
  };
}

module.exports = getComponentInstanceAndStyle;