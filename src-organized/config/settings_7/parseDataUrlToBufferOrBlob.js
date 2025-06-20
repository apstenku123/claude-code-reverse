/**
 * Parses a data URL and returns its contents as either a Buffer or a Blob, depending on the options provided.
 * Throws an error if the URL is invalid or the protocol is unsupported.
 *
 * @param {string} url - The URL string to parse. Expected to be a data URL.
 * @param {boolean} [asBlob] - If true, returns a Blob (if supported); otherwise, returns a Buffer.
 * @param {object} [options] - Optional configuration object. Can provide a custom Blob class via options.Blob.
 * @returns {Buffer|Blob} The decoded contents of the data URL as a Buffer or Blob.
 * @throws {Y2} If the URL is invalid or the protocol is unsupported.
 */
function parseDataUrlToBufferOrBlob(url, asBlob, options) {
  // Determine which Blob class to use (either from options or a global fallback)
  const BlobClass = (options && options.Blob) || H5.classes.Blob;
  // Extract the protocol type from the URL (e.g., 'data', 'http', etc.)
  const protocol = Dl(url);

  // If asBlob is undefined and BlobClass exists, default to true
  if (asBlob === undefined && BlobClass) {
    asBlob = true;
  }

  if (protocol === "data") {
    // Remove the protocol prefix (e.g., 'data:') from the URL
    const protocolPrefixLength = protocol.length;
    const dataUrl = protocolPrefixLength ? url.slice(protocolPrefixLength + 1) : url;
    // Parse the data URL using the hK9 RegExp
    const match = hK9.exec(dataUrl);
    if (!match) {
      throw new Y2("Invalid URL", Y2.ERR_INVALID_URL);
    }
    const mimeType = match[1];      // e.g., 'text/plain;charset=utf-8'
    const isBase64 = match[2];      // ';base64' if present, otherwise undefined
    const dataString = match[3];    // The actual data portion of the URL
    // Decode the data portion into a Buffer
    const buffer = Buffer.from(
      decodeURIComponent(dataString),
      isBase64 ? "base64" : "utf8"
    );
    if (asBlob) {
      if (!BlobClass) {
        throw new Y2("Blob is not supported", Y2.ERR_NOT_SUPPORT);
      }
      // Return a new Blob instance containing the buffer
      return new BlobClass([buffer], { type: mimeType });
    }
    // Return the Buffer directly
    return buffer;
  }
  // If protocol is not 'data', throw an unsupported protocol error
  throw new Y2(`Unsupported protocol ${protocol}`, Y2.ERR_NOT_SUPPORT);
}

module.exports = parseDataUrlToBufferOrBlob;
