import mongoose from 'mongoose';
import config from './config';
import app from './app';


async function server() {
    
    try {
      await mongoose.connect(config.database_url as string);
      app.listen(config.port, ()=>{
        console.log(`app is running on port: ${config.port as unknown as number}`);
      })
    
  } catch (error) {
    console.log(error);
  }

}
server()