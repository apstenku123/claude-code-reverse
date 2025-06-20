/**
 * Handles an event by preventing its default behavior and propagation, determines the event target,
 * and if the target is an IFRAME, notifies subscribers and wraps its contentWindow for chaining.
 * Also triggers additional logic for the event target.
 *
 * @param {Event} event - The event object to handle.
 * @returns {void}
 */
function handleEventAndNotifySubscribers(event) {
  // Prevent default action and stop event propagation
  event.preventDefault();
  event.stopPropagation();

  // Get the event target element using K2 utility
  const eventTarget = K2(event);

  // If the last processed target is the same as the current, do nothing
  if (lastProcessedTarget === eventTarget) return;

  // Update the last processed target
  lastProcessedTarget = eventTarget;

  // If the event target is an IFRAME element
  if (eventTarget.tagName === "IFRAME") {
    const iframeElement = eventTarget;
    try {
      // Only process if this IFRAME hasn'processRuleBeginHandlers been handled before
      if (!handledIframes.has(iframeElement)) {
        const iframeWindow = iframeElement.contentWindow;
        // Wrap the contentWindow for chaining
        createChainedWrapper(iframeWindow);
        // Mark this IFRAME as handled
        handledIframes.add(iframeElement);
      }
    } catch (error) {
      // Silently ignore errors (e.g., cross-origin access)
    }
  }

  // Notify subscribers with the current event target
  notifySubscribers([eventTarget], null, subscriberList, false);
  // Trigger additional logic for the event target
  handleEventTarget(eventTarget);
}

module.exports = handleEventAndNotifySubscribers;