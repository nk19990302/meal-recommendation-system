import userService from "../services/userService.js";

const userController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const loginRes = await userService.login(email, password);
        res.send(loginRes);
    },
    signup: async (req, res) => {
        const { name, email, password } = req.body;
        const regUser = await userService.signup(name, email, password);
        res.send(regUser);
    },
};

export default userController;
