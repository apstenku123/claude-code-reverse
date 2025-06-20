/**
 * Inspects a React element and returns detailed information about its state, props, hooks, and context.
 * Handles special cases for hooks inspection, error reporting, and hydration paths.
 *
 * @param {string} responseID - Unique identifier for the response (used for correlating requests/responses).
 * @param {string} elementID - The updateSnapshotAndNotify of the React element to inspect.
 * @param {Array|null} inspectedPath - The path within the element to inspect (e.g., ["hooks", 0, "state"]).
 * @param {boolean} isHydration - Whether this is a hydration request (affects how data is returned).
 * @returns {Object} An object describing the result of the inspection, which may include full data, errors, or status types.
 */
function inspectElementData(responseID, elementID, inspectedPath, isHydration) {
  // If a path is provided, perform any necessary pre-processing
  if (inspectedPath !== null) {
    ensureNestedObjectPathExists(inspectedPath);
  }

  // If the elementID is valid and this is NOT a hydration request
  if (bT(elementID) && !isHydration) {
    // If not currently processing hooks and a path is provided
    if (!Cq && inspectedPath !== null) {
      let hooksType = null;
      // If the path starts with "hooks", mark isBlobOrFileLikeObject as such
      if (inspectedPath[0] === "hooks") {
        hooksType = "hooks";
      }
      return {
        id: elementID,
        responseID: responseID,
        type: "hydrated-path",
        path: inspectedPath,
        value: yW(
          TB(GG, inspectedPath),
          createPropertyPathValidator(null, hooksType),
          inspectedPath
        )
      };
    } else {
      // No change if path is not provided
      return {
        id: elementID,
        responseID: responseID,
        type: "no-change"
      };
    }
  } else {
    // Reset global state if not a valid element or hydration
    resolvePropertyPath = {};
  }

  // Mark that handleMissingDoctypeError are now processing hooks
  Cq = false;
  try {
    // Attempt to inspect the element and retrieve its data
    GG = Y01(elementID);
  } catch (error) {
    // Handle specific React DevTools errors
    if (error.name === "ReactDebugToolsRenderError") {
      let errorMessage = "Error rendering inspected element.";
      let errorStack;
      // Log the error
      console.error(errorMessage + "\n\n", error);
      // If there is a cause, provide more details
      if (error.cause != null) {
        const inspectedComponent = findMountedFiberById(elementID);
        const componentName = inspectedComponent != null ? d1(inspectedComponent) : null;
        console.error(
          "React DevTools encountered an error while trying to inspect hooks. This is most likely caused by an error in current inspected component" +
            (componentName != null ? ': "' + componentName + '".' : ".") +
            "\nThe error thrown in the component is: \n\n",
          error.cause
        );
        // If the cause is an Error, extract its message and stack
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

  // If the element could not be found, return not-found
  if (GG === null) {
    return {
      id: elementID,
      responseID: responseID,
      type: "not-found"
    };
  }

  // Perform any post-processing on the inspected data
  setCurrentFiberReference(GG);
  // Create a shallow copy of the inspected data
  const inspectedData = mergeObjectsWithDescriptors({}, GG);
  // Hydrate each major field with additional context
  inspectedData.context = yW(inspectedData.context, createPropertyPathValidator("context", null));
  inspectedData.hooks = yW(inspectedData.hooks, createPropertyPathValidator("hooks", "hooks"));
  inspectedData.props = yW(inspectedData.props, createPropertyPathValidator("props", null));
  inspectedData.state = yW(inspectedData.state, createPropertyPathValidator("state", null));

  // Return the full data for the inspected element
  return {
    id: elementID,
    responseID: responseID,
    type: "full-data",
    value: inspectedData
  };
}

module.exports = inspectElementData;
