import User from "../models/user.js";

import Session from "../models/session.js";

import bcrypt from "bcryptjs";
import cripto from "node:crypto";
import jwt from "jsonwebtoken";



const JWT_SECRET = process.env.JWT_SECRET;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password_conform } = req.body;
        if (password !== password_conform) {
            return res.status(400).json({message: "Passwords dont match. Enter correct!"})
        }

        const user = await User.findOne({ email });
        if (user !== null) {
            return res.status(409).send({message: "Email already exist"})
        }
        const verificationToken = cripto.randomUUID();

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: passwordHash, verificationToken })
        /*Тут має бути граватар */
        /*Тут має бути верифікація емейла */
        res.status(201).json({email: newUser.email, message: "New user is born"})
    }
    catch(error) {
        next(error)
    }
}




const login = async (req, res, next) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user === null) {
            return res.status(401).send({message: "Email or password is wrong"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
        if (passwordCompare === false) {
            return res.status(401).send({message: "Email or password is wrong"})
        }
    const newSession = await Session.create({ uid: user._id });
  
  const accessToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
    JWT_SECRET,
    { expiresIn: "22h" }
  );
  
  const refreshToken = jwt.sign(
    { uid: user._id, sid: newSession._id },
      JWT_REFRESH_SECRET,
    { expiresIn: "22h" }
        );
        

    /*Цей код зберігає аксес токен до бази. Коментуйте цю частину якщо не бажаєте зберігати. Зроблено для перевірки */
        user.token = accessToken;
        await user.save();
    /*Цей код зберігає аксес токен до бази. Коментуйте цю частину якщо не бажаєте зберігати. Зроблено для перевірки */
        

       return res.status(200).json({accessToken, refreshToken, sid: newSession._id, email: user.email,})
    }
    catch(error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const { uid, sid } = req.user
        await Session.findByIdAndDelete(sid);

        /*Цей рядок видаляє токен з бази - закоментуйте його якщо коментувал код в login. Зроблено для перевірки */
        await User.findByIdAndUpdate(uid, { token: null });
        /*Цей рядок видаляє токен з бази - закоментуйте його якщо коментувал код в login. Зроблено для перевірки */
        /*Тут могла бути ваша реклама */

        res.status(204).json({ message: "Successfully logged out" });
    }
    catch(error) {
        next(error)
    }

}


// const loginUser = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
        
//         if (user === null) {
//             return res.status(401).send({message: "Email or password is wrong"})
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password);
//         if (passwordCompare === false) {
//             return res.status(401).send({message: "Email or password is wrong"})
//         }

//         /*Тут має бути перевірка верифікації */

//         /*Це тимчасовий варіант - буде доданий рефреш токен */
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "22h" })
//         await User.findByIdAndUpdate(user._id, { token });
//         res.status(200).json({token, email: user.email,})
//     }
//     catch(error) {
//         next(error)
//     }
// }

// const updateUser = async (req, res, next) => {
//     try {
//         const { _id } = req.user;
//         const { name, email, gender, weight, activeTimeSport, dailyWaterRate, avatarURL } = req.body;

//         const update = await User.findByIdAndUpdate(_id, { name, email, gender, weight, activeTimeSport, dailyWaterRate, avatarURL });/*Я тут шось забув */

//         /*Перевірка??? */
//         res.status(200).json({
//             user: {
//                 name: update.name,
//                 email: update.email,
//                 gender: update.gender,
//                 weight: update.weight,
//                 activeTimeSport: update.activeTimeSport,
//                 dailyWaterRate: update.dailyWaterRate,
//                 avatarURL: update.avatarURL,
//             },
//             message: "Woo Hoo!!! You update your profile"
//         })
//     }
//     catch (error) {
//         next(error);
//         }
// }


const userServices = { registerUser, login, logout };
export default userServices;