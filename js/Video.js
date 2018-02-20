
function Video(data) {
  this.source=data.source;
  this.name=data.name;
  this.id=data.id;
}

Video.prototype.render=function() {
  let string=`
  <video>
    <source src="${this.source}.mp4" type="video/mp4"/>
    <source src="${this.source}.ogg" type="video/ogg"/>
    <source src="${this.source}.webm" type="video/webm"/>
    Tu navegador no soporta el formato Especificado
  </video>`;
  return string;
}

Video.prototype.getCurrentTime=function() {
  return $('video','.display','section','#container')[0].currentTime;
}

Video.prototype.getDuration=function() {
  return $('video','.display','section','#container')[0].duration;
}

Video.prototype.addSeconds=function(seconds){
  const video=$('video','.display','section','#container')[0];
  video.currentTime+=seconds;
}

Video.prototype.subSeconds=function(seconds){
  const video=$('video','.display','section','#container')[0];
  video.currentTime-=seconds;
}


Video.prototype.play = function() {
  $('video','.display','section','#container')[0].play();
}

Video.prototype.pause = function() {
  $('video','.display','section','#container')[0].pause();
}

Video.prototype.volUp = function() {
  const video=$('video','.display','section','#container')[0];
  if(1>=(video.volume+0.1)){
    video.volume+=0.1;
  }
}

Video.prototype.volDown = function() {
  const video=$('video','.display','section','#container')[0];
  if(0<=(video.volume-0.1)){
    video.volume-=0.1;
  }
}

Video.prototype.endEvent=function(event){
  const video=$('video','.display','section','#container')[0];
  video.addEventListener('ended',event);
}

Video.prototype.stopEvent=function(event){
  const video=$('video','.display','section','#container')[0];
  video.addEventListener('pause',event);
}