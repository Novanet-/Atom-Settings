(function() {
  var $, $$$, AtomHtmlPreviewView, ScrollView, path, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  _ref = require('atom'), $ = _ref.$, $$$ = _ref.$$$, ScrollView = _ref.ScrollView;

  module.exports = AtomHtmlPreviewView = (function(_super) {
    __extends(AtomHtmlPreviewView, _super);

    atom.deserializers.add(AtomHtmlPreviewView);

    AtomHtmlPreviewView.deserialize = function(state) {
      return new AtomHtmlPreviewView(state);
    };

    AtomHtmlPreviewView.content = function() {
      return this.div({
        "class": 'atom-html-preview native-key-bindings',
        tabindex: -1
      });
    };

    function AtomHtmlPreviewView(_arg) {
      var filePath;
      this.editorId = _arg.editorId, filePath = _arg.filePath;
      AtomHtmlPreviewView.__super__.constructor.apply(this, arguments);
      if (this.editorId != null) {
        this.resolveEditor(this.editorId);
      } else {
        if (atom.workspace != null) {
          this.subscribeToFilePath(filePath);
        } else {
          this.subscribe(atom.packages.once('activated', (function(_this) {
            return function() {
              return _this.subscribeToFilePath(filePath);
            };
          })(this)));
        }
      }
    }

    AtomHtmlPreviewView.prototype.serialize = function() {
      return {
        deserializer: 'AtomHtmlPreviewView',
        filePath: this.getPath(),
        editorId: this.editorId
      };
    };

    AtomHtmlPreviewView.prototype.destroy = function() {
      return this.unsubscribe();
    };

    AtomHtmlPreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.trigger('title-changed');
      this.handleEvents();
      return this.renderHTML();
    };

    AtomHtmlPreviewView.prototype.resolveEditor = function(editorId) {
      var resolve;
      resolve = (function(_this) {
        return function() {
          var _ref1;
          _this.editor = _this.editorForId(editorId);
          if (_this.editor != null) {
            if (_this.editor != null) {
              _this.trigger('title-changed');
            }
            return _this.handleEvents();
          } else {
            return (_ref1 = _this.parents('.pane').view()) != null ? _ref1.destroyItem(_this) : void 0;
          }
        };
      })(this);
      if (atom.workspace != null) {
        return resolve();
      } else {
        return this.subscribe(atom.packages.once('activated', (function(_this) {
          return function() {
            resolve();
            return _this.renderHTML();
          };
        })(this)));
      }
    };

    AtomHtmlPreviewView.prototype.editorForId = function(editorId) {
      var editor, _i, _len, _ref1, _ref2;
      _ref1 = atom.workspace.getEditors();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        editor = _ref1[_i];
        if (((_ref2 = editor.id) != null ? _ref2.toString() : void 0) === editorId.toString()) {
          return editor;
        }
      }
      return null;
    };

    AtomHtmlPreviewView.prototype.handleEvents = function() {};

    AtomHtmlPreviewView.prototype.renderHTML = function(text) {
      this.showLoading();
      if (this.editor != null) {
        return this.renderHTMLCode(text);
      }
    };

    AtomHtmlPreviewView.prototype.renderHTMLCode = function(text) {
      var iframe;
      text = "<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>HTML Preview</title>\n    <style>\n      body {\n        font-family: \"Helvetica Neue\", Helvetica, sans-serif;\n        font-size: 14px;\n        line-height: 1.6;\n        background-color: #fff;\n        overflow: scroll;\n        box-sizing: border-box;\n      }\n    </style>\n  </head>\n  <body>\n    " + text + "\n  </body>\n</html>";
      iframe = document.createElement("iframe");
      iframe.src = "data:text/html;charset=utf-8," + (encodeURI(text));
      this.html($(iframe));
      return this.trigger('atom-html-preview:html-changed');
    };

    AtomHtmlPreviewView.prototype.getTitle = function() {
      if (this.editor != null) {
        return "" + (this.editor.getTitle()) + " Preview";
      } else {
        return "HTML Preview";
      }
    };

    AtomHtmlPreviewView.prototype.getUri = function() {
      return "html-preview://editor/" + this.editorId;
    };

    AtomHtmlPreviewView.prototype.getPath = function() {
      if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    AtomHtmlPreviewView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = result != null ? result.message : void 0;
      return this.html($$$(function() {
        this.h2('Previewing HTML Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      }));
    };

    AtomHtmlPreviewView.prototype.showLoading = function() {
      return this.html($$$(function() {
        return this.div({
          "class": 'atom-html-spinner'
        }, 'Loading HTML Preview\u2026');
      }));
    };

    return AtomHtmlPreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvb2NhbWx0b3AtaHRtbC9saWIvcmVuZGVyT2NhbWwuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsT0FBdUIsT0FBQSxDQUFRLE1BQVIsQ0FBdkIsRUFBQyxTQUFBLENBQUQsRUFBSSxXQUFBLEdBQUosRUFBUyxrQkFBQSxVQURULENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMENBQUEsQ0FBQTs7QUFBQSxJQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBbkIsQ0FBdUIsbUJBQXZCLENBQUEsQ0FBQTs7QUFBQSxJQUVBLG1CQUFDLENBQUEsV0FBRCxHQUFjLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQSxtQkFBQSxDQUFvQixLQUFwQixFQURRO0lBQUEsQ0FGZCxDQUFBOztBQUFBLElBS0EsbUJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHVDQUFQO0FBQUEsUUFBZ0QsUUFBQSxFQUFVLENBQUEsQ0FBMUQ7T0FBTCxFQURRO0lBQUEsQ0FMVixDQUFBOztBQVFhLElBQUEsNkJBQUMsSUFBRCxHQUFBO0FBQ1gsVUFBQSxRQUFBO0FBQUEsTUFEYSxJQUFDLENBQUEsZ0JBQUEsVUFBVSxnQkFBQSxRQUN4QixDQUFBO0FBQUEsTUFBQSxzREFBQSxTQUFBLENBQUEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxxQkFBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGFBQUQsQ0FBZSxJQUFDLENBQUEsUUFBaEIsQ0FBQSxDQURG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

//# sourceURL=/C:/Users/wd6g14/.atom/packages/ocamltop-html/lib/renderOcaml.coffee
