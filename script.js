const form = document.getElementById('lookForm');
const nameInput = document.getElementById('name');
const lookFile = document.getElementById('lookFile');
const preview = document.getElementById('preview');

// Sparkly cursor
const sparkle = document.querySelector('.sparkle-cursor');
document.addEventListener('mousemove', e => {
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const file = lookFile.files[0];

  if (!name || !file) {
    alert("Oops! Please enter your name and upload your look ✨");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;

    // Show preview
    preview.innerHTML = `
      <h2>🦋 ${name}'s Look of the Day! 🦋</h2>
      <img src="${imageUrl}" alt="Look of the Day"/>
      <p>Y2K Slay activated 💿✨</p>
    `;

    // Save to localStorage
    const savedLook = {
      name: name,
      image: imageUrl
    };
    localStorage.setItem("lastLook", JSON.stringify(savedLook));
  };

  reader.readAsDataURL(file);
});

// Load from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedLook = JSON.parse(localStorage.getItem("lastLook"));
  if (savedLook) {
    preview.innerHTML = `
      <h2>🦋 ${savedLook.name}'s Last Look! 🦋</h2>
      <img src="${savedLook.image}" alt="Look of the Day"/>
      <p>Saved from your last slay 💾✨</p>
    `;
  }
});
