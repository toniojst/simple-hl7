var hl7 = require('../lib');

////////////////////CLIENT///////////////////
var parser = new hl7.Parser({segmentSeperator: '\n'});
var client = hl7.Server.createTcpClient({
  host: 'localhost',
  port: 7777,
  keepalive: true,
  callback: function(err, ack) {
    if (err) {
      console.log("*******ERROR********");
      console.log(err.message);
    } else {
      console.log(ack.log());
    }
  }
});

var msg = parser.parseFileSync('test/samples/adt.hl7');

console.log('************sending 1 message****************');
client.send(msg);

setTimeout(function() {
  console.log('2');
  console.log('************sending 2 message****************');
  client.send(msg);
}, 1000);

setTimeout(function() {
  console.log('************sending 3 message****************');
  client.send(msg);
}, 2000);


setTimeout(function() {
  process.exit();
}, 5000)

////////////////////CLIENT///////////////////
