import { zoraCreator1155Impl_abi } from 'contracts/zoraCreator1155Impl_abi'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from 'wagmi'
import { utils, BigNumber } from 'ethers'

const zora1155ToMint = '0xCfc1B8B784938A158c2729890E0348d558Af843c'
const zoraFixedPriceStrategyGoerli = '0x10f7d171fbf4ac14a3250e9313D97b2Dfe30EcfD'
const zoraGoerliFee = 10000

// const zoraMainnetFee = '777000000000000'

export function useMint() {
  const { config: prepareConfig, error: prepareError } = usePrepareContractWrite({
    address: zora1155ToMint, // address of collection you are minting
    abi: zoraCreator1155Impl_abi,
    functionName: 'mint',
    args: [
      zoraFixedPriceStrategyGoerli, // minter set on contract
      BigNumber.from(1), // tokenId hardcoded as 1
      BigNumber.from(1), // quantity hardcoded as 1
      utils.defaultAbiCoder.encode(
        ['address'],
        ['0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170']
      ) as `0x${string}`,
    ],
    overrides: { value: zoraGoerliFee }, // fee hardcoded as goerli fee x 1
    // chainId: 5,
  })

  console.log('Contract prepare error', prepareError)

  const {
    write,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
  } = useContractWrite(prepareConfig)

  return {
    write,
    data,
    error: writeError,
    isError,
    isLoading,
    isSuccess,
    status,
  }
}

export default useMint
