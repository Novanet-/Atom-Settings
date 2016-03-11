(function() {
  var CompositeDisposable, MyREPL, REPLManager, REPLView;

  REPLView = require('./Repl-View/ReplView');

  REPLManager = require('./ReplManager');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = MyREPL = {
    config: {
      bash: {
        title: 'Bash',
        type: 'string',
        "default": 'bash',
        description: 'path to bash ex: /usr/bin/bash'
      },
      coffee: {
        type: 'string',
        title: 'Coffee',
        "default": 'coffee',
        description: 'path to coffee'
      },
      gdb: {
        type: 'string',
        title: 'Gdb',
        "default": 'gdb',
        description: 'path to gdb'
      },
      node: {
        type: 'string',
        title: 'Node.js',
        "default": 'node',
        description: 'path to node'
      },
      ocaml: {
        type: 'string',
        title: 'Ocaml',
        "default": 'ocaml',
        description: 'path to ocaml'
      },
      python2: {
        type: 'string',
        title: 'Python 2',
        "default": 'python2',
        description: 'path to python2'
      },
      python3: {
        type: 'string',
        title: 'Python 3',
        "default": 'python3',
        description: 'path to python3'
      },
      r: {
        type: 'string',
        title: 'R',
        "default": 'R',
        description: 'path to R'
      }
    },
    subscriptions: null,
    activate: function(state) {
      console.log("activate Repl");
      this.map = new Array();
      this.replManager = new REPLManager();
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Python2': (function(_this) {
          return function() {
            return _this.create("Python Console2");
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Python3': (function(_this) {
          return function() {
            return _this.create("Python Console3");
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Coffee': (function(_this) {
          return function() {
            return _this.create("CoffeeScript");
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Bash': (function(_this) {
          return function() {
            return _this.create('Shell Session');
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Ocaml': (function(_this) {
          return function() {
            return _this.create('OCaml');
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl R': (function(_this) {
          return function() {
            return _this.create('R');
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Node': (function(_this) {
          return function() {
            return _this.create('Node');
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:Repl Gdb': (function(_this) {
          return function() {
            return _this.create('C');
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:create': (function(_this) {
          return function() {
            return _this.create();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:interpreteSelect': (function(_this) {
          return function() {
            return _this.interpreteSelect();
          };
        })(this)
      }));
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'Repl:interpreteFile': (function(_this) {
          return function() {
            return _this.interpreteFile();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.subscriptions.clear();
      return this.subscriptions.dispose();
    },
    serialize: function() {},
    create: function(grammarName) {
      if (grammarName == null) {
        if ((atom.workspace.getActiveTextEditor() != null)) {
          grammarName = atom.workspace.getActiveTextEditor().getGrammar().name;
        } else {
          console.log("erreur1");
          grammarName = 'Shell Session';
        }
      }
      return this.replManager.createRepl(grammarName);
    },
    interpreteSelect: function() {
      var grammarName, txtEditor;
      txtEditor = atom.workspace.getActiveTextEditor();
      if ((txtEditor != null)) {
        grammarName = txtEditor.getGrammar().name;
        return this.replManager.interprete(txtEditor.getSelectedText(), grammarName);
      } else {
        return console.log("error interpreteSelect");
      }
    },
    interpreteFile: function() {
      var grammarName, txtEditor;
      txtEditor = atom.workspace.getActiveTextEditor();
      if ((txtEditor != null)) {
        grammarName = txtEditor.getGrammar().name;
        return this.replManager.interprete(txtEditor.getText(), grammarName);
      } else {
        return console.log("error interpreteFile");
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvcmVwbC9saWIvUmVwbC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsa0RBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLHNCQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNBLFdBQUEsR0FBYyxPQUFBLENBQVEsZUFBUixDQURkLENBQUE7O0FBQUEsRUFFQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBRkQsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE1BQUEsR0FFakI7QUFBQSxJQUFBLE1BQUEsRUFDSTtBQUFBLE1BQUEsSUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sTUFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxNQUZUO0FBQUEsUUFHQSxXQUFBLEVBQWEsZ0NBSGI7T0FERjtBQUFBLE1BS0EsTUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsS0FBQSxFQUFPLFFBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxRQUZUO0FBQUEsUUFHQSxXQUFBLEVBQWEsZ0JBSGI7T0FORjtBQUFBLE1BVUEsR0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsS0FBQSxFQUFPLEtBRFA7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO0FBQUEsUUFHQSxXQUFBLEVBQWEsYUFIYjtPQVhGO0FBQUEsTUFlQSxJQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8sU0FEUDtBQUFBLFFBRUEsU0FBQSxFQUFTLE1BRlQ7QUFBQSxRQUdBLFdBQUEsRUFBYSxjQUhiO09BaEJGO0FB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

//# sourceURL=/C:/Users/wd6g14/.atom/packages/repl/lib/Repl.coffee
