module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        district_code: {
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
        city_code: {
            type: String,
        },
      }
    );
  
    const Districts = mongoose.model("districts", schema);

    Districts.countDocuments(async (err, count) => {
        if (err) {
            console.error('Error counting documents:', err);
            return;
        }

        if (count === 0) {
            try {
                const fs = require('fs');
                const dataDistrict = JSON.parse(fs.readFileSync('./app/test/district.json'));
                (async function () {
                    for (const item of dataDistrict) {
                        const district = new Districts(item);
                        await district.save();
                    }
                })();
                console.log('Data added to MongoDB!');
            } catch (err) {
                console.error('Error adding data to MongoDB:', err);
            }
        }
    });

    return Districts;
  };
  