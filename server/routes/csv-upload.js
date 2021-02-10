const debug = require('debug')('csv-upload-route');
const { parseCSVFile } = require('../../lib/csv-transform');

const fsPromises = require('fs').promises;

async function csvUploadRoute(req, res, next) {
    /***
        assumption: not everybody at the provider will
        enter the name in the same case.
        Ensure that no matter what the case is, the
        layout can be found.
    ***/
    const provider = req.body.provider_name.toLowerCase();
    const columnLayout = await lookupProviderLayout(provider);
    debug(columnLayout);
    parseCSVFile(req.file.path, columnLayout);
    res.end();
}

async function lookupProviderLayout(name) {
    /***
        This is abstracted to a function to make it
        easier to shift to looking up through other
        means such as a database.
    ***/
    return require(`${__dirname}/../../providers/${name}.json`);
}

exports = module.exports = csvUploadRoute;
