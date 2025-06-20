/**
 * Creates an object that mimics a React element structure using the provided source element and key.
 *
 * @param {Object} sourceElement - The source object representing an element, containing type, ref, props, and _owner.
 * @param {string|null} elementKey - The unique key to identify the element in a collection.
 * @returns {Object} An object with the structure similar to a React element.
 */
function createReactElementLikeObject(sourceElement, elementKey) {
  return {
    // The React element type identifier (e.g., Symbol.for('react.element'))
    $$typeof: uc,
    // The type of the element (e.g., component or HTML tag)
    type: sourceElement.type,
    // The unique key for this element
    key: elementKey,
    // Reference to the element instance
    ref: sourceElement.ref,
    // Props to be passed to the element
    props: sourceElement.props,
    // Internal owner tracking (used by React for debugging)
    _owner: sourceElement._owner
  };
}

module.exports = createReactElementLikeObject;