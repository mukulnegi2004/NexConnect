const ExpressError = require("../utils/ExpressError");

const runningCheck = (req, res) => {
    res.json({
        working: "properly"
    })
}





module.exports = {runningCheck};