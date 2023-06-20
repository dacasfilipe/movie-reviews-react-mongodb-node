import app from '../server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from '../dao/moviesDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;

    try {
        // Connect to Database
        await client.connect();
        console.log('Connected to Database');
        await moviesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main().catch(console.error);