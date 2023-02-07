class MiBarra extends HTMLElement {
    
    constructor(value = 20, max = 100, min = 0) {
        super();
        let minV = parseInt(this.getAttribute('my-value-min')) || min;
        let valueN = parseInt(this.getAttribute('my-value')) || value;
        let maxV = parseInt(this.getAttribute('my-value-max')) || max;
        let meter = document.createElement('meter');
        meter.value = valueN;
        meter.min = minV;
        meter.max = maxV;
        let span = document.createElement('span');
        span.innerHTML = Math.round(((valueN - minV)/(maxV - minV)) * 100) + '%';
        console.log();
        this.append(meter);
        this.append(span);
        let p = document.createElement('p');
        p.innerHTML = `
        Valor Mínimo: <button decrementarMin>-</button> <span id="spanValueMin"> ${this.valueMin} </span> <button incrementarMin>+</button>
        Valor Actual: <button decrementar>-</button> <span id="spanValue"> ${this.value}</span><button incrementar>+</button>
        Valor Máximo: <button decrementarMax>-</button> <span id="spanValueMax"> ${this.valueMax} </span> <button incrementarMax>+</button>
        `;
        this.append(p);
        let buttonTemp = document.createElement('BUTTON');
        buttonTemp.setAttribute('name', 'temp');
        let text = document.createTextNode('Activar Temporizador');
        buttonTemp.appendChild(text);
        this.append(buttonTemp);
        let p2 = document.createElement('p');
        let inputMin = document.createElement('input');
        inputMin.type = 'hidden';
        inputMin.value = minV;
        p2.append(inputMin); 
        let inputV = document.createElement('input');
        inputV.type = 'hidden';
        inputV.value = valueN;
        p2.append(inputV);
        let inputMax = document.createElement('input');
        inputMax.type = 'hidden';
        inputMax.value = max;
        p2.append(inputMax);  
        let buttonRest = document.createElement('BUTTON');
        buttonRest.setAttribute('name', 'restablecer');
        let text1 = document.createTextNode('Restablecer');
        buttonRest.appendChild(text1);
        
        p2.innerHTML += `
        Valores originales:
        ${minV} - ${valueN} - ${maxV}
        <br>
        <br>
        `;
        p2.append(buttonRest);
        this.append(p2);
    }

    connectedCallback() {
        this.querySelector('button[decrementar]').addEventListener('click', this.decrementar);
        this.querySelector('button[decrementarMin]').addEventListener('click', this.decrementarMin);
        this.querySelector('button[decrementarMax]').addEventListener('click', this.decrementarMax);
        this.querySelector('button[incrementar]').addEventListener('click', this.incrementar);
        this.querySelector('button[incrementarMin]').addEventListener('click', this.incrementarMin);
        this.querySelector('button[incrementarMax]').addEventListener('click', this.incrementarMax);
        this.querySelector('button[name="restablecer"]').addEventListener('click', this.restablecer);
        this.querySelector('button[name="temp"]').addEventListener('click', this.temporizador);
    }

    disconnectedCallback() {
        this.querySelector('button[decrementar]').removeEventListener('click', this.decrementar);
        this.querySelector('button[decrementarMin]').removeEventListener('click', this.decrementarMin);
        this.querySelector('button[decrementarMax]').removeEventListener('click', this.decrementarMax);
        this.querySelector('button[incrementar]').removeEventListener('click', this.incrementar);
        this.querySelector('button[incrementarMin]').removeEventListener('click', this.incrementarMin);
        this.querySelector('button[incrementarMax]').removeEventListener('click', this.incrementarMax);
        this.querySelector('button[name="restablecer"]').removeEventListener('click', this.restablecer);
        this.querySelector('button[name="temp"]').removeEventListener('click', this.temporizador);
    }

    decrementar() {this.parentNode.parentNode.value--;}
    incrementar() {this.parentNode.parentNode.value++;}
    decrementarMin() {this.parentNode.parentNode.valueMin--;}
    incrementarMin() {this.parentNode.parentNode.valueMin++;}
    decrementarMax() {this.parentNode.parentNode.valueMax--;}
    incrementarMax() {this.parentNode.parentNode.valueMax++;}
    restablecer() {
       console.log(this.parentNode.parentNode.value); 
       console.log((document.querySelectorAll['input']));}
    temporizador() {
        console.log('pulsando');
         //setInterval(incrementar, 1);
    }

    get value() {return parseInt(this.getAttribute('my-value'));}
    set value(v) {this.setAttribute('my-value', v);}

    get valueMin() {return parseInt(this.getAttribute('my-value-min'));}
    set valueMin(v) {this.setAttribute('my-value-min', v);}

    get valueMax() {return parseInt(this.getAttribute('my-value-max'));}
    set valueMax(v) {this.setAttribute('my-value-max', v);}


    static get observedAttributes() {
        return ['my-value', 'my-value-max', 'my-value-min'];
      }
    
      attributeChangedCallback(name,old,now) {
        let minV = parseInt(this.getAttribute('my-value-min'));
        let valueN = parseInt(this.getAttribute('my-value'));
        let maxV = parseInt(this.getAttribute('my-value-max'));
           switch(name) {
             case 'my-value' :
               if (now<minV) {
                minV = now;
                this.valueMin = minV;
                this.querySelector('#spanValueMin').innerHTML = ' ' + now + ' ';
                this.querySelector('#spanValue').innerHTML = ' ' + now + ' ';
                this.querySelector('meter').value = now;
                this.querySelector('meter').min = minV;
                this.querySelector('span').innerHTML = Math.round(((now - minV)/(maxV - minV)) * 100) + '%';
               } else if (now>maxV) {
                maxV = now;
                this.valueMax = maxV;
                this.querySelector('#spanValueMax').innerHTML = ' ' + now + ' ';
                this.querySelector('#spanValue').innerHTML = ' ' + now + ' ';
                this.querySelector('meter').value = now;
                this.querySelector('meter').max = maxV;
                this.querySelector('span').innerHTML = Math.round(((now - minV)/(maxV - minV)) * 100) + '%';
               }
               else {
                this.querySelector('#spanValue').innerHTML = ' ' + now + ' ';
                this.querySelector('meter').value = now;
                this.querySelector('span').innerHTML = Math.round(((now - minV)/(maxV - minV)) * 100) + '%';
               };
               break;
            case 'my-value-min' :
                if(now>valueN) {
                    now = old;
                    minV = now;
                    this.querySelector('meter').min = now;
                    this.querySelector('span').innerHTML = Math.round(((valueN - minV)/(maxV - minV)) * 100) + '%';
                }else {
                    minV = now;
                    this.querySelector('#spanValueMin').innerHTML = ' ' + now + ' ';
                    this.querySelector('meter').min = now;
                    this.querySelector('span').innerHTML = Math.round(((valueN - minV)/(maxV - minV)) * 100) + '%';
                };
                break;
            case 'my-value-max' :
                if(now<valueN) {
                    now = old;
                    maxV = now;
                    this.valueMax = now;
                    this.querySelector('meter').max = now;
                    this.querySelector('span').innerHTML = Math.round(((valueN - minV)/(maxV - minV)) * 100) + '%';
                }else {
                    maxV = now;
                    this.querySelector('#spanValueMax').innerHTML = ' ' + now + ' ';
                    this.querySelector('meter').max = now;
                    this.querySelector('span').innerHTML = Math.round(((valueN - minV)/(maxV - minV)) * 100) + '%';
                };
                break;   
           }
    }
}

customElements.define('mi-barra', MiBarra);
let barra1 = document.querySelector('mi-barra');
// let mybarra2 = new MiBarra(50, 100, 20);
// document.body.append(mybarra2);