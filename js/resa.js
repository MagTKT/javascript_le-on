var resa ={
temps: 1200,
reservation : $("#reservation"),
valider : $("#valider"),
compteur :$('#compteur'),
decompteur: null,


  chrono:function (){// etapes 3 verifie a combien le chrono est lancé 
    var secondes = this.temps;
    var minutes = 0;
    

    if(this.temps === 0) // etapes 5 quand le compteur est a zero je fais un clear pour le remettre au debut
    { 
      //reservation termine remet le compteur a zero
      clearInterval(this.decompteur);
      sessionStorage.clear();// supprime toute les données de session storage
      $("#compteur").html("Votre réservation a expiré"); 
      $('#message').fadeOut(); 
    } 
    else //etapes 4 lance le decompte -- decompte compteur
    {
      
      if(secondes > 59)
      {
        minutes = Math.floor(secondes / 60);
        secondes = secondes - minutes *60;
      }
      if(secondes<10)
      {
        secondes = "0" + secondes;
      }
      if(minutes <10)
      {
        minutes = "0" + minutes;
      }
       $('#compteur').html(minutes + " minutes " + secondes + " secondes");
       this.temps = this.temps - 1;// on decrémente de 1
       sessionStorage.setItem('temps',this.temps);//clé de la session storage  enregistre les données
    }
       
  },
  testTimer : function(){//etape 1 function qui lance le chrono après le click

  if(sessionStorage.getItem("temps"))//recupere les info de session storage
    {
      this.temps = sessionStorage.getItem("temps");//recupere les info de session storage
      resa.decompteur = setInterval(function()//relance le chrono toute les secondes, appel la function setinterval de maniere repeter
        {
          resa.chrono();
        }, 1000);   
       $('#instruction').html("Votre réservation à bien été effectué");// confirmation
       $('#message').html('Vous avez réservé un vélo à la station '+ '' + sessionStorage.getItem('lieux') +' '+ sessionStorage.getItem('adresse') + ' pour ');
    }
  },
}


$("#valider").click(function()//etape 2 quand je clique il verifie les deux canvas et lance le chrono
{
  if(canvas.canvas_bloc.toDataURL() == canvas.canvas_blank.toDataURL())//comparaison des deux calques canvas
  {
    alert("vous n'avez pas signé");
    $("#bloc_complet").css({"display":"none"});
    $('#instruction').html(" Merci de séléctionner une station ");// confirmation de non réservation
    $('#instruction').fadeIn([500]);//indique quoi faire pour reserver
  }
  else  
  {
    clearInterval(resa.decompteur);//remet le compteur a zero
    resa.temps = 1200;
    $("#bloc_complet").css({"display":"none"});//resa qui disparait une fois signer
    $('#instruction').html("Votre réservation à bien été effectué");// confirmation
    $('#instruction').fadeIn([500]);//indique quoi faire pour reserver
    canvas.raze(); //supprime la signature actuel
    resa.decompteur = setInterval(function()//relance le chrono toute les secondes
      {
        resa.chrono();
      }, 1000);   
    $('#message').html('Vous avez réservé un vélo à la station '+ '' + lieux.textContent +' '+ adresse.textContent + ' pour ');     
    sessionStorage.setItem('lieux',lieux.textContent);//remet a zero le lieux
    sessionStorage.setItem('adresse',adresse.textContent);//remet a zero l'adresse
    $('#message').fadeIn();  
  }
});



 
 

