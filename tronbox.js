require("dotenv").config();

module.exports = {
  networks: {
    development: {
      privateKey:
        "C5D18F26F5381AC0D72EC361A5F4DCAC740E7A12F816708648B253F73F72A4C3",
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "http://127.0.0.1:9090",
      solidityNode: "http://127.0.0.1:9090",
      eventServer: "http://127.0.0.1:9090",
      network_id: "*"
    },
    mainnet: {
      privateKey: process.env.PK,
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "https://api.trongrid.io",
      solidityNode: "https://api.trongrid.io",
      eventServer: "https://api.trongrid.io",
      network_id: "*"
    },
    shasta: {
      privateKey: process.env.PK,
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",
      network_id: "*"
    }
  }
};