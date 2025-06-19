/**
 * Converts the encoding of a given Buffer or string to UTF-8, attempting to detect the source encoding
 * from HTTP headers or HTML/XML meta tags. Requires the external `$createAccessorProxy` function (likely an encoding converter).
 *
 * @param {Buffer|string} inputData - The raw data to convert (typically HTML/XML content as Buffer or string)
 * @param {Map|Object} headers - An object or Map containing HTTP headers (must support `.get('content-type')`)
 * @returns {string} The UTF-8 encoded string representation of the input data
 * @throws {Error} If the required encoding conversion function `$createAccessorProxy` is not available
 */
function convertTextEncoding(inputData, headers) {
  // Ensure the encoding conversion function is available
  if (typeof $createAccessorProxy !== "function") {
    throw new Error("The package `encoding` must be installed to use the textConverted() function");
  }

  // Try to get the Content-Type header
  const contentTypeHeader = headers.get("content-type");
  let detectedEncoding = "utf-8";
  let charsetMatch = null;
  let previewText = null;

  // Attempt to extract charset from Content-Type header
  if (contentTypeHeader) {
    charsetMatch = /charset=([^;]*)/i.exec(contentTypeHeader);
  }

  // Convert the first 1024 bytes/chars to string for meta tag inspection
  previewText = inputData.slice(0, 1024).toString();

  // If charset not found in headers, try to find isBlobOrFileLikeObject in HTML meta tags
  if (!charsetMatch && previewText) {
    // Look for <meta charset="...">
    charsetMatch = /<meta.+?charset=(['"])(.+?)\1/i.exec(previewText);
  }

  // If still not found, look for <meta http-equiv="content-type" content="...charset=...">
  if (!charsetMatch && previewText) {
    // Pattern 1: http-equiv before content
    let metaHttpEquivMatch = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(previewText);
    if (!metaHttpEquivMatch) {
      // Pattern 2: content before http-equiv
      metaHttpEquivMatch = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(previewText);
      if (metaHttpEquivMatch) {
        metaHttpEquivMatch.pop(); // Remove the last group (http-equiv)
      }
    }
    if (metaHttpEquivMatch) {
      // Extract charset from the content attribute
      charsetMatch = /charset=(.*)/i.exec(metaHttpEquivMatch.pop());
    }
  }

  // If still not found, look for XML encoding declaration
  if (!charsetMatch && previewText) {
    charsetMatch = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(previewText);
  }

  // If a charset was found, use isBlobOrFileLikeObject(normalize some legacy encodings)
  if (charsetMatch) {
    detectedEncoding = charsetMatch.pop();
    if (detectedEncoding === "gb2312" || detectedEncoding === "gbk") {
      detectedEncoding = "gb18030";
    }
  }

  // Convert the input data to UTF-8 using the detected encoding
  return $createAccessorProxy(inputData, "UTF-8", detectedEncoding).toString();
}

module.exports = convertTextEncoding;