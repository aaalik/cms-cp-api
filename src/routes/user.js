import express from 'express';
import * as db from '../lib/db';
import * as auth from '../lib/auth';
// import * as helper from '../lib/helper';

const router = express.Router();

router.get('/', async(req, res) => {
    const {password, email} = req.body;
    const {rows} = await db.query(`SELECT * FROM public.tb_user `);
    console.log(rows);
    return res.send(rows);
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const {rows} = await db.query(`SELECT * FROM public.tb_user where id = $1`, [id]);
    console.log(rows);
    return res.send(rows);
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const {rows} = await db.query(`SELECT * FROM public.tb_user where email = $1`, [email]);
    console.log(rows);
    console.log(auth.getHash(password))
    if (rows[0]) {
        if (rows[0].password === auth.getHash(password)) {
            console.log("password benar");
            const token = auth.getToken();

            return res.send(Object.assign({token}, {rows}));
        }
    }
    return res.sendStatus(404);
});

router.post('/createUser', async(req, res) => {
    const {email, password, name, status, level} = req.body;
    const hashedPassword = await auth.getHash(password);

    const result = await db.insertRows(
        'tb_user(name, email, password, status, level)',
        'values($1, $2, $3, $4, $5)',
        [name, email, hashedPassword, status, level], 
        res
    );
    await result.client.query('COMMIT');
    return res.sendStatus(200);
});

router.post('/updateUser', async(req, res) => {
    // const {email, password, name, status, level} = req.body;
    // const hashedPassword = await auth.getHash(password);

    // const result = await db.updateRows(
    //     'tb_user(name, email, password, status, level)',
    //     'values($1, $2, $3, $4, $5)',
    //     [name, email, hashedPassword, status, level], 
    //     res
    // );
    // await result.client.query('COMMIT');
    // return res.sendStatus(200);
});

export default router;