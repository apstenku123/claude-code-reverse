/**
 * Prevents the default action and stops propagation of a DOM event.
 *
 * @param {Event} event - The DOM event to suppress.
 * @returns {void}
 */
function suppressEvent(event) {
  // Prevent the default browser action for this event
  event.preventDefault();
  // Stop the event from bubbling up the DOM tree
  event.stopPropagation();
}

module.exports = suppressEvent;