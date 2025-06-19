/**
 * Determines if a given Unicode code point corresponds to an emoji character.
 *
 * This function checks if the provided code point falls within any of the known Unicode ranges or specific code points
 * that are assigned to emoji characters. The ranges and code points are based on the Unicode standard and include
 * both legacy and modern emoji blocks.
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is an emoji, false otherwise.
 */
function isUnicodeEmojiCodePoint(codePoint) {
  // List of all emoji code point ranges and individual code points
  // Each entry is either a single code point (number) or a [start, end] range (array)
  const emojiRangesAndPoints = [
    [4352, 4447], 8986, 8987, 9001, 9002, [9193, 9196], 9200, 9203, 9725, 9726, 9748, 9749,
    [9776, 9783], [9800, 9811], 9855, [9866, 9871], 9875, 9889, 9898, 9899, 9917, 9918, 9924, 9925,
    9934, 9940, 9962, 9970, 9971, 9973, 9978, 9981, 9989, 9994, 9995, 10024, 10060, 10062,
    [10067, 10069], 10071, [10133, 10135], 10160, 10175, 11035, 11036, 11088, 11093,
    [11904, 11929], [11931, 12019], [12032, 12245], [12272, 12287], [12289, 12350],
    [12353, 12438], [12441, 12543], [12549, 12591], [12593, 12686], [12688, 12773],
    [12783, 12830], [12832, 12871], [12880, 42124], [42128, 42182], [43360, 43388],
    [44032, 55203], [63744, 64255], [65040, 65049], [65072, 65106], [65108, 65126],
    [65128, 65131], [94176, 94180], 94192, 94193, [94208, 100343], [100352, 101589],
    [101631, 101640], [110576, 110579], [110581, 110587], 110589, 110590, [110592, 110882],
    110898, [110928, 110930], 110933, [110948, 110951], [110960, 111355], [119552, 119638],
    [119648, 119670], 126980, 127183, 127374, [127377, 127386], [127488, 127490],
    [127504, 127547], [127552, 127560], 127568, 127569, [127584, 127589], [127744, 127776],
    [127789, 127797], [127799, 127868], [127870, 127891], [127904, 127946], [127951, 127955],
    [127968, 127984], 127988, [127992, 128062], 128064, [128066, 128252], [128255, 128317],
    [128331, 128334], [128336, 128359], 128378, 128405, 128406, 128420, [128507, 128591],
    [128640, 128709], 128716, [128720, 128722], [128725, 128727], [128732, 128735],
    128747, 128748, [128756, 128764], [128992, 129003], 129008, [129292, 129338],
    [129340, 129349], [129351, 129535], [129648, 129660], [129664, 129673], [129679, 129734],
    [129742, 129756], [129759, 129769], [129776, 129784], [131072, 196605], [196608, 262141]
  ];

  // Check if the codePoint matches any of the emoji code points or falls within any emoji range
  for (const entry of emojiRangesAndPoints) {
    if (Array.isArray(entry)) {
      // Entry is a range: [start, end]
      const [start, end] = entry;
      if (codePoint >= start && codePoint <= end) {
        return true;
      }
    } else {
      // Entry is a single code point
      if (codePoint === entry) {
        return true;
      }
    }
  }
  return false;
}

module.exports = isUnicodeEmojiCodePoint;
