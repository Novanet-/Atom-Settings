(function() {
  var REPLView, ReplManager, dico,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  REPLView = require('./Repl-View/ReplView');

  dico = require("./ReplList.js");

  module.exports = ReplManager = (function() {
    function ReplManager() {
      this.createRepl = __bind(this.createRepl, this);
      this.callBackCreate = __bind(this.callBackCreate, this);
      var k, _i, _len;
      this.map = {};
      for (_i = 0, _len = dico.length; _i < _len; _i++) {
        k = dico[_i];
        this.map[k] = null;
      }
    }

    ReplManager.prototype.interprete = function(select, grammarName) {
      var replView;
      replView = this.map[grammarName];
      if ((replView != null)) {
        return replView.interprete(select);
      } else {
        return console.log("error interprete");
      }
    };

    ReplManager.prototype.grammarNameSupport = function(grammarName) {
      return (dico[grammarName] != null);
    };

    ReplManager.prototype.callBackCreate = function(replView, pane) {
      console.log("in -> callBackCreate");
      pane.onDidActivate((function(_this) {
        return function() {
          if (pane.getActiveItem() === replView.replTextEditor) {
            return _this.map[replView.grammarName] = replView;
          }
        };
      })(this));
      return replView.replTextEditor.onDidDestroy((function(_this) {
        return function() {
          if (_this.map[replView.grammarName] === replView) {
            _this.map[replView.grammarName] = null;
            return replView.remove();
          }
        };
      })(this));
    };

    ReplManager.prototype.createRepl = function(grammarName) {
      if (this.grammarNameSupport(grammarName)) {
        return this.map[grammarName] = new REPLView(grammarName, dico[grammarName], this.callBackCreate);
      } else {
        return console.log("grammar error");
      }
    };

    return ReplManager;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvcmVwbC9saWIvUmVwbE1hbmFnZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJCQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLHNCQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsZUFBUixDQURQLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRVMsSUFBQSxxQkFBQSxHQUFBO0FBQ1gscURBQUEsQ0FBQTtBQUFBLDZEQUFBLENBQUE7QUFBQSxVQUFBLFdBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sRUFBUCxDQUFBO0FBQ0EsV0FBQSwyQ0FBQTtxQkFBQTtBQUNFLFFBQUEsSUFBQyxDQUFBLEdBQUksQ0FBQSxDQUFBLENBQUwsR0FBVSxJQUFWLENBREY7QUFBQSxPQUZXO0lBQUEsQ0FBYjs7QUFBQSwwQkFLQSxVQUFBLEdBQWEsU0FBQyxNQUFELEVBQVEsV0FBUixHQUFBO0FBQ1gsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEdBQUksQ0FBQSxXQUFBLENBQWhCLENBQUE7QUFDQSxNQUFBLElBQUUsQ0FBQyxnQkFBRCxDQUFGO2VBQ0UsUUFBUSxDQUFDLFVBQVQsQ0FBb0IsTUFBcEIsRUFERjtPQUFBLE1BQUE7ZUFHRSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaLEVBSEY7T0FGVztJQUFBLENBTGIsQ0FBQTs7QUFBQSwwQkFZQSxrQkFBQSxHQUFxQixTQUFDLFdBQUQsR0FBQTtBQUNqQixhQUFPLENBQUMseUJBQUQsQ0FBUCxDQURpQjtJQUFBLENBWnJCLENBQUE7O0FBQUEsMEJBZ0JBLGNBQUEsR0FBZ0IsU0FBQyxRQUFELEVBQVUsSUFBVixHQUFBO0FBQ2QsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHNCQUFaLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQUwsQ0FBbUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqQixVQUFBLElBQUcsSUFBSSxDQUFDLGFBQUwsQ0FBQSxDQUFBLEtBQXdCLFFBQVEsQ0FBQyxjQUFwQzttQkFDRSxLQUFDLENBQUEsR0FBSSxDQUFBLFFBQVEsQ0FBQyxXQUFULENBQUwsR0FBNkIsU0FEL0I7V0FEaUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQixDQURBLENBQUE7YUFLQSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQXhCLENBQXFDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDbkMsVUFBQSxJQUFHLEtBQUMsQ0FBQSxHQUFJLENBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBTCxLQUE4QixRQUFqQztBQUNFLFlBQUEsS0FBQyxDQUFBLEdBQUksQ0FBQSxRQUFRLENBQUMsV0FBVCxDQUFMLEdBQTZCLElBQTdCLENBQUE7bUJBQ0EsUUFBUSxDQUFDLE1BQVQsQ0FBQSxFQUZGO1dBRG1DO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckMsRUFOYztJQUFBLENBaEJoQixDQUFBOztBQUFBLDBCQTRCQSxVQUFBLEdBQVcsU0FBQyxXQUFELEdBQUE7QUFDVCxNQUFBLElBQUksSUFBQyxDQUFBLGtCQUFELENBQW9CLFdBQXBCLENBQUo7ZUFFRSxJQUFDLENBQUEsR0FBSSxDQUFBLFdBQUEsQ0FBTCxHQUF3QixJQUFBLFFBQUEsQ0FBUyxXQUFULEVBQXFCLElBQUssQ0FBQSxXQUFBLENBQTFCLEVBQXVDLElBQUMsQ0FBQSxjQUF4QyxFQUYxQjtPQUFBLE1BQUE7ZUFLRSxPQUFPLENBQUMsR0FBUixDQUFZLGVBQVosRUFMRjtPQURTO0lBQUEsQ0E1QlgsQ0FBQTs7dUJBQUE7O01BUEYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/wd6g14/.atom/packages/repl/lib/ReplManager.coffee
