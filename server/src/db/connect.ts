import mongoose from "mongoose";
import config from "config";
import log from "../logger/logger";

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        log.info("Connected to database");
    } catch (e) {
        log.error("Could not connect to the database", e);
        process.exit(1);
    }
}


export default connect;