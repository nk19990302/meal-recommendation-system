## Content Based Recommendation System JS

Completely working content based recommendation system developed using javascript/node. Standalone microservice to takes care of training and recommendation based on data provided during training. Implemented get api to fetch the array of keys of recommended items by providing keywords.

### How To Run System

-   clone this repository to local machine
-   goto root dir and run `npm i` to install dependencies
-   create .env and copy paste all variables given below

```md
PORT=8080
TRAINING_JSON_FILE_PATH = "./input/data.json"
FEATURE_VECTORS_FILE_PATH = "./output/vectors.txt"
FEATURES_FILE_PATH = "./output/features.json"
FEATURE_LENGTH = 1000
```

-   start the server with pre-trained model `npm start`
-   copy paste below link in browser/postman

```
http://localhost:8080/recommendations?keywords=<keywords>
```

-   Set appropriate keywords in above url
-   Hit send button...

### How To Train Model

-   Copy paste tokenized json file inside `./input/data.json` in below format

```json
[
    { "id": 0, "keywords": ["banana", "fruits", "veg"] },
    { "id": 1, "keywords": ["chicken", "non-veg", "biryani", "rice"] },
    { "id": 2, "keywords": ["egg", "kari", "non-veg"] },
    { "id": 3, "keywords": ["bread", "roti", "rice", "veg", "morning"] },
    { "id": 4, "keywords": ["veg", "soup", "snacks"] },
    { "id": 5, "keywords": ["carrot", "fruits", "mango", "morning"] }
]
```

-   Run command `npm run train`
-   Output files will be stored in `./output` to recommend the items
-   Congrats, Your model has been trained to recommend the items

### Result

```js
# request
http://localhost:8080/recommendations?keywords=banana,veg

# response
[0,4,3]
```

### Improvements

-   features to continuously keep training model

`This microservice solely responsible for recommending items based on training data. So, To incorporate user profile in recommendation, Need to develop some sort of way to apply filtration based on user profile.`
