/**
 * Normalizes and processes an event type string.
 *
 * Converts the input event type to lowercase and trims whitespace. If the normalized event type
 * matches a specific set (as determined by $B0), returns a corresponding value from getProcessedInteractionEntries().
 * Otherwise, returns the normalized event type string.
 *
 * @param {string} eventType - The event type string to normalize and process.
 * @returns {string} The processed event type or a value from getProcessedInteractionEntries() based on the input.
 */
function normalizeEventType(eventType) {
  // Normalize the event type: lowercase and trim whitespace
  const normalizedEventType = eventType.toLowerCase().trim();

  // Check if the normalized event type matches a special set
  if ($B0(normalizedEventType)) {
    // If the event type is 'sonnet', return getProcessedInteractionEntries().sonnet40; otherwise, return getProcessedInteractionEntries().opus40
    return normalizedEventType === "sonnet" ? getProcessedInteractionEntries().sonnet40 : getProcessedInteractionEntries().opus40;
  }

  // Return the normalized event type if no special handling is required
  return normalizedEventType;
}

module.exports = normalizeEventType;