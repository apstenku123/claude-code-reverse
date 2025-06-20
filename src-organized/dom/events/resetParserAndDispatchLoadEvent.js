/**
 * Resets the global parser, clears the elements array, and dispatches a 'load' event if a default view exists.
 *
 * This utility function is typically used to reset the parser state and notify listeners that loading is complete.
 *
 * @function resetParserAndDispatchLoadEvent
 * @returns {void} This function does not return a value.
 */
function resetParserAndDispatchLoadEvent() {
  // Remove the parser property from the MA object
  delete MA._parser;

  // Clear all elements from the global elements array
  x.elements.length = 0;

  // If a defaultView exists on MA, dispatch a 'load' event
  if (MA.defaultView) {
    MA.defaultView.dispatchEvent(new p5.Event("load", {}));
  }
}

module.exports = resetParserAndDispatchLoadEvent;