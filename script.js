document.onload = getFilms();

function getFilms() {
fetch('https://ghibliapi.herokuapp.com/films')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach(film => {
        const filmResult = document.getElementById("filmResult");
        
        const id = film.id;
        const image = film.image;
        const title = film.title;
        const releaseDate = film.release_date;

        filmResult.innerHTML += `
        <div class="col-sm">
            <div class="card" style="width: 15rem; margin-top: 16px;">
                <img class="card-img-top" src="${image}">
                <div class="card-body">
                    <h5 class="card-title">${title} (${releaseDate})</h5><br>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="getFilmDetail('${id}')">Movie Details</button>
                </div>
            </div>
        </div>
        `;
    })
})
.catch(err => console.log('Request failed ', err));
}

function getFilmDetail(id) {
    fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
    .then(response => response.json())
    .then(film => {
        console.log(film)
            const filmDetail = document.getElementById("filmDetail");
            
            const image = film.image;
            const title = film.title;
            const originalTitle = film.original_title;
            const originalTitleRomanised = film.original_title_romanised;
            const description = film.description;
            const director = film.director;
            const producer = film.producer;
            const releaseDate = film.release_date;
            const rtScore = film.rt_score;
    
            filmDetail.innerHTML = `
            <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <div class="container text-center">
                    <div><img src="${image}" width="210" style="margin-bottom: 16px"></div>
                    <b>${title}</b>
                    ${originalTitle} (${originalTitleRomanised})<br>
                    ${releaseDate}
                </div>
                
                <div class="container text-center" style="margin-bottom: 16px">
                    Director: ${director}<br>
                    Producer: ${producer}<br>
                    Rotten Tomatoes Score: ${rtScore}%
                </div>
                <p>${description}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>            `;
    })
    .catch(err => console.log('Request failed ', err));
    }