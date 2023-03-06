/// <reference types="../@types/jquery" />

import { GameDetails } from "./details.module.js"

//?=========class of display gamesData and details and import Ui class to homePage =============//

export class Ui{
  constructor(res){

    this.res = res
    
    document.getElementById('gameData').addEventListener('click' , (e)=>{
      if (e.target.classList.contains('showDetails')) {
        
        $('.home').addClass('d-none')
        $('nav').addClass('d-none')
        $('.navbar-container').addClass('d-none')
        $('.details').removeClass('d-none')
        console.log(e.target.id);
        const id = e.target.id
        this.gamesDetails(id)
      }
    })

    document.getElementById('detailsData').addEventListener('click' , (e)=>{
      if (e.target.id == 'closeBtn') {
        $('.home').removeClass('d-none')
        $('nav').removeClass('d-none')
        $('.navbar-container').removeClass('d-none')
        $('.details').addClass('d-none')
      }
    })
  }

  displayGames(){
    const res =  this.res
    let cartoona = ''
    
      for (let i = 0; i < res.length; i++) {
      cartoona +=
      `
      <div class="col">
        <div class="card h-100 bg-transparent  gamesDetails" role="button">
          <div class="card-body showDetails" id='${res[i].id}' >
            <figure class="position-relative">
              <img  id='${res[i].id}' class="card-img-top object-fit-cover showDetails h-100" src="${res[i].thumbnail}" />
            </figure>

            <figcaption>

              <div class="hstack justify-content-between">
                  <h3 class="h6 small showDetails" id='${res[i].id}'>${res[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
              </div>

              <p class="card-text small text-center opacity-50 showDetails" id='${res[i].id}'>
                  ${res[i].short_description.split(" ", 8)}
              </p>

            </figcaption>
          </div>

          <footer class="card-footer small hstack justify-content-between showDetails" id='${res[i].id}'>
            <span class="badge badge-color showDetails" id='${res[i].id}'>${res[i].genre}</span>
            <span class="badge badge-color showDetails" id='${res[i].id}'>${res[i].platform}</span>
          </footer>
          </div>
      </div>
      `
    }

    $('#gameData').html(cartoona)
  }

  async gamesDetails(id){
    $('#loading').removeClass('d-none')
    const details =  new GameDetails()
    const res =  await details.getGameDetails(id)
    console.log(res);
    this.displayDetails(res)
    $('#loading').addClass('d-none')
  }

  displayDetails(res){
    let cartoona =
    `
    <div class='col-md-12'>
      <div class='d-flex justify-content-between align-items-center '>
        <h1>Details Game</h1>
        <span ><i class="fa-solid fa-xmark text-white fs-3" id='closeBtn'></i></span>
      </div>
    </div>
    <div class="col-md-3">

      <figure>
        <img src="${res.thumbnail}" class="w-100" alt="details image" />
      </figure>

    </div>
    <div class="col-md-9">

    <div>

      <h1>Title : ${res.title}</h1>

      <h6 class='my-4 '>category : <span class="badge bg-info bg-opacity-50 p-2">${res.genre}</span></h6>
      <h6 class='my-4'>platform :  <span class="badge bg-info bg-opacity-50 p-2"> ${res.platform}</span> </h6>
      <h6 class='my-4'>status :  <span class="badge bg-info bg-opacity-50 p-2"> ${res.status}</span>  </h6>
      <p>${res.description}</p>
      <a href='${res.freetogame_profile_url}' target='_blank' class="btn btn-outline-warning text-white p-2">Show Game</a>

    </div>

  </div>
  `

  
  document.getElementById('detailsData').innerHTML = cartoona

    let background = res.thumbnail.replace('thumbnail' , 'background')
    document.querySelector('.details').style.cssText =  
      `
      background-image: url(${background});
      background-position: center center ;
      background-size: cover;
      
      `
  }

}




