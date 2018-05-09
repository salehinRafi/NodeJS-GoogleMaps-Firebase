module.exports = {
    findAll(request, response) {
        var locations2 = [{
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
        var locations = [
            ['Mimos', 3.047789, 101.696253, 1],
            ['Bernama', 3.047723, 101.686895, 2]
        ];
        // return all the jobs to the server with 200 status
        return response.status(200).json(locations2);

    }
};