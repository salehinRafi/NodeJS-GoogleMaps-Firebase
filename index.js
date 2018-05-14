var geocoder;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function init_map() {
    // Retrieve Info
    $.ajax({
        url: '/location',
        success: function(data) {
            getLocations(data);
        }
    });

    function getLocations(locations) {
        console.log(locations);
        console.log(locations.length);
        directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 10,
            center: new google.maps.LatLng(3.018102, 101.714661),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        directionsDisplay.setMap(map);
        var infowindow = new google.maps.InfoWindow();

        var marker, i;
        var request = {
            travelMode: google.maps.TravelMode.DRIVING
        };
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].lat, locations[i].long),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    var content = `Location: ${locations[i].name}, Speed: ${locations[i].speed}Km/H, Plate No: ${locations[i].plate}`;
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                }
            })(marker, i));

            if (i == 0) request.origin = marker.getPosition();
            else if (i == locations.length - 1) request.destination = marker.getPosition();
            else {
                if (!request.waypoints) request.waypoints = [];
                request.waypoints.push({
                    location: marker.getPosition(),
                    stopover: true
                });
            }

        }
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }

}