import User from "../models/user.js";

const userService = {
    login: async (email, password) => {
        try {
            // get all user with email id
            const users = await User.find({ email: email });
            if (users.length > 0) {
                const user = users[0];
                // verify password
                // we can match password with hash to verify
                if (password == user.password) {
                    return { status: "success", statusCode: 200, data: user };
                }
            }
            return {
                status: "error",
                statusCode: 400,
                message: "wrong credentials",
            };
        } catch (error) {
            return {
                status: "error",
                statusCode: 500,
                message: "something went wrong",
                data: error,
            };
        }
    },
    signup: async (name, email, password) => {
        try {
            // check for email presence in db
            const users = await User.find({ email: email });
            if (users.length > 0) {
                return {
                    status: "error",
                    statusCode: 400,
                    message: "email is already in use",
                };
            }
            // save new user in db
            // we can hash password before storing in database
            const user = new User({ name, email, password });
            return {
                status: "success",
                statusCode: 2010,
                data: await user.save(),
            };
        } catch (error) {
            return {
                status: "error",
                statusCode: 500,
                message: "something went wrong",
                data: error,
            };
        }
    },
};

export default userService;
