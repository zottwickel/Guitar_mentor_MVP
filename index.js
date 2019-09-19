const searchURL = '';
const data = { headers: { 'Guitarparty-Api-Key': '3c4daf3905d8c1ec2c49ce6faa3cc6139779913a' } };

function readyResponse() {
    $('header').remove();
    $('#response').empty();
    $('#response').addClass('border');
    $('#response').removeClass('hidden');
}

function loadIt () {
    readyResponse();
    $('#response').append(loading());
}

function clearBio() {
    $('.loading').remove();
    $('#bio').remove();
}

function prepareLyrics() {
    $('strong').wrap('<div class="inlineChord"></div>');
    $('.inlineChord').after('-');
}

function authorLoop(returnedSong) {
    returnedSong.authors.forEach(function(el) {
        let id = el.uri.match(/\d+/g)[1];
        $('.authors').append(author(el, id));
        $('#' + id).on('click', function() {
            fetchBio(id);
        });
    })
}

function fetchQuery(song) {
    loadIt();
    $('body').removeClass('guitar');
    fetch(`https://api.guitarparty.com/v2/songs/?query=${song}`, data)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            let returnedSongs = responseJson.objects.map(function (el) {
                delete el.body;
                delete el.body_stripped;
                delete el.permalink;
                delete el.tags;
                delete el.uri;
                return el;
            });
            if (returnedSongs.length == 1) {
                readyResponse();
                $('#response').append(singleSong(returnedSongs[0]));
                prepareLyrics();
                authorLoop(returnedSongs[0]);
                returnedSongs[0].chords.forEach(function (el) {
                    $('.chords').append(chords(el));
                });
            }
            else if (returnedSongs.length == 0) {
                readyResponse();
                $('#response').append(sorry());
            }
            else {
                readyResponse();
                $('#response').append(please());
                returnedSongs.forEach(function (el) {
                    $('#response').append(songList(el));
                    watchSong(el.id);
                });
            }
        })
        .catch(err => alert(`Something went wrong: ${err.message}`));
}
function fetchBio(id) {
    $('.authors').append(loading());
    fetch(`https://api.guitarparty.com/v2/artists/${id}/`, data)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(resonse.statusText);
        })
        .then(responseJson => {
            let author = responseJson;
            if (author.bio == null) {
                author.bio = "Sorry, no bio is available for this artist";
            }
            clearBio();
            $('.authors').append(bioCard(author));
            $('#button').on('click', function() {
                clearBio();
            })
        })
}

function fetchSong(id) {
    loadIt();
    fetch(`https://api.guitarparty.com/v2/songs/${id}/`, data)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            let returnedSong = responseJson;
            delete returnedSong.body;
            delete returnedSong.body_stripped;
            delete returnedSong.permalink;
            delete returnedSong.tags;
            delete returnedSong.uri;
            readyResponse();
            $('#response').append(singleSong(returnedSong));
            prepareLyrics();
            authorLoop(returnedSong);
            returnedSong.chords.forEach(function (el) {
                $('.chords').append(chords(el));
            });
        })
        .catch(err => alert(`Something went wrong: ${err.message}`));
}

function watchSong(id) {
    $('#' + id).on('click', function() {
        fetchSong(id);
    });
}

function watchSearch() {
    $('form').on('submit', function (event) {
        let song = $('#searchBar').val();
        event.preventDefault();
        fetchQuery(song);
    });
}

function addSearchBar() {
    $('body').append(searchBar());
}

function init() {
    addSearchBar();
    watchSearch();
}

$(init);
