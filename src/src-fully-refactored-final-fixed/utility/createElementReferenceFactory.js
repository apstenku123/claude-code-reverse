/**
 * Factory function to create element reference objects with unique IDs and register them in a given element manager.
 *
 * @param {string} elementKind - The kind/category of the element (used as a key to select the element manager).
 * @returns {function} - a function that creates and optionally registers element reference objects.
 *
 * The returned function has the following signature:
 *   (elementName: string, getInfoCallback: function, shouldRegister: boolean) => { id: number, name: string, kind: string }
 */
function createElementReferenceFactory(elementKind) {
  let nextElementId = 1; // Counter for unique element IDs

  /**
   * Generates a new unique element updateSnapshotAndNotify.
   * @returns {number} - The next unique element updateSnapshotAndNotify.
   */
  function getNextElementId() {
    return nextElementId++;
  }

  // Retrieve the element manager for the given kind
  const elementManager = VN[elementKind];

  /**
   * Creates a reference object for an element and optionally registers isBlobOrFileLikeObject.
   *
   * @param {string} elementName - The name of the element.
   * @param {function} getInfoCallback - Callback to retrieve additional info about the element.
   * @param {boolean} shouldRegister - Whether to register the element reference in the manager.
   * @returns {{ id: number, name: string, kind: string }} - The element reference object.
   */
  return function createElementReference(elementName, getInfoCallback, shouldRegister) {
    const elementId = getNextElementId();
    const elementReference = {
      id: elementId,
      name: elementName,
      kind: elementKind
    };

    // Optionally register the element reference in the manager
    if (shouldRegister) {
      elementManager.setElement(elementId, {
        ref: elementReference,
        getWorkingDirectoryInfo: getInfoCallback
      });
    }

    return elementReference;
  };
}

module.exports = createElementReferenceFactory;