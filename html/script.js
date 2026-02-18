// function typingHeader({ element, words, speed = 100, delay = 400 }) {
//   let wordIndex = 0;
//   let charIndex = 0;
//   let currentWord = "";
//   let currentTag = "";

//   function typeNext() {
//     if (wordIndex >= words.length) return;

//     currentWord = words[wordIndex].text;
//     currentTag = words[wordIndex].tag || "span"; // default to span

//     // wrap each word in the specified HTML tag
//     if (charIndex === 0) {
//       const span = document.createElement(currentTag);
//       if (words[wordIndex].class) span.className = words[wordIndex].class;
//       span.textContent = "";
//       element.appendChild(span);
//     }

//     const spanEl = element.lastChild;
//     spanEl.textContent += currentWord[charIndex];
//     charIndex++;

//     if (charIndex < currentWord.length) {
//       setTimeout(typeNext, speed);
//     } else {
//       charIndex = 0;
//       wordIndex++;
//       // add a space after the word
//       if (wordIndex < words.length)
//         element.appendChild(document.createTextNode(" "));
//       setTimeout(typeNext, speed);
//     }
//   }

//   // initial delay before typing starts
//   setTimeout(typeNext, delay);
// }

// // Usage
// typingHeader({
//   element: document.getElementById("typing-header"),
//   words: [
//     { text: "Creative", tag: "em", class: "noHighlight" },
//     { text: "Conscious", tag: "em", class: "highlight" },
//     { text: "Web Design", tag: "p", class: "regular" },
//   ],
//   speed: 100,
//   delay: 1000,
// });

const glow = document.getElementById("cursor-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

async function handleSubmit(event) {
  event.preventDefault();
  status.textContent = "Sending…";

  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xgolzzed", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.textContent = "Contact successful!";
    } else {
      const result = await response.json();
      if (result.errors) {
        status.textContent = result.errors
          .map((error) => error.message)
          .join(", ");
      } else {
        status.textContent = "Oops! Something went wrong.";
      }
    }
  } catch (error) {
    status.textContent = "Network error. Please try again.";
  }
}

form.addEventListener("submit", handleSubmit);
