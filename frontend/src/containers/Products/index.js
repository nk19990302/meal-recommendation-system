import React, { useEffect, useState } from "react";
import products from "./../../data/food";
import { ProductsWrapper } from "./index.styled";
import { getRecommendations } from "../../services/recommendations";

const Products = () => {
    const savedKeywords = localStorage.getItem("keywords");
    const [profileKeywords, setProfileKeywords] = useState(
        savedKeywords ? savedKeywords.split(",") : []
    );
    const [recoItems, setRecoItems] = useState([]);

    useEffect(() => {
        (async () => {
            const recommendedItems = await getRecommendations(
                profileKeywords,
                4
            );
            let items = [];
            recommendedItems.forEach((it) => {
                const item = products.find((_it) => it === _it.id);
                items.push(item);
            });
            setRecoItems(items);
        })();

        return () => {};
    }, [profileKeywords]);

    const like = (keywords = []) => {
        const set = new Set(profileKeywords);
        keywords.forEach((it) => {
            set.add(it.toLowerCase());
        });
        setProfileKeywords(Array.from(set).slice(-60));
        localStorage.setItem("keywords", Array.from(set).slice(-60).join(","));
    };
    const order = (keywords) => {
        const set = new Set(profileKeywords);
        keywords.forEach((it) => {
            set.add(it.toLowerCase());
        });
        setProfileKeywords(Array.from(set).slice(-60));
        localStorage.setItem("keywords", Array.from(set).slice(-60).join(","));
    };

    return (
        <ProductsWrapper>
            <h2 className="heading">All Products</h2>
            <div className="hr"></div>
            <div className="keywords">{profileKeywords.join(",")}</div>
            <div className="hr"></div>
            <div className="content">
                {recoItems.map((it) => {
                    return (
                        <div key={it.name} className="food-card">
                            <h3>{it.name}</h3>
                            <p>{it.description}</p>
                            <div className="btns">
                                <button
                                    className="btn"
                                    onClick={() => order(it.keywords)}
                                >
                                    Order
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => like(it.keywords)}
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="hr"></div>
            <div className="content">
                {products.map((it) => {
                    return (
                        <div key={it.name} className="food-card">
                            <h3>{it.name}</h3>
                            <p>{it.description}</p>
                            <div className="btns">
                                <button
                                    className="btn"
                                    onClick={() => order(it.keywords)}
                                >
                                    Order
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => like(it.keywords)}
                                >
                                    Like
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ProductsWrapper>
    );
};

export default Products;
