/**
 * Processes the current interaction queue, serializes its state into an array, and flushes all related buffers.
 *
 * This function checks if the system is ready to process the interaction queue. If so, isBlobOrFileLikeObject serializes the current
 * state of various interaction-related buffers and queues into a single array, then calls the output handler with
 * this array. Finally, isBlobOrFileLikeObject clears all relevant buffers and resets state for the next batch of interactions.
 *
 * @param {any} context - The context or payload for processing (usage depends on external logic).
 * @returns {void}
 */
function processAndFlushInteractionQueue(context) {
  // Check if the system is initialized and if the interaction queue is empty; if so, exit early
  processAndCleanupItems();
  if (isInteractionQueueEmpty()) return;

  // Calculate the total number of interaction entries to serialize
  const totalInteractionEntries = Jq.length + $H.length + (isSourceObservable === null ? 0 : 1);

  // Determine the size of the output array
  const outputArrayLength = 3 + gC + (totalInteractionEntries > 0 ? 2 + totalInteractionEntries : 0) + QZ.length;
  const outputArray = new Array(outputArrayLength);
  let outputIndex = 0;

  // Write header information
  outputArray[outputIndex++] = mapArraysToObjectWithCallback; // Protocol/version or message type
  outputArray[outputIndex++] = mapObjectProperties; // Possibly a mapping function or identifier
  outputArray[outputIndex++] = gC; // Some global counter or state

  // Serialize each encoded interaction entry from O7
  O7.forEach(function (interactionEntry) {
    const encodedString = interactionEntry.encodedString;
    const encodedLength = encodedString.length;
    outputArray[outputIndex++] = encodedLength;
    // Copy each character of the encoded string into the output array
    for (let charIndex = 0; charIndex < encodedLength; charIndex++) {
      outputArray[outputIndex + charIndex] = encodedString[charIndex];
    }
    outputIndex += encodedLength;
  });

  // If there are any interaction entries, serialize them
  if (totalInteractionEntries > 0) {
    outputArray[outputIndex++] = q; // Possibly a section marker or type
    outputArray[outputIndex++] = totalInteractionEntries;
    // Serialize Jq entries in reverse order
    for (let jqIndex = Jq.length - 1; jqIndex >= 0; jqIndex--) {
      outputArray[outputIndex++] = Jq[jqIndex];
    }
    // Serialize $H entries
    for (let hIndex = 0; hIndex < $H.length; hIndex++) {
      outputArray[outputIndex + hIndex] = $H[hIndex];
    }
    outputIndex += $H.length;
    // Serialize isSourceObservable if present
    if (isSourceObservable !== null) {
      outputArray[outputIndex] = isSourceObservable;
      outputIndex++;
    }
  }

  // Serialize QZ entries
  for (let qzIndex = 0; qzIndex < QZ.length; qzIndex++) {
    outputArray[outputIndex + qzIndex] = QZ[qzIndex];
  }
  outputIndex += QZ.length;

  // Output the serialized array
  queueOrEmitOperation(outputArray);

  // Clear all buffers and reset state
  QZ.length = 0;
  Jq.length = 0;
  $H.length = 0;
  isSourceObservable = null;
  O7.clear();
  gC = 0;
}

module.exports = processAndFlushInteractionQueue;