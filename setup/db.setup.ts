import mongoose from "mongoose"

const database = async () => {
    const connectionParams = {}
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, connectionParams)

    mongoose.connection.on('connect', () => {
        console.log('Connected to database successfully')
    })
    mongoose.connection.on('error', (err) => {
        console.log('Error while connecting to database: ', err)
    })
    mongoose.connection.on('disconnected', () => {
        console.log('Mongodb connection disconnected')
    })
}

export default database