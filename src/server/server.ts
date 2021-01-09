import http from "http"
import path from "path"
import express from "express"

//change to desired local port
const port: number = 8080

class App {
    private server: http.Server
    private port: number

    constructor(port: number) {
        this.port = port
        const app = express()

        //serve client folder
        app.use(express.static(path.join(__dirname, '../client')))

        //serve three.js modules
        app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
        app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
        app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))



        this.server = new http.Server(app);
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}

new App(port).Start()
