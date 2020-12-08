import "./Tone.js";

async function getIP() {
  let response = await fetch("https://api.ipify.org/?format=json");
  return response.json();
}

async function start() {
  var ip = await getIP();
  ip = ip["ip"];
  console.log(ip);

  var chararray = ip.split("");
  var ip_html = document.getElementById("ip");
  ip_html.innerHTML = "";

  function isOdd(num) {
    return num % 2;
  }

  var length = chararray.length;

  var i = 0;
  var interval = setInterval(makeSound, (200 * length) / 3);

  function makeSound() {
    if (i >= chararray.length) {
      console.log("end");
      clearInterval(interval);
      setTimeout(function () {
        start();
      }, 7000);
    } else {
      var cur = chararray[i];
      var sound;

      if (cur != ".") {
        sound = getSound(cur);

        if (isOdd(length)) {
          setTimeout(function () {
            sound.triggerAttackRelease(i * 100, "7n");
          }, 100);
        } else {
          sound.triggerAttackRelease(i * 100, "1n");
        }
      } else {
        setTimeout(100);
      }

      ip_html.innerHTML += cur;
      i++;
    }
  }
}

function getSound(num) {
  switch (num) {
    case "0":
      return s_zero;
    case "1":
      return s_one;
    case "2":
      return s_two;
    case "3":
      return s_three;
    case "4":
      return s_four;
    case "5":
      return s_five;
    case "6":
      return s_six;
    case "7":
      return s_seven;
    case "8":
      return s_eight;
    case "9":
      return s_nine;
    default:
      return;
  }
}

// play button
var welcomeText = document.getElementById("welcome-text");

document.querySelector("#play")?.addEventListener("click", async () => {
  await Tone.start();
  welcomeText.innerHTML = "";
  start();
});

// set up tones
var s_zero = new Tone.AMSynth().toDestination();
var s_one = new Tone.PluckSynth().toDestination();
var s_two = new Tone.MetalSynth().toDestination();
var s_three = new Tone.Synth().toDestination();
var s_four = new Tone.DuoSynth().toDestination();
var s_five = new Tone.MembraneSynth().toDestination();
var s_six = new Tone.MonoSynth().toDestination();
var s_seven = new Tone.Synth().toDestination();
var s_eight = new Tone.PolySynth().toDestination();
var s_nine = new Tone.FMSynth().toDestination();
