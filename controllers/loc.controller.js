var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");
var firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://maps-14046.firebaseio.com"
});



module.exports = {

    findAll(request, response) {

        var ref = firebase.database().ref('/');
        var locationRef = ref.child("vehicles");
        locationRef.once("value")
            .then((snapshot) => {
                console.log("Snapshot Key: ", snapshot.key, "\n");
                console.log("Snapshot reference: ", snapshot.ref.toString(), "\n");
                console.log("Snapshot Key: ", snapshot.val(), "\n\n");
                var data = snapshot.val();
                //Convert Object object to Array Object
                var locations = Object.keys(data).map(key => {
                    return data[key];
                });
                console.log(locations);
                // return all the jobs to the server with 200 status
                return response.status(200).json(locations);
            });
    },
    /**
        addNew(request, response) {

            var ref = firebase.database().ref('/');
            var vehiclesRef = ref.child("vehicles");

            var getLastnode = vehiclesRef.child("vehicle-1/lastNode");
            const getNode = getLastnode.on("value", snapshot => {
                let lastNode = 0;
                lastNode = parseInt(snapshot.val()) + 1; //Convert String to Int
                const node = Object.assign({}, lastNode);
                return node;
            }, function(error) {
                console.log("Error: " + error.code);
            });
            console.log(getNode);

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            var coordinate = vehiclesRef.child("vehicle-1").push();
            var latitude = 3.028832;
            var longitude = 101.716490;
            var speed = getRandomInt(100);

            coordinate.set({
                lastNode: {
                    latitude,
                    longitude,
                    speed: 20,
                    engine: 1,
                    time: "2017-04-02T02:04:22.881Z"
                }
            });

        }
        */
    addNew(request, response) {

        var ref = firebase.database().ref('/');
        var vehiclesRef = ref.child("vehicles/vehicle-1/coordinates");

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        var locate = vehiclesRef.push();
        var latitude = 3.018102 + 0.00013;
        var longitude = 3.018102 + 0.00013;
        var speed = getRandomInt(100);

        console.log(locate.key);
        locate.set({
            latitude,
            longitude,
            speed: 20,
            engine: 1,
            time: "2017-04-02T02:04:22.881Z"
        });

    }
};