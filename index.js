(function(){

  'use strict';

  var fetchFromDataButton = document.getElementById('fetch-from-data'),
      fetchFromAPIButton = document.getElementById('fetch-from-api'),
      pre = document.querySelector('pre'),
      server = sinon.fakeServer.create();

  server.autoRespond = true;

  server.xhr.useFilters = true;
  server.xhr.addFilter(function(method, url, async, username, password) {
    if (url.indexOf('data.json') !== -1) {
      // no fake
      return true;
    }
  
    // fake
    return false;
  });

  server.respondWith('GET', '/message', [
    200, { 'Content-Type': 'application/json' }, JSON.stringify({
      message: 'this is fake data'
    })
  ]);

  fetchFromDataButton.addEventListener('click', function(event) {
    var xhr = new XMLHttpRequest;

    xhr.open('GET', './data.json');
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        pre.textContent = JSON.stringify(
          JSON.parse(xhr.responseText), null, 2);
      }
    };
    xhr.send();
  }, false);

  fetchFromAPIButton.addEventListener('click', function(event) {
    var xhr = new XMLHttpRequest;

    xhr.open('GET', '/message');
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        pre.textContent = JSON.stringify(
          JSON.parse(xhr.responseText), null, 2);
      }
    };
    xhr.send();
  }, false);

}());
