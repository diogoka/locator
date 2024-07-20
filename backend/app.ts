import express, { Request, Response } from 'express';
import { router as poiRouter } from './routes/poi.router';

const app: express.Application = express();

app.use(express.json());

app.use('/poi', poiRouter);

app.use('/health', (req, res) => {
    res.status(200).send('Service is alive');
});

app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        error: `Not Found Route - ${req.method} ${req.path}`,
    });
});

export default app;
