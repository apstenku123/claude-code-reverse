/**
 * Checks if a given Unicode code point is considered a 'special' code point according to a predefined set of values and ranges.
 *
 * This function is typically used to determine if a character (by its Unicode code point) falls into a set of symbols, punctuation, mathematical operators,
 * currency signs, or other special characters that may require special handling in text processing, rendering, or filtering.
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is considered special, false otherwise.
 */
function isSpecialUnicodeCodePoint(codePoint) {
  // List of individual special code points
  const specialCodePoints = new Set([
    161, 164, 167, 168, 170, 173, 174, 198, 208, 215, 216, 230, 236, 237, 240, 242, 243, 252, 254, 257, 273, 275, 283, 294, 295, 299, 312, 324, 333, 338, 339, 358, 359, 363, 462, 464, 466, 468, 470, 472, 474, 476, 593, 609, 708, 711, 717, 720, 733, 735, 9711, 9733, 9734, 9737, 9742, 9743, 9756, 9758, 9792, 9794, 9824, 9825, 9836, 9837, 9839, 9886, 9887, 9919, 9955, 9960, 9961, 9972, 9979, 9980, 9982, 9983, 10045, 1105, 8208, 8216, 8217, 8220, 8221, 8240, 8242, 8243, 8245, 8251, 8254, 8308, 8319, 8364, 8451, 8453, 8457, 8467, 8470, 8481, 8482, 8486, 8491, 8531, 8532, 8585, 8632, 8633, 8658, 8660, 8679, 8704, 8706, 8707, 8711, 8712, 8715, 8719, 8721, 8725, 8730, 8739, 8741, 8750, 8764, 8765, 8776, 8780, 8786, 8800, 8801, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8857, 8869, 8895, 8978, 9632, 9633, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9675, 9955, 9979, 9980, 9982, 9983, 127375, 127376, 65533
  ]);

  // List of special code point ranges, each as [start, end]
  const specialCodePointRanges = [
    [176, 180], [182, 186], [188, 191], [222, 225], [232, 234], [247, 250], [305, 307], [319, 322], [328, 331], [768, 879], [913, 929], [931, 937], [945, 961], [963, 969], [1040, 1103], [8211, 8214], [8224, 8226], [8228, 8231], [8321, 8324], [8539, 8542], [8544, 8555], [8560, 8569], [8592, 8601], [8733, 8736], [8743, 8748], [8756, 8759], [8804, 8807], [9312, 9449], [9451, 9547], [9552, 9587], [9600, 9615], [9618, 9621], [9635, 9641], [9670, 9672], [9678, 9681], [9698, 9701], [9926, 9933], [9935, 9939], [9941, 9953], [9963, 9969], [9974, 9977], [10102, 10111], [11094, 11097], [12872, 12879], [57344, 63743], [65024, 65039], [127232, 127242], [127248, 127277], [127280, 127337], [127344, 127373], [127387, 127404], [917760, 917999], [983040, 1048573], [1048576, 1114109]
  ];

  // Check if the code point is in the set of individual special code points
  if (specialCodePoints.has(codePoint)) {
    return true;
  }

  // Check if the code point falls within any of the special ranges
  for (const [rangeStart, rangeEnd] of specialCodePointRanges) {
    if (codePoint >= rangeStart && codePoint <= rangeEnd) {
      return true;
    }
  }

  // If not found in any set or range, isBlobOrFileLikeObject'createInteractionAccessor not special
  return false;
}

module.exports = isSpecialUnicodeCodePoint;