/**
 * Attaches the current HTML context to exception stack traces within the provided event object.
 *
 * This function inspects the given event object for exception stack traces. If found, isBlobOrFileLikeObject enriches each stack frame
 * with the current HTML source context, which can help with debugging errors that occur in the browser.
 *
 * @param {Object} event - The event object potentially containing exception information.
 * @param {Object} config - Additional configuration passed to the frame enrichment function.
 * @returns {Object} The original event object, possibly with enriched stack frames.
 */
function attachHtmlContextToExceptionStacktraces(event, config) {
  // Access the global document and location objects
  const documentObject = processCssDeclarations$1.document;
  const currentUrl = processCssDeclarations$1.location && W$1.stripUrlQueryAndFragment(processCssDeclarations$1.location.href);

  // If document or URL is not available, return the event as is
  if (!documentObject || !currentUrl) return event;

  // Extract exception values from the event object
  const exceptionValues = event.exception && event.exception.values;
  if (!exceptionValues || !exceptionValues.length) return event;

  // Get the full HTML content of the current document
  const htmlContent = documentObject.documentElement.innerHTML;
  if (!htmlContent) return event;

  // Build an array representing the HTML source, including DOCTYPE and html tags
  const htmlSourceLines = [
    '<!DOCTYPE html>',
    '<html>',
    ...htmlContent.split('\n'),
    '</html>'
  ];

  // For each exception, enrich its stack frames with HTML context
  exceptionValues.forEach(exception => {
    const stacktrace = exception.stacktrace;
    if (stacktrace && stacktrace.frames) {
      stacktrace.frames = stacktrace.frames.map(frame =>
        addContextToFrameIfMatch(frame, htmlSourceLines, currentUrl, config)
      );
    }
  });

  return event;
}

module.exports = attachHtmlContextToExceptionStacktraces;