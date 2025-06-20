/**
 * React hook that sets up a notification handler for a connected IDE entry.
 *
 * This hook listens for notifications from the IDE and dispatches them as custom events.
 *
 * @param {Array<Object>} interactionEntries - Array of interaction entries to search for a connected IDE.
 * @returns {void}
 */
function useIdeNotificationHandler(interactionEntries) {
  H$2.useEffect(() => {
    // If there are no entries, do nothing
    if (!interactionEntries.length) return;

    // Find the first connected IDE entry
    const connectedIdeEntry = findConnectedIdeEntry(interactionEntries);
    if (connectedIdeEntry) {
      // Set up a notification handler for the IDE client
      connectedIdeEntry.client.setNotificationHandler(bW5, async subscription => {
        // Destructure event name and data from the notification parameters
        const { eventName, eventData } = subscription.params;
        // Dispatch the event using the custom event dispatcher
        logTelemetryEventIfEnabled(`tengu_ide_${eventName}`, eventData);
      });
    }
  }, [interactionEntries]);
}

module.exports = useIdeNotificationHandler;