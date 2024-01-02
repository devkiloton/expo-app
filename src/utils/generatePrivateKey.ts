// keys.ts
import { schnorr } from "@noble/curves/secp256k1";
import { bytesToHex } from "@noble/hashes/utils";
export function generatePrivateKey() {
  return bytesToHex(schnorr.utils.randomPrivateKey());
}
