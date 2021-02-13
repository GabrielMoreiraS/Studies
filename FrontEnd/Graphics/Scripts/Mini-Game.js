(()=>{
    //THE HTML GAME
    //First of all when creating projects you must have in mind everything that	is needed to make what you want, so then, when creating
    //you must specify classes, objects... functions, whatever is necessary to organizedly create your project
    //NOTE: try to understand how things must be constructed, how they must be organized
    var body = document.body;
    var caH = document.querySelector('.canvas-handler')
    var btnUp = document.getElementById("up");
    var btnDown = document.getElementById("down");
    var btnLeft = document.getElementById("left");
    var btnRight = document.getElementById("right");
    var resert = document.getElementById("resert");
    resert.style.backgroundColor = "yellow";
    var start = document.getElementById("start");
    start.style.backgroundColor = "green";
    var theGA,  theGC, theGB, theGO = [], theGCS, theGBS, theGDS, theGS, mU, mL, mD, mR;
    var checkStart, k = 0, s = 0, r = 0, stopS = 0, score = 0, speed = 7, cs = 1, times = 1, i = false, it = false,
    cWidth , cHeight, mih,mah,mig,mag,ev,check = undefined,gcx,gcy,gcpy;

    body.onload = function(){ 
        checkDevice();
        if(checkStart == true && i == false){
            cWidth = 600, cHeight = 500;
            startOnKey();
            startGame();
            setTimeout(function(){
                theGA.stop();  
            },speed);
            i = true;
        }
    }
    window.addEventListener('resize',checkDevice);

    function checkDevice(){
        var width = window.innerWidth;
        if(width > 690){
            checkStart = true;
            mih = 50;
            mah = 200;
            mig = 45;
            mag = 200;
            ev = 370;
            gcx = 45;
            gcy = 45;
            gcpy = 220;
        }
        if(check == undefined && width <= 690){
            cWidth = 310;
            cHeight = 210;
            caH.style.width = cWidth + "px";
            caH.style.height = cHeight + "px";
            var thec = new gameEnviroment;
            thec.canvC.clearRect(0, 0, cWidth, cHeight);
            thec.canvC.font = "16px Arial";
            thec.canvC.fillText("Turn your device sideways to play the game",-1,120);
            check = true;
        }
        if(check == true && width > 300 && width < 690 && it == false){
            cWidth = 380;
            cHeight = 280;
            caH.style.width = cWidth + "px";
            caH.style.height = cHeight + "px";
            mih = 25;
            mah = 140;
            mig = 25;
            mag = 120;
            ev = 370;
            gcx = 25;
            gcy = 25;
            gcpy = 150;
            startOnKey();
            startGame();
            setTimeout(function(){
                theGA.stop();  
            },speed);
            it = true;
        }
    }
    
    var verify = {
        isFocus: function(){
            k = 1; 
            body.removeEventListener("click", verify.notFocus);
            body.style.overflowY = "hidden";
            window.scrollTo(0,document.getElementById("canvG").offsetTop);//the best way to scroll your window
            setTimeout(function(){
                body.addEventListener("click", verify.notFocus);
            },1);       
        },
        notFocus: function(){
            k = 0;
            body.style.overflowY = "visible";
        }
    }

    function startOnKey(){
        var canvasK;
        window.addEventListener("keydown", function(event){
            if(k == 1){
                canvasK = event.which || event.keyCode;
                if(canvasK && canvasK == 69){
                    if(stopS == 0 && start.style.display != "none"){
                        startIt();
                    }      
                }
                if(canvasK && canvasK == 82){
                    if(resert.style.display != "none"){
                        resertIt();
                    }
                    stopS = 0;
                } 
            }
        });  
        window.addEventListener("keyup", function(event){
            canvasK = false;
        })
        window.addEventListener('keydown', function(event){
            if(k == 1){
                theGA.keys = (theGA.keys || []);//it says that it can be a simple container 
                //or an array one, so if it receives more than one information, it will be turned into an array, 
                //if not, just a simple container.
                theGA.keys[event.keyCode] = (event.type == "keydown");//basicaly saying that the event type is equal to
                //"keydown", you could simply say true, instead of (event.type == "keydown").
            }
            
        });
        window.addEventListener("keyup", function(event){
            if(k == 1){
                theGA.keys[event.keyCode] = (event.type == "keydown");//when you set the event type as "keydown" when in 
                //truth it is "keyup", it will be consider as false, so when the key is up it won't move the character, 
                //because the content is false. But if you set it to "keyup" as the event actually is like, then when the
                //key is down and when the key is up, the character will be running and won't stop.
                theGC.speedX = 0;
                theGC.speedY = 0;
            }
        });
    }

    function startIt(){
        if(s == 0){
            theGA.inter = setInterval(refreshGA, speed);
            start.innerHTML = "STOP";
            start.style.backgroundColor = "red";
            theGBS.play();
            s = 1;
        }else if(s == 1){
            clearInterval(theGA.inter);
            start.innerHTML = "START";
            start.style.backgroundColor = "green";
            theGBS.stop();
            s = 0;
            r = 1;
        }
    }

    function resertIt(){ 
        start.style.display = "inline-block";
        start.addEventListener("click", startIt);
        if(s == 1){    
            theGA.stop();
            theGA.refreshCA();
            theGA = {};//you can empty a variable like this, saying that it is a empty object. or you can say that it is a empty string like ""
            theGC = {};
            theGS = {};
            theGO = [];
            score = 0;
            changeF = 0;
            speed = 7;
            times = 1;
            cs = 1;
            theGBS.stop();
            theGCS.stop();
            theGDS.stop();
            setTimeout(function(){
                theGBS.load();
                theGBS.play();
            },1)
            startGame();
        }else if(r == 1){
            theGA.stop();
            theGA.refreshCA();
            theGA = {};
            theGC = {};
            theGO = [];
            score = 0;
            speed = 7;
            changeF = 0;
            times = 1;
            cs = 1;
            startGame();
            theGBS.stop();
            theGCS.stop();
            theGDS.stop();
            setTimeout(function(){
                theGA.stop();
            },speed);
        }
    }

    function startGame(){
        theGA = new gameEnviroment();
        theGA.start();
        theGS = new components(460, 30, 30, "Arial", "white", "text");
        theGC = new components(40, gcpy, gcx, gcy, "Media/Mini-Game/Images/Snake.jpg", "image");
        theGB = new components(0, 0, 600, 500,"Media/Mini-Game/Images/bc.png", "background");
        theGBS = new sound("Media/Mini-Game/Sounds/bgs.mp3", "bg");
        theGCS = new sound("Media/Mini-Game/Sounds/hit.mp3");
        theGDS = new sound("Media/Mini-Game/Sounds/dead.mp3");
        resert.addEventListener("click", resertIt);
        start.addEventListener("click", startIt);
        theGA.canvas.addEventListener("click", verify.isFocus);    
    }

    function gameEnviroment(){
        this.canvas = document.getElementById("canvG");
        this.canvas.width = cWidth;
        this.canvas.height = cHeight;
        this.canvas.style.border = "1px solid #383636 inset";
        this.canvas.style.backgroundColor = " #cfcece";
        this.frameNo = 0;
        this.canvC = this.canvas.getContext("2d");
        this.refreshCA = function(){
            this.canvC.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.refreshGA = function(){
            clearInterval(this.inter);
        }
        this.stop = function(){
            clearInterval(this.inter);
        }
        this.start = function(){
            this.inter = setInterval(refreshGA, speed);//every 1 millisecond it calls the function refreshGA
        }
    }

    function components(x,y,width,height,color,type){
        this.cx = x;
        this.cy = y;
        this.cw = width;
        this.ch = height;
        this.color = color;
        this.type = type;
        this.speedY = 0;
        this.speedX = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.bounce = 0.6;
        if(this.type == "image" || this.type == "background"){
            this.face = new Image();
            this.face.src = this.color;
        }
        this.increase = function(){ 
            if(this.type == "background"){
                this.cx += this.speedX;
                this.cy += this.speedY;
                if(times == 1){
                    this.speedX = -1;
                }else if(times == 1.50){
                    this.speedX = -1;
                }else if(times == 1.80){
                    this.speedX = -2;
                }else if(times == 2){
                    this.speedX = -2;
                }else if(times == 2.80){
                    this.speedX = -2;
                }
                if(this.cx == -(this.cw)){
                    this.cx = 0;
                }
            }else{
                this.gravitySpeed += this.gravity;
                this.cx += this.speedX;
                this.cy += this.speedY + this.gravitySpeed;
            }
        }
        this.objBuilder = function(){
            ctx = theGA.canvC;
            if(this.type == "text"){
                ctx.font = this.cw + "px " + this.ch;
                ctx.fillStyle = this.color;
                ctx.fillText(this.text, this.cx, this.cy);
            }else if(this.type == "image" || this.type == "background"){
                ctx.drawImage(this.face, this.cx, this.cy, this.cw, this.ch);
                if(this.type == "background"){
                    ctx.drawImage(this.face, (this.cx + this.cw), this.cy, this.cw, this.ch);
                }
            }else{
                ctx.fillStyle = this.color;
                ctx.fillRect(this.cx, this.cy, this.cw, this.ch);
            } 
        }
        this.crashed = function(otherobj){
            //first, catch the character's measures:
            var cLeft = this.cx;
            var cRight = (this.cx + this.cw);

            var cTop = this.cy;
            var cBottom = (this.cy + this.ch);

            //now the obstacle measures:
            var objLeft = otherobj.cx;
            var objRight = otherobj.cx + (otherobj.cw);

            var objTop = otherobj.cy;
            var objBottom = otherobj.cy + (otherobj.ch);

            //now the most important part, the verifications
            var crashed = true;
            if((cRight <= objLeft) || (cLeft >= objRight) || (cTop >= objBottom ) || (cBottom <= objTop) ){
                crashed = false;
            }
            return crashed;
        }
        this.collision = function(){
            var cLeft = this.cx;
            var cRight = (this.cx + this.cw);

            var cTop = this.cy;
            var cBottom = (this.cy + this.ch);

            var canvXB = 0;
            var canvXF = theGA.canvas.width;

            var canvYB = 0;
            var canvYF = theGA.canvas.height;

            if(cLeft < canvXB){
                this.cx = 0;
            }
            if(cRight > canvXF){
                this.cx = 570;
            }
            if(cTop < canvYB){
                this.cy = 0;
            }
            if(cBottom > canvYF){
                this.cy = (theGA.canvas.height - theGC.ch);
                this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            }
        }
    }

    function sound(src,type){
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.type = type;
        if(type == "bg"){
            this.play = function(){
                this.sound.play();
                this.sound.loop = true;
            }
        }
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
        this.load = function(){
            this.sound.load();
        }
    }

    //Keyboard controls
    function keyboard(){
        if(k == 1){
            if(theGA.keys && theGA.keys[37] || theGA.keys && theGA.keys[65]){
                theGC.speedX = -times;
            }
            if(theGA.keys && theGA.keys[39] || theGA.keys && theGA.keys[68]){
                theGC.speedX = times;
            }
            if(theGA.keys && theGA.keys[38] || theGA.keys && theGA.keys[87]){
                theGC.speedY = -times;
                theGC.gravitySpeed = 0;
            }
            if(theGA.keys && theGA.keys[40] || theGA.keys && theGA.keys[83]){
                theGC.speedY = times;
            }
        }
    }

    function screenBTN(){
        if(check == true){
            mU = new components(40,179,25,25,'rgba(130, 186, 190,0.8)');
            mD = new components(40,237,25,25,'rgba(130, 186, 190,0.8)');
            mL = new components(10,208,25,25,'rgba(130, 186, 190,0.8)');
            mR = new components(70,208,25,25,'rgba(130, 186, 190,0.8)');
            mR.objBuilder();
            mL.objBuilder();
            mU.objBuilder();
            mD.objBuilder();
        }
    }
    
    //Panel controls
    function buttons(){
        function clearMove(){
            theGC.speedX = 0;
            theGC.speedY = 0;
            theGC.gravity = 0.05;
        }

        function up(){
            theGC.speedY = -times;
            theGC.gravitySpeed = 0;
            theGC.gravity = 0;
        }
        btnUp.addEventListener("touchstart", up);
        btnUp.addEventListener("touchend", clearMove);
        
        function down(){
            theGC.speedY = times;
        }
        btnDown.addEventListener("touchstart", down);
        btnDown.addEventListener("touchend", clearMove);
        
        function right(){
            theGC.speedX = times;
        }
        btnLeft.addEventListener("touchstart", left);
        btnLeft.addEventListener("touchend", clearMove);
    
        function left(){
            theGC.speedX = -times;
        }
        btnRight.addEventListener("touchstart", right);
        btnRight.addEventListener("touchend", clearMove);
    }

    //create a frame counter that returns true everytime the result is 0
    function everyinterval(n){
        if((theGA.frameNo / n) % 1 == 0){//this is math, and also programming logic, in this case when the result of "theGA.frameNo / n" is 1,
        //that is, if "theGA.frameNo" has the same quantity as the "n" so 1 is the result. And if it is 1 the rest of it will always be 0
        //then the answer will be true
            score++;
            return true;
        }
        return false;
    }
    //the obstacles constructor
    var obstacles = {
        //collision detector
        cR: function(){
            for(i = 0; i < theGO.length; i++){
                if(theGC.crashed(theGO[i])){  
                    theGA.stop();
                    start.style.display = "none";
                    stopS = 1;
                    theGBS.stop();
                    theGCS.play();
                    resert.style.display = "none";
                    setTimeout(function(){      
                        resert.style.display = "inline-block";
                        theGDS.play();
                    },1800);
                    return;
                }
            }
        },  
        //obstacles constructor
        cO: function(){
            var x, height, gap, minHeight, maxHeight, minGap, maxGap;
            theGA.frameNo += cs;
            if(theGA.frameNo == 1 || everyinterval(ev)){
                x = theGA.canvas.width;
                minHeight = mih;
                maxHeight = mah;
                height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);//it will return some random number
                minGap = mig;
                maxGap = mag;
                gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
                theGO.push(new components(x, 0, 35, height, "blue"));//this one always draw a obstacle at the 0 point of the Y axis
                theGO.push(new components(x, height + gap + 30, 35, 500, "green"));
            }
        },
        //the body constructor
        bO: function(){
            for(i = 0; i < theGO.length; i++){
                theGO[i].cx += -1;
                theGO[i].objBuilder();
            }
        },
        mS: function(){
            this.bO();
            this.cO();
        }
    }

    function dificulty(){
        for(i = 0; i < theGO.length; i++){
            if(score >= 5 && score <= 10){
                times = 1;
                theGO[i].cx += -times;
                cs = 2.50;
            }else if(score >= 10 && score <= 20){
                times = 1.50;
                theGO[i].cx += -times;
                cs = 2.50;
            }else if(score >= 20 && score <= 30){
                times = 1.80;
                theGO[i].cx += -times;
                cs = 2.50;
            }else if(score >= 30 && score <= 40){
                times = 2;
                theGO[i].cx += -times;
                cs = 2.50;
            }else if(score >= 40){
                times = 2.80;
                theGO[i].cx += -times;
                cs = 2.50;
            }else{
                times = 1;
            }
            theGO[i].objBuilder();
        }
    }
    
    //The frame updater *calls everything inside at each one millisecond
    function refreshGA(){
        obstacles.cR();
        theGA.refreshCA();//this here cleans the canvas environment so that you can't see the character's trail
        theGB.objBuilder();
        theGB.increase();
        obstacles.mS();
        theGC.objBuilder();//this here constructs the character's body
        screenBTN();
        theGC.collision();
        theGC.increase();//this here increases the character position properties
        keyboard();
        buttons();
        dificulty();
        theGS.text = "Score: " + score;
        theGS.objBuilder();
    }
})();