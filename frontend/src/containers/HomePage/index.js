import React, { useEffect, useState } from "react";
import MultiselectChip from "../../components/MultiSelectChips";
import { foodPreferenceItems } from "./constants";
import { HomePageWrapper } from "./index.styled";
import FoodItemCard from "../../components/FoodItemCard";
import { getRecommendations } from "../../services/recommendations";
import OverlayLoginSignupPage, { LS_USER_ID } from "../OverlayLoginSignup";
import { Button, ErrorText } from "../OverlayLoginSignup/index.styled";
import {
    addProfile,
    getProfile,
    updateProfile,
} from "../../services/userProfile";

const HomePage = () => {
    const [preferencesOpen, setPreferencesOpen] = useState();
    const [profileId, setProfileId] = useState();
    const [error, setError] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [showOverlay, setShowOverlay] = useState(
        localStorage.getItem(LS_USER_ID) ? false : true
    );

    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem(LS_USER_ID);

            if (!userId) return;
            // get profile id
            const profileRes = await getProfile(userId);
            setSelectedOptions(
                profileRes.data ? profileRes.data.preferences : []
            );
            if (profileRes.status === "error") {
                const addProfileRes = addProfile(userId, []);
                if (addProfileRes.status === "error") {
                    setError("add profile - something went wrong");
                } else {
                    addProfileRes.data && setProfileId(addProfileRes.data._id);
                    setError(null);
                }
            } else {
                setError(null);
                setProfileId(profileRes.data._id);
            }
        })();
    }, [showOverlay]);

    useEffect(() => {
        (async () => {
            if (!profileId) return;
            // preserve preferences
            const updateRes = await updateProfile(profileId, selectedOptions);
            if (updateRes.status === "error") {
                setError("update preferences: " + updateRes.message);
            } else {
                setError(null);
            }
            // fetch recommendations
            const data = await getRecommendations(selectedOptions);
            setRecommendedItems(data);
        })();
    }, [selectedOptions, profileId]);

    const handleChipChange = (options) => {
        setSelectedOptions(options);
    };

    return (
        <HomePageWrapper>
            <div className="header">
                <h1>Welcome To DilFood</h1>
                {error && <ErrorText>{error}</ErrorText>}
                {!showOverlay && (
                    <div>
                        <Button
                            onClick={() => {
                                localStorage.clear();
                                setShowOverlay(true);
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </div>
            <div className="set-preferences">
                {preferencesOpen && (
                    <div className="pref-container">
                        {foodPreferenceItems.map((it) => {
                            return (
                                <React.Fragment key={it.category}>
                                    <h2 className="category">{it.category}:</h2>
                                    <MultiselectChip
                                        options={it.options}
                                        selectedOptions={selectedOptions}
                                        onChange={handleChipChange}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}
                <hr className="hr"></hr>
                {!preferencesOpen && (
                    <div className="selected-pref">
                        <MultiselectChip
                            options={selectedOptions}
                            selectedOptions={selectedOptions}
                            onChange={handleChipChange}
                        />
                    </div>
                )}
                <div
                    className="hide-show"
                    onClick={() => setPreferencesOpen((state) => !state)}
                >
                    {preferencesOpen ? "Hide" : "Set Preferences"}
                </div>
                {recommendedItems.length < 1 ? (
                    <div className="selected-pref">Loading</div>
                ) : (
                    <div className="recommended-items">
                        {recommendedItems.map((it) => {
                            return (
                                <FoodItemCard
                                    key={it.id}
                                    title={it.name}
                                    description={it.description}
                                    imageUrl={
                                        it.imageUrl ||
                                        "https://b.zmtcdn.com/data/pictures/chains/2/50382/a0c3bcc09b1448a7138beda386f8db21.jpg"
                                    }
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            {showOverlay && (
                <OverlayLoginSignupPage onClose={() => setShowOverlay(false)} />
            )}
        </HomePageWrapper>
    );
};

export default HomePage;
