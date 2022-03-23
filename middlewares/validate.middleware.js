module.exports = (schema) => {
    return (req,res,next) => {
        const {error} = schema.validate(req.body,{ abortEarly: false });

        if(error == null){
            console.log("Schema Validated")
            next();
        }
        else {
            const {details} = error;
            const r = details.map(i => i.message).join(',');
            return res.status(422).send({error : r})
        }
    }
}