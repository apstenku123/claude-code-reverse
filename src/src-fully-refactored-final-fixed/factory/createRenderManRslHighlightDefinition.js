/**
 * Factory function that creates a syntax highlighting definition object for RenderMan RSL language.
 *
 * @param {object} hljs - The highlight.js core library object, providing language modes and helpers.
 * @returns {object} Highlight.js language definition for RenderMan RSL.
 */
function createRenderManRSLHighlightDefinition(hljs) {
  return {
    name: "RenderMan RSL",
    keywords: {
      keyword:
        "float color point normal vector matrix while for if do return else break extern continue",
      built_in:
        "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du processObservableWithConfig environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
    },
    // Illegal pattern to avoid highlighting HTML-like tags
    illegal: "</",
    contains: [
      // Single-line comments (// ...)
      hljs.C_LINE_COMMENT_MODE,
      // Multi-line comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Double-quoted strings
      hljs.QUOTE_STRING_MODE,
      // Single-quoted strings
      hljs.APOS_STRING_MODE,
      // Numbers
      hljs.C_NUMBER_MODE,
      // Preprocessor/meta lines (e.g. #include)
      {
        className: "meta",
        begin: "#",
        end: "$"
      },
      // Class/function definitions for RenderMan RSL
      {
        className: "class",
        beginKeywords: "surface displacement light volume imager",
        end: "\\("
      },
      // Special keywords that begin code blocks
      {
        beginKeywords: "illuminate illuminance gather",
        end: "\\("
      }
    ]
  };
}

module.exports = createRenderManRSLHighlightDefinition;