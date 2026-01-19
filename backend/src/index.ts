import { clerkMiddleware } from '@clerk/express';
import express from 'express';

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get ("/health", (req, res) => {
  res.send("Server is healthy");
});

export default app;