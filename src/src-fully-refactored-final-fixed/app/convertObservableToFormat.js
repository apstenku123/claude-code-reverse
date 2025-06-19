/**
 * Converts an observable-like input into a specified output format.
 *
 * Supported formats:
 * - "DataURL": Returns a data URL with base64 encoding.
 * - "Text": Returns a decoded text string using the specified charset.
 * - "ArrayBuffer": Returns an ArrayBuffer representation.
 * - "BinaryString": Returns a binary string (latin1 encoded).
 *
 * @param {Iterable} sourceObservable - The input iterable or array-like object to convert.
 * @param {string} outputFormat - The desired output format: "DataURL", "Text", "ArrayBuffer", or "BinaryString".
 * @param {any} subscription - Optional subscription or MIME type information (used for charset detection).
 * @param {string} [explicitCharset] - Optional explicit charset to use for text conversion.
 * @returns {any} The converted value in the requested format.
 */
function convertObservableToFormat(sourceObservable, outputFormat, subscription, explicitCharset) {
  switch (outputFormat) {
    case "DataURL": {
      // Build a data URL with base64 encoding
      let dataUrl = "data:";
      // Determine the MIME type
      const mimeType = Fc0(subscription || "application/octet-stream");
      if (mimeType !== "failure") {
        dataUrl += Sw6(mimeType);
      }
      dataUrl += ";base64,";
      // Encode the source as latin1, then base64
      const latin1Encoder = new Jc0("latin1");
      for (const chunk of sourceObservable) {
        dataUrl += Xc0(latin1Encoder.write(chunk));
      }
      // Finalize encoding
      dataUrl += Xc0(latin1Encoder.end());
      return dataUrl;
    }
    case "Text": {
      // Attempt to determine the charset to decode as text
      let charset = "failure";
      if (explicitCharset) {
        charset = Wc0(explicitCharset);
      }
      // If charset detection failed, try to extract from subscription
      if (charset === "failure" && subscription) {
        const mimeType = Fc0(subscription);
        if (mimeType !== "failure") {
          charset = Wc0(mimeType.parameters.get("charset"));
        }
      }
      // Default to UTF-8 if all else fails
      if (charset === "failure") {
        charset = "UTF-8";
      }
      // Convert the source to text using the detected charset
      return decodeBufferWithEncodingDetection(sourceObservable, charset);
    }
    case "ArrayBuffer": {
      // Convert the source to an ArrayBuffer
      return Cc0(sourceObservable).buffer;
    }
    case "BinaryString": {
      // Encode the source as a latin1 binary string
      let binaryString = "";
      const latin1Encoder = new Jc0("latin1");
      for (const chunk of sourceObservable) {
        binaryString += latin1Encoder.write(chunk);
      }
      binaryString += latin1Encoder.end();
      return binaryString;
    }
    default:
      // Unknown format
      throw new Error(`Unsupported output format: ${outputFormat}`);
  }
}

module.exports = convertObservableToFormat;
