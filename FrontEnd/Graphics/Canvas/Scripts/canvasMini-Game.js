//ELEMENTS:
const body = document.body;
const canvas = document.querySelector('[data-canvas-mini-game]');
const canvasWarnings = document.querySelector('#chw0');
const canvasHandler = document.querySelector('#ch0');
//GENERAL VARIABLES:
var winWidth, winHeight, canvasW, canvasH, menus, menuType, actualMenu, actualHeight, currentGame;
//CHARACTERS VARIABLES:
var character = [];
//INITIALIZATION:
body.onload = windowCheck;
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
            if(menuType != 'startMenu' && menuType != 'newGameEnviroment' || menuType != 'startMenu' && menuType != 'continueGameEnviroment'){
                setTimeout(()=>{
                    canvas.requestFullscreen();
                    setTimeout(()=>{
                        theCanvas.fullScreenCanvas();
                    },100)
                },500)
            }
            if(menuType != 'startMenu' && menuType == 'newGameEnviroment' || menuType != 'startMenu' && menuType == 'continueGameEnviroment'){
                setTimeout(()=>{
                    canvas.requestFullscreen();
                    setTimeout(()=>{
                        theCanvas.fullScreenCanvas();
                        setTimeout(()=>{
                            menuType = 'continueMenu';
                            actualMenu = menuType;
                        },100)
                        
                    },100)
                },500)
            }
        };
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
                if(menuType == 'startMenu'){
                    theCanvas.startMenu();
                }
                if(menuType == 'mainMenu'){
                    theCanvas.mainMenu();
                }
                if(menuType == 'continueMenu'){
                    theCanvas.continueMenu();
                }
                if(menuType == 'newGameEnviroment' ||
                menuType == 'continueGameEnviroment'){
                    theCanvas.gameEnviroment();
                }
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
        theCanvas.fontTitle = fT;
        theCanvas.fontButton = fB;
        return theCanvas.fontTitle, theCanvas.fontButton;
    }
    window.addEventListener('resize', windowCheck);
}
//CANVAS PROPERTIES:
const theCanvas = {
    start: function(){
        this.canvasContext = canvas.getContext('2d');
        this.interval = setInterval(refreshCanvas,10);
    },
    stop: function(){
        clearInterval(this.interval);
    },
    clearCanvas: function(){
        this.canvasContext.clearRect(0,0,this.width,this.height);
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
    createCanvas: function(w,h){
        this.width = w;
        this.height = h;
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.position = 'unset';
        body.style.overflow = "auto";
        canvas.style.marginBottom = '-4px';
        this.start();
    },
    fullScreenCanvas: function(){
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '2';
        canvas.style.top = `-${canvasHandler.offsetTop}px`;
        canvas.style.left = `-${canvasHandler.offsetLeft + 9}px`;
        body.style.overflow = "hidden";
        this.width = screen.width;
        this.height = screen.height;
        canvas.width = this.width;
        canvas.height = this.height;
    },
    removeFullScreen: function(){
        this.stop();
        setTimeout(()=>{
            location.reload();
            menuType = 'startMenu';
        },500);
    },
    checkFullScreen: function(){
        actualHeight = window.innerHeight;  
        if(actualHeight < winHeight){
            var fullScreeButton;
            fullScreeButton = new Components('imageButton',(this.width - 32),2,30,30,'Media/Mini-Game/Images/expandCanvas.png');
            fullScreeButton.builder();
            if(theCanvas.x && theCanvas.y){
                if(fullScreeButton.screenButtons()){
                    setTimeout(()=>{
                        canvas.requestFullscreen();
                    },500);
                }
            }
        }
    },
    warningMenu: function(){
        var background, mainTitle;
        background = new Components('backgroundColor',0,0,this.width,this.height,'black');
        mainTitle = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'white','Turn your device sideways, please.','Arial');
        background.builder();
        mainTitle.builder();
    },
    startMenu: function(){
        if(menuType == 'startMenu'){
            var background, mainTitle, buttonBack, buttonText, buttonFront;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Start The Game','Calibri');
            buttonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            buttonText = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Next','Calibri');
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
                        },100);
                    },500);
                }
            }
        }
    },
    mainMenu: function(){
        if(menuType == 'mainMenu'){
            var background, mainTitle, startButtonBack, startText, startButtonFront, quitButtonBack, quitText, quitButtonFront;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
            startButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            startText = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Start','Calibri');
            startButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
            quitButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
            quitText = new Components('text',(this.width / 2),(this.height / 2 + 40),theCanvas.fontButton,'rgb(120, 205, 245)','Quit','Calibri');
            quitButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
            background.builder();
            mainTitle.builder();
            startButtonBack.builder();
            startText.builder();
            startButtonFront.builder();
            quitButtonBack.builder();
            quitText.builder();
            quitButtonFront.builder();
            if(theCanvas.x && theCanvas.y){
                if(startButtonFront.screenButtons()){
                    menuType = 'newGameEnviroment';
                    actualMenu = menuType;
                }
                if(quitButtonFront.screenButtons()){
                    this.removeFullScreen();
                }
            }
            this.checkFullScreen();
            this.controlsType();
        }
    },
    continueMenu: function(){
        if(menuType == 'continueMenu'){
            var background, mainTitle, continueButtonBack, continueText, continueButtonFront, restartButtonBack, restartText,
            restartButtonFront, quitButtonBack, quitText, quitButtonFront;
            background = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
            mainTitle = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
            continueButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
            continueText = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Continue','Calibri');
            continueButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
            restartButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
            restartText = new Components('text',(this.width / 2),(this.height / 2 + 40),theCanvas.fontButton,'rgb(120, 205, 245)','Restart','Calibri');
            restartButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
            quitButtonBack = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(10, 78, 204,0.5)');
            quitText = new Components('text',(this.width / 2),(this.height / 2 + 80),theCanvas.fontButton,'rgb(120, 205, 245)','Quit','Calibri');
            quitButtonFront = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(0,0,0,0)');
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
            if(theCanvas.x && theCanvas.y){
                if(continueButtonFront.screenButtons()){
                    menuType = 'continueGameEnviroment';
                    actualMenu = menuType;
                }
                if(restartButtonFront.screenButtons()){
                    menuType = 'newGameEnviroment';
                    actualMenu = menuType;
                }
                if(quitButtonFront.screenButtons()){
                    this.removeFullScreen();
                }
            }
            this.checkFullScreen();
            this.controlsType();
        }
    },
    gameEnviroment: function(){
        if(menuType == 'newGameEnviroment' || menuType == 'continueGameEnviroment'){
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
            if(menuType == 'newGameEnviroment'){
                character[0] = new Components('mainCharacter',(this.width / 2),(this.height - 35),((this.width / 2) - 25),((this.height - 35) + 25));
                character[1] = new Components('mainCharacter',(canvas.width / 2),(this.height - 35),((this.width / 2) + 25),((this.height - 35) + 25));
                character[2] = new Components('mainCharacter',((this.width / 2) - 25),(this.height - 10),((this.width / 2) + 25),(this.height - 10));
                character.forEach(i =>{
                    i.builder();
                });
                menuType = 'continueGameEnviroment';
                actualMenu = menuType;
            }   
            if(menuType == 'continueGameEnviroment'){
                if(theCanvas.controlType == 'keyboard'){
                    var buttonUp,buttonBottom,buttonLeft,buttonRight,buttonRightUp,buttonLeftUp,buttonRightBottom,buttonLeftBottom;
                    buttonUp = new Components('button',50,(this.height - 90),15,15,'blue','moveUp');
                    buttonUp.builder();
                    buttonBottom = new Components('button',50,(this.height - 25 - 5),15,15,'blue','moveUp');
                    buttonBottom.builder();
                    buttonLeft = new Components('button',20,(this.height - 60),15,15,'blue','moveUp');
                    buttonLeft.builder();
                    buttonRight = new Components('button',80,(this.height - 60),15,15,'blue','moveUp');
                    buttonRight.builder();
                    buttonRightUp = new Components('button',70,(this.height - 80),15,15,'green','moveUp');
                    buttonRightUp.builder();
                    buttonLeftUp = new Components('button',30,(this.height - 80),15,15,'green','moveUp');
                    buttonLeftUp.builder();
                    buttonRightBottom = new Components('button',70,(this.height - 40),15,15,'green','moveUp');
                    buttonRightBottom.builder();
                    buttonLeftBottom = new Components('button',30,(this.height - 40),15,15,'green','moveUp');
                    buttonLeftBottom.builder();
                    if(theCanvas.x && theCanvas.y){
                        if(buttonUp.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = -1;
                                i.moveY2 = -1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonBottom.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = 1;
                                i.moveY2 = 1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonLeft.screenButtons()){
                            character.forEach(i =>{
                                i.moveX1 = -1;
                                i.moveX2 = -1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonRight.screenButtons()){
                            character.forEach(i =>{
                                i.moveX1 = 1;
                                i.moveX2 = 1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonRightUp.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = -1;
                                i.moveY2 = -1;
                                i.moveX1 = 1;
                                i.moveX2 = 1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonLeftUp.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = -1;
                                i.moveY2 = -1;
                                i.moveX1 = -1;
                                i.moveX2 = -1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonRightBottom.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = 1;
                                i.moveY2 = 1;
                                i.moveX1 = 1;
                                i.moveX2 = 1;
                                i.moveCharacter();
                            });
                        }
                        if(buttonLeftBottom.screenButtons()){
                            character.forEach(i =>{
                                i.moveY1 = 1;
                                i.moveY2 = 1;
                                i.moveX1 = -1;
                                i.moveX2 = -1;
                                i.moveCharacter();
                            });
                        }
                    }else{
                        character.forEach(i =>{
                            i.moveY1 = 0;
                            i.moveY2 = 0;
                            i.moveX1 = 0;
                            i.moveX2 = 0;
                        });
                    }
                }
                character.forEach(i =>{
                    i.builder();
                    i.wallColission();
                });
            }
        }
    },
    controlsType: function(){
        canvas.onmousedown = ()=>{
            theCanvas.controlType = 'keyboard';
        }
        // canvas.ontouchstart = ()=>{
            // theCanvas.controlType = 'touchscreen';
        // }
    },
    stages: function(){

    },
    sounds: function(){

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
        this.moveX1 = 0;
        this.moveY1 = 0;
        this.moveX2 = 0;
        this.moveY2 = 0;
    }
    builder(){
        this.ctx = theCanvas.canvasContext;
        if(this.type == 'button' || this.type == 'bullets' || this.type == 'backgroundColor'){
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
        }
        if(this.type == 'text'){
            this.ctx.font = `${this.width}px ${this.font}`;
            this.ctx.fillStyle = this.height;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.color,this.x,this.y);
        }
        if(this.type == 'backgroundImage' || this.type == 'imageButton'){
            this.image.src = this.color;
            this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
        if(this.type == 'mainCharacter'){
            this.ctx.beginPath();
            this.ctx.moveTo(this.x,this.y);
            this.ctx.lineTo(this.width,this.height);
            this.ctx.strokeStyle = 'red';
            this.ctx.stroke();
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
    moveCharacter(){
        this.x += this.moveX1;
        this.y += this.moveY1;
        this.width += this.moveX2;
        this.height += this.moveY2;
    }
    wallColission(){
        if(this.type == 'mainCharacter'){
            if(character[0].width == 0){
                character.forEach(i=>{
                    i.moveX1 = 1;
                    i.moveX2 = 1;
                    i.moveCharacter();
                })
            }
            if(character[0].x == canvas.width || character[1].width == canvas.width){
                character.forEach(i=>{
                    i.moveX1 = -1;
                    i.moveX2 = -1;
                    i.moveCharacter();
                })
            }
            if(character[0].y == 1){
                character.forEach(i=>{
                    i.moveY1 = 1;
                    i.moveY2 = 1;
                    i.moveCharacter();
                })
            }
            if(character[2].y == canvas.height - 1){
                character.forEach(i=>{
                    i.moveY1 = -1;
                    i.moveY2 = -1;
                    i.moveCharacter();
                })
            }
        }
    }
}
//UPDATER:
function refreshCanvas(){
    theCanvas.clearCanvas();
    menus();
}