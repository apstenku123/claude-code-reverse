/**
 * Resets the flow rate property of the given stream-like object and emits a 'drain' event.
 *
 * This function sets the object'createInteractionAccessor flow rate property (FR) to zero, then emits a 'drain' event
 * with the current value of the object'createInteractionAccessor Kw property and the object itself as arguments.
 *
 * @param {Object} streamObject - The stream-like object whose flow rate is to be reset and which will emit the event.
 * @returns {void}
 */
function resetFlowRateAndEmitDrain(streamObject) {
  // Reset the flow rate property to zero
  streamObject[FR] = 0;
  // Emit the 'drain' event with the current Kw value and the object itself
  streamObject.emit("drain", streamObject[Kw], [streamObject]);
}

module.exports = resetFlowRateAndEmitDrain;