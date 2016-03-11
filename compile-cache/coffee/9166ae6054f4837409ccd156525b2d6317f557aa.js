(function() {
  var AtomMerlinOcaml, createInterface, spawn;

  spawn = require('child_process').spawn;

  createInterface = require('readline').createInterface;

  module.exports = AtomMerlinOcaml = {
    config: {
      merlinpath: {
        type: 'string',
        "default": 'ocamlmerlin'
      }
    },
    merlin: null,
    configSubscription: null,
    activate: function(state) {
      return this.configSubscription = atom.config.observe('linter-ocaml.merlinpath', (function(_this) {
        return function(newValue, previous) {
          return _this.restartMerlinProcess(newValue);
        };
      })(this));
    },
    deactivate: function() {
      if (this.merlin != null) {
        this.merlin.kill();
      }
      return this.configSubscription.dispose();
    },
    restartMerlinProcess: function(path) {
      if (this.merlin != null) {
        this.merlin.kill();
      }
      this.merlin = spawn(path, []);
      this.merlin.on('exit', function(code) {
        return console.log("Merlin exited with code " + code);
      });
      return console.log("Merlin process (" + path + ") started, pid = " + this.merlin.pid);
    },
    queryMerlin: function(query) {
      var stdin, stdout;
      stdin = this.merlin.stdin;
      stdout = this.merlin.stdout;
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var jsonQuery, reader;
          reader = createInterface({
            input: stdout,
            terminal: false
          });
          reader.on('line', function(line) {
            var kind, payload, _ref;
            reader.close();
            _ref = JSON.parse(line), kind = _ref[0], payload = _ref[1];
            if (kind === "return") {
              return resolve(payload);
            } else {
              console.error("Merlin returned error response");
              return reject(Error(line));
            }
          });
          jsonQuery = JSON.stringify(query);
          return stdin.write(jsonQuery);
        };
      })(this));
    },
    provideLinter: function() {
      return {
        name: 'OCaml Linter',
        grammarScopes: ['source.ocaml'],
        scope: 'file',
        lintOnFly: false,
        lint: (function(_this) {
          return function(editor) {
            var filePath;
            filePath = editor.getPath();
            return new Promise(function(resolve, reject) {
              return _this.queryMerlin({
                "context": ["auto", filePath],
                "query": [
                  "tell", "start", "at", {
                    "line": 1,
                    "col": 0
                  }
                ]
              }).then(function() {
                return _this.queryMerlin({
                  "context": ["auto", filePath],
                  "query": ["tell", "file-eof", filePath]
                }).then(function() {
                  return _this.queryMerlin({
                    "context": ["auto", filePath],
                    "query": ["errors"]
                  }).then(function(payload) {
                    var e, err, errors, _i, _len;
                    errors = [];
                    for (_i = 0, _len = payload.length; _i < _len; _i++) {
                      e = payload[_i];
                      err = {
                        type: e.type === 'Warning' ? 'Warning' : 'Error',
                        text: e.message,
                        range: [[e.start.line - 1, e.start.col], [e.end.line - 1, e.end.col]],
                        filePath: filePath
                      };
                      errors.push(err);
                    }
                    return resolve(errors);
                  });
                });
              });
            });
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvbGludGVyLW9jYW1sL2xpYi9hdG9tLW1lcmxpbi1vY2FtbC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUNBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxLQUFqQyxDQUFBOztBQUFBLEVBQ0Msa0JBQW1CLE9BQUEsQ0FBUSxVQUFSLEVBQW5CLGVBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGVBQUEsR0FFZjtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsYUFEVDtPQURGO0tBREY7QUFBQSxJQUtBLE1BQUEsRUFBUSxJQUxSO0FBQUEsSUFNQSxrQkFBQSxFQUFvQixJQU5wQjtBQUFBLElBUUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGtCQUFELEdBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLHlCQUFwQixFQUErQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEVBQVcsUUFBWCxHQUFBO2lCQUM3QyxLQUFDLENBQUEsb0JBQUQsQ0FBc0IsUUFBdEIsRUFENkM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQyxFQUZNO0lBQUEsQ0FSVjtBQUFBLElBYUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBa0IsbUJBQWxCO0FBQUEsUUFBQSxJQUFDLENBQUEsTUFBTSxDQUFDLElBQVIsQ0FBQSxDQUFBLENBQUE7T0FBQTthQUNBLElBQUMsQ0FBQSxrQkFBa0IsQ0FBQyxP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

//# sourceURL=/C:/Users/wd6g14/.atom/packages/linter-ocaml/lib/atom-merlin-ocaml.coffee
