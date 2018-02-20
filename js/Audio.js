
function Audio(data) {
  this.source=data.source;
  this.name=data.name;
  this.id=data.id;
  this.img=data.img;
}

Audio.prototype.render=function() {
  let string=`
  <img src="${this.img}" alt="Imagen del Álbum"/>
  <audio>
    <source src="${this.source}.mp3" type="audio/mp3"/>
    Tu navegador no soporta el formato Especificado
  </audio>`;
  return string;
}

Audio.prototype.getCurrentTime=function() {
  return $('audio','.display','section','#container')[0].currentTime;
}

Audio.prototype.getDuration=function() {
  return $('audio','.display','section','#container')[0].duration;
}

Audio.prototype.addSeconds=function(seconds){
  const audio=$('audio','.display','section','#container')[0];
  audio.currentTime+=seconds;
}

Audio.prototype.subSeconds=function(seconds){
  const audio=$('audio','.display','section','#container')[0];
  audio.currentTime-=seconds;
}


Audio.prototype.play = function() {
  $('audio','.display','section','#container')[0].play();
}

Audio.prototype.pause = function() {
  $('audio','.display','section','#container')[0].pause();
}

Audio.prototype.volUp = function() {
  const audio=$('audio','.display','section','#container')[0];
  if(1>=(audio.volume+0.1)){
    audio.volume+=0.1;
  }
}

Audio.prototype.volDown = function() {
  const audio=$('audio','.display','section','#container')[0];
  if(0<=(audio.volume-0.1)){
    audio.volume-=0.1;
  }
}

Audio.prototype.endEvent=function(event){
  const audio=$('audio','.display','section','#container')[0];
  audio.addEventListener('ended',event);
}

Audio.prototype.stopEvent=function(event){
  const audio=$('audio','.display','section','#container')[0];
  audio.addEventListener('pause',event);
}