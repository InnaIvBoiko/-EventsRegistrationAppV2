const CARDS = document.querySelector('.events-list');
const PAGES = document.querySelector('.pagination-list');

let page = 1;
let currentPages = 1;

async function getEvents(page) {
    try {
        const response = await fetch(`https://eventsregistrationbackend.onrender.com/?page=${page}`);
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.log(error);
    }
};

let eventsList = [];

function markUpEvents(page) {
    getEvents(page)
        .then((res) => {
            if (res.totalPages > 1) {
                markUpPages(res.totalPages)
            }
            eventsList = res.data;

            return eventsList;
        })
        .then((events) => {
            CARDS.innerHTML = null;

            const result = events.map((event) =>
                `<li class="events-list-item">
                    <h3>${event.title}</h3>
                    <p>${event.event_date}</p>
                    <h4>${event.organizer}</h4>
                    <p>${event.description}</p>
                    <div class="links">
                        <a class="registerLink" href="#">Register</a>
                        <a class="viewLink" href="#">View</a>
                    </div>
                </li>`)
                .join('');
            
            return CARDS.insertAdjacentHTML('afterbegin', result);
        })
        .catch((error) => {
            CARDS.innerHTML = `<h3>Not found</h3>`;
        });
};

function markUpPages(totalPages) {
    let pages = '';
    for (let i = 0; i < totalPages; i++) {
        pages = pages.concat(`<li class="pagination-item">${i+1}</li>`);
    };
    
    return PAGES.innerHTML = pages;
}

markUpEvents(page);
 

PAGES.addEventListener('click', event => {
    markUpEvents(event.target.firstChild.data);
});