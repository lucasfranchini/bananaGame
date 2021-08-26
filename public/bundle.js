(()=>{"use strict";class t{constructor(t,e,s,i,a,h,n){this.context=e,this._x=s,this._y=i,this._speedX=0,this._speedY=0,this._img=new Image(h,n),this._img.src=a,this._canvas=t}draw(){const t=this._img.width,e=this._img.height;this.context.drawImage(this._img,this._x-t,this._y-e,t,e)}move(){this._x+=this._speedX,this._y+=this._speedY}}class e extends t{constructor(t,e){super(t,e,0,0,"/assets/orange.png",65,67),this.isBanana=!1,this.chooseRandomFruit(),this._x=this.generateRandomXPosition()}chooseRandomFruit(){const t=Math.random();t<.3?this.generateFruit("/assets/orange.png",65,!1,5,5):t<.6?this.generateFruit("/assets/red-apple.png",65,!1,10,10):t<.8?this.generateFruit("/assets/watermelon.png",82,!1,10,20):t<.95?this.generateFruit("/assets/strawberry.png",65,!1,10,30):this.generateFruit("/assets/banana.png",61,!0,10,1)}generateFruit(t,e,s,i,a){this._img.src=t,this._img.width=e,this.isBanana=s,this._speedY=i,this.points=a}generateRandomXPosition(){const t=Math.floor(Math.random()*this._canvas.width)-this._img.width;return console.log(t),t}updateState(t){this.move(),this.isOutOfScreen()&&t.deleteDropable(this)}isOutOfScreen(){return this._y>this._canvas.height}}class s extends t{constructor(t,e,s,i,a){super(t,e,s,i,"/assets/alien.png",64,97),this._maxLife=a,this._actualLife=a}updateState(){this.move(),this.stopOnEdge()}startMove(t){"ArrowRight"===t.key?this._speedX=5:"ArrowLeft"===t.key&&(this._speedX=-5)}endMove(t){"ArrowRight"===t.key&&5===this._speedX&&(this._speedX=0),"ArrowLeft"===t.key&&-5===this._speedX&&(this._speedX=0)}stopOnEdge(){this._x-this._img.width<0&&(this._x=0+this._img.width),this._x>this._canvas.width&&(this._x=this._canvas.width)}}const i=window.innerWidth,a=window.innerHeight,h=document.querySelector("#canvas"),n=new class{constructor(t,e,s){this._canvas=s,this._canvas.width=t,this._canvas.height=e,this._context=s.getContext("2d")}start(){this._player=new s(this._canvas,this._context,this._canvas.width/2,this._canvas.height-25,4),this._dropables=[],this.updateScore(0),clearInterval(this._gameIntervalId),clearInterval(this._dropableIntervalId),this._gameIntervalId=window.setInterval((()=>this.loop()),1e3/60),this._dropableIntervalId=window.setInterval((()=>this.spawnFruit()),1e3)}updateScore(t){const e=document.querySelector(".score");t-this._score>0&&(e.classList.add("highlight"),setTimeout((()=>e.classList.remove("highlight")),100)),this._score=t,e.innerText="Score: "+this._score.toFixed(1)}spawnFruit(){console.log(this._dropables),this._dropables.push(new e(this._canvas,this._context))}loop(){this._player.updateState(),this._dropables.forEach((t=>t.updateState(this))),this.renderGame()}renderGame(){this.clearScreen(),this._player.draw(),this._dropables.forEach((t=>t.draw()))}deleteDropable(t){this._dropables=this._dropables.filter((e=>e!==t))}clearScreen(){this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}onKeyDown(t){this._player.startMove(t)}onKeyUp(t){this._player.endMove(t)}}(i,a,h);n.start(),window.addEventListener("keyup",(t=>{n.onKeyUp(t)})),window.addEventListener("keydown",(t=>{n.onKeyDown(t)}))})();