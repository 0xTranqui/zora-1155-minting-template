// @ts-nocheck

import { zoraCreator1155Impl_abi } from "contracts/zoraCreator1155Impl_abi";
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent } from "wagmi";
import { utils } from "ethers"

const zora1155ToMint = "0xCfc1B8B784938A158c2729890E0348d558Af843c"
const zoraFixedPriceStrategyGoerli = "0x10f7d171fbf4ac14a3250e9313D97b2Dfe30EcfD"
const zoraGoerliFee = "10000"
const zoraMainnetFee = "777000000000000"


export function useMint() {

    const { address } = useAccount()


    const addressMinting = address ? address : ""

    console.log("address minting", addressMinting)

    const readyToMint = !!address ? true : false;

    console.log("ready to mint:", readyToMint)

    const {config, error} = usePrepareContractWrite({
        address: zora1155ToMint, // address of collection you are minting
        abi: zoraCreator1155Impl_abi,
        args: [
            zoraFixedPriceStrategyGoerli, // minter set on contract
            1, // tokenId hardcoded as 1
            1, // quantity hardcoeded as 1
            utils.defaultAbiCoder.encode(
                ["address"],
                ["0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170"]
            )
        ],
        enabled: readyToMint,
        overrides: {value: 10000} // fee hardcoded as goerli fee x 1
    })

    console.log("error", error)

    const { 
        write,
        data,
        error: writeError,
        isError,
        isLoading,
        isSuccess,
        status
    } = useContractWrite(config)     
    
    

    return {
        write,
        data,
        error: writeError,
        isError,
        isLoading,
        isSuccess,
        status
    }
}

export default useMint