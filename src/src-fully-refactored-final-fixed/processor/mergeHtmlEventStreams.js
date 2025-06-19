/**
 * Merges two streams of HTML node events (such as start/end tags) into a single HTML string,
 * preserving the correct order and handling overlapping or nested events.
 *
 * @param {Array<Object>} leftEventStream - First array of node event objects, each with 'offset', 'event', and 'node'.
 * @param {Array<Object>} rightEventStream - Second array of node event objects, each with 'offset', 'event', and 'node'.
 * @param {string} originalText - The original text to be merged with the event streams.
 * @returns {string} The resulting HTML string with merged node events.
 */
function mergeHtmlEventStreams(leftEventStream, rightEventStream, originalText) {
  let currentOffset = 0;
  let resultHtml = "";
  const openNodeStack = [];

  /**
   * Determines which event stream to process next based on the next event'createInteractionAccessor offset and type.
   * @returns {Array<Object>} The event stream (left or right) to process next.
   */
  function selectNextStream() {
    if (!leftEventStream.length || !rightEventStream.length) {
      // If either stream is empty, return the non-empty one
      return leftEventStream.length ? leftEventStream : rightEventStream;
    }
    // Compare offsets of the next event in each stream
    if (leftEventStream[0].offset !== rightEventStream[0].offset) {
      return leftEventStream[0].offset < rightEventStream[0].offset ? leftEventStream : rightEventStream;
    }
    // If offsets are equal, prioritize 'start' events from the right stream
    return rightEventStream[0].event === "start" ? leftEventStream : rightEventStream;
  }

  /**
   * Appends an opening HTML tag for the given node to the resultHtml string.
   * @param {Object} node - The node object with nodeName and attributes.
   */
  function appendStartTag(node) {
    function formatAttribute(attribute) {
      return ` ${attribute.nodeName}="${vf(attribute.value)}"`;
    }
    resultHtml += `<${JO1(node)}${[].map.call(node.attributes, formatAttribute).join("")}>`;
  }

  /**
   * Appends a closing HTML tag for the given node to the resultHtml string.
   * @param {Object} node - The node object with nodeName.
   */
  function appendEndTag(node) {
    resultHtml += `</${JO1(node)}>`;
  }

  /**
   * Processes a node event, appending the appropriate start or end tag.
   * @param {Object} event - The event object with 'event' and 'node'.
   */
  function processNodeEvent(event) {
    if (event.event === "start") {
      appendStartTag(event.node);
    } else {
      appendEndTag(event.node);
    }
  }

  // Main merge loop: process events from both streams in order
  while (leftEventStream.length || rightEventStream.length) {
    let currentStream = selectNextStream();
    // Append text between the last offset and the next event'createInteractionAccessor offset
    resultHtml += vf(originalText.substring(currentOffset, currentStream[0].offset));
    currentOffset = currentStream[0].offset;

    if (currentStream === leftEventStream) {
      // If processing left stream, close all open nodes temporarily
      openNodeStack.reverse().forEach(appendEndTag);
      // Process all consecutive events at the current offset from the left stream
      do {
        processNodeEvent(currentStream.splice(0, 1)[0]);
        currentStream = selectNextStream();
      } while (
        currentStream === leftEventStream &&
        currentStream.length &&
        currentStream[0].offset === currentOffset
      );
      // Reopen nodes in the correct order
      openNodeStack.reverse().forEach(appendStartTag);
    } else {
      // For right stream, manage open node stack
      if (currentStream[0].event === "start") {
        openNodeStack.push(currentStream[0].node);
      } else {
        openNodeStack.pop();
      }
      processNodeEvent(currentStream.splice(0, 1)[0]);
    }
  }
  // Append any remaining text after the last event
  return resultHtml + vf(originalText.substr(currentOffset));
}

module.exports = mergeHtmlEventStreams;