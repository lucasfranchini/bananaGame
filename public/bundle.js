(()=>{"use strict";class t{constructor(t,e,s,i,h,a,n){this.context=e,this._x=s,this._y=i,this._speedX=0,this._speedY=0,this._img=new Image(a,n),this._img.src=h,this._canvas=t}draw(){const t=this._img.width,e=this._img.height;this.context.drawImage(this._img,this._x,this._y,t,e)}move(){this._x+=this._speedX,this._y+=this._speedY}get y(){return this._y}get x(){return this._x}get img(){return this._img}}class e extends t{constructor(t,e){super(t,e,0,0,"/assets/orange.png",65,67),this._isBanana=!1,this.chooseRandomFruit(),this._x=this.generateRandomXPosition()}chooseRandomFruit(){const t=Math.random();t<.3?this.generateFruit("/assets/orange.png",65,!1,5,5):t<.6?this.generateFruit("/assets/red-apple.png",65,!1,8,10):t<.8?this.generateFruit("/assets/watermelon.png",82,!1,11,20):t<.95?this.generateFruit("/assets/strawberry.png",65,!1,14,30):this.generateFruit("/assets/banana.png",61,!0,15,1)}generateFruit(t,e,s,i,h){this._img.src=t,this._img.width=e,this._isBanana=s,this._speedY=i,this._points=h}generateRandomXPosition(){return Math.floor(Math.random()*(this._canvas.width-this._img.width))}updateState(t){this.move(),this.isOutOfScreen()&&t.deleteDropable(this),t.player.checkCollision(this)&&(this._isBanana?t.updateScore(2*t.score):t.updateScore(t.score+this._points),t.deleteDropable(this))}isOutOfScreen(){return this._y>this._canvas.height}}class s extends t{constructor(t,e,s,i,h){super(t,e,s,i,"/assets/alien.png",64,97),this._maxLife=h,this._actualLife=h,this._x-=64,this._y-=97}updateState(){this.move(),this.stopOnEdge()}startMove(t){"ArrowRight"===t.key?this._speedX=15:"ArrowLeft"===t.key&&(this._speedX=-15)}endMove(t){"ArrowRight"===t.key&&this._speedX>0&&(this._speedX=0),"ArrowLeft"===t.key&&this._speedX<0&&(this._speedX=0)}stopOnEdge(){this._x<0&&(this._x=0),this._x+this._img.width>this._canvas.width&&(this._x=this._canvas.width-this._img.width)}checkCollision(t){const e={y:[this._y,this._y+this._img.height],x:[this._x,this._x+this._img.width]},s={y:[t.y,t.y+t.img.height],x:[t.x,t.x+t.img.width]};return this.collisionOnLeft(e,s)||this.collisionOnRight(e,s)||this.collisionOnCenter(e,s)}collisionOnRight(t,e){return e.x[0]>t.x[0]&&e.x[0]<t.x[1]&&e.y[1]>t.y[0]}collisionOnLeft(t,e){return e.x[1]>t.x[0]&&e.x[1]<t.x[1]&&e.y[1]>t.y[0]}collisionOnCenter(t,e){return e.x[0]<t.x[0]&&e.x[1]>t.x[1]&&e.y[1]>t.y[0]}}const i=window.innerWidth,h=window.innerHeight,a=document.querySelector("#canvas"),n=new class{constructor(t,e,s){this._canvas=s,this._canvas.width=t,this._canvas.height=e,this._context=s.getContext("2d")}start(){this._player=new s(this._canvas,this._context,this._canvas.width/2,this._canvas.height-25,4),this._dropables=[],this.updateScore(0),clearInterval(this._gameIntervalId),clearInterval(this._dropableIntervalId),this._gameIntervalId=window.setInterval((()=>this.loop()),1e3/60),this._dropableIntervalId=window.setInterval((()=>this.spawnFruit()),1e3)}updateScore(t){const e=document.querySelector(".score");t-this.score>0&&(e.classList.add("highlight"),setTimeout((()=>e.classList.remove("highlight")),100)),this.score=t,e.innerText="Score: "+this.score}spawnFruit(){this._dropables.push(new e(this._canvas,this._context))}loop(){this._player.updateState(),this._dropables.forEach((t=>t.updateState(this))),this.renderGame()}renderGame(){this.clearScreen(),this._player.draw(),this._dropables.forEach((t=>t.draw()))}deleteDropable(t){this._dropables=this._dropables.filter((e=>e!==t))}clearScreen(){this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}onKeyDown(t){this._player.startMove(t)}onKeyUp(t){this._player.endMove(t)}get player(){return this._player}}(i,h,a);n.start(),window.addEventListener("keyup",(t=>{n.onKeyUp(t)})),window.addEventListener("keydown",(t=>{n.onKeyDown(t)}))})();