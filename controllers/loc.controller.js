var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");
var firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://maps-14046.firebaseio.com"
});



module.exports = {

    findAll(request, response) {

        var ref = firebase.database().ref('/');
        var locationRef = ref.child("location");
        /*
        var locate = locationRef.push();

        console.log(locate.key);
        locate.set({
            name: "Bernama",
            lat: 3.047723,
            long: 101.686895,
            plate: "RS1111",
            speed: 20
        });
        */
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
                // return all the jobs to the server with 200 status
                return response.status(200).json(locations);
            });
    }
};