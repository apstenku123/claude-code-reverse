/**
 * Sets up event listeners on a DOM element to start inspecting native events, or emits a signal to start inspecting if no element is provided.
 *
 * @param {Element|null} targetElement - The DOM element to attach event listeners to. If null or invalid, emits a signal to start inspecting natively.
 */
function setStartInspectingNative(targetElement) {
  // Check if the provided element is valid and supports addEventListener
  if (targetElement && typeof targetElement.addEventListener === "function") {
    // Attach event listeners for various pointer and mouse events
    targetElement.addEventListener("click", handleClick, true);
    targetElement.addEventListener("mousedown", handleMouseEvent, true);
    targetElement.addEventListener("mouseover", handleMouseEvent, true);
    targetElement.addEventListener("mouseup", handleMouseEvent, true);
    targetElement.addEventListener("pointerdown", handlePointerDown, true);
    targetElement.addEventListener("pointermove", handlePointerMove, true);
    targetElement.addEventListener("pointerup", handlePointerUp, true);
  } else {
    // If no valid element, emit a signal to start inspecting natively
    eventEmitter.emit("startInspectingNative");
  }
}

module.exports = setStartInspectingNative;
