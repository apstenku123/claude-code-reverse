/**
 * Maps stack frames in exception objects to their corresponding lines in the current HTML document.
 *
 * This function inspects the provided event object for exception stack traces, and, if possible,
 * enriches each stack frame with source context from the current HTML document. This is useful for
 * error reporting tools that want to show the relevant HTML source for a given stack frame.
 *
 * @param {Object} event - The event object containing exception information (typically from an error report).
 * @param {Object} options - Additional options/configuration for mapping stack frames.
 * @returns {Object} The original event object, potentially with stack frames enriched with HTML source context.
 */
function mapStackFramesToHtmlSource(event, options) {
  // Access the global document and location objects
  const documentRef = processCssDeclarations$1.document;
  const currentUrl = processCssDeclarations$1.location && W$1.stripUrlQueryAndFragment(processCssDeclarations$1.location.href);

  // If document or URL is unavailable, return the event as-is
  if (!documentRef || !currentUrl) {
    return event;
  }

  // Extract exception values from the event
  const exceptionValues = event.exception && event.exception.values;
  if (!exceptionValues || !exceptionValues.length) {
    return event;
  }

  // Get the inner HTML of the document'createInteractionAccessor root element
  const documentHtml = documentRef.documentElement.innerHTML;
  if (!documentHtml) {
    return event;
  }

  // Build an array representing the full HTML document, line by line
  const htmlSourceLines = [
    '<!DOCTYPE html>',
    '<html>',
    ...documentHtml.split('\n'),
    '</html>'
  ];

  // For each exception value, map its stack frames to include HTML source context
  exceptionValues.forEach(exceptionValue => {
    const stacktrace = exceptionValue.stacktrace;
    if (stacktrace && stacktrace.frames) {
      stacktrace.frames = stacktrace.frames.map(frame =>
        addContextToFrameIfMatch(frame, htmlSourceLines, currentUrl, options)
      );
    }
  });

  return event;
}

module.exports = mapStackFramesToHtmlSource;