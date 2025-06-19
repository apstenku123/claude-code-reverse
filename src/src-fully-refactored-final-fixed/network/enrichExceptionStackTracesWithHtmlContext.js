/**
 * Enriches exception stack traces in the given event object with HTML context from the current document.
 *
 * This function checks if the current document and location are available, then attempts to extract the full HTML
 * content. For each exception in the event, isBlobOrFileLikeObject maps its stack frames using the provided mapping function, enriching
 * them with context from the HTML source. If any required data is missing, the event is returned unchanged.
 *
 * @param {Object} event - The event object potentially containing exception stack traces to enrich.
 * @param {Object} contextConfig - Additional configuration/context to pass to the frame mapping function.
 * @returns {Object} The event object, potentially with enriched stack traces.
 */
function enrichExceptionStackTracesWithHtmlContext(event, contextConfig) {
  // Access the global document object
  const documentObject = processCssDeclarations$1.document;
  // Get the current location'createInteractionAccessor URL, stripped of query and fragment
  const currentUrl = processCssDeclarations$1.location && W$1.stripUrlQueryAndFragment(processCssDeclarations$1.location.href);

  // If document or location is not available, return the event as-is
  if (!documentObject || !currentUrl) {
    return event;
  }

  // Extract the exception values array from the event
  const exceptionValues = event.exception && event.exception.values;
  if (!exceptionValues || !exceptionValues.length) {
    return event;
  }

  // Get the full HTML content of the document
  const htmlContent = documentObject.documentElement.innerHTML;
  if (!htmlContent) {
    return event;
  }

  // Build an array representing the HTML source, including doctype and html tags
  const htmlSourceLines = [
    '<!DOCTYPE html>',
    '<html>',
    ...htmlContent.split('\n'),
    '</html>'
  ];

  // For each exception, map its stack frames to enrich them with HTML context
  exceptionValues.forEach(exception => {
    const stacktrace = exception.stacktrace;
    if (stacktrace && stacktrace.frames) {
      stacktrace.frames = stacktrace.frames.map(frame =>
        addContextToFrameIfMatch(frame, htmlSourceLines, currentUrl, contextConfig)
      );
    }
  });

  return event;
}

module.exports = enrichExceptionStackTracesWithHtmlContext;