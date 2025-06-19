/**
 * Retrieves the application'createInteractionAccessor start time and current memory usage.
 *
 * @returns {{ app_start_time: string, app_memory: number }}
 *   An object containing the ISO string of the application'createInteractionAccessor start time and the current resident set size (RSS) memory usage in bytes.
 */
function getAppStartTimeAndMemoryUsage() {
  // Get the current resident set size (RSS) memory usage in bytes
  const currentMemoryUsage = process.memoryUsage().rss;

  // Calculate the application start time by subtracting the uptime (in ms) from the current time
  const appStartTimestamp = Date.now() - process.uptime() * 1000;
  const appStartTimeISO = new Date(appStartTimestamp).toISOString();

  return {
    app_start_time: appStartTimeISO,
    app_memory: currentMemoryUsage
  };
}

module.exports = getAppStartTimeAndMemoryUsage;