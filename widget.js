// Function to get query parameters from the URL
function getQueryParams() {
    const params = {};
    window.location.search
        .substring(1)
        .split("&")
        .forEach(pair => {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        });
    return params;
}

// Function to validate time (must be within 1 hour)
function isTimeValid(timeString) {
    if (!timeString) return false;
    
    const now = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    
    const providedTime = new Date();
    providedTime.setHours(hours, minutes, 0, 0);
    
    const timeDifference = (now - providedTime) / (1000 * 60 * 60); // Convert ms to hours

    return timeDifference <= 1; // Allow only within 1 hour
}

// Function to check user session
function checkUserSession() {
    const params = getQueryParams();
    const id = params["id"];
    const timeString = params["name"]?.split("-time-")[1]?.split("-info")[0];

    if (!id || !users[id]) {
        showWidgetMessage("Sign in required", "You are not signed in. <a href='vgames1.github.io/login'>Click here to sign in</a>");
        return;
    }

    if (!isTimeValid(timeString)) {
        showWidgetMessage("Session expired", "Your session has expired. <a href='vgames1.github.io/login'>Sign in again</a>");
        return;
    }

    // If session is valid, display user info in widget
    showUserProfile(users[id]);
}

// Function to display message in widget
function showWidgetMessage(title, message) {
    const widgetContent = document.getElementById("widget-content");
    widgetContent.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
}

// Function to display user profile in widget
function showUserProfile(user) {
    const widgetContent = document.getElementById("widget-content");
    widgetContent.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <img src="${user.profilePic || 'default-avatar.png'}" alt="Profile Picture" class="profile-pic">
    `;
}

// Create the floating widget in the corner
function createProfileWidget() {
    const widget = document.createElement("div");
    widget.id = "profile-widget";
    widget.innerHTML = `
        <div id="widget-button">🔍</div>
        <div id="widget-content" class="hidden"></div>
    `;
    document.body.appendChild(widget);

    // Toggle widget display on click
    document.getElementById("widget-button").addEventListener("click", function () {
        document.getElementById("widget-content").classList.toggle("hidden");
    });

    // Check user session when widget loads
    checkUserSession();
}

// Run the widget creation when the page loads
window.onload = createProfileWidget;
