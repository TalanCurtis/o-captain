module.exports={
    testGet: (req, res, next)=>{
        let myResponse = 'testGet hit';
        console.log(myResponse);
        res.status(200).send(myResponse);
    }
}