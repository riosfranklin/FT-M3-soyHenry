var fs = require("fs");
var request = require("request");

const pwd = (args, done) => {
  done(process.cwd());
};
const date = (args, done) => {
  done(Date());
};
const ls = (args, done) => {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    var out = "";
    files.forEach(function (file) {
      out = out + file + "\n";
      //   process.stdout.write(file.toString() + "\n");
    });
    done(out);
    // process.stdout.write("\nprompt > ");
  });
};
const echo = (args, done) => {
  var out = args.join(" ");
  done(out);
};
const cat = (file, done) => {
  fs.readFile(file[0], "utf8", function (err, data) {
    if (err) throw err;
    done(data);
  });
};
const head = (file, done) => {
  fs.readFile(file[0], "utf8", function (err, data) {
    if (err) throw err;
    const lines = data.split("\n").slice(0, 10).join("\n");
    done(lines);
    // process.stdout.write(lines);
    // process.stdout.write("\nprompt > ");
  });
};
const tail = (file, done) => {
  fs.readFile(file[0], "utf8", function (err, data) {
    if (err) throw err;
    const lines = data.split("\n").slice(-10).join("\n");
    done(lines);
    // process.stdout.write(lines);
    // process.stdout.write("\nprompt > ");
  });
};
const curl = (url, done) => {
  request(url[0], function (err, response, body) {
    if (err) throw err;
    done(body);
    // process.stdout.write(body);
    // process.stdout.write("\nprompt > ");
  });
};
module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};
