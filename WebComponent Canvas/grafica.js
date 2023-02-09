class MiGrafica extends HTMLElement {

  constructor(width = 300, height = 100,...elements) {
    super();
    let widthC = parseInt(this.getAttribute('my-width')) || width;
    let heightC = parseInt(this.getAttribute('my-height')) || height;
    this.elements = this.getAttribute('elements') || elements; 

    console.log(widthC, heightC);


    // let myCanvas = document.createElement('canvas');
    // myCanvas.setAttribute('id', 'myCanvas');
    // myCanvas.width = widthC;
    // myCanvas.height = heightC;
    // myCanvas.classList.add('myCanvas');
    // this.append(myCanvas);
    
    this.createCanvas(widthC, heightC);
   // CONTAINER.append(this);
    
  }

  get value() {return this.getAttribute('elements');}
    
  set value(v) {this.setAttribute('elements', v);}

  createCanvas(width, height) {
    let myCanvas = document.createElement('canvas');
    myCanvas.setAttribute('id', 'myCanvas');
    myCanvas.width = width;
    myCanvas.height = height;
    myCanvas.classList.add('myCanvas');
    this.append(myCanvas);
  }

  static get observedAttributes() {
    return ['elements'];
  }
  
  attributeChangedCallback(name, old, now) {

    this.elements = this.getAttribute('elements');
    let myCanvas = this.querySelector('#myCanvas');
    

    let colours = ["blue", "green", "yellow", "red", "orange", "navy", "red"];
   
    let total = this.elements.reduce((a,e) => a+e,0);

    let centerX = 100;
    let centerY = 75;
    let radius = 50;
    let ctx = myCanvas.getContext("2d");
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    

  }

  addValue(v) {
    this.elements = this.getAttribute('elements');
    this.elements.push(v);
  }
}
const CONTAINER = document.querySelector('#container');

customElements.define('mi-grafica', MiGrafica);


// let colours = ["blue", "green", "yellow", "red", "orange", "navy", "red"];
// let elements = [8, 4, 2, 2, 7];
// let total = elements.reduce((a,e)=>a+e,0);
// let centerX = 100;
// let centerY = 75;
// let radius = 50;
// let c = document.getElementById("myCanvas");
// let ctx = c.getContext("2d");
// 
// 

// let begin =0;
// let end;
// elements.forEach((element,i) => {
//   ctx.beginPath();
//   end = (2 * element / total) + begin;
//   ctx.fillStyle = colours[i];
//   ctx.moveTo(centerX,centerY);
//   ctx.arc(centerX, centerY, radius, begin * Math.PI, end * Math.PI);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
//   begin = end;  
// });
