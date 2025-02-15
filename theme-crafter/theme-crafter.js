window.addEventListener("load", loadThemeControls);

function loadThemeControls() {

  const bg = document.getElementById("sample-output");
  const button = document.getElementById("demo-button");
  const output = document.getElementById("theme-output");

  const textColor = document.getElementById("text-color");
  document.getElementById("text-color-out").innerHTML = `textColor: "${rgb2hsl("#000000")}"`;
  textColor.addEventListener("input", (e) => {
    button.style.color = e.target.value;
    document.getElementById("text-color-out").innerHTML = `textColor: "${rgb2hsl(e.target.value)}"`;
  });

  const bgColor = document.getElementById("bg-color");
  document.getElementById("bg-color-out").innerHTML = `bgColor: "${rgb2hsl("#ffffff")}"`;
  bgColor.addEventListener("input", (e) => {
    bg.style.backgroundColor = e.target.value;
    document.getElementById("bg-color-out").innerHTML = `bgColor: "${rgb2hsl(e.target.value)}"`;
  });

  const borderColor = document.getElementById("border-color");
  document.getElementById("border-color-out").innerHTML = `borderColor: "${rgb2hsl("#000000")}"`;
  borderColor.addEventListener("input", (e) => {
    button.style.borderColor = e.target.value
    document.getElementById("border-color-out").innerHTML = `borderColor: "${rgb2hsl(e.target.value)}"`;
  });

  const buttonBgColor = document.getElementById("button-bg-color");
  document.getElementById("button-bg-color-out").innerHTML = `buttonBgColor: "${rgb2hsl("#ffffff")}"`;
  buttonBgColor.addEventListener("input", (e) => {
    button.style.backgroundColor = e.target.value;
    document.getElementById("button-bg-color-out").innerHTML = `buttonBgColor: "${rgb2hsl(e.target.value)}"`;
  });
}

function colorHex2rgb(hexColor) {
  const noHash = hexColor.slice(1);
  let r = parseInt(noHash.slice(0, 2), 16);
  let g = parseInt(noHash.slice(2, 4), 16);
  let b = parseInt(noHash.slice(4), 16);
  return [r, g, b];
}

function hslVal2String(h, s, l) {
  //l.toPrecision(4);
  
  const hslOut = `hsl(${(h * 360).toPrecision(5)} ${(s * 100).toPrecision(4)}% ${(l * 100).toPrecision(4)}%)`;
  return hslOut;
}

function rgb2hsl(rgbHex) {
  let [r, g, b] = colorHex2rgb(rgbHex);
  (r /= 255), (g /= 255), (b /= 255);
  const vmax = Math.max(r, g, b), vmin = Math.min(r, g, b);
  let h, s, l = (vmax + vmin) / 2;

  if (vmax === vmin) {
    return hslVal2String(0, 0, l); // achromatic
  }

  const d = vmax - vmin;
  s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
  if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
  if (vmax === g) h = (b - r) / d + 2;
  if (vmax === b) h = (r - g) / d + 4;
  h /= 6;

  return hslVal2String(h, s, l);
}