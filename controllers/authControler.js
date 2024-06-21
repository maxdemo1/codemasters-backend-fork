import User from "../models/user";

import bcrypt from "bcryptjs";



const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res, next) => {
    try {
        const { email, password, passwordConform } = req.body;
        if (password !== passwordConform) {
            return res.status(400).json({message: "Passwords dont match. Enter correct!"})
        }

        const user = await User.findOne({ email });
        if (user !== null) {
            return res.status(409).send({message: "Email already exist"})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({ email, password: passwordHash })
        /*Тут має бути граватар */
        /*Тут має бути верифікація емейла */
        res.status(201).json({email: newUser.email, message: "New user is born"})
    }
    catch(error) {
        next(error)
    }
}


const loginUser = async (req, res, next) => {
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

        /*Тут має бути перевірка верифікації */

        /*Це тимчасовий варіант - буде доданий рефреш токен */
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "22h" })
        await User.findByIdAndUpdate(user._id, { token });
        res.status(200).json({token, email: user.email,})
    }
    catch(error) {
        next(error)
    }
}


 const logoutUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null });
        res.status(204).json({});
    }
    catch (error) {
        next(error);
        }
}

// const currentUser = async (req, res, next) => {
//     try {
//         const user = req.user;
//         /*Тут має бути перевірка на авторизацію */
//         const userProfile = {
//             name: user.name,
//             email: user.email,
//             gender: user.gender,
//             weight: user.weight,
//             activeTimeSport: user.activeTimeSport,
//             dailyWaterRate: user.dailyWaterRate,
//             avatarURL: user.avatarURL,
//         }
//         res.status(200).json(userProfile);
//     }
//     catch (error) {
//         next(error);
//         }
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


const userServices = { registerUser, loginUser, logoutUser };
export default userServices;