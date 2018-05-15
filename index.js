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

    function getLocations(vehicles) {
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

        for (i = 0; i < vehicles.length; i++) {

            var coordinates = vehicles[i].coordinates;
            console.log(coordinates);
            console.log(coordinates.length);
            for (j = 0; j < coordinates.length; j++) {
                var car = coordinates[j];
                console.log(car);
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(car.latitude, car.longitude),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function(marker, j) {
                    return function() {
                        var content = `Engine: ${car.engine}, Speed: ${car.speed}
                                Km/H, Plate No: ${car.plate}, Date: ${car.time}`;
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker, j));

                if (j == 0) request.origin = marker.getPosition();
                else if (j == coordinates.length - 1) request.destination = marker.getPosition();
                else {
                    if (!request.waypoints) request.waypoints = [];
                    request.waypoints.push({
                        location: marker.getPosition(),
                        stopover: true
                    });
                }
            }

        }

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }

}