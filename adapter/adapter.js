//Tax Rate List
const taxRateList = [
    { min: 0, max: 18200, base: 0, threshold: 0, rate: 0 },
    { min: 18201, max: 37000, base: 0, threshold: 18200, rate: 0.19 },
    { min: 37001, max: 87000, base: 3572, threshold: 37000, rate: 0.325 },
    { min: 87001, max: 180000, base: 19822, threshold: 87000, rate: 0.37 },
    { min: 180001, max: Infinity, base: 54232, threshold: 180000, rate: 0.45 },
];

//function to validate the payload
const validatePayload = (payload) => {
    let { startDate, annualSalary, firstName, lastName, superRate } = payload,
        result = {
            isError: false,
            data: null,
            message: null,
        };
    //check whether firstName is null    
    if (!firstName) {
        result['isError'] = true;
        result['message'] = 'First name is required.';
        return result;
    }
   
    //check whether lastName is null
    if (!lastName) {
        result['isError'] = true;
        result['message'] = 'Last name is required.';
        return result;
    }

    //check whether annualSalary is null or is number
    if (!annualSalary || isNaN(annualSalary)) {
        result['isError'] = true;
        result['message'] = 'Annual Salary must be a natural number.';
        return result;
    }

    //check if annual salary is less than 0
    if (annualSalary < 0) {
        result['isError'] = true;
        result['message'] = 'Annual Salary must be a natural number.';
        return result;
    }

    //check if superRate is null or is number
    if (!superRate || isNaN(superRate)) {
        result['isError'] = true;
        result['message'] = 'Super Rate is required.';
        return result;
    }

    //check if superRate is less than 0 or greater than 12
    if (superRate < 0 || superRate > 12) {
        result['isError'] = true;
        result['message'] = 'Super Rate must be between 0-12.';
        return result;
    }

    //check if startDate is null
    if (!startDate) {
        result['isError'] = true;
        result['message'] = 'Start date is required.';
        return result;
    }
    return result;

}

//calculate payslip for given payload
const calculatePayslip = (payload) => {
    const { startDate, annualSalary, firstName, lastName, superRate } = payload;
    const bracket = taxRateList.find((b) => annualSalary >= b.min && annualSalary <= b.max);
    const gross = Math.round(annualSalary / 12);
    const tax = Math.round((bracket.base + (annualSalary - bracket.threshold) * bracket.rate) / 12);
    let newDate = new Date(startDate);
    let months_name = ["Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"];
    let month = months_name[newDate.getMonth()];
    let date = `${newDate.getDate()} ${month}`;
    console.log(date)
    let lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
    let lastDate = `${lastDay.getDate()} ${month}`;
    console.log(lastDate)
    let calculatedPayslip = {
        'name': `${firstName} ${lastName}`,
        'pay-period': `${date}-${lastDate}`,
        'gross-income': gross,
        'income-tax': tax,
        'net-income': gross - tax,
        'super-amount': Math.round(gross * superRate / 100),
    };
    return calculatedPayslip;
}
const errorCodes = {
    badRequest: 400,
    internalServerError: 500,
    notFound: 404,
    ok: 200
};

module.exports = {
    validatePayload,
    calculatePayslip,
    errorCodes
}