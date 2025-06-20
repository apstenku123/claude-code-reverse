/**
 * Inspects a React element and returns detailed data about its state, props, context, and hooks.
 * Handles special cases for hooks and error scenarios during inspection.
 *
 * @param {string} responseID - Unique identifier for the response.
 * @param {string} elementID - Unique identifier for the React element to inspect.
 * @param {Array|null} inspectedPath - Path within the element'createInteractionAccessor data to inspect (e.g., ['hooks', 0, 'state']).
 * @param {boolean} skipHydration - If true, skips hydration and returns minimal data.
 * @returns {Object} An object describing the inspection result, which may include full data, partial data, or error information.
 */
function inspectReactElementData(responseID, elementID, inspectedPath, skipHydration) {
  // If a specific path is provided, perform any necessary setup
  if (inspectedPath !== null) {
    ensureNestedObjectPathExists(inspectedPath);
  }

  // If the elementID is valid and handleMissingDoctypeError are not skipping hydration
  if (bT(elementID) && !skipHydration) {
    // If not already hydrating and a path is provided, return hydrated-path data
    if (!Cq) {
      if (inspectedPath !== null) {
        let inspectedType = null;
        if (inspectedPath[0] === "hooks") {
          inspectedType = "hooks";
        }
        return {
          id: elementID,
          responseID: responseID,
          type: "hydrated-path",
          path: inspectedPath,
          value: yW(
            TB(GG, inspectedPath),
            createPropertyPathValidator(null, inspectedType),
            inspectedPath
          )
        };
      } else {
        // No path provided, but valid elementID: no change
        return {
          id: elementID,
          responseID: responseID,
          type: "no-change"
        };
      }
    }
  } else {
    // Reset hydration state
    resolvePropertyPath = {};
  }

  // Mark as not hydrating
  Cq = false;

  try {
    // Attempt to retrieve the element'createInteractionAccessor data
    GG = Y01(elementID);
  } catch (inspectionError) {
    // Handle known React DevTools errors
    if (inspectionError.name === "ReactDebugToolsRenderError") {
      let errorMessage = "Error rendering inspected element.";
      let errorStack;
      // Log error to console
      console.error(errorMessage + "\n\n", inspectionError);
      if (inspectionError.cause != null) {
        const componentData = findMountedFiberById(elementID);
        const componentName = componentData != null ? d1(componentData) : null;
        console.error(
          "React DevTools encountered an error while trying to inspect hooks. This is most likely caused by an error in current inspected component" +
            (componentName != null ? ': "' + componentName + '".' : ".") +
            "\nThe error thrown in the component is: \n\n",
          inspectionError.cause
        );
        if (inspectionError.cause instanceof Error) {
          errorMessage = inspectionError.cause.message || errorMessage;
          errorStack = inspectionError.cause.stack;
        }
      }
      return {
        type: "error",
        errorType: "user",
        id: elementID,
        responseID: responseID,
        message: errorMessage,
        stack: errorStack
      };
    }
    if (inspectionError.name === "ReactDebugToolsUnsupportedHookError") {
      return {
        type: "error",
        errorType: "unknown-hook",
        id: elementID,
        responseID: responseID,
        message: "Unsupported hook in the react-debug-tools package: " + inspectionError.message
      };
    }
    // Handle all other errors
    console.error(`Error inspecting element.\n\n`, inspectionError);
    return {
      type: "error",
      errorType: "uncaught",
      id: elementID,
      responseID: responseID,
      message: inspectionError.message,
      stack: inspectionError.stack
    };
  }

  // If the element was not found
  if (GG === null) {
    return {
      id: elementID,
      responseID: responseID,
      type: "not-found"
    };
  }

  // Perform any necessary post-processing
  setCurrentFiberReference(GG);

  // Create a shallow copy of the element'createInteractionAccessor data
  const elementData = mergeObjectsWithDescriptors({}, GG);

  // Hydrate context, hooks, props, and state for the element
  elementData.context = yW(elementData.context, createPropertyPathValidator("context", null));
  elementData.hooks = yW(elementData.hooks, createPropertyPathValidator("hooks", "hooks"));
  elementData.props = yW(elementData.props, createPropertyPathValidator("props", null));
  elementData.state = yW(elementData.state, createPropertyPathValidator("state", null));

  // Return the full data for the inspected element
  return {
    id: elementID,
    responseID: responseID,
    type: "full-data",
    value: elementData
  };
}

module.exports = inspectReactElementData;