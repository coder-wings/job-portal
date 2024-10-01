import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                succes: false
            })
        }
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                message: 'User is already exist with this email',
                success: false
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName:fullname ,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });
        return res.status(200).json({
            message: 'User is registered successfully!',
            success: true
        })

    } catch (err) {
        console.log(err);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing!",
                succes: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        // Is role mached/correct or not
        if (user.role != role) {
            return res.status(400).json({
                message: "Account does not exist with this role.",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: "strict" })
            .json({
                message: ` Welcome back ${user.fullName}`,
                success: true,
                user
            });

    } catch (error) {
        console.log(error);
    }
}

export const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out Successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // if (!fullName || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Something is missing!",
        //         succes: false
        //     })
        // }
        // cloudinary will come here later

        let skillsArray;
        if (skillsArray) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating user data
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Here, Resume will come later

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}