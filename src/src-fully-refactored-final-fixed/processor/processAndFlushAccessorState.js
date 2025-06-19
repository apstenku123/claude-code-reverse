/**
 * Processes the current accessor state, serializes relevant data into an array, and flushes all temporary state.
 * This function is typically called when the accessor state needs to be finalized and cleared.
 *
 * @param {any} context - Optional context or payload for processing (currently unused).
 * @returns {void}
 */
function processAndFlushAccessorState(context) {
  // Early exit if initialization or state is empty
  processAndCleanupItems();
  if (isInteractionQueueEmpty()) return;

  // Calculate the total number of items to serialize from Jq, $H, and isSourceObservable
  const totalPendingItems = Jq.length + $H.length + (isSourceObservable === null ? 0 : 1);

  // Compute the required array size for serialization
  const serializedArrayLength = 3 + gC + (totalPendingItems > 0 ? 2 + totalPendingItems : 0) + QZ.length;
  const serializedData = new Array(serializedArrayLength);
  let writeIndex = 0;

  // Write header values
  serializedData[writeIndex++] = mapArraysToObjectWithCallback; // Possibly a type or version identifier
  serializedData[writeIndex++] = mapObjectProperties; // Possibly a code or flag
  serializedData[writeIndex++] = gC; // Possibly a count or state value

  // Serialize each item in O7 (likely a Set or Map of encoded objects)
  O7.forEach(function (encodedItem) {
    const encodedString = encodedItem.encodedString;
    const encodedLength = encodedString.length;
    serializedData[writeIndex++] = encodedLength;
    // Write each character/code in the encoded string
    for (let charIndex = 0; charIndex < encodedLength; charIndex++) {
      serializedData[writeIndex + charIndex] = encodedString[charIndex];
    }
    writeIndex += encodedLength;
  });

  // If there are pending items in Jq, $H, or isSourceObservable, serialize them
  if (totalPendingItems > 0) {
    serializedData[writeIndex++] = q; // Possibly a section marker or flag
    serializedData[writeIndex++] = totalPendingItems;

    // Serialize Jq items in reverse order
    for (let jqIndex = Jq.length - 1; jqIndex >= 0; jqIndex--) {
      serializedData[writeIndex++] = Jq[jqIndex];
    }

    // Serialize $H items in order
    for (let hIndex = 0; hIndex < $H.length; hIndex++) {
      serializedData[writeIndex + hIndex] = $H[hIndex];
    }
    writeIndex += $H.length;

    // If isSourceObservable is not null, serialize isBlobOrFileLikeObject
    if (isSourceObservable !== null) {
      serializedData[writeIndex] = isSourceObservable;
      writeIndex++;
    }
  }

  // Serialize any remaining QZ items
  for (let qzIndex = 0; qzIndex < QZ.length; qzIndex++) {
    serializedData[writeIndex + qzIndex] = QZ[qzIndex];
  }
  writeIndex += QZ.length;

  // Finalize: process the serialized data and clear all temporary state
  queueOrEmitOperation(serializedData);
  QZ.length = 0;
  Jq.length = 0;
  $H.length = 0;
  isSourceObservable = null;
  O7.clear();
  gC = 0;
}

module.exports = processAndFlushAccessorState;