/**
 * Processes two lists of node events (such as HTML tag start/end events) and merges them into a single annotated string,
 * preserving the correct order and nesting, based on their offsets in the original source string.
 *
 * @param {Array<Object>} startEvents - Array of node event objects (e.g., tag starts/ends) from the first source.
 * @param {Array<Object>} endEvents - Array of node event objects from the second source.
 * @param {string} sourceText - The original source string to be annotated.
 * @returns {string} - The annotated string with merged node events.
 */
function mergeAnnotatedHtmlEvents(startEvents, endEvents, sourceText) {
  let currentOffset = 0;
  let result = "";
  const openNodeStack = [];

  /**
   * Determines which event list (startEvents or endEvents) should be processed next.
   * Prefers the event with the lower offset, or prioritizes start events if offsets are equal.
   * @returns {Array<Object>} - The event list to process next.
   */
  function getNextEventList() {
    if (!startEvents.length || !endEvents.length) {
      // If either list is empty, return the non-empty one
      return startEvents.length ? startEvents : endEvents;
    }
    if (startEvents[0].offset !== endEvents[0].offset) {
      // Return the list whose next event has the lower offset
      return startEvents[0].offset < endEvents[0].offset ? startEvents : endEvents;
    }
    // If offsets are equal, prioritize endEvents if its event is 'start'
    return endEvents[0].event === "start" ? startEvents : endEvents;
  }

  /**
   * Appends an opening tag for a node to the result string.
   * @param {Object} node - The node object to open.
   */
  function appendOpeningTag(node) {
    function attributeToString(attribute) {
      // Formats an attribute as: name="value"
      return " " + attribute.nodeName + '="' + vf(attribute.value) + '"';
    }
    // JO1 presumably returns the tag name for the node
    result += "<" + JO1(node) + Array.from(node.attributes).map(attributeToString).join("") + ">";
  }

  /**
   * Appends a closing tag for a node to the result string.
   * @param {Object} node - The node object to close.
   */
  function appendClosingTag(node) {
    result += "</" + JO1(node) + ">";
  }

  /**
   * Appends either an opening or closing tag for an event'createInteractionAccessor node, depending on the event type.
   * @param {Object} event - The event object containing 'event' and 'node'.
   */
  function processNodeEvent(event) {
    if (event.event === "start") {
      appendOpeningTag(event.node);
    } else {
      appendClosingTag(event.node);
    }
  }

  // Main loop: process all events from both lists
  while (startEvents.length || endEvents.length) {
    let currentList = getNextEventList();
    // Append the substring from the last offset up to the next event'createInteractionAccessor offset
    result += vf(sourceText.substring(currentOffset, currentList[0].offset));
    currentOffset = currentList[0].offset;

    if (currentList === startEvents) {
      // When processing from startEvents, close all open nodes in reverse order
      openNodeStack.reverse().forEach(appendClosingTag);
      // Process all consecutive events at the current offset from startEvents
      do {
        processNodeEvent(currentList.splice(0, 1)[0]);
        currentList = getNextEventList();
      } while (
        currentList === startEvents &&
        currentList.length &&
        currentList[0].offset === currentOffset
      );
      // Re-open all nodes that were closed
      openNodeStack.reverse().forEach(appendOpeningTag);
    } else {
      // For endEvents, manage the open node stack
      if (currentList[0].event === "start") {
        openNodeStack.push(currentList[0].node);
      } else {
        openNodeStack.pop();
      }
      processNodeEvent(currentList.splice(0, 1)[0]);
    }
  }
  // Append any remaining text after the last event
  return result + vf(sourceText.substr(currentOffset));
}

module.exports = mergeAnnotatedHtmlEvents;