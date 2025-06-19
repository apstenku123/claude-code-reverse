/**
 * Prevents the default action and stops propagation for a given DOM event.
 *
 * @param {Event} event - The DOM event to suppress.
 * @returns {void}
 */
function suppressEventDefaultAndPropagation(event) {
  // Prevent the default browser behavior for this event
  event.preventDefault();
  // Stop the event from bubbling up the DOM tree
  event.stopPropagation();
}

module.exports = suppressEventDefaultAndPropagation;