/**
 * Normalizes and validates a URL input, accepting either a string or a URL-like object.
 * Ensures the URL uses http: or https: protocols and validates key properties.
 *
 * @param {string|object|URL} urlInput - The URL to normalize and validate. Can be a string, URL instance, or URL-like object.
 * @returns {URL} The normalized and validated URL object.
 * @throws {NI} If the input is invalid or does not meet protocol/format requirements.
 */
function normalizeAndValidateUrl(urlInput) {
  // Handle string input: parse as URL and validate protocol
  if (typeof urlInput === "string") {
    const parsedUrl = new URL(urlInput);
    if (!isHttpProtocolString(parsedUrl.origin || parsedUrl.protocol)) {
      throw new NI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }
    return parsedUrl;
  }

  // Ensure input is a non-null object
  if (!urlInput || typeof urlInput !== "object") {
    throw new NI("Invalid URL: The URL argument must be a non-null object.");
  }

  // If input is not a URL instance, validate and construct a URL
  if (!(urlInput instanceof URL)) {
    // Validate port if present
    if (urlInput.port != null && urlInput.port !== "" && Mb0(urlInput.port) === false) {
      throw new NI("Invalid URL: port must be a valid integer or a string representation of an integer.");
    }
    // Validate path if present
    if (urlInput.path != null && typeof urlInput.path !== "string") {
      throw new NI("Invalid URL path: the path must be a string or null/undefined.");
    }
    // Validate pathname if present
    if (urlInput.pathname != null && typeof urlInput.pathname !== "string") {
      throw new NI("Invalid URL pathname: the pathname must be a string or null/undefined.");
    }
    // Validate hostname if present
    if (urlInput.hostname != null && typeof urlInput.hostname !== "string") {
      throw new NI("Invalid URL hostname: the hostname must be a string or null/undefined.");
    }
    // Validate origin if present
    if (urlInput.origin != null && typeof urlInput.origin !== "string") {
      throw new NI("Invalid URL origin: the origin must be a string or null/undefined.");
    }
    // Validate protocol (either origin or protocol must be http/https)
    if (!isHttpProtocolString(urlInput.origin || urlInput.protocol)) {
      throw new NI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }

    // Determine port: explicit, or default based on protocol
    const port = urlInput.port != null
      ? urlInput.port
      : urlInput.protocol === "https:"
        ? 443
        : 80;

    // Build origin: explicit, or from protocol/hostname/port
    let origin = urlInput.origin != null
      ? urlInput.origin
      : `${urlInput.protocol || ""}//${urlInput.hostname || ""}:${port}`;

    // Build path: explicit, or from pathname and search
    let path = urlInput.path != null
      ? urlInput.path
      : `${urlInput.pathname || ""}${urlInput.search || ""}`;

    // Remove trailing slash from origin
    if (origin[origin.length - 1] === "/") {
      origin = origin.slice(0, origin.length - 1);
    }
    // Ensure path starts with a slash if not empty
    if (path && path[0] !== "/") {
      path = `/${path}`;
    }

    // Construct and return the normalized URL
    return new URL(`${origin}${path}`);
  }

  // If already a URL instance, validate protocol
  if (!isHttpProtocolString(urlInput.origin || urlInput.protocol)) {
    throw new NI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
  }
  return urlInput;
}

module.exports = normalizeAndValidateUrl;
