const nicknames = [
    "xffc",
    "kweik",
    "savaksp"
];

let currentIndex = 0;
const nameElement = document.getElementById("nickname");
const avatarElement = document.getElementById("avatar");

const typeSpeed = 80;
const eraseSpeed = 120;
const delayBetweenNames = 5000;

function updateAvatar(nick) {
    avatarElement.src = `avatars/${nick}.jpg`;
}

function eraseText(text, callback) {
    let length = text.length;
    const interval = setInterval(() => {
        if (length > 0) {
            length--;
            nameElement.textContent = text.substring(0, length);
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, eraseSpeed);
}

function typeText(text, callback) {
    let length = 0;
    const interval = setInterval(() => {
        if (length < text.length) {
            length++;
            nameElement.textContent = text.substring(0, length);
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, typeSpeed);
}

function startTypingCycle() {
    setTimeout(() => {
        const currentText = nicknames[currentIndex];

        eraseText(currentText, () => {
            currentIndex = (currentIndex + 1) % nicknames.length;
            const nextText = nicknames[currentIndex];

            updateAvatar(nextText);

            typeText(nextText, () => {
                startTypingCycle();
            });
        });
    }, delayBetweenNames);
}

updateAvatar(nicknames[currentIndex]);
nameElement.textContent = nicknames[currentIndex];
startTypingCycle();