/**
 * Processes an asynchronous iterable stream of message events, tracking usage statistics, stop reason, and time to first token (TTFT).
 *
 * @async
 * @function processMessageStream
 * @param {AsyncIterable<Object> & { finalMessage: () => Promise<any> }} messageStream - An async iterable of message events, each with a 'type' and associated data. Must also provide a finalMessage() method.
 * @returns {Promise<{message: any, stopReason: string|null, ttftMs: number|null, usage: Object}>} An object containing the final message, stop reason, time to first token in ms, and merged usage statistics.
 */
async function processMessageStream(messageStream) {
  // Record the start time to calculate TTFT (Time To First Token)
  const startTimeMs = Date.now();

  // Will hold the stop reason when encountered
  let stopReason = null;

  // Will hold the time to first token in milliseconds
  let timeToFirstTokenMs = null;

  // Usage statistics accumulator, initialized to the base usage object
  let mergedUsageStats = od;

  // Iterate over each event in the message stream
  for await (const event of messageStream) {
    switch (event.type) {
      case "message_start":
        // On first message, record TTFT and merge usage stats
        timeToFirstTokenMs = Date.now() - startTimeMs;
        mergedUsageStats = mergeTokenUsageStats(mergedUsageStats, event.message.usage);
        break;
      case "message_delta":
        // On message delta, merge usage stats and capture stop reason if present
        mergedUsageStats = mergeTokenUsageStats(mergedUsageStats, event.usage);
        stopReason = event.delta.stop_reason;
        break;
      default:
        // Ignore unknown event types
        break;
    }
  }

  // Await the final message from the stream
  const finalMessage = await messageStream.finalMessage();

  // Return the collected results
  return {
    message: finalMessage,
    stopReason: stopReason,
    ttftMs: timeToFirstTokenMs,
    usage: mergedUsageStats
  };
}

module.exports = processMessageStream;