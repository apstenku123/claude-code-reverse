/**
 * Merges two ordered lists of HTML annotation events (such as start/end tag events) into a single HTML string,
 * preserving the correct order and nesting, and escaping any text between events.
 *
 * @param {Array<Object>} startEvents - Array of annotation events (e.g., start/end) from the first source, sorted by offset.
 * @param {Array<Object>} endEvents - Array of annotation events (e.g., start/end) from the second source, sorted by offset.
 * @param {string} originalText - The original text to annotate.
 * @returns {string} The annotated HTML string with all events merged and text escaped.
 */
function mergeAnnotatedHtmlEvents(startEvents, endEvents, originalText) {
  let currentOffset = 0;
  let resultHtml = "";
  const openTagStack = [];

  /**
   * Returns the event list (startEvents or endEvents) whose next event should be processed next.
   * If both are empty, returns an empty array.
   * If only one is non-empty, returns that one.
   * If both have events at the same offset, prioritizes start events from endEvents.
   * @returns {Array<Object>} The event list to process next.
   */
  function getNextEventList() {
    if (!startEvents.length || !endEvents.length) {
      return startEvents.length ? startEvents : endEvents;
    }
    if (startEvents[0].offset !== endEvents[0].offset) {
      return startEvents[0].offset < endEvents[0].offset ? startEvents : endEvents;
    }
    // If offsets are equal, prioritize 'start' event from endEvents
    return endEvents[0].event === "start" ? startEvents : endEvents;
  }

  /**
   * Appends an opening tag for the given node to resultHtml, including its attributes.
   * @param {Object} node - The node to open.
   */
  function appendOpenTag(node) {
    function renderAttribute(attribute) {
      return ` ${attribute.nodeName}="${vf(attribute.value)}"`;
    }
    resultHtml += `<${JO1(node)}${[].map.call(node.attributes, renderAttribute).join("")}>`;
  }

  /**
   * Appends a closing tag for the given node to resultHtml.
   * @param {Object} node - The node to close.
   */
  function appendCloseTag(node) {
    resultHtml += `</${JO1(node)}>`;
  }

  /**
   * Processes a single event, appending the appropriate tag to resultHtml.
   * @param {Object} event - The event to process.
   */
  function processEvent(event) {
    if (event.event === "start") {
      appendOpenTag(event.node);
    } else {
      appendCloseTag(event.node);
    }
  }

  // Main merge loop: process events in order, merging both lists
  while (startEvents.length || endEvents.length) {
    let eventList = getNextEventList();
    // Escape and append text between the last offset and the next event
    resultHtml += vf(originalText.substring(currentOffset, eventList[0].offset));
    currentOffset = eventList[0].offset;

    if (eventList === startEvents) {
      // If processing from startEvents, close any open tags (from openTagStack), process all contiguous events at this offset, then reopen tags
      openTagStack.reverse().forEach(appendCloseTag);
      do {
        processEvent(eventList.splice(0, 1)[0]);
        eventList = getNextEventList();
      } while (
        eventList === startEvents &&
        eventList.length &&
        eventList[0].offset === currentOffset
      );
      openTagStack.reverse().forEach(appendOpenTag);
    } else {
      // If processing from endEvents, manage openTagStack and process the event
      if (eventList[0].event === "start") {
        openTagStack.push(eventList[0].node);
      } else {
        openTagStack.pop();
      }
      processEvent(eventList.splice(0, 1)[0]);
    }
  }
  // Append any remaining text after the last event
  return resultHtml + vf(originalText.substr(currentOffset));
}

module.exports = mergeAnnotatedHtmlEvents;