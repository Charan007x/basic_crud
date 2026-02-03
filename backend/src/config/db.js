import mongoose from 'mongoose';
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    }catch(err){
        console.error('Database connection error:', err);
    }
};
export {connectDB}; // not export default, since it is a function