/// <reference types="../@types/jquery" />

import { Ui } from "./ui.module.js";

//?=========class of fetch gamesData and export display class=============//


export class Games{
  constructor(){

    //!=====functions======//
    this.changeLinkColorContent() //*===function of change color of links and content of page===//

    this.getGames('mmorpg')       //*===function of first section on open homePage
    
  }

  async getGames(linkValue){

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '75700dff21msha12b3479910f0dbp1cd5e6jsn0948188a25b1',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    $('#loading').removeClass('d-none')

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${linkValue}` , options )

    const res = await api.json()

    const displayGames = new Ui(res)
    displayGames.displayGames()
    
    $('#loading').addClass('d-none')

    
  }

  changeLinkColorContent(){
    const links = document.querySelectorAll('.menu .nav-link')
    links.forEach(link => {
      link.addEventListener('click' , (e)=>{
        $(e.target).addClass('active')
        $(e.target).parent().siblings().children().removeClass('active')
        const linkValue = $(e.target).text()
        console.log(linkValue);
        this.getGames(linkValue)
        
      })
    });
  }
}