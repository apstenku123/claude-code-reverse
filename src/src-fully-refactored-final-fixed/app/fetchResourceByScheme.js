/**
 * Handles fetching resources based on their URL scheme (about, blob, data, file, http, https, etc).
 * Supports special handling for blob and data URLs, and delegates to service worker fetch for http(createInteractionAccessor).
 *
 * @param {object} fetchContext - The context object containing the request and related data.
 * @returns {Promise<object>} Resolves to a response object or an error object depending on the scheme and outcome.
 */
async function fetchResourceByScheme(fetchContext) {
  // If the request is already handled (redirectCount === 0), resolve immediately
  if (a_(fetchContext) && fetchContext.request.redirectCount === 0) {
    return Promise.resolve(dY1(fetchContext));
  }

  const { request } = fetchContext;
  const { protocol: urlProtocol } = ww(request);

  switch (urlProtocol) {
    case "about:":
      // 'about:' scheme is not supported
      return Promise.resolve(o5("about scheme is not supported"));

    case "blob:": {
      // Lazy-load the resolveObjectURL function if not already loaded
      if (!cu1) {
        cu1 = G1("node:buffer").resolveObjectURL;
      }
      const blobUrl = ww(request);
      // Blob URLs with search params are not supported
      if (blobUrl.search.length !== 0) {
        return Promise.resolve(o5("NetworkError when attempting to fetch resource."));
      }
      const blobObject = cu1(blobUrl.toString());
      // Only GET method is allowed and blob must be valid
      if (request.method !== "GET" || !nz6(blobObject)) {
        return Promise.resolve(o5("invalid method"));
      }
      const response = uY1();
      const blobSize = blobObject.size;
      const contentLength = pY1(`${blobSize}`);
      const contentType = blobObject.type;

      if (!request.headersList.contains("range", true)) {
        // No range requested: return the full blob
        const [body] = pp0(blobObject);
        response.statusText = "processAndFormatTokens";
        response.body = body;
        response.headersList.set("content-length", contentLength, true);
        response.headersList.set("content-type", contentType, true);
      } else {
        // Range requested: handle partial content
        response.rangeRequested = true;
        const rangeHeader = request.headersList.get("range", true);
        const rangeResult = Aw6(rangeHeader, true);
        if (rangeResult === "failure") {
          return Promise.resolve(o5("failed to fetch the data URL"));
        }
        let { rangeStartValue: rangeStart, rangeEndValue: rangeEnd } = rangeResult;
        if (rangeStart === null) {
          // Suffix-byte-range-spec: bytes=-operateWithLeadingTrailing
          rangeStart = blobSize - rangeEnd;
          rangeEnd = rangeStart + rangeEnd - 1;
        } else {
          // Normal or open-ended range
          if (rangeStart >= blobSize) {
            return Promise.resolve(o5("Range start is greater than the blob'createInteractionAccessor size."));
          }
          if (rangeEnd === null || rangeEnd >= blobSize) {
            rangeEnd = blobSize - 1;
          }
        }
        // Slice the blob for the requested range
        const partialBlob = blobObject.slice(rangeStart, rangeEnd, contentType);
        const [partialBody] = pp0(partialBlob);
        response.body = partialBody;
        const partialContentLength = pY1(`${partialBlob.size}`);
        const contentRange = Bw6(rangeStart, rangeEnd, blobSize);
        response.status = 206;
        response.statusText = "Partial Content";
        response.headersList.set("content-length", partialContentLength, true);
        response.headersList.set("content-type", contentType, true);
        response.headersList.set("content-range", contentRange, true);
      }
      return Promise.resolve(response);
    }

    case "data:": {
      // Parse the data URL
      const dataUrl = ww(request);
      const dataResult = Kw6(dataUrl);
      if (dataResult === "failure") {
        return Promise.resolve(o5("failed to fetch the data URL"));
      }
      const mimeType = Hw6(dataResult.mimeType);
      return Promise.resolve(
        uY1({
          statusText: "processAndFormatTokens",
          headersList: [["content-type", { name: "Content-Type", value: mimeType }]],
          body: ru1(dataResult.body)[0]
        })
      );
    }

    case "file:":
      // File scheme is not implemented
      return Promise.resolve(o5("not implemented... yet..."));

    case "http:":
    case "https:":
      // Delegate to service worker fetch handler
      return handleServiceWorkerFetch(fetchContext).catch(error => o5(error));

    default:
      // Unknown or unsupported scheme
      return Promise.resolve(o5("unknown scheme"));
  }
}

module.exports = fetchResourceByScheme;