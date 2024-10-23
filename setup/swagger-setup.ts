import swaggerJSDoc from "swagger-jsdoc";
import swagger, { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for your Express app",
  },
  servers: [
    {
      url: process.env.SERVER_URL,
      description: "Local server",
    },
  ],
};
const options = {
    swaggerDefinition,
    apis: ['./router/*.ts']
}
const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec