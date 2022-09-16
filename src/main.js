import animateTitle from './features/animateTitle'
import createBadge from './features/createBasge'
import './styles/style.css'

//Début du script

//Récupération de la position du user et initialisation de la map.
let yourPosition = {};
navigator.geolocation.getCurrentPosition(function(position){
    yourPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    //Lancement de la map après récupération de la user position.
    window.initMap = initMap()
});

// Initialisation et ajout de la map.
function initMap() {
  let arrayViewMap = [];

  // La map est centrée sur la position de l'utilisateur.
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: yourPosition,
  })

  //Creation des marqueurs avec les informatins connues en CMS.
  locations.forEach((location) => {
    let contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="firstHeading" class="firstHeading">' +
      location.name +
      '</h3>' +
      '<div id="bodyContent">' +
      '<p>' +
      location.description +
      '</p>' +
      '</div>' +
      '</div>'

    //Ajout des informations (contentString) dans l'info window.
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
    })

    //Création des markers sur la map.
    let marker = new google.maps.Marker({
      position: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      },
      map: map,
      title: location.name,
    })

    //Ajout listener sur les marker pour les ouvrir au click souris.
    marker.addListener('click', () => {
      map.panTo(marker.position);
      infowindow.open(map, marker);
    })

    //Bouton permettant de revenir a la localisation de l'utilisateur.
    const locationBtn = document.querySelector('#my-location');
    locationBtn.addEventListener('click', () => {
      map.panTo(yourPosition);
    })
    
    //Création d'une variable position et ajout dans un tableau pour naviguer vers le point selectionné ("voir sur la carte").
    let position = {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    }
    arrayViewMap.push(position);
    console.log("position : " + position.lat);

  //Fin du forEach.
  })

  //Déplacement vers le point selectionner lors du clcik sur "voir sur la carte".
  const viewMap = document.querySelectorAll('#view-map');
  for (let i =0; i<viewMap.length; i++) {
    viewMap[i].addEventListener("click", () => map.panTo(arrayViewMap[i]));
  }
}

//Fin du script et apparition des badges
createBadge()
animateTitle()