import { zoraCreator1155Impl_abi } from 'abi/zoraCreator1155Impl_abi'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { utils, BigNumber } from 'ethers'

const zora1155ToMint = '0xCfc1B8B784938A158c2729890E0348d558Af843c'
const zoraFixedPriceStrategyGoerli = '0x10f7d171fbf4ac14a3250e9313D97b2Dfe30EcfD'

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID == '1' ? 1 : 5
const zoraFee = process.env.NEXT_PUBLIC_CHAIN_ID == '1' ? 777000000000000 : 10000

export function useMint() {
    
    const recipientAddress = "0x221C863222b5Da2539b391bC6993f8e14D96e9C8" // refraction dao mainnet address

  const { config: prepareConfig, error: prepareError } = usePrepareContractWrite({
    address: zora1155ToMint, // address of collection to mint fro
    abi: zoraCreator1155Impl_abi,
    functionName: 'mint',
    args: [
      zoraFixedPriceStrategyGoerli, // `minter` contract to use
      BigNumber.from(1), // `tokenId` hardcoded as 1
      BigNumber.from(1), // `mintQuantity` hardcoded as 1
      utils.defaultAbiCoder.encode(
        ['address'],
        [recipientAddress]
      ) as `0x${string}`,
    ],
    overrides: { value: zoraFee },
    chainId: chainId
  })

  const { write, data: writeData, error: writeError } = useContractWrite(prepareConfig)

  const { data, isError, isLoading, isSuccess, status } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  return {
    write,
    data,
    isError,
    isLoading,
    isSuccess,
    status,
  }
}

export default useMint
