class ExpressError extends Error{
    constructor(status = 500, message){
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;