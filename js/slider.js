var slider = {
    
    slideIndex: 0,

// function qui met toute les slides en display:none pour n'en afficher qu'une à la fois
    showSlides: function(){ 
        var slides = $(".mySlides"); //va rechercher les slide dans le html

        // je cache toutes les slides
        $(".mySlides").css('display','none');

        // check si on a dépassé la première slide. Si oui, repart à la dernière
        if(slider.slideIndex == -1){
            slider.slideIndex = slides.length-1;
        }

        // check si on a dépassé la dernière slide. Si oui, repart à la première
        if (slider.slideIndex == slides.length) {
            slider.slideIndex = 0;
        }

        // affiche l'image en cours
        $(slides[slider.slideIndex]).css('display','block');

    },

};

//evenement au clavier


// je bind un evenement keydown sur mon body.  version ecran ordi
$("body").keydown(function(event){
    
    if(event.which == 37)
    {
        slider.slideIndex--;
        slider.showSlides();
    }
    if(event.which == 39)
    {
        slider.slideIndex++;
        slider.showSlides();
    }
});

// je bind un evenement keydown sur mon mobile  version ecran mobile
$("#prev").on('touchstart',function(){
    slider.slideIndex--;
    slider.showSlides();
});

$("#next").on('touchstart',function(){
    slider.slideIndex++;
    slider.showSlides();
});


//test ordinateur pour mobile
// je bind un event click pour pouvoir tester le rendu mobile sur ordinateur
$("#prev").on('click',function(){
        slider.slideIndex--;
        slider.showSlides();
});

$("#next").on('click',function(){
    slider.slideIndex++;
    slider.showSlides();
});