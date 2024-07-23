const fs = require('node:fs');

fs.writeFile("Hey.txt", "Hello World!", function(error){
  if(error) console.error(error);
  else console.log("Done!");
})
fs.appendFile("Hey.txt", "Hello Ebrahim!", function(error){
  if(error) console.error(error);
  else console.log("Done!");
})
fs.rename("Hey.txt", "Hello.txt", function(error){
  if(error) console.error(error);
  else console.log("Done!");
})
fs.copyFile("Hello.txt", "./copy/copiedVersionOfHello.txt", function(error) {
  if(error) console.error(error);
  else console.log("Done!");
})
// fs.unlink("Hello.txt", function(error) {
//   if(error) console.error(error);
//   else console.log("Done!");
// })
// fs.rm("./copy", {recursive: true}, function(error) {
//   if(error) console.error(error);
//   else console.log("Done!");
// })
fs.readFile("Hello.txt", function(err) {
  if (err) console.error(err);
  else console.log("Done!");
})
