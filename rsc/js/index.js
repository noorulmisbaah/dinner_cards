function submitInformation() {
    const studentName = studentNameField.value;
    const department = studentDepartmentField.value.toUpperCase();
    const matriculationNumber = makeMatricNumber(department, studentMatriculationNumberField.value);

    if (!studentName || !department || !matriculationNumber) {
        showNotificationBox('Submission Error', 'The information is not submitted because some fields are empty.');
    } else {
        fetch('submit_information', {
            body: JSON.stringify({ studentName, department, matriculationNumber }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(({ submitted }) => {
            if (!submitted)
                showNotificationBox('Submission Failed', `The information is not submitted because ${matriculationNumber} already exists.`);
            else {
                showNotificationBox('Submission Successful', `The information for ${matriculationNumber} has been submitted successfully.`);
            }
        });
    }

    studentNameField.value = '';
    studentMatriculationNumberField.value = '';
}

function makeMatricNumber(deparment, number) {
    const prefix = 'MAAUN/23/';
    const dept = deparment;
    var letter;

    switch (dept) {
        case 'ACCOUNTING':
            letter = 'ACC/';
            break;
        case 'ECONOMICS':
            letter = 'ECO/';
            break;
        case 'INTERNATIONAL RELATIONS':
            letter = 'IRS/';
            break;
        case 'BUSINESS ADMINISTRATION':
            letter = 'BAD/';
            break;
        case 'COMPUTER SCIENCE':
            letter = 'CSC/';
            break;
        case 'PEACE':
            letter = 'PCR/';
            break;
    }

    return `${prefix}${letter}${number}`;
}

function toggleForms(index) {
    forms.forEach(form => form.style.display = 'none');
    forms[index].style.display = 'flex';
}

const studentNameField = document.getElementById('student-name-field');
const studentDepartmentField = document.getElementById('student-department-field');
const studentMatriculationNumberField = document.getElementById('student-matriculation-number-field');
const submitButton = document.getElementById('submit-button');
const spans = document.querySelectorAll('span');
const forms = document.querySelectorAll('.form');

spans.forEach((span, index) => {
    span.addEventListener('click', () => {
        toggleForms(index);
    });
});

submitButton.addEventListener('click', submitInformation);