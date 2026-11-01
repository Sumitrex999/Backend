import "dotenv/config"

// Write a function to throw a error , when the environment variables are missing 
// otherwise proccess & return
function requireVariable(name){
    // process.env.name will look for name, we want the variable in the name {dynamic value}
    if(!process.env[name]){
        throw new Error(`Environment variable ${name} is required`)
    }
    return process.env[name];
}

// Write an object to store the env variables
const config = {
    PORT:requireVariable("PORT"),
    MONGO_URI:requireVariable("MONGO_URI"),
    JWT_SECRET:requireVariable("JWT_SECRET")
}

export default config;

