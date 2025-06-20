/**
 * Creates a React element node based on the provided element type and configuration.
 * Handles various React element types (function, string, special symbols, and objects with $$typeof),
 * and returns the appropriate React Fiber node or collection iterator.
 *
 * @param {any} elementType - The type of the React element (function, string, symbol, or object).
 * @param {object} fiberOwnerProps - The props or configuration for the element.
 * @param {object} keyOrRef - The key or ref for the element.
 * @param {number} modeFlags - Bitmask flags indicating the mode or context for the element.
 * @param {number} priorityLanes - The priority lanes for the fiber node.
 * @param {number} renderLanes - The render lanes for the fiber node.
 * @returns {object} The created React Fiber node or collection iterator.
 */
function createReactElementNode(
  elementType,
  fiberOwnerProps,
  keyOrRef,
  modeFlags,
  priorityLanes,
  renderLanes
) {
  let fiberTag = 2; // Default fiber tag
  let resolvedType = elementType;

  // Handle function components
  if (typeof elementType === "function") {
    if (Gq(elementType)) {
      fiberTag = 1; // Special function component
    }
  } else if (typeof elementType === "string") {
    fiberTag = 5; // Host component (e.g., 'div', 'span')
  } else {
    // Handle special React symbols and objects
    switch (elementType) {
      case W:
        // Handle collection iterator
        return createCollectionIterator(fiberOwnerProps.children, priorityLanes, renderLanes, keyOrRef);
      case F:
        fiberTag = 8;
        priorityLanes |= 8;
        break;
      case streamAsyncIterableToWritable:
        // Special React element type streamAsyncIterableToWritable
        {
          const fiberNode = createM7Instance(12, fiberOwnerProps, keyOrRef, priorityLanes | 2);
          fiberNode.elementType = streamAsyncIterableToWritable;
          fiberNode.lanes = renderLanes;
          return fiberNode;
        }
      case sendHttpRequestOverSocket:
        // Special React element type sendHttpRequestOverSocket
        {
          const fiberNode = createM7Instance(13, fiberOwnerProps, keyOrRef, priorityLanes);
          fiberNode.elementType = sendHttpRequestOverSocket;
          fiberNode.lanes = renderLanes;
          return fiberNode;
        }
      case createDebouncedFunction:
        // Special React element type createDebouncedFunction
        {
          const fiberNode = createM7Instance(19, fiberOwnerProps, keyOrRef, priorityLanes);
          fiberNode.elementType = createDebouncedFunction;
          fiberNode.lanes = renderLanes;
          return fiberNode;
        }
      case createRefCountedMulticastOperator:
        // Handle special element type createRefCountedMulticastOperator
        return copyObjectExcludingProperties(fiberOwnerProps, priorityLanes, renderLanes, keyOrRef);
      default:
        // Handle objects with $$typeof property (React elements, providers, etc.)
        if (typeof elementType === "object" && elementType !== null) {
          switch (elementType.$$typeof) {
            case X:
              fiberTag = 10; // Context provider
              break;
            case C:
              fiberTag = 9; // Context consumer
              break;
            case renderToolUseConfirmationDialog:
              fiberTag = 11; // ForwardRef
              break;
            case operateWithLeadingTrailing:
              fiberTag = 14; // Memo
              break;
            case q:
              fiberTag = 16; // Lazy
              resolvedType = null;
              break;
            default:
              // Unknown object type
              throw Error(extractNestedPropertyOrArray(130, elementType == null ? elementType : typeof elementType, ""));
          }
        } else {
          // Unknown element type
          throw Error(extractNestedPropertyOrArray(130, elementType == null ? elementType : typeof elementType, ""));
        }
    }
  }

  // Create the fiber node for the element
  const fiberNode = createM7Instance(fiberTag, fiberOwnerProps, keyOrRef, priorityLanes);
  fiberNode.elementType = elementType;
  fiberNode.type = resolvedType;
  fiberNode.lanes = renderLanes;
  return fiberNode;
}

module.exports = createReactElementNode;