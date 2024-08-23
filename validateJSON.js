// validateJSON.js
function validateJSON(req, res, next) {
    try {
        JSON.parse(JSON.stringify(req.body));
        next();
    } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
    }
}

module.exports = validateJSON;
