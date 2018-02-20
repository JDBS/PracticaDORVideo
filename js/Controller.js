$(function(){
    rewindButton();
    playButton();
    pauseButton();
    advanceButton();
    minusButton();
    plusButton();

    mediaSelector.onStop(stop);
})

function stop(){
    $('.pause','.controller').addClass('hidden');
    $('.play','.controller').removeClass('hidden');
}

function rewindButton(){
    $('.rewind','.controller').click(
        function(){
            mediaSelector.getCurrentMedia().subSeconds(10);
        }
    );
}

function playButton(){
    $('.play','.controller').click(
        function(){
            $('.play','.controller').addClass('hidden');
            $('.pause','.controller').removeClass('hidden');
            mediaSelector.getCurrentMedia().play();
        }
    );
}

function pauseButton(){
    $('.pause','.controller').click(
        function(){
            $('.pause','.controller').addClass('hidden');
            $('.play','.controller').removeClass('hidden');
            mediaSelector.getCurrentMedia().pause();
        }
    );
}

function advanceButton(){
    $('.advance','.controller').click(
        function(){
            mediaSelector.getCurrentMedia().addSeconds(10);
        }
    );
}

function minusButton(){
    $('.volumeDown','.controller').click(
        function(){
            mediaSelector.getCurrentMedia().volDown();
        }
    );
}

function plusButton(){
    $('.volumeUp','.controller').click(
        function(){
            mediaSelector.getCurrentMedia().volUp();
        }
    );
}
