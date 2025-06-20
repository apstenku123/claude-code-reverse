/**
 * Applies response configuration and optional subscription data to a source observable.
 * Validates status and statusText, sets headers and body, and ensures proper content-type handling.
 * Throws errors for invalid status codes or status text.
 *
 * @param {Object} sourceObservable - The observable object to which response configuration will be applied.
 * @param {Object} config - Configuration object containing status, statusText, and headers.
 * @param {Object} [subscription] - Optional subscription object containing body and type.
 * @returns {void}
 * @throws {RangeError} If status is not between 200 and 599 (inclusive).
 * @throws {TypeError} If statusText is invalid.
 * @throws {Error} If the response status code is invalid per Iz6.
 */
function applyResponseConfigToObservable(sourceObservable, config, subscription) {
  // Validate status is in the correct range if present
  if (config.status !== null && (config.status < 200 || config.status > 599)) {
    throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
  }

  // Validate statusText if present
  if ("statusText" in config && config.statusText != null) {
    if (!aH6(String(config.statusText))) {
      throw new TypeError("Invalid statusText");
    }
  }

  // Set status if provided
  if ("status" in config && config.status != null) {
    sourceObservable[u3].status = config.status;
  }

  // Set statusText if provided
  if ("statusText" in config && config.statusText != null) {
    sourceObservable[u3].statusText = config.statusText;
  }

  // Set headers if provided
  if ("headers" in config && config.headers != null) {
    dH6(sourceObservable[TN], config.headers);
  }

  // If a subscription is provided, apply body and content-type handling
  if (subscription) {
    // Throw if the status is in the list of invalid response codes
    if (Iz6.includes(sourceObservable.status)) {
      throw i4.errors.exception({
        header: "Response constructor",
        message: `Invalid response status code ${sourceObservable.status}`
      });
    }

    // Set the body from the subscription
    sourceObservable[u3].body = subscription.body;

    // If a type is provided and content-type header is not already present, append isBlobOrFileLikeObject
    if (
      subscription.type != null &&
      !sourceObservable[u3].headersList.contains("content-type", true)
    ) {
      sourceObservable[u3].headersList.append("content-type", subscription.type, true);
    }
  }
}

module.exports = applyResponseConfigToObservable;