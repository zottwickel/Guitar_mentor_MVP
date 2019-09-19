function searchBar () {
    return `
        <main>
            <header>
                <h1 class="welcome">Welcome to Guitar Mentor!</h1>
            </header>
            <section class="searchbar">
                <form id="search">
                    <div class="inputs">
                        <p class="label">Search for a song:</p>                    
                        <input id="searchBar" type="text" for="search"><input id="searchButton" type="submit" value="Go!" for="search">
                    </div>
                </form>
            </section>
            <section>
                <div id="response" class="hidden">
                </div>
            </section>
        </main>
    `;
}

function author(el, id) {
    return `
        <div class="link">
            <a href="#" class="author" id="${id}">${el.name}</a>
        </div>
    `
}

function singleSong(returnedSong) {
    return `
        <h2>${returnedSong.title}</h2>
        <div class="flex">
            <div class="left">
                <section class="authors">
                    <h2>Authors:</h2>
                </section>
                <section>
                    <h2>Lyrics:</h2>
                    <div class="lyrics">
                        ${returnedSong.body_chords_html}
                    </div>
                </section>
            </div>
            <div class="right">
                <section class="chords">
                    <h2>Chords:</h2>
                </section>
            </div>
        </div>
    `
}

function chords(el) {
    return `<div class="tab"><img class="chordImg" src="${el.image_url}" alt="fingering for a ${el.name} chord"></div>`
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
        <div class="link">
            <a href="#" class="songListItem" id="${el.id}">${el.title} - ${el.authors[0].name}</a>
        </div>
    `
}

function loading() {
    return `
        <h2 class="loading">Loading...</h2>
    `
}

function bioCard(author) {
    return `
        <div id="bio">
            <button id="button">X close</button>
            <div class="card">
                <h3 class="cardContent">${author.name}</h3>
                <p class="cardContent">${author.bio}</p>
            </div>
        </div>
    `
}