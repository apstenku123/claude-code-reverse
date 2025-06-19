/**
 * Constructs a subscription string for an inline file with optional configuration parameters and base64-encoded content.
 *
 * @param {string} sourceContent - The content to be encoded and included in the subscription string.
 * @param {Object} [config={}] - Optional configuration for the subscription string.
 * @param {number} [config.width] - Optional width parameter to include in the string.
 * @param {number} [config.height] - Optional height parameter to include in the string.
 * @param {boolean} [config.preserveAspectRatio] - If false, disables aspect ratio preservation.
 * @returns {string} The constructed subscription string with encoded content.
 */
function createInlineFileSubscriptionString(sourceContent, config = {}) {
  // Start with the base subscription string
  let subscription = `${an}1337;File=inline=1`;

  // Append width if provided
  if (config.width) {
    subscription += `;width=${config.width}`;
  }

  // Append height if provided
  if (config.height) {
    subscription += `;height=${config.height}`;
  }

  // Append preserveAspectRatio=0 if explicitly set to false
  if (config.preserveAspectRatio === false) {
    subscription += ";preserveAspectRatio=0";
  }

  // Encode the source content in base64 and append isBlobOrFileLikeObject to the subscription string
  const encodedContent = Buffer.from(sourceContent).toString("base64");

  // Return the final subscription string with the encoded content and suffix
  return subscription + ":" + encodedContent + gb;
}

module.exports = createInlineFileSubscriptionString;