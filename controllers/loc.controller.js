module.exports = {
    findAll(request, response) {
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
        // return all the jobs to the server with 200 status
        return response.status(200).json(locations);

    }
};