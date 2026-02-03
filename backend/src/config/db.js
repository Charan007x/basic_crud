import mongoose from 'mongoose';
const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://24r21a0588_db_user:123@learning.xpeeejm.mongodb.net/myapp?appName=Learning')
        console.log('Database connected successfully');
    }catch(err){
        console.error('Database connection error:', err);
    }
};
export {connectDB}; // not export default, since it is a function