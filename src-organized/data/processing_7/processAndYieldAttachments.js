/**
 * Processes attachments using provided parameters, notifies the system of attachment types,
 * and yields processed attachment results asynchronously.
 *
 * @async
 * @generator
 * @function processAndYieldAttachments
 * @param {Observable} sourceObservable - The source observable or data stream to process attachments from.
 * @param {Object} config - Configuration object for processing attachments.
 * @param {Object} subscription - Subscription or query object for filtering attachments.
 * @param {Object} options - Additional options for attachment processing.
 * @yields {Promise<any>} The result of processing each attachment via createAttachmentEntry.
 * @returns {AsyncGenerator<any>} An async generator yielding processed attachment results.
 */
async function* processAndYieldAttachments(sourceObservable, config, subscription, options) {
  // Retrieve the list of attachments based on the provided parameters
  const attachments = await aggregateAsyncDataWithAbort(sourceObservable, config, subscription, options);

  // If there are no attachments, exit early
  if (attachments.length < 1) return;

  // Notify the system with the types of the retrieved attachments
  logTelemetryEventIfEnabled("tengu_attachments", {
    attachment_types: attachments.map(attachment => attachment.type)
  });

  // Process each attachment and yield the result asynchronously
  for (const attachment of attachments) {
    yield createAttachmentEntry(attachment);
  }
}

module.exports = processAndYieldAttachments;