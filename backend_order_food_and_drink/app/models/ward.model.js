module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        wards_code: {
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
        district_code: {
            type: String,
        },
      }
    );
  
    const Wards = mongoose.model("wards", schema);

    Wards.countDocuments(async (err, count) => {
        if (err) {
            console.error('Error counting documents:', err);
            return;
        }

        if (count === 0) {
            try {
                const fs = require('fs');
                const dataWard = JSON.parse(fs.readFileSync('./app/test/ward.json'));
                (async function () {
                    for (const item of dataWard) {
                        const ward = new Wards(item);
                        await ward.save();
                    }
                })();
                console.log('Data added to MongoDB!');
            } catch (err) {
                console.error('Error adding data to MongoDB:', err);
            }
        }
    });

    return Wards;
  };
  