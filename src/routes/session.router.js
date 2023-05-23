import { Router } from "express";
import passport from 'passport';
// import userModel from "../dao/models/user.js";
import {getCurrentUser,postRegister,failLogin, postLogin, failRegister, getLogout, getGitHub ,getGitHubCallback} from '../controllers/sessionController.js'

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) {
        console.log('Already authenticated');
        return res.redirect('/products');
    }
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) {
        console.log('Must be authenticated');
        return res.redirect('/login');
    }
    next();
};

router.get('/current', privateAccess, getCurrentUser)
router.post('/register', passport.authenticate('register', { failureRedirect: 'fail-register' }),postRegister);
// passport.authenticate('register', { failureRedirect: 'fail-register' }), async (req, res) => {
//     res.send({ status: 'success', message: 'User registered' })
router.get('/fail-login', publicAccess ,failLogin);
    // res.send({ status: 'error', message: 'login failed' });

router.get('/fail-register', publicAccess,failRegister );
    // res.send({ status: 'error', message: 'Register failed' });

router.post('/login',publicAccess ,postLogin);
// passport.authenticate('login', { failureRedirect: 'fail-login' }), async (req, res) => {
//     if (!req.user) return res.status(400)
//     .send({ status: 'error', message: 'Invalid credentials' });
    
//     req.session.user = {
//         name: `${req.user.first_name} ${req.user.last_name}`,
//         age: req.user.age,
//         email: req.user.email,
//     }

//     res.send({ status: 'success', message: 'login success' });

router.get('/logout', privateAccess,getLogout);
    // req.session.destroy(err => {
    //     if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
    //     res.redirect('/products');
    // })

router.get('/github', publicAccess,passport.authenticate('github', { scope: ['user:email'] }) ,getGitHub);
// passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
//     res.send({ status: 'succes', message:'user Registered'});
router.get('/github-callback', publicAccess,passport.authenticate('github', { failureRedirect: '/login' }) ,getGitHubCallback )
// passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//     req.session.user = {
//         name: `${req.user.first_name} ${req.user.last_name}`,
//         age: req.user.age,
//         email: req.user.email,
//         // rol: rol
//     }

//     res.redirect('/products'); 



export default router;