import express from 'express';

const router = express.router();//get acess to express router
router.route('/').get((req, res) => {
    res.send('hello world');
})

export default router;