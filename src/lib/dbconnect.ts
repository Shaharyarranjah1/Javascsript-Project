import mongoose from "mongoose";

//? data checking  which we are going to use in our application that is  which data is coming from db and which type 

type connectionObject = {
    isConnected?: number;

}

//? we are going to use this function to connect to our database

const connection :connectionObject = {};

 //? connect db 
  async function dbConnect():Promise<void>{
    //? validation 
    if(connection.isConnected){
        console.log(' already connected to database ');
        return ;
    }

    try {
       const db =  await mongoose.connect(process.env.MONGODB_URI|| '',{});
        
       //? we are doing in below line ==> if we do like this that is ok if not no problem and we doing it for connection object return value checking 
        connection.isConnected = db.connections[0].readyState ;
        console.log('mongodb connected successfully');
        
    } catch (error) {
        console.log('database connection failed ',error);
        process.exit(1);
        
    }
  }

  
  export default dbConnect;

