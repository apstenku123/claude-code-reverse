/**
 * Returns the language definition object for RenderMan RIB syntax highlighting.
 *
 * @param {object} syntaxModes - An object containing syntax highlighting modes, such as comment, number, and string modes.
 * @returns {object} The language definition object for RenderMan RIB, including name, keywords, illegal patterns, and contained modes.
 */
function getRenderManRibLanguageDefinition(syntaxModes) {
  return {
    name: "RenderMan RIB",
    // List of all reserved keywords in RenderMan RIB
    keywords: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
    // Illegal pattern to prevent matching certain HTML tags
    illegal: "</",
    // Syntax highlighting modes to be included for this language
    contains: [
      syntaxModes.HASH_COMMENT_MODE, // Handles hash-style comments
      syntaxModes.C_NUMBER_MODE,     // Handles C-style numbers
      syntaxModes.APOS_STRING_MODE,  // Handles single-quoted strings
      syntaxModes.QUOTE_STRING_MODE  // Handles double-quoted strings
    ]
  };
}

module.exports = getRenderManRibLanguageDefinition;