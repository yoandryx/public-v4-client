import {useMultisigData} from "./useMultisigData";
import {useMultisigAddress} from "./useMultisigAddress";
import {useSuspenseQuery} from "@tanstack/react-query";
import {PublicKey} from "@solana/web3.js";
import * as multisig from "@sqds/multisig";
import {useMultisig} from "./useServices";
import {useWallet} from "@solana/wallet-adapter-react";

export const useAccess = () => {
    const {data: multisig} = useMultisig();
    const {publicKey} = useWallet();
    if (!multisig || !publicKey){
        return false;
    }
    // if the pubkeyKey is in members return true
    const isMember = multisig.members.find((v: multisig.types.Member) => v.key.equals(publicKey));
    // return true if found
    return !!isMember;
};