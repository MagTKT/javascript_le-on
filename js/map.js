var map = {
	lattitude: 45.764047,
	longitude: 4.875810,
	rayon: 1000,
    markers:[],//tableaux pour mes markers
	
	create_map: function(){
	    mymap = new google.maps.Map(document.getElementById('map'), {
	        center: {lat: this.lattitude, lng: this.longitude},
	        zoom: 13
	    });//indique l'emplacement pour situer la carte  , passe par l'api google map indiquer en html
	},

	genererMarkers: function(){ //generer les marqueur 
		var lat = mymap.getCenter().lat();
		var lng = mymap.getCenter().lng();
        
		function stationCallback(stations, p_markers) { //etapes 4 function stationcallback se lance 

			stations.forEach(function(station){// etapes 5 appel les stations 

					var marker = new google.maps.Marker({ //creer de nouveaux marqueur 
				        position: station.position,
				        map: mymap
				    });
					marker.addListener('click', function() { //au click d'un marqueur affiche les infos
						$('#bloc_complet').css({"display":"block"});
		         		$("#lieux").html(station.name);
		         		$("#adresse").html(station.address);
		         		$("#place_velo").html(station.bike_stands);
		         		$("#dispo_velo").html(station.available_bike_stands);
					       if(station.available_bike_stands === 0)//si il n'y à pas de vélo disponible 
						    {
						    	alert("Il n'y a plus de velo dans cette station,merci d'en choisir une autre");
						    	$('#bloc_complet').css({"display":"none"});//fais disparaitre le bloc reservation
						    	$('#instruction').css({"display":"block"});//refais apparaitre les instructions
						    }
						    else
						    { 
						        $('#instruction').css({"display":"none"}); //cache les instructions
							}  		    
				    }); 
                    p_markers.push(marker)//rajoute un élément a mon tableaux de markers
			});
            var markerCluster = new MarkerClusterer(mymap, p_markers,
            {imagePath: 'img/m'});// creer mon regroupement de marker grace a push marker

		}
		ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=10386dd6ade3dd069b858e193af1e7d6d655327b' , this.markers, stationCallback);
		//url pour appeler la requete ajax.js 
		//etapes 2 il viens recuperer API jc decaux
	},
}
