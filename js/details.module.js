/// <reference types="../@types/jquery" />



export class GameDetails{
  constructor(){

    //!=====functions======//
    
  }

  async getGameDetails(id){
  
    

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '75700dff21msha12b3479910f0dbp1cd5e6jsn0948188a25b1',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    $('#loadingDetails').removeClass('d-none')
    
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` , options )

    const res = await api.json()
    $('#loadingDetails').addClass('d-none')
    return res
  }  
}
