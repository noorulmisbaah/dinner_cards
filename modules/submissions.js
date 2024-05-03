const fs = require('fs');

function submitInformation(req, res) {
    const { studentName, department, matriculationNumber } = req.body;

    if (!fs.existsSync(`./records/${department}.json`)) {
        fs.writeFileSync(`./records/${department}.json`, JSON.stringify([]));
    }

    fs.readFile(`./records/${department}.json`, (err, content) => {
        if (err)
            throw new Error(`The file for ${department} could not be read.`);
        const fileContent = JSON.parse(content);
        if (fileContent.some(student => student.matriculationNumber === matriculationNumber)) {
            res.send(JSON.stringify({ submitted: false }));
        } else {
            fileContent[fileContent.length] = { studentName, department, matriculationNumber };
            writeRecord(fileContent, res, department);
        }
    });
}

function writeRecord(content, res, department) {
    fs.writeFile(`./records/${department}.json`, JSON.stringify(content, null, '\t'), (err) => {
        if (err)
            throw new Error(`The file for ${department} could not be created.`);
        res.send(JSON.stringify({ submitted: true }));
    });
}

module.exports = { submitInformation };