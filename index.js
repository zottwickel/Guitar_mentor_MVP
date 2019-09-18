const searchURL = '';
const data = { headers: { 'Guitarparty-Api-Key': '3c4daf3905d8c1ec2c49ce6faa3cc6139779913a' } };

function readyResponse() {
    $('header').remove();
    $('#response').empty();
}

function watchSong(id) {
    $('#' + id).on('click', function() {
        fetch(`http://api.guitarparty.com/v2/songs/${id}/`, data)
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
                returnedSong.chords.forEach(function (el) {
                    $('.chords').append(chords(el));
                });
            })
    });
}

function watchSearch() {
    $('form').on('submit', function (event) {
        let song = $('#song').val();
        event.preventDefault();
        fetch(`http://api.guitarparty.com/v2/songs/?query=${song}`, data)
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