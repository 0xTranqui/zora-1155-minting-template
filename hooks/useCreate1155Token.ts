import { zoraCreator1155Impl_abi } from 'abi/zoraCreator1155Impl_abi'
import { zoraFixedPriceStrategy_abi } from 'abi/zoraFixedPriceStrategy_abi'
import {
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { utils, BigNumber } from 'ethers'

const zora1155ToMintFrom = '0xCfc1B8B784938A158c2729890E0348d558Af843c'
const zoraFixedPriceStrategyGoerli = '0x10f7d171fbf4ac14a3250e9313D97b2Dfe30EcfD'

// interface instance for encoding functin calls
const zora1155Interface = new utils.Interface(zoraCreator1155Impl_abi);
const zoraFPSInterface = new utils.Interface(zoraFixedPriceStrategy_abi);

// hardcoded inputs for creating new token config
const create1155Input = {
    fixedPriceStrategyAddress: zoraFixedPriceStrategyGoerli, // hardcoded address of fixed price strategy minter on goerli 
    maxSupply: BigNumber.from("18446744073709551615"), // value to create edition with no supply cap
    mintLimit: 0, // no mint limit per wallet
    nextTokenId: 0, // default to be overriden
    price: 0, // free to mint
    saleEnd: BigNumber.from("18446744073709551615"), // "forever edition value" 
    saleStart: 0, // sale begins at unix time = 0 (1970 ish)
    tokenURI: "ipfs://INSERT_YOUR_IPFS_CID", // example metadata for 1155 token can be seen here: https://ipfs.io/ipfs/bafkreifdyhfe7fyysnu5oqoewgrnry4ot74ttrz5kpkkpl7ln77ooowog4
    royaltyBPS: 0, // no secondary royalties
    royaltyRecipient: "0x0000000000000000000000000000000000000000", // no royalty recipient
    autoSupplyInterval: 0 // no auto supply royalties
}

export function useCreate1155Token() {
    
    function constructCreate1155Calls({
        fixedPriceStrategyAddress,
        maxSupply,
        mintLimit,
        nextTokenId,
        price,
        saleEnd,
        saleStart,
        tokenURI,
        royaltyBPS,
        royaltyRecipient,
        autoSupplyInterval,
    }: {
        fixedPriceStrategyAddress: `0x${string}`
        maxSupply: BigNumber
        nextTokenId: number
        price?: BigNumber
        saleEnd?: BigNumber
        saleStart?: BigNumber
        mintLimit?: number
        tokenURI: string
        royaltyBPS: number
        royaltyRecipient: `0x${string}`
        autoSupplyInterval: number
    }): `0x${string}`[] {
        if (!royaltyRecipient) {
            royaltyRecipient = "0x0000000000000000000000000000000000000000"
            autoSupplyInterval = 0
        }
        const verifyTokenIdExpected = zora1155Interface.encodeFunctionData(
            'assumeLastTokenIdMatches',
            [nextTokenId - 1]
        )
        const setupNewToken = zora1155Interface.encodeFunctionData('setupNewToken', [
            tokenURI,
            maxSupply,
        ]) as `0x${string}`
        
        let royaltyConfig = null
        if (royaltyBPS > 0 && royaltyRecipient != "0x0000000000000000000000000000000000000000") {
            royaltyConfig = zora1155Interface.encodeFunctionData(
            'updateRoyaltiesForToken',
            [
                nextTokenId,
                {
                royaltyBPS,
                royaltyRecipient,
                royaltyMintSchedule: autoSupplyInterval,
                },
            ]
            )
        }
        
        const contractCalls = [verifyTokenIdExpected, setupNewToken, royaltyConfig].filter(
            (item) => item !== null
        ) as `0x${string}`[]
        
        if (typeof price !== 'undefined') {
            const fixedPriceApproval = zora1155Interface.encodeFunctionData(
            'addPermission',
            [
                nextTokenId,
                fixedPriceStrategyAddress,
                2 ** 2, // PERMISSION_BIT_MINTER
            ]
            )
        
            const saleData = zoraFPSInterface.encodeFunctionData(
            'setSale',
            [
                nextTokenId,
                {
                pricePerToken: price,
                saleStart,
                saleEnd,
                maxTokensPerAddress: mintLimit,
                fundsRecipient: "0x0000000000000000000000000000000000000000",
                },
            ]
            )
        
            const callSale = zora1155Interface.encodeFunctionData('callSale', [
            nextTokenId,
            fixedPriceStrategyAddress,
            saleData,
            ])
        
            return [...contractCalls, fixedPriceApproval, callSale] as `0x${string}`[]
        }
    
        return contractCalls
    }

    const { data: nextTokenId } = useContractRead({
        address: zora1155ToMintFrom,
        abi: zoraCreator1155Impl_abi,
        functionName: 'nextTokenId',
    }) 

    // @ts-ignore
    const create1155Calls: any = nextTokenId ? constructCreate1155Calls({
        ...create1155Input,
        nextTokenId: nextTokenId.toNumber(),
        fixedPriceStrategyAddress: zoraFixedPriceStrategyGoerli,
    }) : null

    const { config: prepareConfig } = usePrepareContractWrite({
        address: zora1155ToMintFrom, // address of collection to mint new token to
        abi: zoraCreator1155Impl_abi,
        functionName: 'multicall',
        args: [create1155Calls],
        enabled: create1155Calls ? true : false
    })    

    const { write: newTokenWrite, data: newTokenWriteData } = useContractWrite(prepareConfig)

    const { 
        data: newTokenWaitData, 
        isError: newTokenWaitError, 
        isLoading: newTokenWaitLoading, 
        isSuccess: newTokenWaitSuccess, 
        status: newTokenWaitStatus 
    } = useWaitForTransaction({
        hash: newTokenWriteData?.hash,
    })    
    
    return {
        newTokenWrite,
        newTokenWaitData,
        newTokenWaitError,
        newTokenWaitLoading,
        newTokenWaitSuccess,
        newTokenWaitStatus
    }    
}

export default useCreate1155Token
