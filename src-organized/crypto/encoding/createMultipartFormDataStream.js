/**
 * Creates a multipart/form-data stream from a FormData instance, returning an async generator
 * that yields encoded form data parts. Also generates appropriate HTTP headers for the request.
 *
 * @param {FormData} formData - The FormData instance to serialize.
 * @param {Function} [headerCallback] - Optional callback invoked with the generated headers object.
 * @param {Object} [options] - Optional configuration for boundary and size.
 * @param {string} [options.tag="form-data-boundary"] - Tag prefix for the boundary string.
 * @param {number} [options.size=25] - Length of the random boundary string.
 * @param {string} [options.boundary] - Custom boundary string (overrides tag+random).
 * @returns {AsyncGenerator<Uint8Array>} An async generator yielding encoded multipart form data.
 * @throws {TypeError} If formData is not a valid FormData instance.
 * @throws {Error} If the boundary length is invalid.
 */
const createMultipartFormDataStream = (formData, headerCallback, options) => {
  // Destructure and set defaults for options
  const {
    tag: boundaryTag = "form-data-boundary",
    size: boundarySize = 25,
    boundary: customBoundary = boundaryTag + "-" + H5.generateString(boundarySize, cK9)
  } = options || {};

  // Validate FormData instance
  if (!DA.isFormData(formData)) {
    throw new TypeError("FormData instance required");
  }

  // Validate boundary length (should be 10-70 characters)
  if (customBoundary.length < 1 || customBoundary.length > 70) {
    throw new Error("boundary must be 10-70 characters long");
  }

  // Encode boundary delimiters
  const CRLF = uq; // Assuming 'uq' is CRLF ("\r\n")
  const encodedBoundary = Yl.encode("--" + customBoundary + CRLF);
  const encodedFinalBoundary = Yl.encode("--" + customBoundary + "--" + CRLF + CRLF);

  // Calculate initial byte length for Content-Length header
  let totalByteLength = encodedBoundary.byteLength;

  // Map FormData entries to encoded parts and accumulate size
  const encodedParts = Array.from(formData.entries()).map(([fieldName, fieldValue]) => {
    const part = new wXA(fieldName, fieldValue); // wXA presumably encodes a single part
    totalByteLength += part.size;
    return part;
  });

  // Add boundary size for each part
  totalByteLength += encodedBoundary.byteLength * encodedParts.length;
  totalByteLength = DA.toFiniteNumber(totalByteLength);

  // Prepare headers
  const headers = {
    "Content-Type": `multipart/form-data; boundary=${customBoundary}`
  };
  if (Number.isFinite(totalByteLength)) {
    headers["Content-Length"] = totalByteLength;
  }

  // Invoke optional header callback
  if (headerCallback) {
    headerCallback(headers);
  }

  // Return an async generator yielding the multipart stream
  return pK9.from(async function* () {
    for (const part of encodedParts) {
      yield encodedBoundary; // Boundary delimiter before each part
      yield* part.encode();  // Yield the encoded part (may be multiple chunks)
    }
    yield encodedFinalBoundary; // Final boundary
  }());
};

module.exports = createMultipartFormDataStream;