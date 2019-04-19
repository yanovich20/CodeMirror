var as = as || {};
as.editor = {
    options: {
    },
    items: [],
    init: function (options) {
        $.extend(as.editor.options, {}, options);
        $(".as-codeEditor").each(function (index, item) {
            as.editor.initEditor(item);
        });
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
        var id = item.attr("id");
        var editor = CodeMirror.fromTextArea(item[0], {
            lineNumbers: true,
            mode: lang,
            theme: theme
        });
        var pair = { id: id, editor: editor };
        as.editor.items.push(pair);
        return;
    },
    getEditorById: function (id) {
        for (var k = 0; k < as.editor.items.length; k++)
        {
            if (as.editor.items[k].id == id)
                return as.editor.items[k].editor;
        }
    },
    setContent: function (id, value) {
        var editor = as.editor.getEditorById(id);
        if (editor)
            editor.getDoc().setValue(value);
        else
            console.log("Error set id not found " + id);
    },
    getContent: function (id) {
        var editor = as.editor.getEditorById(id);
        if (editor)
            return editor.getDoc().getValue();
        else
            console.log("Error get id not found " + id);
    },
    addEditor: function (id, lang, theme) {
        var item = $("#" + id);
        var editor = CodeMirror.fromTextArea(item[0], {
            lineNumbers: true,
            mode: lang,
            theme: theme
        });
        var pair = { id: id, editor: editor };
        as.editor.items.push(pair);
    }
}