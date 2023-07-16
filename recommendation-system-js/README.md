## Content Based Recommendation System JS

Completely working content based recommendation system developed using javascript/node. Standalone microservice to takes care of maintenance, training and recommendation of meal based on keywords.
Implemented get api to fetch the recommended items by providing keywords.

### Steps

1. Data Collection
    - downloaded food data from [kaggle.com](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions)
2. Preprocessing
    - processing of data in a way that we get all keywords related to individual items
    - developed functions to achieve this goal
3. Feature Extraction
    - creating `feature vectors` of each items to find out similarity between features
4. Calculate item similarity
    - Used `cosineSimilarity` to find similar items to given target item
5. Recommendation generation
    - finally using `feature vectors` to recommend similar items
6. Ranking and filtering
    - applying `user preferences` to filter the items from recommended items for user

## How To Run

-   clone this repository to local machine
-   goto root dir and run `npm i` to install dependencies
-   create .env and paste `PORT=8080`
-   start the server with pre-trained model `npm start`
-   copy paste below link in browser/postman
    `http://localhost:8080/recommendations?keywords=<keywords>`
-   You are good to go...

## Improvement

1. create separate and flexible script to train model through cli
2. incorporation of user profile to show recommendation
3. accuracy of recommendation
4. ....

`Note: This repo contains trained data only.`
