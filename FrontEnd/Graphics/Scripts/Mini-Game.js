//ELEMENTS:
const body = document.body;
const canvas = document.querySelector('[data-canvas]');
const canvasWarnings = document.querySelector('.canvas-handler-warnings');
const canvasHandler = document.querySelector('.canvas-handler');

//VARIABLES:
let winWidth, winHeight, canvasW, canvasH, menus, fonts, touch, click;

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
                theCanvas.startMenu();
                theCanvas.mainMenu();
                theCanvas.continueMenu();
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

var theCanvas = {
    createCanvas: function(w,h){
        this.width = w;
        this.height = h;
        canvas.width = this.width;
        canvas.height = this.height;
        this.start();
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
        var background, mainTitle;
        background = new Components('background',0,0,this.width,this.height,'black');
        mainTitle = new Components('mainTitle',(this.width / 2),50,15,'white');
        background.builder();
        mainTitle.builder();
    },
    startMenu: function(){
    },
    mainMenu: function(){

    },
    continueMenu: function(){

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
        //The warning menu
        if(this.type === 'background'){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        if(this.type === 'mainTitle'){
            ctx.font = `${this.width}px Arial`;
            ctx.fillStyle = this.height;
            ctx.textAlign = 'center';
            ctx.fillText('Turn your device sideways, please.',this.x,this.y);
        }
        //The main menu
    }
    screenButtons(){
        var top, left, right, bottom;
        top = this.y + canvasHandler.offsetTop;
        left = this.x + canvas.offsetLeft;
        right = (left + this.width);
        bottom = (top + this.height);
        canvas.ontouchstart = (e)=>{
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            if(top > y || left > x || bottom < y || right < x){
                return touch = false;
                
            }else{
                return touch = true;
            }
        }
        canvas.ontouchend = ()=>{
            touch = false;
        }
    }
}

function refreshCanvas(){
    theCanvas.clearCanvas();
    menus();
}