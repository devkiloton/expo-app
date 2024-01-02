// keys.ts
import { schnorr } from "@noble/curves/secp256k1";
import { bytesToHex } from "@noble/hashes/utils";
export function getPublicKey(privateKey: string) {
  return bytesToHex(schnorr.getPublicKey(privateKey));
}
