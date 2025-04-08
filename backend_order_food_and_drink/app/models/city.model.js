module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            city_code: {
                type: String,
                unique: true,
                index: true,
            },
            name: {
                type: String,
            },
            name_with_type: {
                type: String,
            },
            country_id: {
                type: String,
            },
            area_id: {
                type: String,
            },
        }
    );

    const Cities = mongoose.model("cities", schema);

    Cities.countDocuments(async (err, count) => {
        if (err) {
            console.error('Error counting documents:', err);
            return;
        }

        if (count === 0) {
            try {
                const fs = require('fs');
                const dataCity = JSON.parse(fs.readFileSync('./app/test/city.json'));
                (async function () {
                    for (const item of dataCity) {
                        const city = new Cities(item);
                        await city.save();
                    }
                })();
                console.log('Data added to MongoDB!');
            } catch (err) {
                console.error('Error adding data to MongoDB:', err);
            }
        }
    });

    return Cities;
};
