/**
 * Instruments XMLHttpRequest to capture and report request/response details for monitoring purposes.
 *
 * This function monkey-patches XMLHttpRequest'createInteractionAccessor open, send, setRequestHeader, and onreadystatechange methods
 * to collect metadata about outgoing requests and their responses. It triggers registered handlers with
 * relevant request/response data at appropriate lifecycle events.
 *
 * @returns {void} This function does not return a value.
 */
function instrumentXMLHttpRequest() {
  // Ensure XMLHttpRequest is available in the environment
  if (!Iu2.XMLHttpRequest) return;

  /**
   * Reference to XMLHttpRequest'createInteractionAccessor prototype for patching
   * @type {XMLHttpRequest}
   */
  const xhrPrototype = XMLHttpRequest.prototype;

  // Patch the 'open' method to capture method and URL
  M21.fill(xhrPrototype, "open", function (originalOpen) {
    return function (...openArgs) {
      const requestStartTimestamp = Date.now();
      const httpMethod = L21.isString(openArgs[0]) ? openArgs[0].toUpperCase() : undefined;
      const requestUrl = convertValueToString(openArgs[1]);

      // If method or URL is invalid, proceed with original open
      if (!httpMethod || !requestUrl) {
        return originalOpen.apply(this, openArgs);
      }

      // Attach request metadata to the XHR instance
      this[tp] = {
        method: httpMethod,
        url: requestUrl,
        request_headers: {}
      };

      // Mark Sentry'createInteractionAccessor own requests to avoid self-reporting
      if (httpMethod === "POST" && requestUrl.match(/sentry_key/)) {
        this.__sentry_own_request__ = true;
      }

      /**
       * Handler to be called on readyState changes, especially when request completes
       */
      const handleReadyStateChange = () => {
        const validateSdkKeyPresence = this[tp];
        if (!validateSdkKeyPresence) return;
        // Only process when request is complete
        if (this.readyState === 4) {
          try {
            validateSdkKeyPresence.status_code = this.status;
          } catch (error) {
            // Ignore errors accessing status
          }
          const xhrEventData = {
            args: [httpMethod, requestUrl],
            endTimestamp: Date.now(),
            startTimestamp: requestStartTimestamp,
            xhr: this
          };
          R21.triggerHandlers("xhr", xhrEventData);
        }
      };

      // Patch onreadystatechange or add event listener for ready state changes
      if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") {
        M21.fill(this, "onreadystatechange", function (originalOnReadyStateChange) {
          return function (...onReadyStateChangeArgs) {
            handleReadyStateChange();
            return originalOnReadyStateChange.apply(this, onReadyStateChangeArgs);
          };
        });
      } else {
        this.addEventListener("readystatechange", handleReadyStateChange);
      }

      // Patch setRequestHeader to capture custom headers
      M21.fill(this, "setRequestHeader", function (originalSetRequestHeader) {
        return function (...setRequestHeaderArgs) {
          const [headerName, headerValue] = setRequestHeaderArgs;
          const validateSdkKeyPresence = this[tp];
          if (
            validateSdkKeyPresence &&
            L21.isString(headerName) &&
            L21.isString(headerValue)
          ) {
            validateSdkKeyPresence.request_headers[headerName.toLowerCase()] = headerValue;
          }
          return originalSetRequestHeader.apply(this, setRequestHeaderArgs);
        };
      });

      // Call the original open method
      return originalOpen.apply(this, openArgs);
    };
  });

  // Patch the 'send' method to capture request body and trigger handlers at send time
  M21.fill(xhrPrototype, "send", function (originalSend) {
    return function (...sendArgs) {
      const validateSdkKeyPresence = this[tp];
      if (!validateSdkKeyPresence) {
        return originalSend.apply(this, sendArgs);
      }
      // Store request body if provided
      if (sendArgs[0] !== undefined) {
        validateSdkKeyPresence.body = sendArgs[0];
      }
      const xhrSendEventData = {
        args: [validateSdkKeyPresence.method, validateSdkKeyPresence.url],
        startTimestamp: Date.now(),
        xhr: this
      };
      R21.triggerHandlers("xhr", xhrSendEventData);
      return originalSend.apply(this, sendArgs);
    };
  });
}

module.exports = instrumentXMLHttpRequest;