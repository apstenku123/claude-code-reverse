/**
 * Defines the syntax highlighting rules for the AutoIt programming language.
 *
 * @param {object} hljs - The highlight.js library instance, providing helper methods for defining language constructs.
 * @returns {object} An object describing the syntax highlighting configuration for AutoIt.
 */
function defineAutoItHighlighting(hljs) {
  // List of AutoIt language keywords
  const autoItKeywords =
    "ByRef Case Const ContinueCase ContinueLoop Dim normalizeToError Else ElseIf EndFunc EndIf EndSelect EndSwitch EndWith Enum Exit ExitLoop For Func Global If In Local Next ReDim Return Select Static Step Switch Then To Until Volatile WEnd While With";

  // List of AutoIt meta-keywords (preprocessor directives)
  const autoItMetaKeywords = [
    "EndRegion", "forcedef", "forceref", "ignorefunc", "include", "include-once", "NoTrayIcon", "OnAutoItStartRegister", "pragma", "Region", "RequireAdmin", "Tidy_Off", "Tidy_On", "Tidy_Parameters"
  ];

  // List of AutoIt literals
  const autoItLiterals = "True False And Null Not Or Default";

  // List of AutoIt built-in functions
  const autoItBuiltIns =
    "Abs ACos AdlibRegister AdlibUnRegister Asc AscW ASin Assign ATan AutoItSetOption AutoItWinGetTitle AutoItWinSetTitle Beep Binary BinaryLen BinaryMid BinaryToString BitAND BitNOT BitOR BitRotate BitShift BitXOR BlockInput Break Call CDTray Ceiling Chr ChrW ClipGet ClipPut ConsoleRead ConsoleWrite ConsoleWriteError ControlClick ControlCommand ControlDisable ControlEnable ControlFocus ControlGetFocus ControlGetHandle ControlGetPos ControlGetText ControlHide ControlListView ControlMove ControlSend ControlSetText ControlShow ControlTreeView Cos Dec DirCopy DirCreate DirGetSize DirMove DirRemove DllCall DllCallAddress DllCallbackFree DllCallbackGetPtr DllCallbackRegister DllClose DllOpen DllStructCreate DllStructGetData DllStructGetPtr DllStructGetSize DllStructSetData DriveGetDrive DriveGetFileSystem DriveGetLabel DriveGetSerial DriveGetType DriveMapAdd DriveMapDel DriveMapGet DriveSetLabel DriveSpaceFree DriveSpaceTotal DriveStatus EnvGet EnvSet EnvUpdate Eval Execute Exp FileChangeDir FileClose FileCopy FileCreateNTFSLink FileCreateShortcut FileDelete FileExists FileFindFirstFile FileFindNextFile FileFlush FileGetAttrib FileGetEncoding FileGetLongName FileGetPos FileGetShortcut FileGetShortName FileGetSize FileGetTime FileGetVersion FileInstall FileMove FileOpen FileOpenDialog FileRead FileReadLine FileReadToArray FileRecycle FileRecycleEmpty FileSaveDialog FileSelectFolder FileSetAttrib FileSetEnd FileSetPos FileSetTime FileWrite FileWriteLine Floor FtpSetProxy FuncName GUICreate GUICtrlCreateAvi GUICtrlCreateButton GUICtrlCreateCheckbox GUICtrlCreateCombo GUICtrlCreateContextMenu GUICtrlCreateDate GUICtrlCreateDummy GUICtrlCreateEdit GUICtrlCreateGraphic GUICtrlCreateGroup GUICtrlCreateIcon GUICtrlCreateInput GUICtrlCreateLabel GUICtrlCreateList GUICtrlCreateListView GUICtrlCreateListViewItem GUICtrlCreateMenu GUICtrlCreateMenuItem GUICtrlCreateMonthCal GUICtrlCreateObj GUICtrlCreatePic GUICtrlCreateProgress GUICtrlCreateRadio GUICtrlCreateSlider GUICtrlCreateTab GUICtrlCreateTabItem GUICtrlCreateTreeView GUICtrlCreateTreeViewItem GUICtrlCreateUpdown GUICtrlDelete GUICtrlGetHandle GUICtrlGetState GUICtrlRead GUICtrlRecvMsg GUICtrlRegisterListViewSort GUICtrlSendMsg GUICtrlSendToDummy GUICtrlSetBkColor GUICtrlSetColor GUICtrlSetCursor GUICtrlSetData GUICtrlSetDefBkColor GUICtrlSetDefColor GUICtrlSetFont GUICtrlSetGraphic GUICtrlSetImage GUICtrlSetLimit GUICtrlSetOnEvent GUICtrlSetPos GUICtrlSetResizing GUICtrlSetState GUICtrlSetStyle GUICtrlSetTip GUIDelete GUIGetCursorInfo GUIGetMsg GUIGetStyle GUIRegisterMsg GUISetAccelerators GUISetBkColor GUISetCoord GUISetCursor GUISetFont GUISetHelp GUISetIcon GUISetOnEvent GUISetState GUISetStyle GUIStartGroup GUISwitch Hex HotKeySet HttpSetProxy HttpSetUserAgent HWnd InetClose InetGet InetGetInfo InetGetSize InetRead IniDelete IniRead IniReadSection IniReadSectionNames IniRenameSection IniWrite IniWriteSection InputBox Int IsAdmin IsArray IsBinary IsBool IsDeclared IsDllStruct IsFloat IsFunc IsHWnd IsInt IsKeyword IsNumber IsObj IsPtr IsString Log MemGetStats Mod MouseClick MouseClickDrag MouseDown MouseGetCursor MouseGetPos MouseMove MouseUp MouseWheel MsgBox Number ObjCreate ObjCreateInterface ObjEvent ObjGet ObjName OnAutoItExitRegister OnAutoItExitUnRegister Ping PixelChecksum PixelGetColor PixelSearch ProcessClose ProcessExists ProcessGetStats ProcessList ProcessSetPriority ProcessWait ProcessWaitClose ProgressOff ProgressOn ProgressSet Ptr Random RegDelete RegEnumKey RegEnumVal RegRead RegWrite Round Run RunAs RunAsWait RunWait Send SendKeepActive SetError SetExtended ShellExecute ShellExecuteWait Shutdown Sin Sleep SoundPlay SoundSetWaveVolume SplashImageOn SplashOff SplashTextOn Sqrt SRandom StatusbarGetText StderrRead StdinWrite StdioClose StdoutRead String StringAddCR StringCompare StringFormat StringFromASCIIArray StringInStr StringIsAlNum StringIsAlpha StringIsASCII StringIsDigit StringIsFloat StringIsInt StringIsLower StringIsSpace StringIsUpper StringIsXDigit StringLeft StringLen StringLower StringMid StringRegExp StringRegExpReplace StringReplace StringReverse StringRight StringSplit StringStripCR StringStripWS StringToASCIIArray StringToBinary StringTrimLeft StringTrimRight StringUpper Tan TCPAccept TCPCloseSocket TCPConnect TCPListen TCPNameToIP TCPRecv TCPSend TCPShutdown, UDPShutdown TCPStartup, UDPStartup TimerDiff TimerInit ToolTip TrayCreateItem TrayCreateMenu TrayGetMsg TrayItemDelete TrayItemGetHandle TrayItemGetState TrayItemGetText TrayItemSetOnEvent TrayItemSetState TrayItemSetText TraySetClick TraySetIcon TraySetOnEvent TraySetPauseIcon TraySetState TraySetToolTip TrayTip UBound UDPBind UDPCloseSocket UDPOpen UDPRecv UDPSend VarGetType WinActivate WinActive WinClose WinExists WinFlash WinGetCaretPos WinGetClassList WinGetClientSize WinGetHandle WinGetPos WinGetProcess WinGetState WinGetText WinGetTitle WinKill WinList WinMenuSelectItem WinMinimizeAll WinMinimizeAllUndo WinMove WinSetOnTop WinSetState WinSetTitle WinSetTrans WinWait WinWaitActive WinWaitClose WinWaitNotActive";

  // Comment modes: single-line and block comments
  const commentModes = {
    variants: [
      hljs.COMMENT(";", "$", { relevance: 0 }), // Single-line comment
      hljs.COMMENT("#cs", "#ce"),                // Block comment #cs ... #ce
      hljs.COMMENT("#comments-start", "#comments-end") // Alternative block comment
    ]
  };

  // Variable mode: matches variables like $varName
  const variableMode = {
    begin: "\\$[a-z0-9_]+"
  };

  // String mode: supports both single and double quoted strings, with escape for double/single quotes
  const stringMode = {
    className: "string",
    variants: [
      {
        begin: /"/,
        end: /"/,
        contains: [
          {
            begin: /""/,
            relevance: 0
          }
        ]
      },
      {
        begin: /'/,
        end: /'/,
        contains: [
          {
            begin: /''/,
            relevance: 0
          }
        ]
      }
    ]
  };

  // Number mode: supports binary and C-style numbers
  const numberMode = {
    variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]
  };

  // Meta mode: matches preprocessor directives (e.g., #include, #pragma)
  const metaMode = {
    className: "meta",
    begin: "#",
    end: "$",
    keywords: {
      "meta-keyword": autoItMetaKeywords
    },
    contains: [
      {
        begin: /\\\n/, // Line continuation
        relevance: 0
      },
      {
        beginKeywords: "include",
        keywords: {
          "meta-keyword": "include"
        },
        end: "$",
        contains: [
          stringMode,
          {
            className: "meta-string",
            variants: [
              { begin: "<", end: ">" },
              {
                begin: /"/,
                end: /"/,
                contains: [
                  { begin: /""/, relevance: 0 }
                ]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [
                  { begin: /''/, relevance: 0 }
                ]
              }
            ]
          }
        ]
      },
      stringMode,
      commentModes
    ]
  };

  // Symbol mode: matches special variables like @error, @CR, etc.
  const symbolMode = {
    className: "symbol",
    begin: "@[a-z0-9_]+"
  };

  // Function definition mode: matches 'Func functionName(params)'
  const functionDefinitionMode = {
    className: "function",
    beginKeywords: "Func",
    end: "$",
    illegal: "\\$|\\[|%", // Illegal characters in function definition
    contains: [
      hljs.UNDERSCORE_TITLE_MODE, // Function name
      {
        className: "params",
        begin: "\\(",
        end: "\\)",
        contains: [variableMode, stringMode, numberMode]
      }
    ]
  };

  // Return the full language definition object
  return {
    name: "AutoIt",
    case_insensitive: true,
    illegal: /\/\*/, // Disallow C-style block comments
    keywords: {
      keyword: autoItKeywords,
      built_in: autoItBuiltIns,
      literal: autoItLiterals
    },
    contains: [
      commentModes,
      variableMode,
      stringMode,
      numberMode,
      metaMode,
      symbolMode,
      functionDefinitionMode
    ]
  };
}

module.exports = defineAutoItHighlighting;