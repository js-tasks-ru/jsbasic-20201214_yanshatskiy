function toggleText() {
  const toggleTextButton = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");

  toggleTextButton.addEventListener("click", () => {
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
