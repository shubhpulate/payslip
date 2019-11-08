const adapter = require('../adapter/adapter');

//handler for the incoming request
const handler = (req, res, next) => {
    const validated = adapter.validatePayload(req.body);
    if (validated.isError) {
        let err = {
            status: adapter.errorCodes.badRequest,
            message: validated.message
        }
        return res.send(err)
    } else {
        const calculatedPayslip = adapter.calculatePayslip(req.body);
        return res.status(adapter.errorCodes.ok).send(calculatedPayslip);
    }
}

module.exports = {
    handler
};