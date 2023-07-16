import UserProfile from "../models/userProfile.js";

const UserProfileService = {
    get: async (userId) => {
        try {
            const allTodo = await UserProfile.find({ userId: userId });
            if (allTodo.length > 0) {
                return { status: "success", statusCode: 200, data: allTodo[0] };
            }
            return {
                status: "error",
                statusCode: 404,
                message: "todo not found for user",
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
    add: async (userId, preferences) => {
        try {
            const todo = new UserProfile({ userId, preferences });
            const res = await todo.save();
            return { status: "success", statusCode: 200, data: res };
        } catch (error) {
            return {
                status: "error",
                statusCode: 500,
                message: "something went wrong",
                data: error,
            };
        }
    },
    update: async (id, preferences) => {
        try {
            const res = await UserProfile.findByIdAndUpdate(
                id,
                { $set: { preferences: preferences } },
                { new: false }
            );
            return {
                status: "success",
                statusCode: 200,
                data: { ...res._doc, preferences: preferences },
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
    delete: async (id) => {
        try {
            const res = await UserProfile.findOneAndRemove({ _id: id });
            return { status: "success", statusCode: 200, data: res };
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

export default UserProfileService;
