/**
 * Factory function that creates a syntax highlighting configuration object for RenderMan RSL language.
 *
 * @param {object} highlightJsApi - The highlight.js API object providing language modes for comments, strings, and numbers.
 * @returns {object} Syntax highlighting configuration for RenderMan RSL.
 */
function createRenderManRSLHighlightConfig(highlightJsApi) {
  return {
    name: "RenderMan RSL",
    keywords: {
      keyword:
        "float color point normal vector matrix while for if do return else break extern continue",
      built_in:
        "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du processObservableWithConfig environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
    },
    // Illegal pattern to prevent highlighting of HTML-like tags
    illegal: "</",
    contains: [
      // Single-line comments
      highlightJsApi.C_LINE_COMMENT_MODE,
      // Multi-line comments
      highlightJsApi.C_BLOCK_COMMENT_MODE,
      // Double-quoted strings
      highlightJsApi.QUOTE_STRING_MODE,
      // Single-quoted strings
      highlightJsApi.APOS_STRING_MODE,
      // Numeric literals
      highlightJsApi.C_NUMBER_MODE,
      // Preprocessor/meta directives (e.g., #define)
      {
        className: "meta",
        begin: "#",
        end: "$"
      },
      // Class-like declarations: surface, displacement, light, volume, imager
      {
        className: "class",
        beginKeywords: "surface displacement light volume imager",
        end: "\\("
      },
      // Special function declarations: illuminate, illuminance, gather
      {
        beginKeywords: "illuminate illuminance gather",
        end: "\\("
      }
    ]
  };
}

module.exports = createRenderManRSLHighlightConfig;