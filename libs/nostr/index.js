const Relay = require("./lib/relay");
const RelayPool = require("./lib/relay-pool");
const noble = require("noble-secp256k1");

async function signId(privkey, id) {
  return await noble.schnorr.sign(id, privkey);
}

async function verifyEvent(event) {
  return await noble.schnorr.verify(event.sig, event.id, event.pubkey);
}

function utf8_encode(txt) {
  if (typeof TextEncoder !== "undefined" && TextEncoder) {
    const encoder = new TextEncoder();
    return encoder.encode(txt);
  } else {
    const util = require("util");
    const encoder = new util.TextEncoder("utf-8");
    return encoder.encode(txt);
  }
}

async function calculateId(ev) {
  const commit = eventCommitment(ev);
  const sha256 = noble.utils.sha256;
  const buf = utf8_encode(commit);
  return hexEncode(await sha256(buf));
}

function eventCommitment(ev) {
  const { pubkey, created_at, kind, tags, content } = ev;
  return JSON.stringify([0, pubkey, created_at, kind, tags, content]);
}

function delegationCommitment(pk, conditions) {
  return `nostr:delegation:${pk}:${conditions}`;
}

async function signDelegationToken(privkey, unsigned_token) {
  const hash = hexEncode(await noble.utils.sha256(unsigned_token));
  return await signId(privkey, hash);
}

async function createDelegation(privkey, publisherPubkey, conditions) {
  const pubkey = getPublicKey(privkey);
  const unsigned_token = delegationCommitment(publisherPubkey, conditions);
  const token = await signDelegationToken(privkey, unsigned_token);
  return { pubkey, publisherPubkey, conditions, token };
}

function createDelegationTag(delegation) {
  const { pubkey, conditions, token } = delegation;
  return ["delegation", pubkey, conditions, token];
}

function upsert_delegation_tag(tags, delegation) {
  let found = false;
  for (const tag of tags) {
    if (tag.length >= 4 && tag[0] === "delegation") {
      tag[1] = delegation.pubkey;
      tag[2] = delegation.conditions;
      tag[3] = delegation.token;
      return;
    }
  }
  tags.push(createDelegationTag(delegation));
}

async function createDelegationEvent(publisher_privkey, ev, delegation) {
  let tags = ev.tags || [];

  upsert_delegation_tag(tags, delegation);

  ev.tags = tags;
  ev.pubkey = delegation.publisherPubkey;
  ev.id = await calculateId(ev);
  ev.sig = await signId(publisher_privkey, ev.id);
  return ev;
}

function hexChar(val) {
  if (val < 10) return String.fromCharCode(48 + val);
  if (val < 16) return String.fromCharCode(97 + val - 10);
}

function hexEncode(buf) {
  let str = "";
  for (let i = 0; i < buf.length; i++) {
    const c = buf[i];
    str += hexChar(c >> 4);
    str += hexChar(c & 0xf);
  }
  return str;
}

function base64_decode(str) {
  if (typeof Buffer !== "undefined" && Buffer) {
    return Buffer.from(str, "base64");
  } else if (typeof atob !== "undefined" && atob) {
    return atob(str);
  }
  throw new Error("no base64 implementation");
}

function getPublicKey(privkey) {
  return noble.schnorr.getPublicKey(privkey);
}

module.exports = {
  Relay,
  RelayPool,
  signId,
  verifyEvent,
  calculateId,
  getPublicKey,
  delegationCommitment,
  createDelegationTag,
  createDelegationEvent,
  createDelegation,
  signDelegationToken,
  eventCommitment,
};
