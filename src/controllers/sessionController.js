import passport from 'passport';
import config from '../config/config.js'
import userModel from "../dao/models/user.js";

export const  postRegister = async(req,res)=>{
    res.send({ status: 'success', message: 'User registered' })
}

export const failLogin = async(req,res)=>{
    res.send({ status: 'error', message: 'login failed' });
}

export const getCurrentUser = async(req,res)=>{
    try {
        res.send(req.session.user);
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const logout = async(req, res) => {
    try {
        req.session.destroy(error => {
            if (error) throw new err(`${error}`, 500);
            res.redirect('/products')
        });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
}

export const postLogin = async(req,res)=>
{
    const { email, password } = req.body;

    if (email == config.adminEmail && password == config.adminPassword) {
        req.session.user = {
            id: "adminCoder",
            first_name: "Coder",
            last_name: "Admin",
            email: email,
            rol: "admin",
        };
        return res.send({ status: "success", message: "logueado" });
    }

    // if (!req.user) return res.status(400).send({ status: "error", error: "Contraseña invalida" });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }

    res.send({ status: "success", payload: req.user });
}



export const failRegister = async(req,res)=>{
    res.send({ status: 'error', message: 'Register failed' });
}

export const getLogout = async(req,res)=>{
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/products');
    })
}

export const getGitHub = async(req,res)=>{
        res.send({ status: 'succes', message:'user Registered'});
}

export const getGitHubCallback= async(req,res)=>{
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            age: req.user.age,
            email: req.user.email,
            // rol: rol
        }
    
        res.redirect('/products'); 
}
export default{
    postRegister,
    failLogin,
    postLogin,
    failRegister,
    getLogout,
    getGitHub,
    getGitHubCallback
}