class MiMapa extends HTMLElement {

    constructor(width = 500, height = 400, precision = 1) {
        super();
        let widthM = this.getAttribute('my-width') || width;
        let heightM = this.getAttribute('my-height') || height;
        let precisionM = this.getAttribute('my-precision') || precision;

        this.createIframe(widthM, heightM);

       // if (navigator.geolocation) {
            let lat =  navigator.geolocation.getCurrentPosition(this.showPositionLat);
            let lon = navigator.geolocation.getCurrentPosition(this.showPositionLon);
        //} else {
            // lat = 28.0198981;
            //  lon = -16.6438673;
        //}

        this.posicionar(lat, lon, precisionM);

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
        let iframe = this.querySelector('iframe');
             iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-precision},${lat-precision},${lon+precision},${lat+precision}&layer=mapnik`;
         }
        
 
    

    //  getLocation() {
    //     if(navigator.geolocation) {
    //        pos =  navigator.geolocation.getCurrentPosition;
    //         lat = navigator.geolocation.getCurrentPosition.coords.latitude;
    //         lon = pos.coords.longitude;
    //     } else {
    //         lat = 28.0198981;
    //         lon = -16.6438673;
    //     }

    //  }
      showPositionLat(position) {
        // console.log(position.coords.latitude);
        return position.coords.latitude ; 
         
       }

        showPositionLon(position) {
        return position.coords.longitude;
       }


}

function getLocation() {
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPositionLat);
       navigator.geolocation.getCurrentPosition(showPositionLat);
      //  lat = navigator.geolocation.getCurrentPosition.coords.latitude;
       // lon = pos.coords.longitude;
    } else {
        console.log('xd');
    }
}

function showPositionLat(position) {
   // console.log(position.coords.latitude);
   return position.coords.latitude ; 
    
  }

function showPositionLon(position) {
    return position.coords.longitude;
   }

customElements.define('mi-mapa', MiMapa);