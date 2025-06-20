/**
 * Creates a set of body parsing methods (blob, arrayBuffer, text, json, formData, bytes) for a given observable-like source.
 *
 * @param {any} sourceObservable - The source object (typically an observable or similar) whose emitted values will be parsed.
 * @returns {object} An object containing body parsing methods: blob, arrayBuffer, text, json, formData, bytes.
 *
 * Each method returns a Promise or observable (depending on isValueInRange implementation) that resolves with the parsed body.
 */
function createBodyParsers(sourceObservable) {
  return {
    /**
     * Parses the emitted value as a Blob, inferring the type from the content-type header if available.
     * @returns {Promise<Blob>} Parsed Blob object.
     */
    blob() {
      return isValueInRange(this, (subscription) => {
        // Attempt to get the content-type header from the current context
        let contentType = extractHeadersListFromInteraction(this);
        if (contentType === null) {
          contentType = "";
        } else if (contentType) {
          contentType = gJ6(contentType); // Normalize or process content-type
        }
        // Create a new Blob from the subscription value, with the inferred type
        return new fJ6([subscription], { type: contentType });
      }, sourceObservable);
    },

    /**
     * Parses the emitted value as an ArrayBuffer.
     * @returns {Promise<ArrayBuffer>} Parsed ArrayBuffer.
     */
    arrayBuffer() {
      return isValueInRange(this, (subscription) => {
        return new Uint8Array(subscription).buffer;
      }, sourceObservable);
    },

    /**
     * Parses the emitted value as text (string).
     * @returns {Promise<string>} Parsed text.
     */
    text() {
      return isValueInRange(this, $getOrUpdateIterableHelper, sourceObservable);
    },

    /**
     * Parses the emitted value as JSON.
     * @returns {Promise<any>} Parsed JSON object.
     */
    json() {
      return isValueInRange(this, iJ6, sourceObservable);
    },

    /**
     * Parses the emitted value as FormData, supporting both multipart/form-data and application/x-www-form-urlencoded.
     * @returns {Promise<FormData>} Parsed FormData object.
     * @throws {TypeError} If the content-type is unsupported or parsing fails.
     */
    formData() {
      return isValueInRange(this, (subscription) => {
        const contentType = extractHeadersListFromInteraction(this);
        if (contentType !== null) {
          switch (contentType.essence) {
            case "multipart/form-data": {
              // Attempt to parse multipart form data
              const parsedForm = hJ6(subscription, contentType);
              if (parsedForm === "failure") {
                throw new TypeError("Failed to parse body as FormData.");
              }
              const formData = new Uh0();
              formData[wh] = parsedForm;
              return formData;
            }
            case "application/x-www-form-urlencoded": {
              // Parse URL-encoded form data
              const searchParams = new URLSearchParams(subscription.toString());
              const formData = new Uh0();
              for (const [key, value] of searchParams) {
                formData.append(key, value);
              }
              return formData;
            }
          }
        }
        // If content-type is not supported, throw an error
        throw new TypeError('Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".');
      }, sourceObservable);
    },

    /**
     * Parses the emitted value as a Uint8Array (raw bytes).
     * @returns {Promise<Uint8Array>} Parsed bytes.
     */
    bytes() {
      return isValueInRange(this, (subscription) => {
        return new Uint8Array(subscription);
      }, sourceObservable);
    }
  };
}

module.exports = createBodyParsers;