import express from 'express';
import * as db from '../lib/db';
// import * as auth from '../lib/auth';
// import * as helper from '../lib/helper';

const router = express.Router();

router.get('/', async(req, res) => {
    const {password, email} = req.body;
    const {rows} = await db.query(`SELECT * FROM public.tb_user `);
    console.log(rows);
    return res.send(rows);
});

export default router;