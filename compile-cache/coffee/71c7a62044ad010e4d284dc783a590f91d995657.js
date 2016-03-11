(function() {
  var $, Conflict, SideView, util;

  $ = require('space-pen').$;

  SideView = require('../../lib/view/side-view').SideView;

  Conflict = require('../../lib/conflict').Conflict;

  util = require('../util');

  describe('SideView', function() {
    var editorView, ours, text, theirs, view, _ref;
    _ref = [], view = _ref[0], editorView = _ref[1], ours = _ref[2], theirs = _ref[3];
    text = function() {
      return editorView.getModel().getText();
    };
    beforeEach(function() {
      return util.openPath("single-2way-diff.txt", function(v) {
        var conflict, editor, _ref1;
        editor = v.getModel();
        editorView = v;
        conflict = Conflict.all({
          isRebase: false
        }, editor)[0];
        _ref1 = [conflict.ours, conflict.theirs], ours = _ref1[0], theirs = _ref1[1];
        return view = new SideView(ours, editor);
      });
    });
    it('applies its position as a CSS class', function() {
      expect(view.hasClass('top')).toBe(true);
      return expect(view.hasClass('bottom')).toBe(false);
    });
    it('knows if its text is unaltered', function() {
      expect(ours.isDirty).toBe(false);
      return expect(theirs.isDirty).toBe(false);
    });
    describe('when its text has been edited', function() {
      var editor;
      editor = [][0];
      beforeEach(function() {
        editor = editorView.getModel();
        editor.setCursorBufferPosition([1, 0]);
        editor.insertText("I won't keep them, but ");
        return view.detectDirty();
      });
      it('detects that its text has been edited', function() {
        return expect(ours.isDirty).toBe(true);
      });
      it('adds a .dirty class to the view', function() {
        return expect(view.hasClass('dirty')).toBe(true);
      });
      return it('reverts its text back to the original on request', function() {
        var t;
        view.revert();
        view.detectDirty();
        t = editor.getTextInBufferRange(ours.marker.getBufferRange());
        expect(t).toBe("These are my changes\n");
        return expect(ours.isDirty).toBe(false);
      });
    });
    it('triggers conflict resolution', function() {
      spyOn(ours, "resolve");
      view.useMe();
      return expect(ours.resolve).toHaveBeenCalled();
    });
    describe('when chosen as the resolution', function() {
      beforeEach(function() {
        return ours.resolve();
      });
      return it('deletes the marker line', function() {
        return expect(text()).not.toContain("<<<<<<< HEAD");
      });
    });
    return describe('when not chosen as the resolution', function() {
      beforeEach(function() {
        return theirs.resolve();
      });
      it('deletes its lines', function() {
        return expect(text()).not.toContain("These are my changes");
      });
      return it('deletes the marker line', function() {
        return expect(text()).not.toContain("<<<<<<< HEAD");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvbWVyZ2UtY29uZmxpY3RzL3NwZWMvdmlldy9zaWRlLXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkJBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxXQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0MsV0FBWSxPQUFBLENBQVEsMEJBQVIsRUFBWixRQURELENBQUE7O0FBQUEsRUFHQyxXQUFZLE9BQUEsQ0FBUSxvQkFBUixFQUFaLFFBSEQsQ0FBQTs7QUFBQSxFQUlBLElBQUEsR0FBTyxPQUFBLENBQVEsU0FBUixDQUpQLENBQUE7O0FBQUEsRUFNQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSwwQ0FBQTtBQUFBLElBQUEsT0FBbUMsRUFBbkMsRUFBQyxjQUFELEVBQU8sb0JBQVAsRUFBbUIsY0FBbkIsRUFBeUIsZ0JBQXpCLENBQUE7QUFBQSxJQUVBLElBQUEsR0FBTyxTQUFBLEdBQUE7YUFBRyxVQUFVLENBQUMsUUFBWCxDQUFBLENBQXFCLENBQUMsT0FBdEIsQ0FBQSxFQUFIO0lBQUEsQ0FGUCxDQUFBO0FBQUEsSUFJQSxVQUFBLENBQVcsU0FBQSxHQUFBO2FBQ1QsSUFBSSxDQUFDLFFBQUwsQ0FBYyxzQkFBZCxFQUFzQyxTQUFDLENBQUQsR0FBQTtBQUNwQyxZQUFBLHVCQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsQ0FBQyxDQUFDLFFBQUYsQ0FBQSxDQUFULENBQUE7QUFBQSxRQUNBLFVBQUEsR0FBYSxDQURiLENBQUE7QUFBQSxRQUVBLFFBQUEsR0FBVyxRQUFRLENBQUMsR0FBVCxDQUFhO0FBQUEsVUFBRSxRQUFBLEVBQVUsS0FBWjtTQUFiLEVBQWtDLE1BQWxDLENBQTBDLENB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

//# sourceURL=/C:/Users/wd6g14/.atom/packages/merge-conflicts/spec/view/side-view-spec.coffee
