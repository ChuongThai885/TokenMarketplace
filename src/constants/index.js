const contractAddresses = require("./contractAddresses.json")
const { abi: marketplaceAbi } = require("./marketplaceAbi.json")
const { abi: erc20Abi } = require("./erc20Abi.json")

module.exports = {
    contractAddresses,
    marketplaceAbi,
    erc20Abi,
}
