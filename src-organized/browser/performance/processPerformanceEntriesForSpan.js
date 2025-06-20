/**
 * Processes browser performance entries and adjusts tracing spans accordingly.
 * Utilizes the Performance API to extract navigation, paint, mark, measure, and resource timing data,
 * normalizes key web vitals, and attaches them as measurements to the provided span.
 *
 * @param {Object} span - The span object to which performance measurements and adjustments are applied.
 * @returns {void}
 */
function processPerformanceEntriesForSpan(span) {
  // Retrieve the performance observer/configuration object
  const performanceConfig = _N1();

  // Early exit if performance API is unavailable or required globals are missing
  if (!performanceConfig ||
      !WU.WINDOW.performance.getEntries ||
      !k8.browserPerformanceTimeOrigin) {
    return;
  }

  // Log tracing if in debug mode
  if (rW.DEBUG_BUILD) {
    k8.logger.log("[Tracing] Adding & adjusting spans using Performance API");
  }

  // Get the time origin offset in seconds
  const timeOriginSeconds = convertMillisecondsToSeconds(k8.browserPerformanceTimeOrigin);
  // Get all performance entries
  const performanceEntries = performanceConfig.getEntries();
  // Extract span operation and start timestamp
  const { op: spanOperation, start_timestamp: spanStartTimestamp } = YU.spanToJSON(span);

  // Determine the index to start slicing entries from (latest entry)
  const lastEntryIndex = Math.max(performanceEntries.length - 1, 0);

  // Iterate over each performance entry
  performanceEntries.slice(lastEntryIndex).forEach(performanceEntry => {
    // Convert startTime and duration to seconds
    const entryStartTimeSeconds = convertMillisecondsToSeconds(performanceEntry.startTime);
    const entryDurationSeconds = convertMillisecondsToSeconds(performanceEntry.duration);

    // For navigation spans, skip entries that occurred before the span started
    if (
      span.op === "navigation" &&
      spanStartTimestamp &&
      timeOriginSeconds + entryStartTimeSeconds < spanStartTimestamp
    ) {
      return;
    }

    switch (performanceEntry.entryType) {
      case "navigation": {
        // Attach navigation timing data to the span
        processEventTimings(span, performanceEntry, timeOriginSeconds);
        break;
      }
      case "mark":
      case "paint":
      case "measure": {
        // Attach mark/paint/measure timing data to the span
        startResourceMetricChildSpan(span, performanceEntry, entryStartTimeSeconds, entryDurationSeconds, timeOriginSeconds);
        // Get the first hidden time from the visibility watcher
        const visibilityWatcher = E89.getVisibilityWatcher();
        const isBeforeFirstHidden = performanceEntry.startTime < visibilityWatcher.firstHiddenTime;

        // Record First Paint (FP) if present and before first hidden
        if (performanceEntry.name === "first-paint" && isBeforeFirstHidden) {
          if (rW.DEBUG_BUILD) {
            k8.logger.log("[Measurements] Adding FP");
          }
          k3.fp = {
            value: performanceEntry.startTime,
            unit: "millisecond"
          };
        }
        // Record First Contentful Paint (FCP) if present and before first hidden
        if (performanceEntry.name === "first-contentful-paint" && isBeforeFirstHidden) {
          if (rW.DEBUG_BUILD) {
            k8.logger.log("[Measurements] Adding FCP");
          }
          k3.fcp = {
            value: performanceEntry.startTime,
            unit: "millisecond"
          };
        }
        break;
      }
      case "resource": {
        // Attach resource timing data to the span
        recordResourcePerformanceMetric(span, performanceEntry, performanceEntry.name, entryStartTimeSeconds, entryDurationSeconds, timeOriginSeconds);
        break;
      }
    }
  });

  // Set navigator connection tags (network/hardware info)
  setNavigatorConnectionTags(span);

  // If the span is a pageload operation, normalize and attach web vital measurements
  if (spanOperation === "pageload") {
    // Normalize web vital measurements (FCP, FP, LCP)
    addTtfbRequestTimeMeasurement(k3);
    ["fcp", "fp", "lcp"].forEach(vitalName => {
      if (!k3[vitalName] || !spanStartTimestamp || timeOriginSeconds >= spanStartTimestamp) {
        return;
      }
      const originalValue = k3[vitalName].value;
      const absoluteTimestamp = timeOriginSeconds + convertMillisecondsToSeconds(originalValue);
      const normalizedValue = Math.abs((absoluteTimestamp - spanStartTimestamp) * 1000);
      const adjustment = normalizedValue - originalValue;
      if (rW.DEBUG_BUILD) {
        k8.logger.log(`[Measurements] Normalized ${vitalName} from ${originalValue} to ${normalizedValue} (${adjustment})`);
      }
      k3[vitalName].value = normalizedValue;
    });

    // Handle First Input Delay (FID) measurement
    const fidMark = k3["mark.fid"];
    if (fidMark && k3.fid) {
      FU._startChild(span, {
        description: "first input delay",
        endTimestamp: fidMark.value + convertMillisecondsToSeconds(k3.fid.value),
        op: "ui.action",
        origin: "auto.ui.browser.metrics",
        startTimestamp: fidMark.value
      });
      delete k3["mark.fid"];
    }

    // Remove CLS measurement if FCP is missing
    if (!("fcp" in k3)) {
      delete k3.cls;
    }

    // Attach all measurements to the span
    Object.keys(k3).forEach(measurementName => {
      YU.setMeasurement(measurementName, k3[measurementName].value, k3[measurementName].unit);
    });

    // Finalize span adjustments
    x89(span);
  }

  // Reset global measurement state
  dH = void 0;
  Pc = void 0;
  k3 = {};
}

module.exports = processPerformanceEntriesForSpan;