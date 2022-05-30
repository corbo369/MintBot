import { providers, Wallet } from "ethers";
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";

//CONSTANTS
const GWEI = 10n ** 9n
const ETHER = 10n ** 18n
const CHAIN_ID = 1;
const provider = new providers.InfuraProvider(CHAIN_ID)
const FLASHBOTS_ENDPOINT = "https://relay.flashbots.net";

//TRANSACTION DATA
const VALUE = ETHER / 200n;
const PRIORITY = GWEI * 1n;
const MAX = GWEI * 65n;
const DATA = "";
const TO = "";

//PRIVATE KEYS
const one = new Wallet("956b4fac7ee4c20f28252235fc08aec17479c93900f3548929cabebdaf8bd5d6", provider)
const two = new Wallet("dcef48bd79235cb92555220e2ad7154fcdc3c6b159a4ac59fad05487583ad028", provider)
const three = new Wallet("ebc40bc9e31dbddf62d7bbf60575d823ed3b4c03f909c9e12422f233a8a66b9e", provider)

async function main() {
    const flashbotsProvider = await FlashbotsBundleProvider.create(provider, Wallet.createRandom(), FLASHBOTS_ENDPOINT)
    provider.on('block', async (blockNumber) => {
        console.log(blockNumber)

        const bundleSubmitResponse = await flashbotsProvider.sendBundle(
            [
                {
                    transaction: {
                        chainId: CHAIN_ID,
                        type: 2,
                        value: VALUE,
                        data: DATA,
                        maxFeePerGas: MAX,
                        maxPriorityFeePerGas: PRIORITY,
                        to: TO
                    },
                    signer: one
                },
                {
                    transaction: {
                        chainId: CHAIN_ID,
                        type: 2,
                        value: VALUE,
                        data: DATA,
                        maxFeePerGas: MAX,
                        maxPriorityFeePerGas: PRIORITY,
                        to: TO
                    },
                    signer: two
                },
                {
                    transaction: {
                        chainId: CHAIN_ID,
                        type: 2,
                        value: VALUE,
                        data: DATA,
                        maxFeePerGas: MAX,
                        maxPriorityFeePerGas: PRIORITY,
                        to: TO
                    },
                    signer: three
                }
            ], blockNumber + 1
        )

        if ('error' in bundleSubmitResponse) {
            console.warn(bundleSubmitResponse.error.message)
            return bundleSubmitResponse
        }

        console.log(await bundleSubmitResponse)
    })
}

main()
