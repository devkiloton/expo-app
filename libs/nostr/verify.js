const nostr = require(".");

const ev = require("./out.json");

async function go() {
  const calculated = await nostr.calculateId(ev);

  console.log("calculated", calculated);
  console.log("actual", ev.id);
}

go();
