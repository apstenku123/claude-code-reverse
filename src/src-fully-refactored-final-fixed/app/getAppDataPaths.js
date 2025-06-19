/**
 * Returns standard filesystem paths for storing application data, config, cache, log, and temp files.
 *
 * @param {string} appName - The name of the application or directory to append to each path.
 * @returns {Object} An object containing resolved paths for data, config, cache, log, and temp files.
 */
function getAppDataPaths(appName) {
  // Get the base directory name from the current working directory
  const baseDirName = Y3.basename(aq);

  return {
    // Data directory: XDG_DATA_HOME or fallback to ~/.local/share
    data: Y3.join(lx.XDG_DATA_HOME || Y3.join(aq, ".local", "share"), appName),
    // Config directory: XDG_CONFIG_HOME or fallback to ~/.config
    config: Y3.join(lx.XDG_CONFIG_HOME || Y3.join(aq, ".config"), appName),
    // Cache directory: XDG_CACHE_HOME or fallback to ~/.cache
    cache: Y3.join(lx.XDG_CACHE_HOME || Y3.join(aq, ".cache"), appName),
    // Log directory: XDG_STATE_HOME or fallback to ~/.local/state
    log: Y3.join(lx.XDG_STATE_HOME || Y3.join(aq, ".local", "state"), appName),
    // Temp directory: WM1 is the base temp directory
    temp: Y3.join(WM1, baseDirName, appName)
  };
}

module.exports = getAppDataPaths;
