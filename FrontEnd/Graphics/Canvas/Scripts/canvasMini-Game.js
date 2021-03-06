//ELEMENTS:
const body = document.body;
const canvas = document.querySelector('[data-canvas-mini-game]');
const canvasWarnings = document.querySelector('#chw0');
const canvasHandler = document.querySelector('#ch0');
//GENERAL VARIABLES:
var winWidth, winHeight, canvasW, canvasH, menus, menuType, actualMenu, actualHeight, controlType;
//CHARACTERS VARIABLES:
var character;
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
            if(menuType != 'startMenu' && menuType != 'newGameEnviroment' ||
            menuType != 'startMenu' && menuType != 'continueGameEnviroment'){
                setTimeout(()=>{
                    canvas.requestFullscreen();
                    setTimeout(()=>{
                        theCanvas.fullScreenCanvas();
                    },100);
                },500);
            }
            if(menuType != 'startMenu' && menuType == 'newGameEnviroment' ||
            menuType != 'startMenu' && menuType == 'continueGameEnviroment'){
                setTimeout(()=>{
                    canvas.requestFullscreen();
                    setTimeout(()=>{
                        theCanvas.fullScreenCanvas();
                        setTimeout(()=>{
                            menuType = 'continueMenu';
                            actualMenu = menuType;
                        },100);
                    },100);
                },500);
            }
        }
        if(winWidth > 850){
            canvasW = 700;
            canvasH = 500;
            fonts(70,14);
            theCanvas.createCanvas(canvasW,canvasH);
        }else if(winWidth >= 600 && winWidth < 850){
            canvasW = (canvasHandler.clientWidth - 60);
            canvasH = (canvasW - 160);
            fonts(60,13);
            theCanvas.createCanvas(canvasW,canvasH);
        }else if(winWidth >= 300 && winWidth < 600){
            canvasW = (canvasHandler.clientWidth - 60);
            canvasH = (canvasW - 100);
            fonts(60,12);
            theCanvas.createCanvas(canvasW,canvasH);
        }else if(winWidth >= 600 && winWidth < 300){
            warningCanvasHandler();
        }
        menus = function(){
            if(winWidth >= 600){
                theCanvas.screenActionsDetector();
                if(menuType == 'startMenu'){
                    theCanvas.startMenu();
                    theCanvas.enableTextSelection();
                }
                if(menuType == 'mainMenu'){
                    theCanvas.mainMenu();
                    theCanvas.enableTextSelection();
                }
                if(menuType == 'continueMenu'){
                    theCanvas.continueMenu();
                    theCanvas.enableTextSelection();
                }
                if(menuType == 'newGameEnviroment' ||
                menuType == 'continueGameEnviroment'){
                    theCanvas.gameEnviroment();
                    theCanvas.disableTextSelection();
                }
            }else{
                fonts(14,0);
                theCanvas.warningMenu();
                theCanvas.enableTextSelection();
                theCanvas.stop();
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
    background: [],
    mainTitle: [],
    button: [],
    buttonBack: [],
    buttonText: [],
    buttonFront: [],
    imageButton: [],
    start: function(){
        this.canvasContext = canvas.getContext('2d');
        this.interval = setInterval(refreshCanvas,1);
        this.materials();
    },
    stop: function(){
        clearInterval(this.interval);
    },
    clearCanvas: function(){
        this.canvasContext.clearRect(0,0,this.width,this.height);
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
        this.stop();
        this.start();
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
    materials: function(){
        //warningMenu:
        this.background[0] = new Components('backgroundColor',0,0,this.width,this.height,'black');
        this.mainTitle[0] = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'white','Turn your device sideways, please.','Arial');
        //startMenu:
        this.background[1] = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
        this.mainTitle[1] = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Start The Game','Calibri');
        this.buttonBack[1] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[1] = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Next','Calibri');
        this.buttonFront[1] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)','buttonFront');
        //mainMenu:
        this.background[2] = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
        this.mainTitle[2] = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
        this.buttonBack[2] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[2] = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Start','Calibri');
        this.buttonFront[2] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
        this.buttonBack[3] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[3] = new Components('text',(this.width / 2),(this.height / 2 + 40),theCanvas.fontButton,'rgb(120, 205, 245)','Quit','Calibri');
        this.buttonFront[3] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
        //continueMenu:
        this.background[3] = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/startMenu.jpg');
        this.mainTitle[3] = new Components('text',(this.width / 2),50,theCanvas.fontTitle,'rgb(120, 205, 245)','Main Menu','Calibri');
        this.buttonBack[4] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[4] = new Components('text',(this.width / 2),(this.height / 2),theCanvas.fontButton,'rgb(120, 205, 245)','Continue','Calibri');
        this.buttonFront[4] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 - 20),60,30,'rgba(0,0,0,0)');
        this.buttonBack[5] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[5] = new Components('text',(this.width / 2),(this.height / 2 + 40),theCanvas.fontButton,'rgb(120, 205, 245)','Restart','Calibri');
        this.buttonFront[5] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 20),60,30,'rgba(0,0,0,0)');
        this.buttonBack[6] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(10, 78, 204,0.5)');
        this.buttonText[6] = new Components('text',(this.width / 2),(this.height / 2 + 80),theCanvas.fontButton,'rgb(120, 205, 245)','Quit','Calibri');
        this.buttonFront[6] = new Components('button',(this.width / 2 - (60 / 2)),(this.height / 2 + 60),60,30,'rgba(0,0,0,0)');
        //gameEnviroment - background:
        this.background[4] = new Components('backgroundImage',0,0,this.width,this.height,'Media/Mini-Game/Images/gameEnviroment.jpg');
        this.imageButton[0] = new Components('imageButton',2,2,30,30,'Media/Mini-Game/Images/mainMenu.png');
        //gameEnviroment - controls buttons:
        this.button[0] = new Components('button',50,(this.height - 90),30,30,'blue','moveUp');
        this.button[1] = new Components('button',50,(this.height - 25 - 5),30,30,'blue','moveUp');
        this.button[2] = new Components('button',20,(this.height - 60),30,30,'blue','moveUp');
        this.button[3] = new Components('button',80,(this.height - 60),30,30,'blue','moveUp');
        this.button[4] = new Components('button',85,(this.height - 85),20,20,'green','moveUp');
        this.button[5] = new Components('button',25,(this.height - 85),20,20,'green','moveUp');
        this.button[6] = new Components('button',85,(this.height - 25),20,20,'green','moveUp');
        this.button[7] = new Components('button',25,(this.height - 25),20,20,'green','moveUp');
    },
    screenActionsDetector: function(){
        canvas.ontouchstart = (e)=>{
            theCanvas.x = e.touches[0].pageX;
            theCanvas.y = e.touches[0].pageY;
            controlType = 'touchscreen';
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
        this.background[0].builder();
        this.mainTitle[0].builder();
    },
    startMenu: function(){
        if(menuType == 'startMenu'){
            this.background[1].builder();
            this.mainTitle[1].builder();
            this.buttonBack[1].builder();
            this.buttonText[1].builder();
            this.buttonFront[1].builder();
            if(theCanvas.x && theCanvas.y){
                if(this.buttonFront[1].screenButtons()){
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
            this.background[2].builder();
            this.mainTitle[2].builder();
            this.buttonBack[2].builder();
            this.buttonText[2].builder();
            this.buttonFront[2].builder();
            this.buttonBack[3].builder();
            this.buttonText[3].builder();
            this.buttonFront[3].builder();
            if(theCanvas.x && theCanvas.y){
                if(this.buttonFront[2].screenButtons()){
                    menuType = 'newGameEnviroment';
                    actualMenu = menuType;
                }
                if(this.buttonFront[3].screenButtons()){
                    this.removeFullScreen();
                }
            }
            this.checkFullScreen();
        }
    },
    continueMenu: function(){
        if(menuType == 'continueMenu'){
            this.background[3].builder();
            this.mainTitle[3].builder();
            this.buttonBack[4].builder();
            this.buttonText[4].builder();
            this.buttonFront[4].builder();
            this.buttonBack[5].builder();
            this.buttonText[5].builder();
            this.buttonFront[5].builder();
            this.buttonBack[6].builder();
            this.buttonText[6].builder();
            this.buttonFront[6].builder();
            if(theCanvas.x && theCanvas.y){
                if(this.buttonFront[4].screenButtons()){
                    menuType = 'continueGameEnviroment';
                    actualMenu = menuType;
                }
                if(this.buttonFront[5].screenButtons()){
                    menuType = 'newGameEnviroment';
                    actualMenu = menuType;
                }
                if(this.buttonFront[6].screenButtons()){
                    this.removeFullScreen();
                }
            }
            this.checkFullScreen();
        }
    },
    gameEnviroment: function(){
        if(menuType == 'newGameEnviroment' || menuType == 'continueGameEnviroment'){
            this.background[4].builder();
            this.imageButton[0].builder();
            if(theCanvas.x && theCanvas.y){
                if(this.imageButton[0].screenButtons()){
                    menuType = 'continueMenu';
                    actualMenu = menuType;
                }
            }
            if(menuType == 'newGameEnviroment'){
                character = new Components('mainCharacter',(this.width / 2),(this.height - 35),((this.width / 2) - 25),(this.height - 10),
                'red',null,(canvas.width / 2 + 25),(this.height - 10));
                character.builder();
                menuType = 'continueGameEnviroment';
                actualMenu = menuType;
            }   
            if(menuType == 'continueGameEnviroment'){
                if(controlType == 'touchscreen'){
                    this.button[0].builder();//Top
                    this.button[1].builder();//Bottom
                    this.button[2].builder();//Left
                    this.button[3].builder();//Right
                    this.button[4].builder();//RightUp
                    this.button[5].builder();//LeftUp
                    this.button[6].builder();//RightBottom
                    this.button[7].builder();//LeftBottom
                }
                this.controls();
                character.builder();
                character.wallColission();
            }
        }
    },
    controls: function(){
        if(controlType == 'touchscreen'){
            if(theCanvas.x && theCanvas.y){
                if(this.button[0].screenButtons()){
                    character.moveY1 = -1; character.moveY2 = -1; character.moveY3 = -1;
                    character.moveCharacter();
                }
                if(this.button[1].screenButtons()){
                    character.moveY1 = 1; character.moveY2 = 1; character.moveY3 = 1;
                    character.moveCharacter();
                }
                if(this.button[2].screenButtons()){
                    character.moveX1 = -1; character.moveX2 = -1; character.moveX3 = -1;
                    character.moveCharacter();
                }
                if(this.button[3].screenButtons()){
                    character.moveX1 = 1; character.moveX2 = 1; character.moveX3 = 1;
                    character.moveCharacter();
                }
                if(this.button[4].screenButtons()){
                    character.moveY1 = -1; character.moveY2 = -1; character.moveY3 = -1;
                    character.moveX1 = 1; character.moveX2 = 1; character.moveX3 = 1;
                    character.moveCharacter();
                }
                if(this.button[5].screenButtons()){
                    character.moveY1 = -1; character.moveY2 = -1; character.moveY3 = -1;
                    character.moveX1 = -1; character.moveX2 = -1; character.moveX3 = -1;
                    character.moveCharacter();
                }
                if(this.button[6].screenButtons()){
                    character.moveY1 = 1; character.moveY2 = 1; character.moveY3 = 1;
                    character.moveX1 = 1; character.moveX2 = 1; character.moveX3 = 1;
                    character.moveCharacter();
                }
                if(this.button[7].screenButtons()){
                    character.moveY1 = 1; character.moveY2 = 1; character.moveY3 = 1;
                    character.moveX1 = -1; character.moveX2 = -1; character.moveX3 = -1;
                    character.moveCharacter();
                }
            }else{
                character.moveY1 = 0; character.moveY2 = 0; character.moveY3 = 0;
                character.moveX1 = 0; character.moveX2 = 0; character.moveX3 = 0;
            }
        }else if(controlType == undefined){
            window.addEventListener('keydown', ek=>{
                theCanvas.key = (theCanvas.key || []);
                theCanvas.key[ek.keyCode] = (ek.type == 'keydown');
            })
            window.addEventListener('keyup', ek=>{
                theCanvas.key[ek.keyCode] = (ek.type == 'keydown');
                character.moveY1 = 0; character.moveY2 = 0; character.moveY3 = 0;
                character.moveX1 = 0; character.moveX2 = 0; character.moveX3 = 0;
            })
            if(theCanvas.key && theCanvas.key[37] || theCanvas.key && theCanvas.key[65]){
                character.moveX1 = -1; character.moveX2 = -1; character.moveX3 = -1;
                character.moveCharacter();
            }
            if(theCanvas.key && theCanvas.key[39] || theCanvas.key && theCanvas.key[68]){
                character.moveX1 = 1; character.moveX2 = 1; character.moveX3 = 1;
                character.moveCharacter();
            }
            if(theCanvas.key && theCanvas.key[38] || theCanvas.key && theCanvas.key[87]){
                character.moveY1 = -1; character.moveY2 = -1; character.moveY3 = -1;
                character.moveCharacter();
            }
            if(theCanvas.key && theCanvas.key[40] || theCanvas.key && theCanvas.key[83]){
                character.moveY1 = 1; character.moveY2 = 1; character.moveY3 = 1;
                character.moveCharacter();
            }
        }
    },
    disableTextSelection: function(){
        canvas.style.userSelect = 'none';
    },
    enableTextSelection: function(){
        canvas.style.userSelect = 'auto';
    }
}
//COMPONENTS CONSTRUCTOR:
class Components{
    constructor(type,x,y,width,height,color,fonts,width2,height2){
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = new Image();
        this.font = fonts;
        this.width2 = width2;
        this.height2 = height2;
        this.moveX1 = 0;
        this.moveY1 = 0;
        this.moveX2 = 0;
        this.moveY2 = 0;
        this.moveX3 = 0;
        this.moveY3 = 0;
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
            this.ctx.lineTo(this.width2,this.height2);
            this.ctx.closePath();
            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
            this.ctx.stroke();
            this.ctx.fill();
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
        this.width2 += this.moveX3;
        this.height2 += this.moveY3;
    }
    wallColission(){
        if(this.type == 'mainCharacter'){
            if(character.width == 0){
                character.moveX1 = 1;
                character.moveX2 = 1;
                character.moveX3 = 1;
                character.moveCharacter();
            }
            if(character.width == canvas.width){
                character.moveX1 = -1;
                character.moveX2 = -1;
                character.moveX3 = -1;
                character.moveCharacter();
            }
            if(character.y == 0){
                character.moveY1 = 1;
                character.moveY2 = 1;
                character.moveY3 = 1;
                character.moveCharacter();
            }
            if(character.height2 == canvas.height){
                character.moveY1 = -1;
                character.moveY2 = -1;
                character.moveY3 = -1;
                character.moveCharacter();
            }
        }
    }
}
//UPDATER:
function refreshCanvas(){
    theCanvas.clearCanvas();
    menus();
}