const projects = [
    {
        "path": "xffc/teleutils",
        "displayname": "TeleUtils",
        "description": "A simple Telegram bot with the tools I use."
    },
    {
        "path": "xffc/kmc",
        "displayname": "KMC",
        "description": "A project that allows you to work with the Minecraft network protocol."
    },
    {
        "path": "xffc/packetcatcher",
        "displayname": "Packet Catcher",
        "description": "A simple Minecraft mod for capturing packets and exporting them to a file."
    },
    {
        "path": "xffc/codingbase",
        "displayname": "YACPI",
        "description": "Yet Another Creative Plus Implementation. It features an asynchronous runtime, code structure export, and a code editor with its own transpiler.",
    }
]

const langElements = document.getElementsByClassName("language-color");
const projectsElement = document.getElementById("projects");
const projectsHTML = [];

(async () => {
    const langaugeColors = await (await fetch("https://raw.githubusercontent.com/ozh/github-colors/refs/heads/master/colors.json")).json();

    console.log(langElements.length);
    for (var i = 0; i < langElements.length; i++) {
        const langElement = langElements.item(i);
        langElement.style.color = langaugeColors[langElement.id].color;
    }

    for (const index in projects) {
        const projectData = projects[index];
        const path = projectData["path"];
        const repositoryData = await (await fetch(`https://api.github.com/repos/${path}`)).json();
        
        const displayName = projectData["displayname"];
        const description = projectData["description"];
        const stars = repositoryData["stargazers_count"];
        const language = repositoryData["language"];
        const languageColor = langaugeColors[language]["color"];
        const forks = repositoryData["forks"];

        projectsHTML.push(
            `<a href="https://github.com/${path}" target="_blank" class="project-card">\n` +
            `<div class="project-header">\n` +
            `<span class="project-name">${displayName}</span>\n` +
            `<span class="project-link-icon">\n` +
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">\n` +
            `<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>\n` +
            `<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>\n` +
            `</svg>\n` +
            `</span>\n` +
            `</div>\n` +
            `<p class="project-desc">${description}</p>\n` +
            `<div class="project-footer">\n` +
            `<span class="tech-tag">\n` +
            `<span class="tech-dot" style="background-color: ${languageColor}"></span>\n` +
            `${language}\n` +
            `</span>\n` +
            `<span>⭐ ${stars}</span>\n` +
            `<span>🍴 ${forks}</span>\n` +
            `</div>\n` +
            `</a>`
        );
    }

    projectsElement.innerHTML = projectsHTML.join("\n");
})();
