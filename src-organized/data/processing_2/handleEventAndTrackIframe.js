/**
 * Handles an event by preventing its default behavior and propagation, determines the event target,
 * and if the target is an IFRAME, ensures isBlobOrFileLikeObject is tracked and wrapped for further processing.
 * Also notifies subscribers and triggers additional processing for the event target.
 *
 * @param {Event} event - The event object to handle.
 * @returns {void}
 */
function handleEventAndTrackIframe(event) {
  // Prevent default event behavior and stop propagation
  event.preventDefault();
  event.stopPropagation();

  // Determine the event target using the K2 utility
  const eventTarget = K2(event);

  // If the event target is already the last processed, do nothing further
  if (lastProcessedTarget === eventTarget) {
    return;
  }

  // Update the last processed target
  lastProcessedTarget = eventTarget;

  // If the event target is an IFRAME element
  if (eventTarget.tagName === "IFRAME") {
    const iframeElement = eventTarget;
    try {
      // If this IFRAME hasn'processRuleBeginHandlers been tracked yet
      if (!trackedIframes.has(iframeElement)) {
        // Get the contentWindow of the IFRAME
        const iframeWindow = iframeElement.contentWindow;
        // Wrap the window for chaining and further processing
        createChainedWrapper(iframeWindow);
        // Mark this IFRAME as tracked
        trackedIframes.add(iframeElement);
      }
    } catch (error) {
      // Silently ignore errors (e.g., cross-origin access)
    }
  }

  // Notify subscribers and trigger additional processing for the event target
  notifySubscribers([eventTarget], null, subscriberList, false);
  processEventTarget(eventTarget);
}

module.exports = handleEventAndTrackIframe;