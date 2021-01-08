function toggleText() {
  const toggleTextButton = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");

  toggleTextButton.addEventListener("click", () => {
    if (text.hasAttribute("hidden")) {
      text.removeAttribute("hidden");
    } else {
      text.setAttribute("hidden", "");
    }
  });
}
