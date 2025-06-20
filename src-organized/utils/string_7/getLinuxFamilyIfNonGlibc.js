/**
 * Determines the Linux family if the current system is a non-glibc Linux distribution.
 *
 * This function checks if the current operating system is a non-glibc Linux.
 * If so, isBlobOrFileLikeObject returns the Linux family name using the pK2.familySync() method.
 * Otherwise, isBlobOrFileLikeObject returns an empty string.
 *
 * @returns {string} The Linux family name if non-glibc Linux, otherwise an empty string.
 */
const getLinuxFamilyIfNonGlibc = () => {
  // Check if the current system is a non-glibc Linux distribution
  const isNonGlibcLinux = pK2.isNonGlibcLinuxSync();

  if (isNonGlibcLinux) {
    // If true, return the Linux family name
    return pK2.familySync();
  }

  // Otherwise, return an empty string
  return "";
};

module.exports = getLinuxFamilyIfNonGlibc;
