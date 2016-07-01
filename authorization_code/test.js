var Spotify = require('spotify-web-api-js');
var s = new Spotify();

var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQCQpNgflALIoedR7i_ALgw3bsFfvCTTg18VncBdgU4aShVfLDmy2Fnm1THA_ZWBF508YalEd2u689G605wNpIW9am6rqbMz9WY2WDZtCGTV_5_zUcIHCPHjn5jAAmBUdtu3G_8WZZuZtDO0UruPvvaN4yywJQDQ6rc');

spotifyApi.setPromiseImplementation(Q);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
  if (err) console.error(err);
  else console.log('Artist albums, data');
});

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
.then(function(data) {
  console.log('Artist albums', data);
}, function(err) {
  console.error(err);
});

var prev = null;

function onUserInput(queryTerm) {
  // abort previous request, if any
  if (prev !== null) {
    prev.abort();
  }

  // store the current promise in case we need to abort it
  prev = spotifyApi.searchTracks(queryTerm, {limit: 5})
  .then(function(data) {

    // clean the promise so it doesn't call abort
    prev = null;

    // ...render list of search results...

  }, function(err) {
    console.error(err);
  });
}

// passing a callback - get Elvis' albums in range [20...29]
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20}, function(err, data) {
  if (err) console.error(err);
  else console.log('Artist albums', data);
});

// using Promises through Promise, Q or when - get Elvis' albums in range [20...29]
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit: 10, offset: 20})
  .then(function(data) {
    console.log('Album information', data);
  }, function(err) {
    console.error(err);
  });
