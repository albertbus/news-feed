const modeToggle = document.getElementById('modeToggle');
const modeToggleImg = document.getElementById('modeToggleImg')
const body = document.body;

// Check localStorage for user's preferred mode
const currentMode = localStorage.getItem('mode');
if (currentMode) {
    body.classList.add(currentMode); // Apply stored mode to body
}

document.addEventListener('DOMContentLoaded', function() {
    modeToggleImg.src = currentMode == 'dark-mode' ? "resources/light_mode_icon.png" : "resources/dark_mode_icon.png";
});


modeToggle.addEventListener('click', () => {
    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Update localStorage with current mode
    const mode = body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('mode', mode);

    modeToggleImg.src = mode == 'dark-mode' ? "resources/light_mode_icon.png" : "resources/dark_mode_icon.png";
});
