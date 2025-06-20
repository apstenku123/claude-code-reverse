/**
 * Retrieves a console instance or element by its unique updateSnapshotAndNotify and assigns isBlobOrFileLikeObject to the chained wrapper.
 *
 * Depending on the type of the instance, isBlobOrFileLikeObject either assigns the instance directly,
 * extracts and assigns its props and type, or sets the wrapper to null if not found.
 *
 * @param {string} instanceId - The unique identifier for the console instance or element.
 * @returns {void}
 */
function queryConsoleInstanceById(instanceId) {
  // Retrieve the instance from the map using the provided updateSnapshotAndNotify
  const instanceRecord = createIterableHelper.get(instanceId);

  if (instanceRecord == null) {
    console.warn(`Could not find instance with id "${instanceId}"`);
    return;
  }

  // Determine the type of the instance
  switch (getElementTypeCategory(instanceRecord)) {
    case d6: // If the instance is of accessor type
      u.$r = instanceRecord._instance;
      break;
    case processHtmlElement: // If the instance is a React element or similar
      const currentElement = instanceRecord._currentElement;
      if (currentElement == null) {
        console.warn(`Could not find element with id "${instanceId}"`);
        return;
      }
      // Assign only the props and type of the element to the wrapper
      u.$r = {
        props: currentElement.props,
        type: currentElement.type
      };
      break;
    default:
      // For any other type, set the wrapper to null
      u.$r = null;
      break;
  }
}

module.exports = queryConsoleInstanceById;