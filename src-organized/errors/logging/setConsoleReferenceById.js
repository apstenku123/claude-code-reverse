/**
 * Sets the current console reference (u.$r) based on the instance or element associated with the given id.
 *
 * Looks up the instance by id, determines its type, and sets u.$r accordingly:
 *   - If the instance is of type handleAccessorOperation (d6), sets u.$r to the instance'createInteractionAccessor _instance property.
 *   - If the instance is of type processHtmlElement, sets u.$r to an object containing the element'createInteractionAccessor props and type.
 *   - Otherwise, sets u.$r to null.
 *
 * @param {string} instanceId - The unique identifier for the instance or element to query.
 * @returns {void}
 */
function setConsoleReferenceById(instanceId) {
  // Retrieve the instance or element associated with the given id from the map 'createIterableHelper'
  const instanceRecord = createIterableHelper.get(instanceId);

  if (instanceRecord == null) {
    // Warn if the instance could not be found
    console.warn(`Could not find instance with id "${instanceId}"`);
    return;
  }

  // Determine the type of the instance using getElementTypeCategory
  const instanceType = getElementTypeCategory(instanceRecord);

  switch (instanceType) {
    case d6: // handleAccessorOperation type
      // Set the console reference to the instance'createInteractionAccessor _instance property
      u.$r = instanceRecord._instance;
      break;
    case processHtmlElement: // processHtmlElement type (likely a React element)
      const currentElement = instanceRecord._currentElement;
      if (currentElement == null) {
        // Warn if the element could not be found
        console.warn(`Could not find element with id "${instanceId}"`);
        return;
      }
      // Set the console reference to an object containing props and type
      u.$r = {
        props: currentElement.props,
        type: currentElement.type
      };
      break;
    default:
      // For any other type, set the console reference to null
      u.$r = null;
      break;
  }
}

module.exports = setConsoleReferenceById;
