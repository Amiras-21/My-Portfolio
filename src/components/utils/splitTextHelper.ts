export const splitText = (element: HTMLElement, type = "chars") => {
  const text = element.innerText;

  if (type === "chars") {
    element.innerHTML = text
      .split("")
      .map(char => `<span class="char">${char}</span>`)
      .join("");
  }

  if (type === "words") {
    element.innerHTML = text
      .split(" ")
      .map(word => `<span class="word">${word}</span>`)
      .join(" ");
  }

  return {
    chars: element.querySelectorAll(".char"),
    words: element.querySelectorAll(".word"),
  };
};