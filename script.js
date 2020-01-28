const startButton = document.getElementById("start");
const menuScreen = document.getElementById("menuScreen");
const mainContainer = document.querySelector(".container-background");
const allButtonList = document.querySelectorAll(".menu__item");
const baseField = document.createElement("div");
const innerField = document.createElement("div");
baseField.classList.add("container-for-cards");
innerField.classList.add("inner-container-for-cards");

function goToStart () {
    mainContainer.appendChild(menuScreen);
    innerField.innerHTML = '';
    innerField.remove();
    baseField.remove();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


const chooseLevel = (elem) => {
    allButtonList.forEach((item) => item.classList.remove("checked"));
    elem.target.classList.add("checked");
}

allButtonList.forEach((item) => item.addEventListener("click", chooseLevel));

function startGame () {
    let currentLevel = document.querySelector(".checked").getAttribute("id");
    function currentLevelNum (item) {
        switch (item) {
            case "simple":
                return 3;
            case "middle":
                return 6;
            case "hard":
                return 10;
        }
    }

    let newCurrentLevelNum = currentLevelNum(currentLevel);
    menuScreen.remove();
    innerField.classList.remove("centeredFor3", "centeredFor6", "centeredFor10");
    mainContainer.appendChild(baseField);
    baseField.appendChild(innerField);

    let card = (level) => {

        function createCard () {
            const newCard = document.createElement("div");
            const flipCardInner = document.createElement("div");
            const flipCardFront = document.createElement("div");
            const flipCardBack = document.createElement("div");
            const imgValue = document.createElement("img");
            const imgFront = document.createElement("img");
            newCard.classList.add("card");
            flipCardInner.classList.add("flip-card-inner", "class-for-hover");
            flipCardFront.classList.add("flip-card-front");
            flipCardBack.classList.add("flip-card-back");
            imgValue.setAttribute("src", "card_gameover.png");
            imgValue.classList.add("img-value");
            imgFront.classList.add("img-front");
            imgFront.setAttribute("src", "card_back.png");
            innerField.appendChild(newCard);
            newCard.appendChild(flipCardInner);
            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCardFront.appendChild(imgFront);
            flipCardBack.appendChild(imgValue);
            return {
                newCardName: newCard,
                flipCardInnerName: flipCardInner,
                flipCardFrontName: flipCardFront,
                flipCardBackName: flipCardBack,
                imgValueName: imgValue,
                imgFrontName: imgFront
            }
        }

        let createdCard = createCard();

        function createRandomBag (level) {
            let randomNum = getRandomInt(1, level);
            if (randomNum == 1) {
                createdCard.imgValueName.setAttribute("src", "card-bag.png");
            }
        }

        createdCard.flipCardInnerName.addEventListener("click", () => {
            createRandomBag(newCurrentLevelNum);
            createdCard.flipCardInnerName.classList.remove("class-for-hover");
            createdCard.flipCardInnerName.classList.add("transform");
            const allCards = document.querySelectorAll(".flip-card-inner");
            allCards.forEach((item) => item.addEventListener("click", goToStart));
        })
    }

    function createField (level) {
        switch (level) {
            case "simple":
                innerField.classList.add("centeredFor3");
                for(let i = 3; i-- ;) {
                    card(currentLevel);
                }
                break;
            case "middle":
                innerField.classList.add("centeredFor6");
                for(let i = 6; i-- ;) {
                    card(currentLevel);
                }
                break;
            case "hard":
                innerField.classList.add("centeredFor10");
                for(let i = 10; i-- ;) {
                    card(currentLevel);
                }
                break;
        }
    }
    createField(currentLevel);
}

startButton.addEventListener("click", startGame)
