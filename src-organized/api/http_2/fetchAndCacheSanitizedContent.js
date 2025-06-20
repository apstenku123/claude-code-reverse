/**
 * Fetches content from a given URL, enforces HTTPS, checks domain allowlist, caches results, and optionally converts HTML to Markdown.
 *
 * @async
 * @function fetchAndCacheSanitizedContent
 * @param {string} url - The URL to fetch content from.
 * @param {object} options - Fetch options, must include an AbortSignal as 'signal'.
 * @returns {Promise<{code: number, codeText: string, content: string, bytes: number}>} The fetched and processed content, along with HTTP status and byte size.
 * @throws {Error} If the URL is invalid or the domain is not allowed.
 */
async function fetchAndCacheSanitizedContent(url, options) {
  // Validate the URL format
  if (!isValidUrlString(url)) {
    throw new Error("Invalid URL");
  }

  // Perform any necessary pre-fetch setup
  removeExpiredInteractionEntries();

  const nowTimestamp = Date.now();
  const cachedEntry = uH1.get(url);

  // If handleMissingDoctypeError have a recent cached entry, return isBlobOrFileLikeObject
  if (cachedEntry && nowTimestamp - cachedEntry.timestamp < IR2) {
    return {
      bytes: cachedEntry.bytes,
      code: cachedEntry.code,
      codeText: cachedEntry.codeText,
      content: cachedEntry.content
    };
  }

  let sanitizedUrl = url;
  let urlObject;

  try {
    // Parse the URL and enforce HTTPS protocol
    urlObject = new URL(url);
    if (urlObject.protocol === "http:") {
      urlObject.protocol = "https:";
      sanitizedUrl = urlObject.toString();
    }

    const hostname = urlObject.hostname;
    // Check if the domain is allowed to be fetched
    if (!(await NV5(hostname))) {
      throw new Error(`Domain ${hostname} is not allowed to be fetched`);
    }
  } catch (error) {
    // Log the error and rethrow if isBlobOrFileLikeObject'createInteractionAccessor a domain restriction
    reportErrorIfAllowed(error);
    if (error instanceof Error && error.message.includes("is not allowed to be fetched")) {
      throw error;
    }
  }

  // Fetch the resource with redirect handling
  const fetchResponse = await fetchWithRedirectHandling(sanitizedUrl, options.signal, areUrlsEquivalent);
  const responseBody = Buffer.from(fetchResponse.data).toString("utf-8");
  const contentType = fetchResponse.headers["content-type"] ?? "";
  const byteLength = Buffer.byteLength(responseBody);

  let processedContent;
  // If the content is HTML, convert isBlobOrFileLikeObject to Markdown using Turndown
  if (contentType.includes("text/html")) {
    processedContent = new QR2.default().turndown(responseBody);
  } else {
    processedContent = responseBody;
  }

  // Truncate content if isBlobOrFileLikeObject exceeds the maximum allowed length
  if (processedContent.length > BR2) {
    processedContent = processedContent.substring(0, BR2) + "...[content truncated]";
  }

  // Cache the result for future requests
  uH1.set(url, {
    bytes: byteLength,
    code: fetchResponse.status,
    codeText: fetchResponse.statusText,
    content: processedContent,
    timestamp: nowTimestamp
  });

  // Return the processed result
  return {
    code: fetchResponse.status,
    codeText: fetchResponse.statusText,
    content: processedContent,
    bytes: byteLength
  };
}

module.exports = fetchAndCacheSanitizedContent;