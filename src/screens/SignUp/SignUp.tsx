import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { generatePrivateKey } from "../../utils/generatePrivateKey";
import { getPublicKey } from "../../utils/getPublicKey";

export const SignUp = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [addressesGenerated, setAddressesGenerated] = useState(0);
  const [loading, setLoading] = useState("false");
  const [doneGenerating, setDoneGenerating] = useState(false);
  const VanityPair = async () => {
    setLoading("true");
    setAddressesGenerated(0);
    let svk = generatePrivateKey();
    let pvk = getPublicKey(svk);
    let i = 0;
    while (pvk.substring(0, prefix.length) !== prefix) {
      svk = generatePrivateKey();
      pvk = getPublicKey(svk);
      i++;
      if (i % 3000 === 0) {
        await new Promise((r) => setTimeout(r, 0.01));
        setAddressesGenerated(i);
      }
    }
    setLoading("false");
    setPrivateKey(svk);
    setPublicKey(pvk);
    setAddressesGenerated(i);
    setDoneGenerating(true);
  };

  useEffect(() => {
    VanityPair().then(() => {
      console.log(
        privateKey,
        publicKey,
        addressesGenerated,
        loading,
        doneGenerating
      );
    });
  }, []);
  return <Text>SignUp</Text>;
};
