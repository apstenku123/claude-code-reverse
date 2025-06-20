/**
 * React hook that sets up a notification handler for a given observable source.
 * When the source emits notifications, the handler triggers a custom event with the notification data.
 *
 * @param {Array} sourceObservable - The observable source array to watch for notifications.
 */
function useNotificationHandlerEffect(sourceObservable) {
  H$2.useEffect(() => {
    // If the observable source is empty, do nothing
    if (!sourceObservable.length) return;

    // Retrieve configuration or client wrapper for the observable source
    const config = findConnectedIdeEntry(sourceObservable);
    if (config) {
      // Set up the notification handler on the client
      config.client.setNotificationHandler(bW5, async (subscription) => {
        // Destructure event name and data from the subscription parameters
        const { eventName, eventData } = subscription.params;
        // Trigger a custom event with the event name and data
        logTelemetryEventIfEnabled(`tengu_ide_${eventName}`, eventData);
      });
    }
  }, [sourceObservable]);
}

module.exports = useNotificationHandlerEffect;