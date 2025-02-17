// Generate a unique key for the widget
const generateKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Current key (simulate server-side key storage)
let currentKey = generateKey();

// Generate the embed script
const generateEmbedScript = () => {
    const script = `
        <script>
            (function() {
                const key = "${currentKey}";
                const widget = document.createElement("div");
                widget.id = "raul-adventure-widget";
                widget.style.width = "100%";
                widget.style.height = "500px";
                widget.style.border = "2px solid #ff6f61";
                widget.style.borderRadius = "10px";
                widget.style.overflow = "hidden";
                widget.innerHTML = \`
                    <iframe 
                        src="https://vgames1.github.io/rual/?key=\${key}" 
                        width="100%" 
                        height="100%" 
                        style="border: none;"
                    ></iframe>
                \`;
                document.body.appendChild(widget);
            })();
        </script>
    `;
    return script.trim();
};

// Display the embed script
const embedScript = document.getElementById("embedScript");
embedScript.value = generateEmbedScript();

// Copy script to clipboard
const copyButton = document.getElementById("copyButton");
copyButton.addEventListener("click", () => {
    embedScript.select();
    document.execCommand("copy");
    alert("Script copied to clipboard!");
});

// Simulate key change (for testing purposes)
setInterval(() => {
    currentKey = generateKey();
    embedScript.value = generateEmbedScript();
    console.log("Key changed! New key:", currentKey);
}, 60000); // Change key every 60 seconds (for demonstration)
