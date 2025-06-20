/**
 * Creates a React Fiber node for a given element type, handling all supported React element types.
 *
 * @param {any} elementType - The type of the React element (string, function, or special symbol).
 * @param {object} elementProps - The props object for the element.
 * @param {object} key - The key for the element (used for reconciliation).
 * @param {number} mode - The mode flags for the fiber (e.g., concurrent, strict).
 * @param {number} lanes - The lanes (priority) for the fiber.
 * @param {number} priority - The priority level for the fiber.
 * @returns {object} The created React Fiber node.
 */
function createReactElementFiber(elementType, elementProps, key, mode, lanes, priority) {
  let fiberTag = 2; // Default tag for class/function components
  let resolvedType = elementType;

  // Handle function components
  if (typeof elementType === "function") {
    // If isBlobOrFileLikeObject'createInteractionAccessor a context provider/consumer or similar, adjust the tag
    if (Gq(elementType)) {
      fiberTag = 1;
    }
  } else if (typeof elementType === "string") {
    // Host components (e.g., 'div', 'span')
    fiberTag = 5;
  } else {
    // Handle special React element types (symbols/constants)
    switch (elementType) {
      case W:
        // Fragment
        return createCollectionIterator(elementProps.children, mode, priority, key);
      case F:
        // StrictMode
        fiberTag = 8;
        mode |= 8;
        break;
      case streamAsyncIterableToWritable:
        // Profiler
        const profilerFiber = createM7Instance(12, elementProps, key, mode | 2);
        profilerFiber.elementType = streamAsyncIterableToWritable;
        profilerFiber.lanes = priority;
        return profilerFiber;
      case sendHttpRequestOverSocket:
        // Suspense
        const suspenseFiber = createM7Instance(13, elementProps, key, mode);
        suspenseFiber.elementType = sendHttpRequestOverSocket;
        suspenseFiber.lanes = priority;
        return suspenseFiber;
      case createDebouncedFunction:
        // SuspenseList
        const suspenseListFiber = createM7Instance(19, elementProps, key, mode);
        suspenseListFiber.elementType = createDebouncedFunction;
        suspenseListFiber.lanes = priority;
        return suspenseListFiber;
      case createRefCountedMulticastOperator:
        // Offscreen
        return copyObjectExcludingProperties(elementProps, mode, priority, key);
      default:
        // Handle objects with $$typeof property (e.g., context, forwardRef, memo, etc.)
        if (typeof elementType === "object" && elementType !== null) {
          switch (elementType.$$typeof) {
            case X:
              // Context Provider
              fiberTag = 10;
              break;
            case C:
              // Context Consumer
              fiberTag = 9;
              break;
            case renderToolUseConfirmationDialog:
              // ForwardRef
              fiberTag = 11;
              break;
            case operateWithLeadingTrailing:
              // Memo
              fiberTag = 14;
              break;
            case q:
              // Lazy
              fiberTag = 16;
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
  const fiber = createM7Instance(fiberTag, elementProps, key, mode);
  fiber.elementType = elementType;
  fiber.type = resolvedType;
  fiber.lanes = priority;
  return fiber;
}

module.exports = createReactElementFiber;