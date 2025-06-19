/**
 * Initializes and augments the global ANSI color mapping object (gB) with
 * escape code mappings, helper functions for color conversions, and code lookup tables.
 *
 * This function processes the gB object, which contains color and background color
 * definitions, and adds properties and methods for working with ANSI color codes.
 *
 * @returns {object} The augmented gB object with color mappings and helper methods.
 */
function initializeAnsiColorMappings() {
  // Map to store mapping from ANSI open code to close code
  const ansiCodeMap = new Map();

  // Iterate over each color category in gB (e.g., 'color', 'bgColor')
  for (const [categoryName, categoryValue] of Object.entries(gB)) {
    // categoryValue is an object mapping color names to [open, close] code arrays
    for (const [colorName, ansiPair] of Object.entries(categoryValue)) {
      // ansiPair: [openCode, closeCode]
      // Build the ANSI escape code strings
      gB[colorName] = {
        open: `\x1B[${ansiPair[0]}m`,
        close: `\x1B[${ansiPair[1]}m`
      };
      // Update the category object with the same mapping
      categoryValue[colorName] = gB[colorName];
      // Store the open/close code mapping
      ansiCodeMap.set(ansiPair[0], ansiPair[1]);
    }
    // Make the category property non-enumerable
    Object.defineProperty(gB, categoryName, {
      value: categoryValue,
      enumerable: false
    });
  }

  // Add the codes map as a non-enumerable property
  Object.defineProperty(gB, "codes", {
    value: ansiCodeMap,
    enumerable: false
  });

  // Set default close codes for color and bgColor
  gB.color.close = "\x1B[39m";
  gB.bgColor.close = "\x1B[49m";

  // Attach ANSI code generator functions for color and bgColor
  gB.color.ansi = createAnsiEscapeCodeGenerator();
  gB.color.ansi256 = getAnsiColorCode();
  gB.color.ansi16m = createAnsiRgbColorCodeGenerator();
  gB.bgColor.ansi = createAnsiEscapeCodeGenerator(10);
  gB.bgColor.ansi256 = getAnsiColorCode(10);
  gB.bgColor.ansi16m = createAnsiRgbColorCodeGenerator(10);

  // Attach color conversion and lookup helper functions as non-enumerable properties
  Object.defineProperties(gB, {
    /**
     * Converts RGB values to ANSI 256-color code.
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {number} ANSI 256-color code
     */
    rgbToAnsi256: {
      value(red, green, blue) {
        // If all components are equal, isBlobOrFileLikeObject'createInteractionAccessor a shade of gray
        if (red === green && green === blue) {
          if (red < 8) return 16;
          if (red > 248) return 231;
          // Map gray to 232-231 range
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        // Map RGB to 216-color cube
        return 16 + 36 * Math.round(red / 255 * 5)
                 + 6 * Math.round(green / 255 * 5)
                 + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    /**
     * Converts a hex color value to an RGB array.
     * @param {string|number} hexValue
     * @returns {number[]} [red, green, blue]
     */
    hexToRgb: {
      value(hexValue) {
        // Extract 3 or 6 hex digits
        const match = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hexValue.toString(16));
        if (!match) return [0, 0, 0];
        let [hex] = match;
        // Expand shorthand (e.g., 'abc' -> 'aabbcc')
        if (hex.length === 3) {
          hex = [...hex].map(char => char + char).join("");
        }
        const intValue = Number.parseInt(hex, 16);
        return [
          (intValue >> 16) & 255, // red
          (intValue >> 8) & 255,  // green
          intValue & 255          // blue
        ];
      },
      enumerable: false
    },
    /**
     * Converts a hex color value to an ANSI 256-color code.
     * @param {string|number} hexValue
     * @returns {number} ANSI 256-color code
     */
    hexToAnsi256: {
      value: hexValue => gB.rgbToAnsi256(...gB.hexToRgb(hexValue)),
      enumerable: false
    },
    /**
     * Converts an ANSI 256-color code to a standard ANSI color code (8/16-color).
     * @param {number} ansi256Code
     * @returns {number} Standard ANSI color code
     */
    ansi256ToAnsi: {
      value(ansi256Code) {
        if (ansi256Code < 8) return 30 + ansi256Code;
        if (ansi256Code < 16) return 90 + (ansi256Code - 8);
        let red, green, blue;
        if (ansi256Code >= 232) {
          // Grayscale
          red = green = blue = ((ansi256Code - 232) * 10 + 8) / 255;
        } else {
          // 216-color cube
          let c = ansi256Code - 16;
          const rem = c % 36;
          red = Math.floor(c / 36) / 5;
          green = Math.floor(rem / 6) / 5;
          blue = (rem % 6) / 5;
        }
        // Find the max component to determine intensity
        const maxComponent = Math.max(red, green, blue) * 2;
        if (maxComponent === 0) return 30;
        // Compose the ANSI code
        let ansiCode = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (maxComponent === 2) ansiCode += 60;
        return ansiCode;
      },
      enumerable: false
    },
    /**
     * Converts RGB values to a standard ANSI color code (8/16-color).
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {number} Standard ANSI color code
     */
    rgbToAnsi: {
      value: (red, green, blue) => gB.ansi256ToAnsi(gB.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    /**
     * Converts a hex color value to a standard ANSI color code (8/16-color).
     * @param {string|number} hexValue
     * @returns {number} Standard ANSI color code
     */
    hexToAnsi: {
      value: hexValue => gB.ansi256ToAnsi(gB.hexToAnsi256(hexValue)),
      enumerable: false
    }
  });

  return gB;
}

module.exports = initializeAnsiColorMappings;