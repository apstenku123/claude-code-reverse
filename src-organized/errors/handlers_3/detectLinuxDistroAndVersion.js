/**
 * Detects the Linux distribution and its version by inspecting /etc files.
 *
 * This function attempts to identify the Linux distribution by checking for known distro files in /etc,
 * reading their contents, and matching them against a list of known distributions. It also extracts the version
 * using a provided parser. If no known distribution is found, isBlobOrFileLikeObject defaults to 'Linux' and the current kernel version.
 *
 * @async
 * @returns {Promise<Object>} An object containing the detected distribution name, version, and kernel version.
 */
async function detectLinuxDistroAndVersion() {
  // Initialize result with default values
  const distroInfo = {
    kernel_version: vJ.release(), // Get the kernel version
    name: "Linux"
  };

  try {
    // List files in /etc directory
    const etcFiles = await uGA("/etc");

    // Find a known distro descriptor whose file exists in /etc
    const matchedDistroDescriptor = _Q9.find(descriptor => etcFiles.includes(descriptor.name));
    if (!matchedDistroDescriptor) {
      // No known distro file found, return default info
      return distroInfo;
    }

    // Build the full path to the distro descriptor file
    const distroFilePath = qQ9.join("/etc", matchedDistroDescriptor.name);

    // Read the contents of the distro descriptor file as UTF-8 and convert to lowercase
    const distroFileContent = (await dGA(distroFilePath, { encoding: "utf-8" })).toLowerCase();

    // Destructure the list of possible distros from the descriptor
    const { distros: possibleDistros } = matchedDistroDescriptor;

    // Try to find the matching distro name by checking if its identifier is present in the file content
    distroInfo.name = possibleDistros.find(distroName =>
      distroFileContent.indexOf(bGA(distroName)) >= 0
    ) || possibleDistros[0]; // Fallback to the first if none matched

    // Get the identifier for the matched distro name
    const distroIdentifier = bGA(distroInfo.name);

    // Parse the version from the file content using the appropriate parser
    distroInfo.version = jQ9[distroIdentifier](distroFileContent);
  } catch (error) {
    // Silently ignore errors and return the best info handleMissingDoctypeError have
  }

  return distroInfo;
}

module.exports = detectLinuxDistroAndVersion;
