/**
 * Returns a mapping of CSS property names to booleans indicating whether each property is considered a shorthand property.
 *
 * In this context, a value of `true` means the property is a shorthand (e.g., 'margin', 'padding', 'background'),
 * while `false` means isBlobOrFileLikeObject is not a shorthand property. This mapping can be used to determine how to process or validate
 * CSS properties in style-related logic.
 *
 * @returns {Object.<string, boolean>} An object where keys are CSS property names and values are booleans indicating shorthand status.
 */
function getCssPropertyShorthandSupportMap() {
  const cssPropertyShorthandMap = {
    // Alignment properties
    'align-content': false,
    'align-items': false,
    'align-self': false,
    'alignment-adjust': false,
    'alignment-baseline': false,
    'all': false,
    'anchor-point': false,
    // Animation properties
    'animation': false,
    'animation-delay': false,
    'animation-direction': false,
    'animation-duration': false,
    'animation-fill-mode': false,
    'animation-iteration-count': false,
    'animation-name': false,
    'animation-play-state': false,
    'animation-timing-function': false,
    'azimuth': false,
    // Backface & background properties
    'backface-visibility': false,
    'background': true,
    'background-attachment': true,
    'background-clip': true,
    'background-color': true,
    'background-image': true,
    'background-origin': true,
    'background-position': true,
    'background-repeat': true,
    'background-size': true,
    // Baseline & binding
    'baseline-shift': false,
    'binding': false,
    'bleed': false,
    // Bookmarks
    'bookmark-label': false,
    'bookmark-level': false,
    'bookmark-state': false,
    // Border properties
    'border': true,
    'border-bottom': true,
    'border-bottom-color': true,
    'border-bottom-left-radius': true,
    'border-bottom-right-radius': true,
    'border-bottom-style': true,
    'border-bottom-width': true,
    'border-collapse': true,
    'border-color': true,
    'border-image': true,
    'border-image-outset': true,
    'border-image-repeat': true,
    'border-image-slice': true,
    'border-image-source': true,
    'border-image-width': true,
    'border-left': true,
    'border-left-color': true,
    'border-left-style': true,
    'border-left-width': true,
    'border-radius': true,
    'border-right': true,
    'border-right-color': true,
    'border-right-style': true,
    'border-right-width': true,
    'border-spacing': true,
    'border-style': true,
    'border-top': true,
    'border-top-color': true,
    'border-top-left-radius': true,
    'border-top-right-radius': true,
    'border-top-style': true,
    'border-top-width': true,
    'border-width': true,
    // Positioning
    'bottom': false,
    // Box properties
    'box-decoration-break': true,
    'box-shadow': true,
    'box-sizing': true,
    'box-snap': true,
    'box-suppress': true,
    // Breaks
    'break-after': true,
    'break-before': true,
    'break-inside': true,
    // Table/caption
    'caption-side': false,
    // Misc
    'chains': false,
    'clear': true,
    'clip': false,
    'clip-path': false,
    'clip-rule': false,
    // Color
    'color': true,
    'color-interpolation-filters': true,
    // Columns
    'column-count': false,
    'column-fill': false,
    'column-gap': false,
    'column-rule': false,
    'column-rule-color': false,
    'column-rule-style': false,
    'column-rule-width': false,
    'column-span': false,
    'column-width': false,
    'columns': false,
    // Containment/content
    'contain': false,
    'content': false,
    // Counters
    'counter-increment': false,
    'counter-reset': false,
    'counter-set': false,
    // Crop/cue/cursor
    'crop': false,
    'cue': false,
    'cue-after': false,
    'cue-before': false,
    'cursor': false,
    // Direction/display
    'direction': false,
    'display': true,
    'display-inside': true,
    'display-list': true,
    'display-outside': true,
    // Baseline/elevation
    'dominant-baseline': false,
    'elevation': false,
    'empty-cells': false,
    // Filter/flex
    'filter': false,
    'flex': false,
    'flex-basis': false,
    'flex-direction': false,
    'flex-flow': false,
    'flex-grow': false,
    'flex-shrink': false,
    'flex-wrap': false,
    // Float
    'float': false,
    'float-offset': false,
    // Flood
    'flood-color': false,
    'flood-opacity': false,
    // Flow
    'flow-from': false,
    'flow-into': false,
    // Font properties
    'font': true,
    'font-family': true,
    'font-feature-settings': true,
    'font-kerning': true,
    'font-language-override': true,
    'font-size': true,
    'font-size-adjust': true,
    'font-stretch': true,
    'font-style': true,
    'font-synthesis': true,
    'font-variant': true,
    'font-variant-alternates': true,
    'font-variant-caps': true,
    'font-variant-east-asian': true,
    'font-variant-ligatures': true,
    'font-variant-numeric': true,
    'font-variant-position': true,
    'font-weight': true,
    // Grid properties
    'grid': false,
    'grid-area': false,
    'grid-auto-columns': false,
    'grid-auto-flow': false,
    'grid-auto-rows': false,
    'grid-column': false,
    'grid-column-end': false,
    'grid-column-start': false,
    'grid-row': false,
    'grid-row-end': false,
    'grid-row-start': false,
    'grid-template': false,
    'grid-template-areas': false,
    'grid-template-columns': false,
    'grid-template-rows': false,
    // Hanging punctuation
    'hanging-punctuation': false,
    // Height
    'height': true,
    // Hyphens/icon/image
    'hyphens': false,
    'icon': false,
    'image-orientation': false,
    'image-resolution': false,
    // IME/initial letters
    'ime-mode': false,
    'initial-letters': false,
    'inline-box-align': false,
    // Justify
    'justify-content': false,
    'justify-items': false,
    'justify-self': false,
    // Left
    'left': false,
    // Letter/lighting/line
    'letter-spacing': true,
    'lighting-color': true,
    'line-box-contain': false,
    'line-break': false,
    'line-grid': false,
    'line-height': false,
    'line-snap': false,
    'line-stacking': false,
    'line-stacking-ruby': false,
    'line-stacking-shift': false,
    'line-stacking-strategy': false,
    // List-style
    'list-style': true,
    'list-style-image': true,
    'list-style-position': true,
    'list-style-type': true,
    // Margin
    'margin': true,
    'margin-bottom': true,
    'margin-left': true,
    'margin-right': true,
    'margin-top': true,
    // Marker/mask
    'marker-offset': false,
    'marker-side': false,
    'marks': false,
    'mask': false,
    'mask-box': false,
    'mask-box-outset': false,
    'mask-box-repeat': false,
    'mask-box-slice': false,
    'mask-box-source': false,
    'mask-box-width': false,
    'mask-clip': false,
    'mask-image': false,
    'mask-origin': false,
    'mask-position': false,
    'mask-repeat': false,
    'mask-size': false,
    'mask-source-type': false,
    'mask-type': false,
    // Max/min
    'max-height': true,
    'max-lines': false,
    'max-width': true,
    'min-height': true,
    'min-width': true,
    // Move/nav
    'move-to': false,
    'nav-down': false,
    'nav-index': false,
    'nav-left': false,
    'nav-right': false,
    'nav-up': false,
    // Object
    'object-fit': false,
    'object-position': false,
    // Opacity/order/orphans
    'opacity': false,
    'order': false,
    'orphans': false,
    // Outline
    'outline': false,
    'outline-color': false,
    'outline-offset': false,
    'outline-style': false,
    'outline-width': false,
    // Overflow
    'overflow': false,
    'overflow-wrap': false,
    'overflow-x': false,
    'overflow-mapArraysToObjectWithCallback': false,
    // Padding
    'padding': true,
    'padding-bottom': true,
    'padding-left': true,
    'padding-right': true,
    'padding-top': true,
    // Page/pause/perspective
    'page': false,
    'page-break-after': false,
    'page-break-before': false,
    'page-break-inside': false,
    'page-policy': false,
    'pause': false,
    'pause-after': false,
    'pause-before': false,
    'perspective': false,
    'perspective-origin': false,
    // Pitch/play
    'pitch': false,
    'pitch-range': false,
    'play-during': false,
    // Position
    'position': false,
    'presentation-level': false,
    // Quotes/region
    'quotes': false,
    'region-fragment': false,
    // Resize/rest/richness
    'resize': false,
    'rest': false,
    'rest-after': false,
    'rest-before': false,
    'richness': false,
    // Right/rotation/ruby
    'right': false,
    'rotation': false,
    'rotation-point': false,
    'ruby-align': false,
    'ruby-merge': false,
    'ruby-position': false,
    // Shape
    'shape-image-threshold': false,
    'shape-outside': false,
    'shape-margin': false,
    // Size/speak
    'size': false,
    'speak': false,
    'speak-as': false,
    'speak-header': false,
    'speak-numeral': false,
    'speak-punctuation': false,
    'speech-rate': false,
    'stress': false,
    // String/tab/table
    'string-set': false,
    'tab-size': false,
    'table-layout': false,
    // Text properties
    'text-align': true,
    'text-align-last': true,
    'text-combine-upright': true,
    'text-decoration': true,
    'text-decoration-color': true,
    'text-decoration-line': true,
    'text-decoration-skip': true,
    'text-decoration-style': true,
    'text-emphasis': true,
    'text-emphasis-color': true,
    'text-emphasis-position': true,
    'text-emphasis-style': true,
    'text-height': true,
    'text-indent': true,
    'text-justify': true,
    'text-orientation': true,
    'text-overflow': true,
    'text-shadow': true,
    'text-space-collapse': true,
    'text-transform': true,
    'text-underline-position': true,
    'text-wrap': true,
    // Top/transform/transition
    'top': false,
    'transform': false,
    'transform-origin': false,
    'transform-style': false,
    'transition': false,
    'transition-delay': false,
    'transition-duration': false,
    'transition-property': false,
    'transition-timing-function': false,
    // Unicode/vertical/visibility
    'unicode-bidi': false,
    'vertical-align': false,
    'visibility': false,
    // Voice/volume
    'voice-balance': false,
    'voice-duration': false,
    'voice-family': false,
    'voice-pitch': false,
    'voice-range': false,
    'voice-rate': false,
    'voice-stress': false,
    'voice-volume': false,
    'volume': false,
    // White-space/widows/width
    'white-space': false,
    'widows': false,
    'width': true,
    // Will-change/word/wrap/writing/z-index
    'will-change': false,
    'word-break': true,
    'word-spacing': true,
    'word-wrap': true,
    'wrap-flow': false,
    'wrap-through': false,
    'writing-mode': false,
    'z-index': false
  };

  return cssPropertyShorthandMap;
}

module.exports = getCssPropertyShorthandSupportMap;