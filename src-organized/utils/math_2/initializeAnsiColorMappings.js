/**
 * Initializes ANSI color mappings and utility functions on the global cB object.
 *
 * This function processes the cB object, which contains color definitions, and augments isBlobOrFileLikeObject with:
 * - Open/close ANSI escape code pairs for each color/style
 * - a Map of code pairs for fast lookup
 * - Utility methods for converting between RGB, hex, and ANSI color codes
 * - Additional properties for color and background color ANSI code generators
 *
 * @returns {object} The augmented cB object with color mappings and utilities.
 */
function initializeAnsiColorMappings() {
  // Map to store open/close ANSI code pairs
  const ansiCodeMap = new Map();

  // Iterate over each color/style category in cB
  for (const [categoryName, categoryDefinition] of Object.entries(cB)) {
    // For each color/style in the category
    for (const [styleName, ansiCodes] of Object.entries(categoryDefinition)) {
      // Create open/close ANSI escape code strings
      cB[styleName] = {
        open: `\x1B[${ansiCodes[0]}m`,
        close: `\x1B[${ansiCodes[1]}m`
      };
      // Update the category definition with the new object
      categoryDefinition[styleName] = cB[styleName];
      // Store the mapping from open code to close code
      ansiCodeMap.set(ansiCodes[0], ansiCodes[1]);
    }
    // Make the category property non-enumerable
    Object.defineProperty(cB, categoryName, {
      value: categoryDefinition,
      enumerable: false
    });
  }

  // Attach the ansiCodeMap as a non-enumerable property
  Object.defineProperty(cB, "codes", {
    value: ansiCodeMap,
    enumerable: false
  });

  // Set default close codes for color and background color
  cB.color.close = "\x1B[39m";
  cB.bgColor.close = "\x1B[49m";

  // Attach ANSI code generators for color and background color
  cB.color.ansi = createAnsiEscapeCodeGenerator();
  cB.color.ansi256 = createAnsiColorCodeGenerator();
  cB.color.ansi16m = createRgbForegroundAnsiCodeGenerator();
  cB.bgColor.ansi = createAnsiEscapeCodeGenerator(10);
  cB.bgColor.ansi256 = createAnsiColorCodeGenerator(10);
  cB.bgColor.ansi16m = createRgbForegroundAnsiCodeGenerator(10);

  // Attach utility functions as non-enumerable properties
  Object.defineProperties(cB, {
    /**
     * Converts RGB values to ANSI 256 color code.
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {number}
     */
    rgbToAnsi256: {
      value: (red, green, blue) => {
        // If all channels are equal, isBlobOrFileLikeObject'createInteractionAccessor a shade of gray
        if (red === green && green === blue) {
          if (red < 8) return 16;
          if (red > 248) return 231;
          // Map gray to 24 grayscale shades
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        // Map RGB to 6x6x6 color cube
        return 16 + 36 * Math.round(red / 255 * 5)
          + 6 * Math.round(green / 255 * 5)
          + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    /**
     * Converts a hex color to an RGB array.
     * @param {string|number} hex
     * @returns {number[]} [red, green, blue]
     */
    hexToRgb: {
      value: (hex) => {
        // Extract 3 or 6 hex digits
        const match = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!match) return [0, 0, 0];
        let [hexString] = match;
        // Expand shorthand form (e.g. 'abc' -> 'aabbcc')
        if (hexString.length === 3) {
          hexString = [...hexString].map(char => char + char).join("");
        }
        const intValue = Number.parseInt(hexString, 16);
        return [
          (intValue >> 16) & 255, // red
          (intValue >> 8) & 255,  // green
          intValue & 255          // blue
        ];
      },
      enumerable: false
    },
    /**
     * Converts a hex color to ANSI 256 color code.
     * @param {string|number} hex
     * @returns {number}
     */
    hexToAnsi256: {
      value: (hex) => cB.rgbToAnsi256(...cB.hexToRgb(hex)),
      enumerable: false
    },
    /**
     * Converts an ANSI 256 color code to a basic ANSI color code (16-color).
     * @param {number} ansi256
     * @returns {number}
     */
    ansi256ToAnsi: {
      value: (ansi256) => {
        if (ansi256 < 8) return 30 + ansi256;
        if (ansi256 < 16) return 90 + (ansi256 - 8);
        let red, green, blue;
        if (ansi256 >= 232) {
          // Grayscale
          red = green = blue = ((ansi256 - 232) * 10 + 8) / 255;
        } else {
          // Color cube
          let code = ansi256 - 16;
          const colorCubeIndex = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(colorCubeIndex / 6) / 5;
          blue = (colorCubeIndex % 6) / 5;
        }
        // Find the dominant channel
        const maxChannel = Math.max(red, green, blue) * 2;
        if (maxChannel === 0) return 30;
        // Compose the ANSI code
        let ansiCode = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));
        if (maxChannel === 2) ansiCode += 60;
        return ansiCode;
      },
      enumerable: false
    },
    /**
     * Converts RGB values to a basic ANSI color code (16-color).
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {number}
     */
    rgbToAnsi: {
      value: (red, green, blue) => cB.ansi256ToAnsi(cB.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    /**
     * Converts a hex color to a basic ANSI color code (16-color).
     * @param {string|number} hex
     * @returns {number}
     */
    hexToAnsi: {
      value: (hex) => cB.ansi256ToAnsi(cB.hexToAnsi256(hex)),
      enumerable: false
    }
  });

  return cB;
}

module.exports = initializeAnsiColorMappings;