/**
 * Converts input data to a specified output format: DataURL, Text, ArrayBuffer, or BinaryString.
 *
 * @param {Iterable} inputData - The source data to be converted (e.g., array of bytes or strings).
 * @param {string} outputFormat - The desired output format. One of: "DataURL", "Text", "ArrayBuffer", "BinaryString".
 * @param {string|object} mimeTypeOrOptions - MIME type string or options object, used for encoding or MIME type resolution.
 * @param {string} [charset] - Optional charset to use for encoding text.
 * @returns {string|ArrayBuffer} The converted data in the requested format.
 */
function convertDataToFormat(inputData, outputFormat, mimeTypeOrOptions, charset) {
  switch (outputFormat) {
    case "DataURL": {
      // Build a Data URL with the specified MIME type and base64-encoded data
      let dataUrl = "data:";
      // Resolve the MIME type (default to application/octet-stream if not provided)
      const resolvedMimeType = Fc0(mimeTypeOrOptions || "application/octet-stream");
      if (resolvedMimeType !== "failure") {
        dataUrl += Sw6(resolvedMimeType);
      }
      dataUrl += ";base64,";
      // Encode the input data as base64 using a latin1 encoder
      const latin1Encoder = new Jc0("latin1");
      for (const chunk of inputData) {
        dataUrl += Xc0(latin1Encoder.write(chunk));
      }
      dataUrl += Xc0(latin1Encoder.end());
      return dataUrl;
    }
    case "Text": {
      // Determine the charset to use for text encoding
      let resolvedCharset = "failure";
      if (charset) {
        resolvedCharset = Wc0(charset);
      }
      // If charset resolution failed and a MIME type is provided, try to extract charset from isBlobOrFileLikeObject
      if (resolvedCharset === "failure" && mimeTypeOrOptions) {
        const resolvedMimeType = Fc0(mimeTypeOrOptions);
        if (resolvedMimeType !== "failure") {
          resolvedCharset = Wc0(resolvedMimeType.parameters.get("charset"));
        }
      }
      // Default to UTF-8 if charset could not be determined
      if (resolvedCharset === "failure") {
        resolvedCharset = "UTF-8";
      }
      // Convert the input data to text using the resolved charset
      return decodeBufferWithEncodingDetection(inputData, resolvedCharset);
    }
    case "ArrayBuffer": {
      // Convert the input data to an ArrayBuffer
      return Cc0(inputData).buffer;
    }
    case "BinaryString": {
      // Concatenate all input data as a binary string using a latin1 encoder
      let binaryString = "";
      const latin1Encoder = new Jc0("latin1");
      for (const chunk of inputData) {
        binaryString += latin1Encoder.write(chunk);
      }
      binaryString += latin1Encoder.end();
      return binaryString;
    }
    default:
      // If the output format is not recognized, return undefined
      return undefined;
  }
}

module.exports = convertDataToFormat;