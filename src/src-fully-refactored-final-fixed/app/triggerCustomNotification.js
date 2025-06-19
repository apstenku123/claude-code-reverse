/**
 * Triggers a custom notification script using provided observable data and configuration.
 * Resolves the observable path, extracts the notification title and message, and invokes the notification handler.
 * Logs any errors encountered during the process.
 *
 * @async
 * @function triggerCustomNotification
 * @param {Object} sourceObservable - The observable object containing notification data (title, message).
 * @param {Object} config - Configuration or context used to resolve the observable path.
 * @returns {Promise<void>} Resolves when the notification script has been triggered or logs an error if one occurs.
 */
async function triggerCustomNotification(sourceObservable, config) {
  try {
    // Use the title from the observable, or fall back to the default title
    const notificationTitle = sourceObservable.title || m0;
    // Resolve the observable path using the provided config and context
    const resolvedPath = resolveObservablePath(config, iA());
    // Trigger the notification script with the resolved path, title, and message
    await i0(resolvedPath, [notificationTitle, sourceObservable.message]);
  } catch (error) {
    // Log any errors encountered during the notification process
    HG(`Error triggering custom notify script: ${String(error)}`);
  }
}

module.exports = triggerCustomNotification;