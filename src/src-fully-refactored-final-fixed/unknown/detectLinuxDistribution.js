/**
 * Detects the Linux distribution and version by inspecting /etc files.
 *
 * @async
 * @returns {Promise<Object>} An object containing the kernel version, distribution name, and version (if detected).
 *
 * The function attempts to identify the Linux distribution by checking for known files in /etc,
 * reading their contents, and matching them against known distro signatures.
 */
async function detectLinuxDistribution() {
  // Initialize result with kernel version and default name
  const linuxInfo = {
    kernel_version: vJ.release(),
    name: "Linux"
  };

  try {
    // Read the list of files in /etc
    const etcFiles = await uGA("/etc");

    // Find a known distribution file in /etc
    const distroFileEntry = _Q9.find(entry => etcFiles.includes(entry.name));
    if (!distroFileEntry) {
      // If no known distro file is found, return basic info
      return linuxInfo;
    }

    // Build the full path to the distro file
    const distroFilePath = qQ9.join("/etc", distroFileEntry.name);

    // Read the contents of the distro file and convert to lowercase
    const distroFileContent = (await dGA(distroFilePath, { encoding: "utf-8" })).toLowerCase();

    // Destructure the list of known distros for this file
    const { distros: knownDistros } = distroFileEntry;

    // Try to match the file content to a known distro signature
    linuxInfo.name = knownDistros.find(distroName =>
      distroFileContent.indexOf(bGA(distroName)) >= 0
    ) || knownDistros[0]; // Default to the first if no match

    // Get the normalized key for the detected distro
    const normalizedDistroKey = bGA(linuxInfo.name);

    // Extract the version using the appropriate parser for this distro
    linuxInfo.version = jQ9[normalizedDistroKey](distroFileContent);
  } catch (error) {
    // Silently ignore errors and return whatever info handleMissingDoctypeError have
  }

  return linuxInfo;
}

module.exports = detectLinuxDistribution;