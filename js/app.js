$(document).ready(function () {

// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------

  (async function asyncWrapper() {
    async function getData() {
      const response = await fetch('https://randomuser.me/api/?results=12&nat=us,gb')
        .catch(err => document.getElementById('grid-container').innerHTML = `${err}. Oops! Something went wrong. Please try reload the page.`);
      if(response.ok) {
        const data = await response.json();
        return data;
      } 
    }

// // ------------------------------------------
// //  HELPER FUNCTIONS
// // ------------------------------------------

    const data = await getData('contact');
    const container = document.getElementById('grid-container');
    const modal = document.getElementById('modal');
    const search = document.getElementById('user-search');

    // create grid-container's html
    const gridHTML = data.results.map(result => `
      <div class="grid-item">
        <div class="avatar"><img src=${result.picture.large} alt></div>
        <div class="info">
          <h2 class="full-name">${result.name.first} ${result.name.last}</h2>
          <p>${result.email}</p>
          <p class="city">${result.location.city}</p>
        </div>
      </div>
    `);

    gridHTML.forEach(gridItem => {
      container.innerHTML += gridItem
    });

    //create modal's html
    const modalHTML = data.results.map(result => `
      <div class="modal-content">
        <div class="basic-info">
          <span class="close">x</span>
          <img src=${result.picture.large} alt>
          <h2>${result.name.first} ${result.name.last}</h2>
          <p>${result.email}</p>
          <p class="city">${result.location.city}</p>
        </div>
        <div class="further-info">
          <p>${result.cell}</p>
          <p>${result.location.street} ${result.location.city}, ${result.location.state} ${result.location.postcode}</p>
          <p>Birthday: ${result.dob.date.substring(5, 7)}/${result.dob.date.substring(8, 10)}/${result.dob.date.substring(2, 4)}</p>
          <a href="#" id="previous">&#8249;</a>
          <a href="#" id="next">&#8250;</a>
        </div>
      </div>
    `);

// // ------------------------------------------
// //  EVENT LISTENERS
// // ------------------------------------------

    // display modal when card is clicked
    const cardsNodeList = document.getElementsByClassName('grid-item');
    const cardsArr = Array.from(cardsNodeList);
    let currentCardIndex ;

    cardsArr.forEach((card, i) => {
      card.addEventListener('click', () => {
        modal.style.display = "block";
        modal.innerHTML = modalHTML[i];
        currentCardIndex = i;
      })
    })

    // close modal if clicked outside the modal or on close button
    window.addEventListener('click', (e) => {
      if(e.target === modal || e.target.className === 'close') {
        modal.style.display = "none";
      } 
    })

    // compare search bar value against employee full name and only display if match
    search.addEventListener('keyup', () => {
      const searchStr = document.getElementById('user-search').value.toLowerCase().trim();
      cardsArr.forEach(card => {
        const anchor = card.getElementsByClassName('full-name')[0];
        if (anchor.textContent.includes(searchStr)) {
          card.style.display = 'flex';
          card.style.width = '400px';
        } else {
          card.style.display = 'none';
        }
      })
    })

    // click through modals
    modal.addEventListener('click', (e) => {
      if(e.target.id === 'previous') {
        currentCardIndex -= 1;
        if (currentCardIndex < 0) {
          currentCardIndex = 11;
        }
      } else if (e.target.id === 'next') {
        currentCardIndex += 1;
        if (currentCardIndex > 11) {
          currentCardIndex = 0;
        }
    } 
    modal.innerHTML = modalHTML[currentCardIndex];       
  })


  })() // end asyncWrapper
}); // end ready


