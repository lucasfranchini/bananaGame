(()=>{"use strict";class e extends class{constructor(e,t,s,i,h,n){this.context=e,this.x=t,this.y=s,this._speedX=0,this._speedY=0,this.img=new Image(h,n),this.img.src=i}draw(){const e=this.img.width,t=this.img.height;this.context.drawImage(this.img,this.x-e,this.y-t,e,t)}move(){this.x+=this._speedX,this.y+=this._speedY}set SpeedX(e){this._speedX=e}}{constructor(e,t,s,i){super(e,t,s,"/assets/alien.png",64,97),this._maxLife=i,this._actualLife=i}startMove(e){"ArrowRight"===e.key?this.SpeedX=5:"ArrowLeft"===e.key&&(this.SpeedX=-5)}endMove(e){"ArrowRight"!==e.key&&"ArrowLeft"!==e.key||(this.SpeedX=0)}}const t=window.innerWidth,s=window.innerHeight,i=document.querySelector("#canvas"),h=new class{constructor(e,t,s){this._canvas=s,this._canvas.width=e,this._canvas.height=t,this._context=s.getContext("2d")}start(){this._player=new e(this._context,this._canvas.width/2,this._canvas.height-25,4),this.updateScore(0),clearInterval(this._gameIntervalId),this._gameIntervalId=window.setInterval((()=>this.loop()),1e3/60)}updateScore(e){const t=document.querySelector(".score");e-this._score>0&&(t.classList.add("highlight"),setTimeout((()=>t.classList.remove("highlight")),100)),this._score=e,t.innerText="Score: "+this._score.toFixed(1)}loop(){this._player.move(),this.renderGame()}renderGame(){this.clearScreen(),this._player.draw()}clearScreen(){this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}onKeyDown(e){this._player.startMove(e)}onKeyUp(e){this._player.endMove(e)}}(t,s,i);h.start(),window.addEventListener("keydown",(e=>{h.onKeyDown(e)})),window.addEventListener("keyup",(e=>{h.onKeyUp(e)}))})();