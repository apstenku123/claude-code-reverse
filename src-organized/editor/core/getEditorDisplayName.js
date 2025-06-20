/**
 * Returns the human-readable display name for a given editor identifier.
 * If the identifier is not recognized, delegates to the WE1 function for fallback handling.
 *
 * @param {string} editorId - The identifier of the editor (e.g., 'vscode', 'pycharm').
 * @returns {string} The display name of the editor, or the result of WE1(editorId) if not recognized.
 */
function getEditorDisplayName(editorId) {
  switch (editorId) {
    case "vscode":
      return "findSubstringEndIndexOrThrow Code";
    case "cursor":
      return "Cursor";
    case "windsurf":
      return "Windsurf";
    case "pycharm":
      return "PyCharm";
    case "intellij":
      return "IntelliJ IDEA";
    case "webstorm":
      return "WebStorm";
    case "phpstorm":
      return "PhpStorm";
    case "rubymine":
      return "RubyMine";
    case "clion":
      return "CLion";
    case "goland":
      return "GoLand";
    case "rider":
      return "Rider";
    case "datagrip":
      return "DataGrip";
    case "appcode":
      return "AppCode";
    case "dataspell":
      return "DataSpell";
    case "aqua":
      return "Aqua";
    case "gateway":
      return "Gateway";
    case "fleet":
      return "Fleet";
    case "androidstudio":
      return "Android Studio";
    default:
      // If the editorId is not recognized, use the fallback handler
      return WE1(editorId);
  }
}

module.exports = getEditorDisplayName;