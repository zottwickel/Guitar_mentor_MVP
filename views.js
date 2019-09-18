function searchBar () {
    return `
        <main>
            <header>
                <h1 class="welcome">Welcome to Guitar Mentor!</h1>
            </header>
            <section>
                <form id="search">
                    <p class="label">Search for a song!</p>
                    <input id="song" type="text" for="search"><input type="submit" value="Go!" for="search">
                </form>
            </section>
            <div id="response">
            </div>
        </main>
    `;
}

function singleSong(returnedSong) {
    return `
        <h1>${returnedSong.title}</h1>
        <section class="lyrics">
            <h2>Lyrics:</h2>
            ${returnedSong.body_chords_html}
        </section>
        <section class="chords">
            <h2>Chords:</h2>
        </section>
    `
}

function chords(el) {
    return `
        <p>${el.name}</p>
        <img src="${el.image_url}" alt="fingering for a ${el.name} chord">
    `
}

function sorry() {
    return `
        <h2>Sorry, your search didn't return any songs.</h2>
    `
}

function please() {
    return `
        <h2>Please choose from the following options:</h2>
    `
}

function songList(el) {
    return `
        <p class="songListItem" id="${el.id}">${el.title} - ${el.authors[0].name}</p>
    `
}