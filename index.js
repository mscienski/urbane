var http = require('http');
var urban = require('urban');
var url = require('url');

var PORT = process.env.PORT || 5000;

function handleRequest(request, response) {
  var query = url.parse(request.url, true).query;
  response.writeHead(200, {'Content-Type': 'application/json'});
  var res = {
    'response_type': 'in_channel'
  };

  if (query && query.text) {
    var trollface = urban(query.text);
    try {
      trollface.res(function(json) {
        var i = Math.floor(Math.random() * json.length);
        res['text'] = 'According to Urban Dictionary, "' + query.text + '" could mean: ' + json[i].definition;
        response.end(JSON.stringify(res));
      });
    } catch(e) {
      response.end('Something went wrong when looking for an Urban Dictionary definition for "' + query.text + '". Try again later, and let Michal know.');
    }
  } else {
    try {
      var trollface = urban.random();
      trollface.res(function(json) {
        var i = Math.floor(Math.random() * json.length);
        res['text'] = 'Here is a random definition for "' + json[i].word + '": ' + json[i].definition;
        response.end(JSON.stringify(res));
      });
    } catch(e) {
      response.end('Something went wrong when looking for a random Urban Dictionary definition. Try again later, and let Michal know.');
    }
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log('listening on PORT ' + PORT);
});
