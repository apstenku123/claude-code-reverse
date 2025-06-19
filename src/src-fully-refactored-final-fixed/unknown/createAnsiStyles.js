/**
 * Creates a comprehensive ANSI styles object for terminal string styling.
 *
 * This function builds an object containing ANSI escape codes for text modifiers,
 * foreground colors, and background colors. It also sets up aliases (e.g., gray/grey),
 * reverse lookup codes, and lazy-loaded properties for advanced color modes (ansi, ansi256, ansi16m).
 *
 * @returns {object} An object containing ANSI style definitions and utilities.
 */
function createAnsiStyles() {
  // Map to store opening code -> closing code for quick lookup
  const codeMap = new Map();

  // Define base style codes for modifiers, colors, and background colors
  const styleDefinitions = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  };

  // Add gray/grey aliases for color and bgColor
  styleDefinitions.color.gray = styleDefinitions.color.blackBright;
  styleDefinitions.color.grey = styleDefinitions.color.blackBright;
  styleDefinitions.bgColor.bgGray = styleDefinitions.bgColor.bgBlackBright;
  styleDefinitions.bgColor.bgGrey = styleDefinitions.bgColor.bgBlackBright;

  // This object will hold the final styles with open/close codes
  const ansiStyles = {};

  // For each style category (modifier, color, bgColor)
  for (const [categoryName, categoryStyles] of Object.entries(styleDefinitions)) {
    // For each style in the category
    for (const [styleName, codes] of Object.entries(categoryStyles)) {
      // Create open/close escape sequences
      ansiStyles[styleName] = {
        open: `\x1B[${codes[0]}m`,
        close: `\x1B[${codes[1]}m`
      };
      // Also assign to the category object for backward compatibility
      categoryStyles[styleName] = ansiStyles[styleName];
      // Map opening code to closing code for quick lookup
      codeMap.set(codes[0], codes[1]);
    }
    // Hide the category object from enumeration
    Object.defineProperty(ansiStyles, categoryName, {
      value: categoryStyles,
      enumerable: false
    });
  }

  // Hide the code map as a non-enumerable property
  Object.defineProperty(ansiStyles, "codes", {
    value: codeMap,
    enumerable: false
  });

  // Add default close codes for color and bgColor
  ansiStyles.color.close = "\x1B[39m";
  ansiStyles.bgColor.close = "\x1B[49m";

  // Attach lazy-evaluated color conversion functions for advanced color modes
  // (fd and generateColorMapping are assumed to be provided externally)
  fd(ansiStyles.color, "ansi", () => generateColorMapping(createAnsiEscapeSequenceGenerator, "ansi16", identityFunction, false));
  fd(ansiStyles.color, "ansi256", () => generateColorMapping(createAnsiColorCodeGenerator, "ansi256", identityFunction, false));
  fd(ansiStyles.color, "ansi16m", () => generateColorMapping(createRgbAnsiColorCodeGenerator, "rgb", collectInteractionData, false));
  fd(ansiStyles.bgColor, "ansi", () => generateColorMapping(createAnsiEscapeSequenceGenerator, "ansi16", identityFunction, true));
  fd(ansiStyles.bgColor, "ansi256", () => generateColorMapping(createAnsiColorCodeGenerator, "ansi256", identityFunction, true));
  fd(ansiStyles.bgColor, "ansi16m", () => generateColorMapping(createRgbAnsiColorCodeGenerator, "rgb", collectInteractionData, true));

  return ansiStyles;
}

module.exports = createAnsiStyles;