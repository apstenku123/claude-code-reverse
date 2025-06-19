/**
 * Constructs Sentry tracing headers (sentry-trace and baggage) based on the current request context, span, and propagation information.
 * Handles various header input types (Headers, array, plain object) and merges Sentry tracing data appropriately.
 *
 * @param {object} request - The original request object or headers source (could be a Request instance or plain object).
 * @param {object} clientConfig - The Sentry client configuration object.
 * @param {object} transaction - The current Sentry transaction or span context.
 * @param {object} createRequestOptions - The request options, possibly containing headers.
 * @param {object} [span] - Optional Sentry span object to extract context from.
 * @returns {Headers|Array|Object} - Returns headers with Sentry tracing info, matching the input type.
 */
function createSentryHeadersFromRequestContext(request, clientConfig, transaction, createRequestOptions, span) {
  // Determine the span to use: provided span or from transaction
  const activeSpan = span || transaction.getSpan();

  // Get the current isolation scope
  const isolationScope = uH.getIsolationScope();

  // Merge propagation contexts from isolation scope and transaction
  const {
    traceId,
    spanId,
    sampled,
    dsc: dynamicSamplingContext
  } = {
    ...isolationScope.getPropagationContext(),
    ...transaction.getPropagationContext()
  };

  // Generate the sentry-trace header value
  const sentryTraceHeader = activeSpan
    ? uH.spanToTraceHeader(activeSpan)
    : YP.generateSentryTraceHeader(traceId, spanId, sampled);

  // Generate the baggage header value
  const baggageHeader = YP.dynamicSamplingContextToSentryBaggageHeader(
    dynamicSamplingContext || (
      activeSpan
        ? uH.getDynamicSamplingContextFromSpan(activeSpan)
        : uH.getDynamicSamplingContextFromClient(traceId, clientConfig, transaction)
    )
  );

  // Determine the headers source
  let headers = createRequestOptions.headers ||
    (typeof Request !== "undefined" && YP.isInstanceOf(request, Request)
      ? request.headers
      : undefined);

  // If no headers are present, return an object with just the Sentry headers
  if (!headers) {
    return {
      "sentry-trace": sentryTraceHeader,
      baggage: baggageHeader
    };
  }

  // If headers is a Headers instance, clone and append Sentry headers
  if (typeof Headers !== "undefined" && YP.isInstanceOf(headers, Headers)) {
    const newHeaders = new Headers(headers);
    newHeaders.append("sentry-trace", sentryTraceHeader);
    if (baggageHeader) {
      newHeaders.append(YP.BAGGAGE_HEADER_NAME, baggageHeader);
    }
    return newHeaders;
  }

  // If headers is an array of [key, value] pairs, append Sentry headers
  if (Array.isArray(headers)) {
    const newHeadersArray = [...headers, ["sentry-trace", sentryTraceHeader]];
    if (baggageHeader) {
      newHeadersArray.push([YP.BAGGAGE_HEADER_NAME, baggageHeader]);
    }
    return newHeadersArray;
  }

  // Otherwise, treat headers as a plain object
  // Extract existing baggage (could be string or array)
  const existingBaggage = "baggage" in headers ? headers.baggage : undefined;
  const baggageValues = [];
  if (Array.isArray(existingBaggage)) {
    baggageValues.push(...existingBaggage);
  } else if (existingBaggage) {
    baggageValues.push(existingBaggage);
  }
  if (baggageHeader) {
    baggageValues.push(baggageHeader);
  }

  return {
    ...headers,
    "sentry-trace": sentryTraceHeader,
    baggage: baggageValues.length > 0 ? baggageValues.join(",") : undefined
  };
}

module.exports = { createSentryHeadersFromRequestContext };