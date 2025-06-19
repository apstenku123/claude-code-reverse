/**
 * Inspects a React element and returns detailed information about its state, props, hooks, and context.
 * Handles special cases for hooks inspection, errors, and not-found elements.
 *
 * @param {string} responseID - Unique identifier for the inspection response.
 * @param {string} elementID - Unique identifier for the React element to inspect.
 * @param {Array|null} inspectedPath - Path within the element to inspect (e.g., for hooks or props), or null for full inspection.
 * @param {boolean} skipHydration - If true, skips hydration and returns minimal data.
 * @returns {Object} Inspection result object containing type, data, and error info if applicable.
 */
function inspectReactElement(responseID, elementID, inspectedPath, skipHydration) {
  // If a specific path is provided, perform any required setup
  if (inspectedPath !== null) {
    ensureNestedObjectPathExists(inspectedPath);
  }

  // If the elementID is valid and handleMissingDoctypeError're not skipping hydration
  if (bT(elementID) && !skipHydration) {
    // If global hydration flag is not set, and a path is provided
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
        // No path provided, return no-change
        return {
          id: elementID,
          responseID: responseID,
          type: "no-change"
        };
      }
    }
  } else {
    // Reset hydration state if skipping hydration or invalid elementID
    resolvePropertyPath = {};
  }

  // Reset global hydration flag
  Cq = false;

  // Try to inspect the element
  try {
    GG = Y01(elementID);
  } catch (error) {
    // Handle known React Debug Tools errors
    if (error.name === "ReactDebugToolsRenderError") {
      let errorMessage = "Error rendering inspected element.";
      let errorStack;
      // Log error to console
      console.error(errorMessage + "\n\n", error);
      if (error.cause != null) {
        const component = findMountedFiberById(elementID);
        const componentName = component != null ? d1(component) : null;
        console.error(
          "React DevTools encountered an error while trying to inspect hooks. This is most likely caused by an error in current inspected component" +
            (componentName != null ? ': "' + componentName + '".' : ".") +
            "\nThe error thrown in the component is: \n\n",
          error.cause
        );
        if (error.cause instanceof Error) {
          errorMessage = error.cause.message || errorMessage;
          errorStack = error.cause.stack;
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
    if (error.name === "ReactDebugToolsUnsupportedHookError") {
      return {
        type: "error",
        errorType: "unknown-hook",
        id: elementID,
        responseID: responseID,
        message: "Unsupported hook in the react-debug-tools package: " + error.message
      };
    }
    // Handle all other errors
    console.error(`Error inspecting element.\n\n`, error);
    return {
      type: "error",
      errorType: "uncaught",
      id: elementID,
      responseID: responseID,
      message: error.message,
      stack: error.stack
    };
  }

  // If the element could not be found
  if (GG === null) {
    return {
      id: elementID,
      responseID: responseID,
      type: "not-found"
    };
  }

  // Perform post-processing on the inspected element
  setCurrentFiberReference(GG);

  // Clone the inspected data
  const inspectedData = mergeObjectsWithDescriptors({}, GG);

  // Hydrate context, hooks, props, and state with additional metadata
  inspectedData.context = yW(inspectedData.context, createPropertyPathValidator("context", null));
  inspectedData.hooks = yW(inspectedData.hooks, createPropertyPathValidator("hooks", "hooks"));
  inspectedData.props = yW(inspectedData.props, createPropertyPathValidator("props", null));
  inspectedData.state = yW(inspectedData.state, createPropertyPathValidator("state", null));

  // Return the full inspection result
  return {
    id: elementID,
    responseID: responseID,
    type: "full-data",
    value: inspectedData
  };
}

module.exports = inspectReactElement;
