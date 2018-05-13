var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");


module.exports = {

    findAll(request, response) {

        var firebase = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://maps-14046.firebaseio.com"
        });

        var ref = firebase.database().ref('maps-14046');
        var locationRef = ref.child("/");
        console.log(locationRef);

        var locations = locationRef.on("value", (snapshot) => {
            console.log(snapshot.key);
            console.log(snapshot.val());
            exports.getItems = () => {
                // Get The required value and export it so as to be accessed from client
                var info = {};
                var key = snapshot.key;
                info[key] = [];
                info[key].push(snapshot.val());

                return info;
            }
        });

        /* Hard code location */
        /*
        var locations = [{
                "name": "Mimos",
                "lat": 3.047789,
                "long": 101.696253,
            },
            {
                "name": "Bernama",
                "lat": 3.047723,
                "long": 101.686895,
            }
        ];
        */

        // return all the jobs to the server with 200 status
        return response.status(200).json(locations);

    }
};