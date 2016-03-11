(function() {
  var HtmlPreviewView, LineMessageView, MessagePanelView, exec, fs, sys, url, _ref;

  url = require('url');

  _ref = require('atom-message-panel'), MessagePanelView = _ref.MessagePanelView, LineMessageView = _ref.LineMessageView;

  sys = require('sys');

  exec = require('child_process').exec;

  fs = require('fs');

  HtmlPreviewView = require('./renderOcaml');

  url = require('url');

  module.exports = {
    htmlPreviewView: null,
    activate: function(state) {
      var messages;
      this.editors = [];
      messages = new MessagePanelView({
        rawTitle: true,
        title: '<font color="red" >Ocaml Top Interpréteur</font>'
      });
      atom.workspaceView.command("ocamltop:toplevel", (function(_this) {
        return function() {
          return _this.toplevel(messages);
        };
      })(this));
      return atom.workspace.registerOpener(function(uriToOpen) {
        var error, host, pathname, protocol, _ref1;
        try {
          _ref1 = url.parse(uriToOpen), protocol = _ref1.protocol, host = _ref1.host, pathname = _ref1.pathname;
        } catch (_error) {
          error = _error;
          return;
        }
        if (protocol !== 'html-preview:') {
          return;
        }
        try {
          if (pathname) {
            pathname = decodeURI(pathname);
          }
        } catch (_error) {
          error = _error;
          return;
        }
        if (host === 'editor') {
          return new HtmlPreviewView({
            editorId: pathname.substring(1)
          });
        } else {
          return new HtmlPreviewView({
            filePath: pathname
          });
        }
      });
    },
    getUserHome: function() {
      return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    },
    toplevel: function(messages) {
      var EventEmitter, callback, editor, f, file, file_name, home, spawn, strings, uri2, userPanel;
      spawn = require('child_process').spawn;
      EventEmitter = require('events').EventEmitter;
      home = this.getUserHome();
      editor = atom.workspace.getActivePaneItem();
      Array.prototype.include = function(term) {
        return this.indexOf(term) !== -1;
      };
      if (!this.editors.include(editor)) {
        editor = atom.workspace.getActivePaneItem();
        callback = (function(_this) {
          return function() {
            console.log("save");
            return _this.toplevel(messages);
          };
        })(this);
        editor.onDidSave(callback);
        this.editors.push(editor);
      }
      userPanel = atom.workspace.getActivePane();
      messages.close();
      messages.clear();
      file = editor != null ? editor.buffer.file : void 0;
      f = file.getPath();
      file_name = "" + (file.getBaseName());
      strings = file_name.split(".");
      if (strings[strings.length - 1].length !== 2 || strings[strings.length - 1].charAt(0) !== 'm' || strings[strings.length - 1].charAt(1) !== 'l') {
        messages.attach();
        messages.add(new LineMessageView({
          file: file_name,
          message: 'Erreur le fichier n\'est pas un fichier .ml'
        }));
        return;
      }
      uri2 = "/tmp/atom-run-tmp-" + file_name;
      console.log("" + f);
      return exec("env -i /usr/local/bin/ocaml -noprompt -nopromptcont < " + f + " > " + uri2 + "; ~/.opam/system/bin/caml2html " + uri2 + " -o " + uri2 + ".html", (function(_this) {
        return function() {
          var fileText, previousActivePane, uri;
          fileText = fs.readFileSync("" + uri2 + ".html").toString();
          exec("env -i rm " + uri2 + ";env -i rm " + uri2 + ".html");
          editor = atom.workspace.getActiveEditor();
          if (editor == null) {
            return;
          }
          uri = "html-preview://editor/" + editor.id;
          previousActivePane = atom.workspace.getActivePane();
          return atom.workspace.open(uri, {
            split: 'right',
            searchAllPanes: true
          }).done(function(htmlPreviewView) {
            if (htmlPreviewView instanceof HtmlPreviewView) {
              console.log("reste");
              htmlPreviewView.renderHTML(fileText);
              return previousActivePane.activate();
            }
          });
        };
      })(this));
    },
    deactivate: function() {
      this.messages.close();
      return this.ocamltopView.destroy();
    },
    serialize: function() {
      return {
        ocamltopViewState: this.ocamltopView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvb2NhbWx0b3AtaHRtbC9saWIvb2NhbWx0b3AuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRFQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLE9BQXNDLE9BQUEsQ0FBUSxvQkFBUixDQUF0QyxFQUFDLHdCQUFBLGdCQUFELEVBQW1CLHVCQUFBLGVBRG5CLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FGTixDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsSUFIaEMsQ0FBQTs7QUFBQSxFQUlBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUpMLENBQUE7O0FBQUEsRUFNQSxlQUFBLEdBQWtCLE9BQUEsQ0FBUSxlQUFSLENBTmxCLENBQUE7O0FBQUEsRUFPQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FQTixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsZUFBQSxFQUFpQixJQUFqQjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsVUFBQSxRQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQVgsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFlLElBQUEsZ0JBQUEsQ0FBaUI7QUFBQSxRQUFBLFFBQUEsRUFBVSxJQUFWO0FBQUEsUUFBZ0IsS0FBQSxFQUMxQyxrREFEMEI7T0FBakIsQ0FEZixDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLG1CQUEzQixFQUFnRCxDQUFBLFNBQUEsS0FBQSxHQUFB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

//# sourceURL=/C:/Users/wd6g14/.atom/packages/ocamltop-html/lib/ocamltop.coffee
