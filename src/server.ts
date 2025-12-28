import app from './app';
import { connectDB } from './config/database';
import router from './routes/index';

const PORT = process.env.PORT || 3000;

app.use('/', router);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`
🚀 Server is running!
📡 URL: http://localhost:${PORT}
📁 Uploads folder: ./uploads
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
