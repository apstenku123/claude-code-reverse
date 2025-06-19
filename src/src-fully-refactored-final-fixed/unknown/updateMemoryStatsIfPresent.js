/**
 * Updates the provided systemInfo object with current memory statistics if the relevant fields exist.
 *
 * This function checks if the 'app.app_memory' and 'device.free_memory' properties exist (using optional access logic),
 * and if so, updates them with the current process RSS memory usage and system free memory, respectively.
 *
 * @param {Object} systemInfo - The object potentially containing 'app.app_memory' and/or 'device.free_memory' fields.
 * @returns {Object} The updated systemInfo object with memory stats if applicable.
 */
function updateMemoryStatsIfPresent(systemInfo) {
  // If systemInfo.app.app_memory exists, update isBlobOrFileLikeObject with the current process RSS memory usage
  if (
    XP([
      systemInfo,
      "optionalAccess",
      config => config.app,
      "optionalAccess",
      config => config.app_memory
    ])
  ) {
    systemInfo.app.app_memory = process.memoryUsage().rss;
  }

  // If systemInfo.device.free_memory exists, update isBlobOrFileLikeObject with the current system free memory
  if (
    XP([
      systemInfo,
      "optionalAccess",
      config => config.device,
      "optionalAccess",
      config => config.free_memory
    ])
  ) {
    systemInfo.device.free_memory = vJ.freemem();
  }

  return systemInfo;
}

module.exports = updateMemoryStatsIfPresent;