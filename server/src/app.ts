import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import config from "config";
import log from "./logger/logger";
import connect from "./db/connect";
import cookieParser from "cookie-parser"
import deserializeUser from "./utils/deserializeUser";
import {ApolloServer} from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import Context from "./types/contex";
import {buildSchema} from "type-graphql";
import {resolvers} from "./resolvers";
import authChecker from "./utils/authChecker";
import bodyParser from "body-parser";
import {graphqlUploadExpress} from "graphql-upload";

const clientUrl = config.get<string>("clientUrl");

const host = config.get<string>("host");
const port = config.get<number>("port");

(async () => {
    //Connect to db
    await connect()

    //Build schema with auth check
    const schema = await buildSchema({
        resolvers,
        authChecker,
    });

    const app = express();
    app.use(cors({
        credentials: true,
        origin: clientUrl
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(graphqlUploadExpress());

    //Create apollo server
    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            return deserializeUser(ctx);
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    });

    await server.start();

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
        cors: {
            credentials: true,
            origin: clientUrl
        }
    });

    io.on("connection", (socket) => {
        log.info(`A new client connected: ${socket.id}`);

        socket.on("join_room", (data) => {
            socket.join(data);
            log.info(`User with ID: ${socket.id} joined room: ${data}`);
        });

        socket.on("change_event_occurs", (data) => {
            socket.to(data).emit("change_event_notify");
        });

        socket.on("disconnect", () => {
            log.info(`User disconnected: ${socket.id}`);
        });
    });


    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: clientUrl
        }
    });

    httpServer.listen(port, host, () => {
        log.info(`Server listing at http://${host}:${port}`)
    })
})();