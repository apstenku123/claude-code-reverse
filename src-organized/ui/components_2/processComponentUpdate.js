/**
 * Processes a component update by reconciling its state and rendering output.
 * Handles update queues, flags, and invokes lifecycle hooks as needed.
 *
 * @param {Object|null} previousComponent - The previous component instance, or null if this is a mount.
 * @param {Object} currentComponent - The current component instance being processed.
 * @param {Object} renderContext - The context object containing the render method.
 * @param {any} previousRenderedOutput - The previously rendered output (children, elements, etc.).
 * @param {number} currentLane - The current priority lane for scheduling updates.
 * @returns {any} The child of the current component after processing the update.
 */
function processComponentUpdate(previousComponent, currentComponent, renderContext, previousRenderedOutput, currentLane) {
  // Extract the render method from the render context
  const renderMethod = renderContext.render;
  // Reference to the ref property of the current component
  const componentRef = currentComponent.ref;

  // Perform lifecycle initialization or checks
  decodeCodePointsToString(currentComponent, currentLane);

  // Reconcile the component'createInteractionAccessor children/output
  const nextRenderedOutput = wE(
    previousComponent,
    currentComponent,
    renderMethod,
    previousRenderedOutput,
    componentRef,
    currentLane
  );

  // Retrieve the current rendering context (possibly for hooks or context propagation)
  const currentRenderContext = resetAndCheckIfG3WasNonZero();

  // If this is an update (not a mount) and not in a special state (E9), handle update queue and flags
  if (previousComponent !== null && !E9) {
    // Carry over the update queue from the previous component
    currentComponent.updateQueue = previousComponent.updateQueue;
    // Clear specific flags on the current component
    currentComponent.flags &= -2053;
    // Clear the current lane from the previous component
    previousComponent.lanes &= ~currentLane;
    // Perform post-processing for the update
    return getTypeOfValue(previousComponent, currentComponent, currentLane);
  }

  // If in a special state (arrayEvery) and a render context exists, perform additional processing
  if (arrayEvery && currentRenderContext) {
    handleReturnIfPresent(currentComponent);
  }

  // Set the "PerformedWork" flag on the current component
  currentComponent.flags |= 1;

  // Finalize the update and process the rendered output
  updateChildNode(previousComponent, currentComponent, nextRenderedOutput, currentLane);

  // Return the child of the current component
  return currentComponent.child;
}

module.exports = processComponentUpdate;