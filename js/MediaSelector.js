var lastIndex=0;

function MediaSelector(){
    this.selector=$('aside','#container');
    this.mediaList=[];

    this.current=undefined;
    this.currentTimer=undefined;

    this.stopVideoEvent=undefined;

    this.initialize();
}

MediaSelector.prototype.getData=function(){
    return DATA;
}

MediaSelector.prototype.loadList=function(){
    const data = this.getData();
    data.forEach(
        (media)=>{
            if(media.type==='video') {
                const video = new Video(media);
                this.mediaList.push(video);
            }
            if(media.type==='audio') {
                const audio = new Audio(media);
                this.mediaList.push(audio);
            }
        }
    )
}

MediaSelector.prototype.updateTimer=function(){
    const current = parseInt(this.current.getCurrentTime());
    const duration = parseInt(this.current.getDuration());
    this.currentTimer.text(`${current}/${duration}`);
}

MediaSelector.prototype.renderMedia=function(media){
    const render=`
    <div class="media" id="${media.id}">
        <h4>${media.name}</h4>
        <span></span>
        <img src="svg/current.svg"/>
    </div>
    `;
    lastIndex++;
    return render;
}

MediaSelector.prototype.renderList=function(){
    this.mediaList.forEach(
        (media)=>{
            $('.list','#container')
                .append(this.renderMedia(media));
        }
    );
}

MediaSelector.prototype.addSelectorEvents = function(){
    $('.media','.list','#container').click(
        (event)=>{
            let target = event.target;
            if(event.target.tagName!=='DIV')
                target=$(event.target).parent()[0];
            const selectedIndex=parseInt(target.id);
            this.select(this.mediaList[selectedIndex]);
        }
    );
}

MediaSelector.prototype.initialize=function(){
    this.loadList();
    this.renderList();
    this.addSelectorEvents();
    if (this.mediaList.length>0) {
        this.select(this.mediaList[0]);
    }
    setInterval(this.updateTimer.bind(this),1000);
}

MediaSelector.prototype.deselect=function(){
    if(this.current){
        const container=$('.display','#container');
        container
            .children()
                .remove();
        this.current=undefined;
    }
    
    if(this.currentTimer){
        this.currentTimer.text('');
    }
    
}

MediaSelector.prototype.select=function(media){
    this.deselect();

    this.current=media;

    const container=$('.display','#container');
    const mediaElem=media.render();
    
    container.append(media.render());

    if(this.selectEvent){
        this.selectEvent();
    }

    //Add end event
    this.current.endEvent(this.endEvent.bind(this));

    //Add end event
    this.current.stopEvent(this.stopEvent.bind(this));

    $('.media','#container').removeClass('playing');
    const currentListElement=$(`#${this.indexOf(this.current)}`);
    this.currentTimer=currentListElement.find('span');

    currentListElement.addClass('playing');
}

MediaSelector.prototype.indexOf=function(media){
    return this.mediaList.findIndex(
        (element)=>element.id===media.id
    );
}

MediaSelector.prototype.compareMedia=function(media1,media2) {
    return media1.id===media2.id;
}

MediaSelector.prototype.nextVideo=function(){
    const currentIndex=this.indexOf(this.current);
    const lastIndex=this.indexOf(this.mediaList[this.mediaList.length-1]);

    if(currentIndex!==lastIndex){
        const nextMedia=this.mediaList[currentIndex+1]
        this.select(nextMedia);
        this.current.play();
    }
}

MediaSelector.prototype.getCurrentMedia=function(){
    return this.current;
}

//Events
MediaSelector.prototype.endEvent=function(){
    this.nextVideo();
}

MediaSelector.prototype.stopEvent=function(){
    if(this.stopVideoEvent){
        this.stopVideoEvent(this.current);
    }
}

//Event Subscribers
MediaSelector.prototype.onStop=function(event){
    return this.stopVideoEvent=event;
}

var mediaSelector;
$(function(){
    mediaSelector=new MediaSelector();
})