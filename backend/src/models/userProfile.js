import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    preferences: {
        type: [String],
        required: true,
    },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
