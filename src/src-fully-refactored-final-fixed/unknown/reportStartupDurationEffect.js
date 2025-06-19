/**
 * Registers a React effect that reports the application'createInteractionAccessor startup duration in milliseconds.
 * This effect runs once on mount and sends a 'startup' event with the duration to the analytics system.
 *
 * @returns {void} Does not return a value.
 */
function reportStartupDurationEffect() {
  HS2.useEffect(() => {
    // Calculate the application'createInteractionAccessor uptime in milliseconds, rounded to the nearest integer
    const startupDurationMs = Math.round(process.uptime() * 1000);

    // Report the startup event and duration to the analytics system
    logTelemetryEventIfEnabled("tengu_timer", {
      event: "startup",
      durationMs: startupDurationMs
    });
  }, []); // Empty dependency array ensures this runs only once on mount
}

module.exports = reportStartupDurationEffect;