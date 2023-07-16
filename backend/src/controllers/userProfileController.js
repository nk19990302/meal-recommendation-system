import UserProfileService from "../services/userProfileService.js";

const userProfileController = {
    get: async (req, res) => {
        const { userId } = req.params;
        res.send(await UserProfileService.get(userId));
    },
    add: async (req, res) => {
        const { userId, preferences } = req.body;
        res.send(await UserProfileService.add(userId, preferences));
    },
    update: async (req, res) => {
        const { id, preferences } = req.body;
        res.send(await UserProfileService.update(id, preferences));
    },
    delete: async (req, res) => {
        const { id } = req.params;
        res.send(await UserProfileService.delete(id));
    },
};

export default userProfileController;
