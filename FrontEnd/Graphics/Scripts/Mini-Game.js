//ELEMENTS:
const body = document.body;
const canvas = document.querySelector('[data-canvas]');
const canvasWarnings = document.querySelector('.canvas-handler-warnings');
const canvasHandler = document.querySelector('.canvas-handler');

//VARIABLES:
let winWidth, winHeight, canvasW, canvasH, menus, fonts;

//INITIALIZATION:
body.onload = function(){
    windowCheck();
}

function windowCheck(){
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    if(winHeight > 600 || winWidth > 600){
        if(winWidth > 850){
            canvasW = 700;
            canvasH = 500;
            theCanvas.createCanvas(canvasW,canvasH);
            canvasHandlerDefault();
        }else if(winWidth > 600 && winWidth < 850){
            canvasW = (canvasHandler.clientWidth - 60);
            canvasH = (canvasW - 100);
            theCanvas.createCanvas(canvasW,canvasH);
            canvasHandlerDefault();
        }else if(winWidth < 600 && winWidth > 350){
            canvasW = (canvasHandler.clientWidth - 40);
            canvasH = (canvasW - 100);
            theCanvas.createCanvas(canvasW,canvasH);
            canvasHandlerDefault();
        }else if(winWidth < 350){
            warningCanvasHandler();
        }

        menus = function(){
            if(winWidth > 600){
                theCanvas.mainMenuComponents();
            }else{
                theCanvas.warningMenu();
            }
        }
    }else{
        warningCanvasHandler();
    }

    function warningCanvasHandler(){
        canvasWarnings.innerHTML = `I'm sorry, your device does not match the minimum requirements.`;
        theCanvas.createCanvas(0,0);
        canvasHandler.style.height = '200px';
    }
    function canvasHandlerDefault(){
        canvasWarnings.innerHTML = '';
        canvasHandler.style.height = '100%';
    }

    window.addEventListener('resize', windowCheck);
}

function warningMenu(){

}

var theCanvas = {
    createCanvas: function(w,h){
        this.width = w;
        this.height = h;
        canvas.width = this.width;
        canvas.height = this.height;
        this.start();
        setTimeout(()=>{
            this.stop();
        },1);
    },
    start: function(){
        this.canvasContext = canvas.getContext('2d');
        this.interval = setInterval(refreshCanvas,1);
    },
    stop: function(){
        clearInterval(this.interval);
    },
    clearCanvas: function(){
        this.canvasContext.clearRect(0,0,this.width,this.height);
    },
    warningMenu: function(){
        var background, mainTitle, verificationButtonRect, verificationButtonMessage;
        fonts = 15;
        background = new Components('background',0,0,this.width,this.height,'black');
        mainTitle = new Components('mainTitle',(this.width / 2),50,'white');
        verificationButtonRect = new Components('verificationButtonRect',(this.width / 2 - (100/2)),100,100,20,'white');
        verificationButtonMessage = new Components('verificationButtonMessage',(this.width / 2),114,'black');
        background.builder();
        mainTitle.builder();
        verificationButtonRect.builder();
        verificationButtonMessage.builder();
    },
    mainMenuComponents: function(){

    }
}

class Components{
    constructor(type,x,y,width,height,color){
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    builder(){
        var ctx = theCanvas.canvasContext;
        if(this.type === 'background'){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        if(this.type === 'mainTitle'){
            ctx.font = `${fonts}px Arial`;
            ctx.fillStyle = this.width;
            ctx.textAlign = 'center';
            ctx.fillText('Turn your device sideways, please.',this.x,this.y);
        }
        if(this.type === 'verificationButtonRect'){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        if(this.type === 'verificationButtonMessage'){
            ctx.font = `${fonts}px Arial`;
            ctx.fillStyle = this.width;
            ctx.textAlign = 'center';
            ctx.fillText('Check Now',this.x,this.y,);
        }
    }
}

function refreshCanvas(){
    theCanvas.clearCanvas();
    menus();
}