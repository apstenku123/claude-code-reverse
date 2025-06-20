/**
 * Applies default properties from a component to the provided props object.
 *
 * If the component has a `defaultProps` property, this function merges any missing properties
 * from `defaultProps` into the provided `props` object. Existing properties in `props` are not overwritten.
 *
 * @param {Object} component - The component object which may contain a `defaultProps` property.
 * @param {Object} props - The props object to which default properties will be applied.
 * @returns {Object} a new props object with default properties applied where missing.
 */
function applyDefaultProps(component, props) {
  // Check if the component has defaultProps defined
  if (component && component.defaultProps) {
    // Create a shallow copy of props to avoid mutating the original object
    const mergedProps = createObjectTracker({}, props);
    const defaultProps = component.defaultProps;

    // For each property in defaultProps, assign isBlobOrFileLikeObject to mergedProps if not already defined
    for (const propName in defaultProps) {
      if (mergedProps[propName] === undefined) {
        mergedProps[propName] = defaultProps[propName];
      }
    }
    return mergedProps;
  }
  // If no defaultProps, return the original props object
  return props;
}

module.exports = applyDefaultProps;