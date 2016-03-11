(function() {
  var MyREPL;

  MyREPL = require('../lib/Repl');

  describe("MyREPL", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('Repl');
    });
    return describe("when the Repl:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.Repl')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'Repl:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var myREPLElement, myREPLPanel;
          expect(workspaceElement.querySelector('.Repl')).toExist();
          myREPLElement = workspaceElement.querySelector('.Repl');
          expect(myREPLElement).toExist();
          myREPLPanel = atom.workspace.panelForItem(myREPLElement);
          expect(myREPLPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'Repl:toggle');
          return expect(myREPLPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.Repl')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'Repl:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var myREPLElement;
          myREPLElement = workspaceElement.querySelector('.Repl');
          expect(myREPLElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'Repl:toggle');
          return expect(myREPLElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvcmVwbC9zcGVjL1JlcGwtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsTUFBQTs7QUFBQSxFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsYUFBUixDQUFULENBQUE7O0FBQUEsRUFPQSxRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFBLEdBQUE7QUFDakIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLE1BQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyx5Q0FBVCxFQUFvRCxTQUFBLEdBQUE7QUFDbEQsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBR3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLE9BQS9CLENBQVAsQ0FBK0MsQ0FBQyxHQUFHLENBQUMsT0FBcEQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsYUFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLDBCQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IsT0FBL0IsQ0FBUCxDQUErQyxDQUFDLE9BQWhELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFFQSxhQUFBLEdBQWdCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLE9BQS9CLENBRmhCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyxhQUFQLENBQXFCLENBQUMsT0FBdEIsQ0FBQSxDQUhBLENBQUE7QUFBQSxVQUtBLFdBQUEsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsYUFBNUIsQ0FMZCxDQUFBO0FBQUEsVUFNQSxNQUFBLENBQU8sV0FBVyxDQUFDLFNBQVosQ0FBQSxDQUFQLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsSUFBckMsQ0FOQSxDQUFBO0FBQUEsVUFPQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGFBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8sV0FBVyxDQUFDLFNBQVosQ0FBQSxDQUFQLENBQStCLENBQUMsSUFBaEMsQ0FBcUMsS0FBckMsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixPQUEvQixDQUFQLENBQStDLENBQUMsR0FBRyxDQUFDLE9BQXBELENBQUEsQ0FGQSxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGFBQXpDLENBTkEsQ0FBQTtBQUFBLFFBUUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2Qsa0JBRGM7UUFBQSxDQUFoQixDQVJBLENBQUE7ZUFXQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBRUgsY0FBQSxhQUFBO0FBQUEsVUFBQSxhQUFBLEdBQWdCLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLE9BQS9CLENBQWhCLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxhQUFQLENBQXFCLENBQUMsV0FBdEIsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsYUFBekMsQ0FGQSxDQUFBO2lCQUdBLE1BQUEsQ0FBTyxhQUFQLENBQXFCLENBQUMsR0FBRyxDQUFDLFdBQTFCLENBQUEsRUFMRztRQUFBLENBQUwsRUFsQjZCO01BQUEsQ0FBL0IsRUF4QmtEO0lBQUEsQ0FBcEQsRUFQaUI7RUFBQSxDQUFuQixDQVBBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/wd6g14/.atom/packages/repl/spec/Repl-spec.coffee
