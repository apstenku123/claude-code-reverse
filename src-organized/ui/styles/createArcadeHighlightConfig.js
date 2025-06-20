/**
 * Generates a configuration object for syntax highlighting of the ArcGIS Arcade language.
 *
 * @param {object} hljs - The highlight.js library instance, providing language modes and regexes.
 * @returns {object} Configuration object for highlight.js to support Arcade syntax highlighting.
 */
function createArcadeHighlightConfig(hljs) {
  // Define Arcade language keywords, literals, and built-in functions
  const arcadeKeywords = {
    keyword: "if for while var new function do return void else break",
    literal: "BackSlash DoubleQuote false ForwardSlash Infinity NaN NewLine null handleHeadElementStartTag SingleQuote Tab TextFormatting true undefined",
    built_in: "Abs Acos Angle Attachments Area AreaGeodetic Asin Atan Atan2 Average Bearing Boolean Buffer BufferGeodetic Ceil Centroid Clip Console Constrain Contains Cos Count Crosses Cut Date DateAdd DateDiff Day Decode DefaultValue Dictionary Difference Disjoint Distance DistanceGeodetic Distinct DomainCode DomainName Equals Exp Extent Feature FeatureSet FeatureSetByAssociation FeatureSetById FeatureSetByPortalItem FeatureSetByRelationshipName FeatureSetByTitle FeatureSetByUrl Filter First Floor Geometry GroupBy Guid HasKey Hour IIf IndexOf Intersection Intersects IsEmpty IsNan IsSelfIntersecting Length LengthGeodetic Log Max Mean Millisecond Min Minute Month MultiPartToSinglePart Multipoint NextSequenceValue Now Number OrderBy Overlaps Point Polygon Polyline Portal Pow Random Relate Reverse RingIsClockWise Round Second SetGeometry Sin Sort Sqrt Stdev Sum SymmetricDifference Tan Text Timestamp Today ToLocal Top Touches ToUTC TrackCurrentTime TrackGeometryWindow TrackIndex TrackStartTime TrackWindow TypeOf Union UrlEncode Variance Weekday When Within Year "
  };

  // Match Arcade system variables (e.g., $feature, $layer, etc.)
  const systemVariableMode = {
    className: "symbol",
    begin: /\$[datastore|feature|layer|map|measure|sourcefeature|sourcelayer|targetfeature|targetlayer|value|view]+/
  };

  // Match Arcade number literals (binary, octal, decimal)
  const numberMode = {
    className: "number",
    variants: [
      { begin: /\b0[bB][01]+/ },
      { begin: /\b0[oO][0-7]+/ },
      { begin: hljs.C_NUMBER_RE }
    ],
    relevance: 0
  };

  // Match Arcade template string substitutions (e.g., `${expression}`)
  const templateSubstitutionMode = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    keywords: arcadeKeywords,
    contains: [] // Will be filled later
  };

  // Match Arcade template strings (backtick-quoted, with substitutions)
  const templateStringMode = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE, templateSubstitutionMode]
  };

  // Fill templateSubstitutionMode.contains with allowed modes inside `${...}`
  templateSubstitutionMode.contains = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    templateStringMode,
    numberMode,
    hljs.REGEXP_MODE
  ];

  // Modes allowed inside function parameter lists, template substitutions, etc.
  const expressionModes = templateSubstitutionMode.contains.concat([
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_LINE_COMMENT_MODE
  ]);

  return {
    name: "ArcGIS Arcade",
    keywords: arcadeKeywords,
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      templateStringMode,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      systemVariableMode,
      numberMode,
      // Object property highlighting (e.g., { foo: ... })
      {
        begin: /[{,]\s*/,
        relevance: 0,
        contains: [
          {
            begin: /[a-z_][0-9A-zA-z_]*\s*:/,
            returnBegin: true,
            relevance: 0,
            contains: [
              {
                className: "attr",
                begin: /[a-z_][0-9A-zA-z_]*/,
                relevance: 0
              }
            ]
          }
        ]
      },
      // Arrow function highlighting after return or expression starters
      {
        begin: new RegExp("(" + hljs.RE_STARTERS_RE + "|\\b(return)\\b)\\s*"),
        keywords: "return",
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          {
            className: "function",
            begin: /(\(.*?\)|[a-z_][0-9A-zA-z_]*)\s*=>/,
            returnBegin: true,
            end: /\\s*=>/,
            contains: [
              {
                className: "params",
                variants: [
                  { begin: /[a-z_][0-9A-zA-z_]*/ },
                  { begin: /\(\s*\)/ },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: arcadeKeywords,
                    contains: expressionModes
                  }
                ]
              }
            ]
          }
        ],
        relevance: 0
      },
      // Function declaration highlighting
      {
        className: "function",
        beginKeywords: "function",
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[a-z_][0-9A-zA-z_]*/
          }),
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: expressionModes
          }
        ],
        illegal: /\[|%/
      },
      // Match $() and $. (Arcade system variable access)
      {
        begin: /\$[(.]/
      }
    ],
    // Disallow # except for #!
    illegal: /#(?!!)/
  };
}

module.exports = createArcadeHighlightConfig;
