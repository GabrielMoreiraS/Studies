//ELEMENTS:
const body = document.body;
const canvas = document.querySelector('[data-canvas]');
const canvasWarnings = document.querySelector('.canvas-handler-warnings');
const canvasHandler = document.querySelector('.canvas-handler');
//VARIABLES:
let winWidth, winHeight, canvasW, canvasH, menus, fontTitle, fontButton, menuType, character, obstacles, bullets, actualMenu;
//INITIALIZATION:
body.onload = function(){
    windowCheck();
}
//SCREEN METER:
function windowCheck(){
    winWidth = screen.width;
    winHeight = screen.height; 
    if(winHeight >= 600 || winWidth >= 600){
        canvasHandlerDefault();
        if(actualMenu == undefined){
            menuType = 'startMenu';
        }else{
            menuType = actualMenu;
            if(menuType != 'startMenu'){
                canvas.requestFullscreen();
                setTimeout(()=>{
                    theCanvas.fullScreenCanvas();
                },500);
            }
        }
        if(winWidth > 850){
            canvasW = 700;
            canvasH = 500;
            theCanvas.createCanvas(canvasW,canvasH);
            fonts(70,14);
        }else if(winWidth >= 600 && winWidth < 850){
            canvasW = (canvasHandler.clientWidth - 60);
            canvasH = (canvasW - 160);
            theCanvas.createCanvas(canvasW,canvasH);
            fonts(60,13);
        }else if(winWidth >= 300 && winWidth < 600){
            canvasW = (canvasHandler.clientWidth - 60);
            canvasH = (canvasW - 100);
            theCanvas.createCanvas(canvasW,canvasH);
            fonts(60,12);
        }else if(winWidth >= 600 && winWidth < 300){
            warningCanvasHandler();
        }
        menus = function(){
            if(winWidth >= 600){
                theCanvas.screenActionsDetector();
                if(menuType == 'startMenu')
                    theCanvas.startMenu();
                if(menuType == 'mainMenu')
                    theCanvas.mainMenu();
                if(menuType == 'continueMenu')
                    theCanvas.continueMenu();
                if(menuType == 'gameEnviroment')
                    theCanvas.gameEnviroment();
            }else{
                fonts(14,0);
                theCanvas.warningMenu();
                setTimeout(()=>{
                    theCanvas.stop();
                },1);
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
    function fonts(fT,fB){
        fontTitle = fT;
        fontButton = fB;
        return fontTitle, fontButton;
    }
    window.addEventListener('resize', windowCheck);
}
//CANVAS PROPERTIES:
var theCanvas = {
    createCanvas: function(w,h){
        this.width = w;
        this.height = h;
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.position = 'unset';
        body.style.overflow = "auto";
        this.stop();
        setTimeout(()=>{
            this.start();
        },500);
    },
    fullScreenCanvas: function(){
        canvas.style.position = 'absolute';
        canvas.style.top = '-'+canvasHandler.offsetTop+'px';
        canvas.style.left = '-'+(canvasHandler.offsetLeft)+'px';
        body.style.overflow = "hidden";
        this.width = screen.width;
        this.height = screen.height;
        canvas.width = this.width;
        canvas.height = this.height;
        this.stop();
        setTimeout(()=>{
            this.start();
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
    removeFullScreen: function(){
        setTimeout(()=>{
            location.reload();
            setTimeout(()=>{
                menuType = 'startMenu';
            },500);
        },500);
    },
    screenActionsDetector: function(){
        canvas.ontouchstart = (e)=>{
            theCanvas.x = e.touches[0].pageX;
            theCanvas.y = e.touches[0].pageY;
        }
        canvas.ontouchend = ()=>{
            theCanvas.x = false;
            theCanvas.y = false;
        }
        canvas.addEventListener('mousedown', (e)=>{
            theCanvas.x = e.pageX;
            theCanvas.y = e.pageY;
        })
        canvas.addEventListener('mouseup', ()=>{
            theCanvas.x = false;
            theCanvas.y = false;
        })
    },
    warningMenu: function(){
        var background, mainTitle;
        background = new Components('backgroundColor',0,0,this.width,this.height,'black');
        mainTitle = new Components('text',(this.width / 2),50,fontTitle,'white','Turn your device sideways, please.','Arial');
        background.builder();
        mainTitle.builder();
    },
    startMenu: function(){
        if(menuType == 'startMenu'){
            var background, mainTitle, buttonBack, buttonText, buttonFront;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,fontTitle,'rgb(120, 205, 245)','Start The Game','Calibri');
            buttonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            buttonText = new Components('text',(this.width / 2),(this.height / 2),fontButton,'rgb(120, 205, 245)','Next','Calibri');
            buttonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)','buttonFront');
            background.builder();
            mainTitle.builder();
            buttonBack.builder();
            buttonText.builder();
            buttonFront.builder();
            if(theCanvas.x && theCanvas.y){
                if(buttonFront.screenButtons()){
                    setTimeout(()=>{
                        canvas.requestFullscreen();
                        setTimeout(()=>{
                            this.fullScreenCanvas();
                            menuType = 'mainMenu';
                            actualMenu = menuType;
                        },50);
                    },500);
                }
            }
        }
    },
    mainMenu: function(){
        if(menuType == 'mainMenu'){
            var background, mainTitle, startButtonBack, startText, startButtonFront, quitButtonBack, quitText, quitButtonFront, fullScreeButton;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
            startButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            startText = new Components('text',(this.width / 2),(this.height / 2),fontButton,'rgb(120, 205, 245)','Start','Calibri');
            startButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
            quitButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
            quitText = new Components('text',(this.width / 2),(this.height / 2 + 40),fontButton,'rgb(120, 205, 245)','Quit','Calibri');
            quitButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
            fullScreeButton = new Components('imageButton',(this.width - 22),2,20,20,'Media/Mini-Game/Images/expandCanvas.png');
            background.builder();
            mainTitle.builder();
            startButtonBack.builder();
            startText.builder();
            startButtonFront.builder();
            quitButtonBack.builder();
            quitText.builder();
            quitButtonFront.builder();
            fullScreeButton.builder();
            if(theCanvas.x && theCanvas.y){
                if(startButtonFront.screenButtons()){
                    menuType = 'gameEnviroment';
                    actualMenu = menuType;
                }
                if(quitButtonFront.screenButtons()){
                    this.removeFullScreen();
                }
                if(fullScreeButton.screenButtons()){
                    setTimeout(()=>{
                        canvas.requestFullscreen();
                    },500);
                }
            }
        }
    },
    continueMenu: function(){
        if(menuType == 'continueMenu'){
            var background, mainTitle, continueButtonBack, continueText, continueButtonFront, restartButtonBack, restartText,
            restartButtonFront, quitButtonBack, quitText, quitButtonFront, fullScreeButton;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
            continueButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            continueText = new Components('text',(this.width / 2),(this.height / 2),fontButton,'rgb(120, 205, 245)','Continue','Calibri');
            continueButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
            restartButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
            restartText = new Components('text',(this.width / 2),(this.height / 2 + 40),fontButton,'rgb(120, 205, 245)','Restart','Calibri');
            restartButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
            quitButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(10, 78, 204,0.5)');
            quitText = new Components('text',(this.width / 2),(this.height / 2 + 80),fontButton,'rgb(120, 205, 245)','Quit','Calibri');
            quitButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(0,0,0,0)');
            fullScreeButton = new Components('imageButton',(this.width - 22),2,20,20,'Media/Mini-Game/Images/expandCanvas.png');
            background.builder();
            mainTitle.builder();
            continueButtonBack.builder();
            continueText.builder();
            continueButtonFront.builder();
            restartButtonBack.builder();
            restartText.builder();
            restartButtonFront.builder();
            quitButtonBack.builder();
            quitText.builder();
            quitButtonFront.builder();
            fullScreeButton.builder();
            if(theCanvas.x && theCanvas.y){
                if(continueButtonFront.screenButtons()){
                    menuType = 'gameEnviroment';
                    actualMenu = menuType;
                }
                if(restartButtonFront.screenButtons()){
                    menuType = 'gameEnviroment';
                    actualMenu = menuType;
                }
                if(quitButtonFront.screenButtons()){
                    this.removeFullScreen();
                }
                if(fullScreeButton.screenButtons()){
                    setTimeout(()=>{
                        canvas.requestFullscreen();
                    },500);
                }
            }
        }
    },
    gameEnviroment: function(){
        if(menuType == 'gameEnviroment'){
            var background, mainMenuButton;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/gameEnviroment.jpg');
            mainMenuButton = new Components('imageButton',2,2,30,30,'Media/Mini-Game/Images/mainMenu.png');
            background.builder();
            mainMenuButton.builder();
            if(theCanvas.x && theCanvas.y){
                if(mainMenuButton.screenButtons()){
                    menuType = 'continueMenu';
                    actualMenu = menuType;
                }
            }
        }
    }
}
//COMPONENTS CONSTRUCTOR:
class Components{
    constructor(type,x,y,width,height,color,fonts){
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = new Image();
        this.font = fonts;
    }
    builder(){
        var ctx = theCanvas.canvasContext;
        if(this.type === 'button' || this.type === 'bullets' || this.type === 'backgroundColor'){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        if(this.type === 'text'){
            ctx.font = `${this.width}px ${this.font}`;
            ctx.fillStyle = this.height;
            ctx.textAlign = 'center';
            ctx.fillText(this.color,this.x,this.y);
        }
        if(this.type === 'backgroundImage' || this.type === 'imageButton'){
            this.image.src = this.color;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    }
    screenButtons(){
        var top, left, right, bottom;
        if(menuType == 'startMenu'){
            top = this.y + canvasHandler.offsetTop;
            left = (canvas.offsetLeft + this.x + canvasHandler.offsetLeft);
            right = (left + this.width);
            bottom = (top + this.height);
        }else{
            top = this.y;        
            left = this.x;
            right = (left + this.width);
            bottom = (top + this.height);
        }
        if(top > theCanvas.y || left > theCanvas.x || bottom < theCanvas.y || right < theCanvas.x){
            return false;    
        }
        return true;
    }
    obstacles(){

    }
    bullets(){

    }
}
//UPDATER:
function refreshCanvas(){
    theCanvas.clearCanvas();
    menus();
}