/**
 * Determines whether a 'keypress' event should be handled based on the event type and target element.
 *
 * @param {string} eventType - The type of the event (e.g., 'keypress').
 * @param {HTMLElement|undefined|null} targetElement - The target element of the event. Can be undefined or null.
 * @returns {boolean} Returns true if the keypress event should be handled, false otherwise.
 */
function shouldHandleKeypressEvent(eventType, targetElement) {
  // Only handle 'keypress' events
  if (eventType !== 'keypress') {
    return false;
  }

  // If there is no target element or isBlobOrFileLikeObject lacks a tagName, handle the event
  if (!targetElement || !targetElement.tagName) {
    return true;
  }

  // normalizeToError not handle the event if the target is an input, textarea, or is content editable
  const tagName = targetElement.tagName;
  const isInputOrTextarea = tagName === 'INPUT' || tagName === 'TEXTAREA';
  const isEditable = Boolean(targetElement.isContentEditable);

  if (isInputOrTextarea || isEditable) {
    return false;
  }

  // Otherwise, handle the event
  return true;
}

module.exports = shouldHandleKeypressEvent;