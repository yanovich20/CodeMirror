var asEditor = {
    options: {
    },
    items: [],
    init: function (options) {
        $.extend(asEditor.options, {}, options);
        $(".as-codeEditor").each(function (index, item) {
            asEditor.initOneEditor(item);
        });
        return asEditor.items;
    },
    initOneEditor: function (item) {
        var editor = asEditor.initEditor(item);
        asEditor.items.push(editor);
    },
    initEditor: function (dataItem) {
        var item = $(dataItem);
        var langtemp = item.attr("data-type");
        var lang = "";
        if (langtemp === "SQL")
            lang = "text/x-mssql";
        else if (langtemp === "JS")
            lang = "javascript";
        else if (langtemp === "CSS")
            lang = "text/x-scss";
        else if (langtemp === "HTML")
            lang = "text/html";
        else
            lang = langtemp;
        var theme = item.attr("data-theme");
        var editor = CodeMirror.fromTextArea(item[0], {
            lineNumbers: true,
            mode: lang,
            theme: theme
        });
        return editor;
    },
    setContent: function (myCodeMirror, value) {
        myCodeMirror.getDoc().setValue(value);
    },
    getContent: function (myCodeMirror) {
        return myCodeMirror.getDoc().getValue();
    }
}