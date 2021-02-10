const parse = require('csv-parse'),
      transform = require('stream-transform'),
      debug = require('debug')('csv-transform');
const fs = require('fs');

function parseCSVFile(filePath, columnLayout) {
    // 1) open file
    // 2) parse CSV fields into Union of provided
    //     and expected headers
    // 3) write result to file on disk

    return new Promise((resolve, reject) => {
        try {
            fs.accessSync(filePath);
        } catch (accessError) {
            return reject(accessError);
        }
        const parser = parse({columns: true});
        const transformer = transform((record, cb) => {
            /***
                assumption: headings will be provided
                in the case prescribed
            ***/
            const recordData = {
                UUID: record[columnLayout.UUID],
                VIN: record[columnLayout.VIN],
                Make: record[columnLayout.Make],
                Model: record[columnLayout.Model],
                Mileage: record[columnLayout.Mileage],
                Year: record[columnLayout.Year],
                Price: record[columnLayout.Price],
                "Zip Code": record[columnLayout["Zip Code"]],
                "Create Date": record[columnLayout["Create Date"]],
                "Update Date": record[columnLayout["Update Date"]]
            };
            const output = [];
            for (let [key, value] of Object.entries(recordData)) {
                output.push(value);
            }
            debug(output.join('\t'));
            cb(null, output.join('\t') + '\n');
        });
        const inStream = fs.createReadStream(filePath, {emitClose: true});
        inStream.on('error', (err) => reject(err));
        inStream.on('close', resolve);
        const outStream = fs.createWriteStream(`${filePath}.out`);
        inStream.pipe(parser).pipe(transformer).pipe(outStream);
    });
}

exports = module.exports = {
    parseCSVFile
};
