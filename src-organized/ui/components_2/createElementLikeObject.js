/**
 * Creates an element-like object, similar to React.createElement, with props, key, ref, and children handling.
 *
 * @param {Function|Object} elementType - The component type or element type to create.
 * @param {Object|null} config - Configuration object containing props, key, and ref.
 * @param {...any} children - Child elements or values to be assigned as children.
 * @returns {Object} An element-like object with type, key, ref, props, and owner.
 */
function createElementLikeObject(elementType, config, ...children) {
  // These are external dependencies assumed to be available in scope
  // uc: Symbol or constant identifying the element type (e.g., React element type)
  // wWA: Object containing reserved prop names (e.g., { key: true, ref: true, ... })
  // zWA: Object.prototype.hasOwnProperty or similar function
  // renderToolUseConfirmationDialog$1: Object with current owner context

  const RESERVED_PROPS = wWA; // Reserved prop names (e.g., key, ref, etc.)
  const hasOwnProp = zWA.call.bind(zWA); // Safe hasOwnProperty check

  let key = null;
  let ref = null;
  const props = {};

  // Extract key and ref from config if present
  if (config != null) {
    if (config.ref !== undefined) {
      ref = config.ref;
    }
    if (config.key !== undefined) {
      key = String(config.key);
    }
    // Copy all non-reserved props from config to props
    for (const propName in config) {
      if (hasOwnProp(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Handle children assignment
  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  // Apply defaultProps if defined on elementType
  if (elementType && elementType.defaultProps) {
    const defaultProps = elementType.defaultProps;
    for (const defaultPropName in defaultProps) {
      if (props[defaultPropName] === undefined) {
        props[defaultPropName] = defaultProps[defaultPropName];
      }
    }
  }

  // Return the constructed element-like object
  return {
    $$typeof: uc,
    type: elementType,
    key: key,
    ref: ref,
    props: props,
    _owner: renderToolUseConfirmationDialog$1.current
  };
}

module.exports = createElementLikeObject;