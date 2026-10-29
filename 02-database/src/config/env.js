// import the ".env" variables 
import "dotenv/config";

// Read the application environment, default to development
export const NODE_ENV = process.env.NODE_ENV || "development";

// Read the port provided by the application environment, default to 3000
export const PORT = Number(process.env.PORT || 3000);

// Read the DB_String provided by the application environment 
export const MONGO_URI = process.env.MONGO_URI;

// if the database connection string is missing 
if(!MONGO_URI){
    throw new Error("Mongo URI is required!!")
}

// Check weather a valid port number or not
if(!Number.isInteger(PORT) || PORT<1 || PORT>65535){
    throw new Error("PORT must be a valid port number!!!")
}