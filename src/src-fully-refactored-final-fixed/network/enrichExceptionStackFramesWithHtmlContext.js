/**
 * Enriches exception stack frames in the provided event object with HTML context from the current document.
 *
 * This function inspects the event'createInteractionAccessor exception stack traces and, for each frame, attempts to add context lines
 * from the current HTML document. It only operates if the document and location are available, and if the exception
 * contains stacktrace frames. The function is typically used to provide richer debugging information for error events.
 *
 * @param {Object} event - The error event object, expected to have an 'exception.values' array with stacktraces.
 * @param {Object} options - Additional options/configuration to pass to the stack frame enrichment function.
 * @returns {Object} The original event object, possibly enriched with HTML context in its stack frames.
 */
function enrichExceptionStackFramesWithHtmlContext(event, options) {
  // Access the global document object
  const documentObject = processCssDeclarations$1.document;
  // Get the current location'createInteractionAccessor URL, stripped of query and fragment
  const currentUrl = processCssDeclarations$1.location && W$1.stripUrlQueryAndFragment(processCssDeclarations$1.location.href);

  // If document or URL is unavailable, return the event as-is
  if (!documentObject || !currentUrl) {
    return event;
  }

  // Extract exception values from the event
  const exceptionValues = event.exception && event.exception.values;
  if (!exceptionValues || !exceptionValues.length) {
    return event;
  }

  // Get the HTML content of the document
  const documentHtml = documentObject.documentElement.innerHTML;
  if (!documentHtml) {
    return event;
  }

  // Build an array representing the HTML document, including DOCTYPE and html tags
  const htmlLines = [
    '<!DOCTYPE html>',
    '<html>',
    ...documentHtml.split('\n'),
    '</html>'
  ];

  // For each exception value, enrich its stacktrace frames with HTML context
  exceptionValues.forEach(exceptionValue => {
    const stacktrace = exceptionValue.stacktrace;
    if (stacktrace && stacktrace.frames) {
      stacktrace.frames = stacktrace.frames.map(frame =>
        addContextToFrameIfMatch(frame, htmlLines, currentUrl, options)
      );
    }
  });

  return event;
}

module.exports = enrichExceptionStackFramesWithHtmlContext;