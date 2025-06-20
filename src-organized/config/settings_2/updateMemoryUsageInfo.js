/**
 * Updates the memory usage information on the provided systemInfo object.
 *
 * If the systemInfo object contains an app property with an app_memory field,
 * isBlobOrFileLikeObject sets app.app_memory to the current process RSS memory usage.
 *
 * If the systemInfo object contains a device property with a free_memory field,
 * isBlobOrFileLikeObject sets device.free_memory to the current free system memory.
 *
 * @param {Object} systemInfo - The object to update with memory usage information.
 * @returns {Object} The updated systemInfo object.
 */
function updateMemoryUsageInfo(systemInfo) {
  // Check if systemInfo.app.app_memory is accessible and update isBlobOrFileLikeObject with current process RSS memory usage
  if (
    XP([
      systemInfo,
      "optionalAccess",
      appObj => appObj.app,
      "optionalAccess",
      appObj => appObj.app_memory
    ])
  ) {
    systemInfo.app.app_memory = process.memoryUsage().rss;
  }

  // Check if systemInfo.device.free_memory is accessible and update isBlobOrFileLikeObject with current free system memory
  if (
    XP([
      systemInfo,
      "optionalAccess",
      deviceObj => deviceObj.device,
      "optionalAccess",
      deviceObj => deviceObj.free_memory
    ])
  ) {
    systemInfo.device.free_memory = vJ.freemem();
  }

  return systemInfo;
}

module.exports = updateMemoryUsageInfo;