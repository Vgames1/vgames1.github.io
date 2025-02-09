document.addEventListener("DOMContentLoaded", function () {
    // Registered users
    const users = {
        "SIHLE23@vgames1.github.io": { id: "00017234", name: "Sihle Johnson" },
        "dogman@vgames1.github.io": { id: "00034215", name: "Dogman" },
        "sabrodeenzo@vgames1.github.io": { id: "00015678", name: "Sabrodeenzo" },
        "shadowpaw@vgames1.github.io": { id: "00027890", name: "Shadowpaw" },
        "zenxor@vgames1.github.io": { id: "00038901", name: "Zenxor" },
        "cyberpanther@vgames1.github.io": { id: "00049012", name: "Cyberpanther" },
        "ravenstorm@vgames1.github.io": { id: "00059123", name: "Ravenstorm" },
        "zorath@vgames1.github.io": { id: "00067234", name: "Zorath" },
        "flamestryker@vgames1.github.io": { id: "00078345", name: "Flamestryker" },
        "nebulawolf@vgames1.github.io": { id: "00089456", name: "Nebulawolf" },
        "stargazer@vgames1.github.io": { id: "00090567", name: "Stargazer" }
    };

    // Function to get URL parameters
    function getUrlParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    const params = getUrlParams();
    const nameTimeInfo = params["name"];
    const idParam = params["info?id"];

    if (nameTimeInfo && idParam) {
        const [name, timeLabel, loginTime] = nameTimeInfo.split("-");
        if (timeLabel === "time") {
            const lastLoginTime = new Date("1970-01-01T" + loginTime);
            const currentTime = new Date();
            const timeDiff = (currentTime - lastLoginTime) / (1000 * 60); // Minutes

            if (timeDiff <= 60) {
                const user = Object.values(users).find(user => user.id === idParam);
                if (user) {
                    displayUserWidget(user.name, user.id);
                } else {
                    alert("Invalid user session. Please log in again.");
                    window.location.href = "https://vgames1.github.io/login.html";
                }
            } else {
                alert("Your session has expired. Please log in again.");
                window.location.href = "https://vgames1.github.io/login.html";
            }
        }
    } else {
        alert("Invalid session. Please log in.");
        window.location.href = "https://vgames1.github.io/login.html";
    }
});

// Function to display user info
function displayUserWidget(username, userId) {
    const userWidget = document.createElement("div");
    userWidget.style.position = "fixed";
    userWidget.style.bottom = "20px";
    userWidget.style.right = "20px";
    userWidget.style.padding = "10px";
    userWidget.style.background = "#1e1e1e";
    userWidget.style.color = "white";
    userWidget.style.borderRadius = "5px";
    userWidget.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.2)";
    userWidget.innerHTML = `<strong>${username}</strong> (ID: ${userId})<br><a href='https://vgames1.github.io/logout.html' style='color:#ff6600;'>Logout</a>`;

    document.body.appendChild(userWidget);
}
