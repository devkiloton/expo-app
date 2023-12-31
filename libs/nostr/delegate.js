const { createDelegation, createDelegationTag, getPublicKey } = require(".");

async function make_delegation(privkey, publisher_privkey) {
  const publisher_pubkey = getPublicKey(publisher_privkey);

  const conditions = "created_at<1669341617&kind=1";
  const delegation = await createDelegation(
    privkey,
    publisher_pubkey,
    conditions
  );
  console.log(JSON.stringify(createDelegationTag(delegation)));
}

make_delegation(process.argv[2], process.argv[3]);
