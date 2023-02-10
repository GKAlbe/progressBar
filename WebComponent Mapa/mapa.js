class MiMapa extends HTMLElement {

  constructor(width = 500, height = 400, precision = 0.007, lat = 28.0198981, lon = -16.6438673) {
      super();
      let widthM = this.getAttribute('my-width') || width;
      let heightM = this.getAttribute('my-height') || height;
      let precisionM = this.getAttribute('my-precision') || precision;
      this.lat = lat;
      this.lon = lon;
      this.createIframe(widthM, heightM);
      this.posicionar(this.lat, this.lon, precisionM);

      let p = document.createElement('p');
      p.innerHTML = `
        <button posicionar>Posicionar </button>
      `;
      this.append(p);

     // if (navigator.geolocation) {
      //} else {
          // lat = 28.0198981;
          //  lon = -16.6438673;
      //}

      

  }

  connectetdCallback() {
    this.querySelector('button[posicionar]').addEventListener('click', this.getLocation);
  }

  disconnectedCallback() {
    this.querySelector('button[posicionar]').removeEventListener('click', this.getLocation);
 
  }

  createIframe(width, height) {
      let iframe = document.createElement('iframe');
      iframe.width = width;
      iframe.height = height;
      iframe.src = '';
      iframe.classList.add('iframe');
      this.append(iframe);
  }

  posicionar(lat, lon, precision) {
    console.log('hola');
      let iframe = this.querySelector('iframe');
      
           iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-precision},${lat-precision},${lon+precision},${lat+precision}&layer=mapnik`;
       }

      getLocation() {
        console.log('hola');
        if (this.navigator.geolocation) {
          this.navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }

       showPosition(position) {
        let iframe = this.querySelector('iframe');
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude-this.precision},${position.coords.latitude-this.precision},${position.coords.longitude+this.precision},${position.coords.latitude+this.precision}&layer=mapnik`;
       // x.innerHTML = "Latitude: " + position.coords.latitude + 
       // "<br>Longitude: " + position.coords.longitude;
      }


      static get observedAttributes() {
        return ['lat', 'lon', 'precision'];
      }

   }




function getLocation() {
  if(navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPositionLat);
     navigator.geolocation.getCurrentPosition(showPositionLon);
    //  lat = navigator.geolocation.getCurrentPosition.coords.latitude;
     // lon = pos.coords.longitude;
  } else {
      console.log('xd');
  }
}

function showPosition(position) {
  let iframe = this.querySelector('iframe');
  this.lat = position.coords.latitude;
  this.lon = position.coords.longitude;
  iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude-this.precision},${position.coords.latitude-this.precision},${position.coords.longitude+this.precision},${position.coords.latitude+this.precision}&layer=mapnik`;
 // x.innerHTML = "Latitude: " + position.coords.latitude + 
 // "<br>Longitude: " + position.coords.longitude;
}

// function showPositionLat(position) {
//  // console.log(position.coords.latitude);
//  return position.coords.latitude ; 
  
// }

// function showPositionLon(position) {
//   return position.coords.longitude;
//  }

customElements.define('mi-mapa', MiMapa);