var editorTest = {
    init: function () {
        var items = asEditor.init();
        $.each(items, function (index, item) {
            var mode = item.options.mode;
            if (mode === "text/x-mssql")
                editorTest.setSQLValue(item);
            else if (mode === "javascript")
                editorTest.setJSValue(item);
            else if (mode === "text/x-scss")
                editorTest.setCSSValue(item);
            else if (mode === "text/html")
                editorTest.setHTMLValue(item);
        });
        $(".btnSet").on("click", function () {
            var num = $(this).attr("data-num") - 1;
            asEditor.setContent(items[num], "message " + (num + 1));
        });
        $(".Get").on("click", function () {
            var num = $(this).attr("data-num") - 1;
            var val = asEditor.getContent(items[num]);
            alert(val);
        });
    },
    setSQLValue: function (myCodeMirror) {
         var value = "-- SQL Mode for CodeMirror\n" +
            "SELECT SQL_NO_CACHE DISTINCT\n" +
            "@var1 AS `val1`, @'val2', @global.'sql_mode',\n" +
            "1.1 AS `float_val`, .14 AS `another_float`, 0.09e3 AS `int_with_esp`,\n" +
            "0xFA5 AS `hex`, x'fa5' AS `hex2`, 0b101 AS `bin`, b'101' AS `bin2`,\n" +
            "DATE '1994-01-01' AS `sql_date`, { T \"1994-01-01\" } AS `odbc_date`,\n" +
            "'my string', _utf8'your string', N'her string',\n" +
            "TRUE, FALSE, UNKNOWN\n" +
            "FROM DUAL\n" +
            "-- space needed after '--'\n" +
            "# 1 line comment\n" +
            "/* multiline\n" +
            "comment! */\n" +
            "LIMIT 1 OFFSET 0;\n";
        asEditor.setContent(myCodeMirror, value);
    },
    setJSValue: function (myCodeMirrorJS) {
        valueJS = "function StringStream(string) {\n" +
            "this.pos = 0;\n" +
            "this.string = string;\n" +
            "}\n" +
            "\n" +
            "StringStream.prototype = {\n" +
            "done: function () { return this.pos >= this.string.length; },\n" +
            "peek: function () { return this.string.charAt(this.pos); },\n" +
            "next: function () {\n" +
            "if (this.pos < this.string.length)\n" +
            "return this.string.charAt(this.pos++);\n" +
            "},\n" +
            "eat: function (match) {\n" +
            "var ch = this.string.charAt(this.pos);\n" +
            "if (typeof match == \"string\") var ok = ch == match;\n" +
            "else var ok = ch && match.test ? match.test(ch) : match(ch);\n" +
            "if (ok) { this.pos++; return ch; }\n" +
            "},\n" +
            "eatWhile: function (match) {\n" +
            "var start = this.pos;\n" +
            "while (this.eat(match));\n" +
            "if (this.pos > start) return this.string.slice(start, this.pos);\n" +
            "},\n" +
            "backUp: function (n) { this.pos -= n; },\n" +
            "column: function () { return this.pos; },\n";
        asEditor.setContent(myCodeMirrorJS, valueJS);
    },
    setCSSValue:function (myCodeMirrorCSS) {
        valueCSS = "@import \"compass/css3\"\n;" +
            "$variable: #333;" +
            "\n" +
            "$blue: #3bbfce;\n" +
            "$margin: 16px;\n" +

            ".content-navigation {\n" +
            "#nested {\n" +
            "background-color: black;\n" +
            "}\n" +
            "border-color: $blue;\n" +
            "color:\n" +
            "darken($blue, 9%);\n" +
            "}\n" +
            "\n" +
            ".border {\n" +
            "padding: $margin/2;\n" +
            "margin: $margin/2;\n" +
            "border-color: $blue;\n" +
            "}\n" +
            "\n" +
            "\n" +
            "@mixin table-base {\n" +
            "th {\n" +
            "text-align: center;\n" +
            "font-weight: bold;\n" +
            "}\n" +
            "td, th { padding: 2px }\n" +
            "}\n" +
            "\n" +
            "table.hl {\n" +
            "margin: 2em 0;\n" +
            "td.ln {\n" +
            "text-align: right;\n" +
            "}\n" +
            "}\n" +
            "\n" +
            "li {\n" +
            "font: {\n" +
            "family: serif;\n" +
            "weight: bold;\n" +
            "size: 1.2em;\n" +
            "}\n" +
            "}\n";
        asEditor.setContent(myCodeMirrorCSS, valueCSS);
    },
    setHTMLValue:function(myCodeMirrorHtml) {
        valueHtml = "<html style=\"color: green\">\n" +
            "<!--this is a comment-->\n" +
            "<head>\n" +
            "<title>Mixed HTML Example</title>\n" +
            "<style>\n" +
            "h1 {font-family: comic sans; color: #f0f;}\n" +
            "div {background: yellow !important;}\n" +
            "body {\n" +
            "max-width: 50em;\n" +
            "margin: 1em 2em 1em 5em;\n" +
            "}\n" +
            "</style>\n" +
            "</head>\n" +
            "<body>\n" +
            "<h1>Mixed HTML Example</h1>\n" +
            "<script>\n" +
            "function jsFunc(arg1, arg2) {\n" +
            "if (arg1 && arg2) document.body.innerHTML = \"achoo\";\n" +
            "}\n" +
            "</script>\n" +
            "</body>\n" +
            "</html>\n";
        asEditor.setContent(myCodeMirrorHtml, valueHtml);
    }
}