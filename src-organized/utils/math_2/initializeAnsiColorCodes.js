/**
 * Initializes and augments the global cB object with ANSI color code mappings and utility functions.
 *
 * This function processes the cB object, which contains color and background color definitions,
 * and sets up ANSI escape code mappings for each color. It also adds utility methods for converting
 * between color formats (RGB, hex, ANSI 256, etc.) and attaches them as non-enumerable properties.
 *
 * @returns {object} The augmented cB object with color mappings and utility methods.
 */
function initializeAnsiColorCodes() {
  const ansiCodeMap = new Map();

  // Iterate over each color group in cB (e.g., color, bgColor)
  for (const [groupName, groupDefinition] of Object.entries(cB)) {
    // Iterate over each color name and its ANSI code pair in the group
    for (const [colorName, ansiCodes] of Object.entries(groupDefinition)) {
      // Create open/close escape code objects for each color
      cB[colorName] = {
        open: `\x1B[${ansiCodes[0]}m`,
        close: `\x1B[${ansiCodes[1]}m`
      };
      // Assign the color object to the group as well
      groupDefinition[colorName] = cB[colorName];
      // Map the open code to the close code for quick lookup
      ansiCodeMap.set(ansiCodes[0], ansiCodes[1]);
    }
    // Make the group property non-enumerable
    Object.defineProperty(cB, groupName, {
      value: groupDefinition,
      enumerable: false
    });
  }

  // Attach the codes map as a non-enumerable property
  Object.defineProperty(cB, "codes", {
    value: ansiCodeMap,
    enumerable: false
  });

  // Set default close codes for color and bgColor
  cB.color.close = "\x1B[39m";
  cB.bgColor.close = "\x1B[49m";

  // Attach ANSI color code generators
  cB.color.ansi = createAnsiEscapeCodeGenerator();
  cB.color.ansi256 = createAnsiColorCodeGenerator();
  cB.color.ansi16m = createRgbForegroundAnsiCodeGenerator();
  cB.bgColor.ansi = createAnsiEscapeCodeGenerator(10);
  cB.bgColor.ansi256 = createAnsiColorCodeGenerator(10);
  cB.bgColor.ansi16m = createRgbForegroundAnsiCodeGenerator(10);

  // Attach color conversion utility methods as non-enumerable properties
  Object.defineProperties(cB, {
    /**
     * Converts RGB values to ANSI 256 color code.
     * @param {number} red - Red value (0-255)
     * @param {number} green - Green value (0-255)
     * @param {number} blue - Blue value (0-255)
     * @returns {number} ANSI 256 color code
     */
    rgbToAnsi256: {
      value: (red, green, blue) => {
        // If all components are equal, isBlobOrFileLikeObject'createInteractionAccessor a shade of gray
        if (red === green && green === blue) {
          if (red < 8) return 16;
          if (red > 248) return 231;
          // Map grayscale to 24 steps
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
     * Converts a hex color string or number to an RGB array.
     * @param {string|number} hex - Hex color (e.g., '#ff00ff' or 0xff00ff)
     * @returns {number[]} Array of [red, green, blue]
     */
    hexToRgb: {
      value: (hex) => {
        // Extract 3 or 6 hex digits
        const match = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!match) return [0, 0, 0];
        let [hexString] = match;
        // Expand shorthand form (e.g., 'f0f') to full form ('ff00ff')
        if (hexString.length === 3) {
          hexString = [...hexString].map(char => char + char).join("");
        }
        const intValue = Number.parseInt(hexString, 16);
        return [
          (intValue >> 16) & 255,
          (intValue >> 8) & 255,
          intValue & 255
        ];
      },
      enumerable: false
    },
    /**
     * Converts a hex color to ANSI 256 color code.
     * @param {string|number} hex - Hex color
     * @returns {number} ANSI 256 color code
     */
    hexToAnsi256: {
      value: (hex) => cB.rgbToAnsi256(...cB.hexToRgb(hex)),
      enumerable: false
    },
    /**
     * Converts an ANSI 256 color code to a standard ANSI color code (8 or 16 color).
     * @param {number} ansi256 - ANSI 256 color code
     * @returns {number} Standard ANSI color code
     */
    ansi256ToAnsi: {
      value: (ansi256) => {
        if (ansi256 < 8) return 30 + ansi256;
        if (ansi256 < 16) return 90 + (ansi256 - 8);
        let red, green, blue;
        if (ansi256 >= 232) {
          // Grayscale range
          red = green = blue = ((ansi256 - 232) * 10 + 8) / 255;
        } else {
          // 6x6x6 color cube
          let remainder = ansi256 - 16;
          const colorIndex = remainder % 36;
          red = Math.floor(remainder / 36) / 5;
          green = Math.floor(colorIndex / 6) / 5;
          blue = (colorIndex % 6) / 5;
        }
        // Find the max component to determine intensity
        const maxComponent = Math.max(red, green, blue) * 2;
        if (maxComponent === 0) return 30;
        let ansi = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));
        if (maxComponent === 2) ansi += 60;
        return ansi;
      },
      enumerable: false
    },
    /**
     * Converts RGB values to a standard ANSI color code (8 or 16 color).
     * @param {number} red - Red value (0-255)
     * @param {number} green - Green value (0-255)
     * @param {number} blue - Blue value (0-255)
     * @returns {number} Standard ANSI color code
     */
    rgbToAnsi: {
      value: (red, green, blue) => cB.ansi256ToAnsi(cB.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    /**
     * Converts a hex color to a standard ANSI color code (8 or 16 color).
     * @param {string|number} hex - Hex color
     * @returns {number} Standard ANSI color code
     */
    hexToAnsi: {
      value: (hex) => cB.ansi256ToAnsi(cB.hexToAnsi256(hex)),
      enumerable: false
    }
  });

  return cB;
}

module.exports = initializeAnsiColorCodes;