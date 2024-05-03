const fs = require('fs');

function fetchInformation(req, res) {
    const { department } = req.body;

    if (!fs.existsSync(`./records/${department.toUpperCase()}.json`)) {
        res.render('table', { department, records: [] });
        return;
    }

    fs.readFile(`./records/${department.toUpperCase()}.json`, (err, content) => {
        if (err)
            throw new Error(`The ${department} file could not be read.`);
        const fileContent = JSON.parse(content);

        res.render('table', { department, records: fileContent });
    });
}

module.exports = { fetchInformation };