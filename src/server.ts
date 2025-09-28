import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import { planRoutes } from "./routes/plan"

const app = fastify({
    logger: true
})
app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST"]
})

app.get("/test", (req, res) =>{
    res.send("Rota de teste")
})

app.register(planRoutes)


const port = process.env.PORT? Number(process.env.PORT) : 3000

app.listen({port, host: "0.0.0.0"})
.then(() => {
    console.log("Server is Running on port: 3333")
})
.catch((err) => {
    app.log.error(err)
    process.exit(1)
})