const fakeauthStatus = (req, res, next)=>{
    let authstatus =false;
    if(authstatus){
        res.status(200).json({auth:true,message:'Authentication successful'});
        next();
    }else{
        res.status(401).send('Authentication failed');
    }
};
export default fakeauthStatus;

// This is a fake auth system. you just need to call next() and no need of sending response,
//  that's router's job .
