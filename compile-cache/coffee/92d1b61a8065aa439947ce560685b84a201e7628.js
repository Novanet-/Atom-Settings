(function() {
  var ReplFormat, fs;

  fs = require('fs');

  module.exports = ReplFormat = (function() {
    function ReplFormat(conf_path) {
      require(conf_path);
      this.cmd = cmd;
      this.args = args;
      this.prompt = prompt;
      this.endSequence = endSequence;
      delete require.cache[require.resolve(conf_path)];
    }

    return ReplFormat;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy93ZDZnMTQvLmF0b20vcGFja2FnZXMvcmVwbC9saWIvUmVwbC9SZXBsRm9ybWF0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFVSxJQUFBLG9CQUFDLFNBQUQsR0FBQTtBQUVSLE1BQUEsT0FBQSxDQUFRLFNBQVIsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsR0FBRCxHQUFPLEdBRlAsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLElBQUQsR0FBUSxJQUhSLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFKVixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsV0FBRCxHQUFlLFdBTGYsQ0FBQTtBQUFBLE1BTUEsTUFBQSxDQUFBLE9BQWMsQ0FBQyxLQUFNLENBQUEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsU0FBaEIsQ0FBQSxDQU5yQixDQUZRO0lBQUEsQ0FBWjs7c0JBQUE7O01BTEosQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/wd6g14/.atom/packages/repl/lib/Repl/ReplFormat.coffee
