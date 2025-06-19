/**
 * Retrieves a unique identifier string for the current @img/sharp-libvips version.
 *
 * This function constructs a version identifier by:
 *   1. Generating a base key using lK2 and a dynamic package name with dd().
 *   2. Fetching the version of the dynamically named package from h35 and iK2.
 *   3. Concatenating the base key and version, then slicing the result to 10 characters.
 *
 * @returns {string} a 10-character identifier string for the current libvips version, or an empty string on error.
 */
const getLibvipsVersionIdentifier = () => {
  try {
    // Generate the dynamic package name using dd()
    const dynamicPackageName = `imgsharp-libvips-${dd()}`;

    // Create a base key using lK2 and the dynamic package name
    const baseKey = lK2(dynamicPackageName);

    // Construct the full package name for @img/sharp-libvips
    const fullPackageName = `@img/sharp-libvips-${dd()}`;

    // Retrieve the version from the package configuration using iK2 and h35
    const packageConfig = iK2(h35[fullPackageName]);
    const packageVersion = packageConfig.version;

    // Concatenate the base key and version, then slice to 10 characters
    const versionIdentifier = lK2(`${baseKey}npm:${packageVersion}`).slice(0, 10);

    return versionIdentifier;
  } catch (error) {
    // Return an empty string if any error occurs
    return "";
  }
};

module.exports = getLibvipsVersionIdentifier;
