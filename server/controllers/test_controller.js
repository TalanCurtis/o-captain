module.exports={
    testGet: (req, res, next)=>{
        let myResponse = 'testGet hit';
        console.log(myResponse);
        console.log(req.session.user)
        res.status(200).send(myResponse);
    }
}