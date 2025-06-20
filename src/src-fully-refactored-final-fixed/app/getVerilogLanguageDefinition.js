/**
 * Returns the language definition object for Verilog, suitable for syntax highlighting libraries.
 *
 * @param {object} hljs - The syntax highlighting library instance, expected to provide comment and string modes.
 * @returns {object} The language definition object for Verilog.
 */
function getVerilogLanguageDefinition(hljs) {
  return {
    name: "Verilog",
    aliases: ["createRangeIterator", "sv", "svh"],
    case_insensitive: false,
    keywords: {
      // Pattern for matching keywords, identifiers, etc.
      $pattern: /[\w\$]+/,
      // List of Verilog keywords
      keyword: "accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf|0 bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate|5 genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor",
      // List of Verilog literals
      literal: "null",
      // List of Verilog built-in system functions and tasks
      built_in: "$finish $stop $exit $fatal $error $warning $info $realtime $time $printtimescale $bitstoreal $bitstoshortreal $itor $signed $cast $bits $stime $timeformat $realtobits $shortrealtobits $rtoi $unsigned $asserton $assertkill $assertpasson $assertfailon $assertnonvacuouson $assertoff $assertcontrol $assertpassoff $assertfailoff $assertvacuousoff $isunbounded $sampled $fell $changed $past_gclk $fell_gclk $changed_gclk $rising_gclk $steady_gclk $coverage_control $coverage_get $coverage_save $set_coverage_db_name $rose $stable $past $rose_gclk $stable_gclk $future_gclk $falling_gclk $changing_gclk $display $coverage_get_max $coverage_merge $get_coverage $load_coverage_db $typename $unpacked_dimensions $left $low $increment $clog2 $ln $log10 $exp $sqrt $pow $floor $ceil $sin $cos $tan $countbits $onehot $isunknown $fatal $warning $dimensions $right $high $size $asin $acos $atan $atan2 $hypot $sinh $cosh $tanh $asinh $acosh $atanh $countones $onehot0 $error $info $random $dist_chi_square $dist_erlang $dist_exponential $dist_normal $dist_poisson $dist_t $dist_uniform $q_initialize $q_remove $q_exam $async$and$array $async$nand$array $async$or$array $async$nor$array $sync$and$array $sync$nand$array $sync$or$array $sync$nor$array $q_add $q_full $psprintf $async$and$plane $async$nand$plane $async$or$plane $async$nor$plane $sync$and$plane $sync$nand$plane $sync$or$plane $sync$nor$plane $system $display $displayb $displayh $displayo $strobe $strobeb $strobeh $strobeo $write $readmemb $readmemh $writememh $value$plusargs $dumpvars $dumpon $dumplimit $dumpports $dumpportson $dumpportslimit $writeb $writeh $writeo $monitor $monitorb $monitorh $monitoro $writememb $dumpfile $dumpoff $dumpall $dumpflush $dumpportsoff $dumpportsall $dumpportsflush $fclose $fdisplay $fdisplayb $fdisplayh $fdisplayo $fstrobe $fstrobeb $fstrobeh $fstrobeo $swrite $swriteb $swriteh $swriteo $fscanf $fread $fseek $fflush $feof $fopen $fwrite $fwriteb $fwriteh $fwriteo $fmonitor $fmonitorb $fmonitorh $fmonitoro $sformat $sformatf $fgetc $ungetc $fgets $sscanf $rewind $ftell $ferror"
    },
    contains: [
      // Block comments (/* ... */)
      hljs.C_BLOCK_COMMENT_MODE,
      // Line comments (// ...)
      hljs.C_LINE_COMMENT_MODE,
      // String literals ("...")
      hljs.QUOTE_STRING_MODE,
      // Number literals (binary, hex, octal, decimal, etc.)
      {
        className: "number",
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          {
            // e.g. 8'hFF, 4'b1010, etc.
            begin: "\\b((\\d+'(b|h|processSubLanguageHighlighting|d|createPropertyAccessor|H|createDebouncedFunction|createCompatibleVersionChecker))[0-9xzXZa-fA-F_]+)"
          },
          {
            // e.g. 'hFF, 'b1010, etc. (no leading digit)
            begin: "\\b(('(b|h|processSubLanguageHighlighting|d|createPropertyAccessor|H|createDebouncedFunction|createCompatibleVersionChecker))[0-9xzXZa-fA-F_]+)"
          },
          {
            // Simple decimal numbers
            begin: "\\b([0-9_])+",
            relevance: 0
          }
        ]
      },
      // Variable patterns (parameters, dot notation)
      {
        className: "variable",
        variants: [
          {
            // Parameterized instance: #( ... )
            begin: "#\\((?!parameter).+\\)"
          },
          {
            // Dot notation: .foo
            begin: "\\.\\w+",
            relevance: 0
          }
        ]
      },
      // Preprocessor/meta directives (e.g. `define, `include)
      {
        className: "meta",
        begin: "`",
        end: "$",
        keywords: {
          "meta-keyword": "define __FILE__ __LINE__ begin_keywords celldefine default_nettype define else elsif end_keywords endcelldefine endif ifdef ifndef include line nounconnected_drive pragma resetall timescale unconnected_drive undef undefineall"
        },
        relevance: 0
      }
    ]
  };
}

module.exports = getVerilogLanguageDefinition;
