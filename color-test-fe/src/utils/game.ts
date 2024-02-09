import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();
export const makeCorrectBoom = () => {
  jsConfetti.addConfetti({
    emojis: ["🏆", "🎨", "🌈", "👨‍🎨"],
    emojiSize: 100,
    confettiNumber: 25,
  });
};

export const makeWrongBoom = () => {
  jsConfetti.addConfetti({
    emojis: ["💩", "😭", "🤷", "💩"],
    emojiSize: 100,
    confettiNumber: 25,
  });
};

function ColorToHex(color: number) {
  var hexadecimal = Number(color).toString(16).toUpperCase();
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export const changeRGBToHex = (color: string) => {
  const rgb = color.match(/[0-9]+/g);
  if (rgb === null) {
    return "";
  }

  const [red, green, blue] = rgb;

  return (
    "#" +
    ColorToHex(Number(red)) +
    ColorToHex(Number(green)) +
    ColorToHex(Number(blue))
  );
};
