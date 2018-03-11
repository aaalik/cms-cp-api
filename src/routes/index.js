import express from 'express';
import * as db from '../lib/db';

const router = express.Router();

router.get('/', async(req, res) => {
    const getStatus = await db.testConnect();
    console.log(getStatus);
    res.send({
        message: `Hey, I\'m Alik. If you see this, everything works fine.`,
        database: getStatus
    });
});

export default router;