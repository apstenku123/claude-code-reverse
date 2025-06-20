/**
 * Retrieves system information such as boot time, architecture, memory, and CPU details.
 *
 * @param {Object|boolean} options - If true, includes all memory and CPU info. If an object, can specify 'memory' and/or 'cpu' boolean flags.
 * @returns {Object} An object containing system information.
 */
function getSystemInfo(options) {
  const systemInfo = {};
  let systemUptimeSeconds;

  // Attempt to get system uptime in seconds (if available)
  try {
    if (typeof vJ.uptime === 'function') {
      systemUptimeSeconds = vJ.uptime();
    }
  } catch (error) {
    // Ignore errors if uptime is not available
  }

  // If uptime is a number, calculate boot time
  if (typeof systemUptimeSeconds === 'number') {
    const bootTimestamp = Date.now() - systemUptimeSeconds * 1000;
    systemInfo.boot_time = new Date(bootTimestamp).toISOString();
  }

  // Always include architecture
  systemInfo.arch = vJ.arch();

  // Determine if memory info should be included
  const includeMemory = options === true || (options && options.memory);
  if (includeMemory) {
    systemInfo.memory_size = vJ.totalmem();
    systemInfo.free_memory = vJ.freemem();
  }

  // Determine if CPU info should be included
  const includeCpu = options === true || (options && options.cpu);
  if (includeCpu) {
    const cpuInfoArray = vJ.cpus();
    if (Array.isArray(cpuInfoArray) && cpuInfoArray.length > 0) {
      const firstCpu = cpuInfoArray[0];
      systemInfo.processor_count = cpuInfoArray.length;
      systemInfo.cpu_description = firstCpu.model;
      systemInfo.processor_frequency = firstCpu.speed;
    }
  }

  return systemInfo;
}

module.exports = getSystemInfo;