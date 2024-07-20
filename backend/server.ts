import app from './app';
import mongoose from 'mongoose';

const bootstrap = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI!, {
                dbName: process.env.DATABASE,
            })
            .then(() => {
                console.log('[database]: Mongoose connected.');
            });
    } catch (err) {
        console.log(`Failed to connect to database, ${err}`);
    }

    app.listen(process.env.PORT, () => {
        console.log(
            `[server]: listening at http://localhost:${process.env.PORT}`
        );
    });
};

bootstrap();
