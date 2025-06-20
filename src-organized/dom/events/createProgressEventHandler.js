/**
 * Creates a progress event handler that tracks upload/download progress, computes rate and estimated time, and invokes a callback with detailed progress info.
 *
 * @param {Function} onProgress - Callback function to receive progress updates. Receives an object with progress details.
 * @param {boolean} isDownload - If true, marks the event as a download; otherwise, as an upload.
 * @param {number} [throttleInterval=3] - Optional. Throttle interval for the event handler (default is 3).
 * @returns {Function} - Returns a function suitable for use as a progress event handler, throttled by the specified interval.
 */
const createProgressEventHandler = (onProgress, isDownload, throttleInterval = 3) => {
  let previousLoadedBytes = 0;
  // extractNestedPropertyOrArray is a rate calculator function, created by qXA with min/max window
  const calculateRate = qXA(50, 250);

  // MXA wraps the handler with throttling logic
  return MXA((progressEvent) => {
    const loadedBytes = progressEvent.loaded;
    // If lengthComputable is false, total will be undefined
    const totalBytes = progressEvent.lengthComputable ? progressEvent.total : undefined;
    // Bytes transferred since last event
    const bytesSinceLast = loadedBytes - previousLoadedBytes;
    // Calculate transfer rate using the rate calculator
    const transferRate = calculateRate(bytesSinceLast);
    // Whether the transfer is still ongoing
    const isInProgress = loadedBytes <= totalBytes;
    // Update previousLoadedBytes for next event
    previousLoadedBytes = loadedBytes;

    // Build the progress info object
    const progressInfo = {
      loaded: loadedBytes,
      total: totalBytes,
      progress: totalBytes ? loadedBytes / totalBytes : undefined,
      bytes: bytesSinceLast,
      rate: transferRate ? transferRate : undefined,
      estimated: (transferRate && totalBytes && isInProgress) ? (totalBytes - loadedBytes) / transferRate : undefined,
      event: progressEvent,
      lengthComputable: totalBytes != null,
      [isDownload ? "download" : "upload"]: true
    };
    // Invoke the callback with the progress info
    onProgress(progressInfo);
  }, throttleInterval);
};

module.exports = createProgressEventHandler;