- 简介
    - 成立于 2015 年，IOTA 是一个公共物品基础设施，将信任带入我们的数字世界。它是世界上最成熟的区块链项目之一，使构建者、企业和政府能够创建 DLT 项目并以安全、可信和可验证的方式相互交流
    - IOTA是一个开放、低费用、可扩展的分布式账本，专为物联网而建，旨在支持无摩擦数据和价值转移。IOTA旨在成为物联网的交易结算和数据传输层。它的分布式账本Tangle基于一种被称为有向无环图（DAG）的数据结构
    - IOTA 生态系统分别使用 Move 和 EVM/Solidity 智能合约，在层 1 和层 2 中实现可编程性

- 官网地址:https://www.iota.org/
- 开发文档:https://docs.iota.org/
- 区块游览器
  - https://explorer.iota.org/
- 质押
  - 支持质押
- 模型: 
  - iota-mainnet UTXO
  - iota-evm 帐户模型
- 精度
  - 9
- 主网共识机制: ( Tangle 结构和 Coordicide 方案)
  - Tangle 结构： 
    - IOTA 使用有向无环图（DAG）而不是区块链。
    - 每个新交易需要验证之前的两个交易，交易可以并行处理
  - Coordicide 方案
    - 旨在移除早期版本中的中心化组件 Coordinator，实现完全去中心化
    - 结合了多种技术，包括 Mana 系统、快速概率共识（FPC）、分布式随机数生成（DRNG）和细胞自动机
- 节点搭建: https://docs.iota.org/operator/iota-full-node/docker

- 确认位
  - BNB(BEP20) 15次确认位 
  - MIOTA网络 1个区块确认位

- 加密算法:
    - 支持三种加密: Ed25519 Secp256k1 Secp256r1
    - 为了生成 32 字节 IOTA 地址，IOTA 使用 BLAKE2b（256 位输出）哈希函数对签名方案标志 1 字节与公钥字节进行拼接后进行哈希。
    - IOTA 地址目前支持纯 Ed25519、Secp256k1、Secp256r1 和 MultiSig，分别对应 0x00、0x01、0x02 和 0x03 的标志字节
      - https://docs.iota.org/ts-sdk/typescript/cryptography/keypairs
      - https://docs.iota.org/developer/cryptography/transaction-auth/keys-addresses

- RPC节点 : https://wiki.iota.org/build/networks-endpoints/
  - 主网
    - https://api.stardust-mainnet.iotaledger.net
    - 游览器资源管理器
      - https://explorer.iota.org/mainnet
      - 水龙头
        - https://faucet.testnet.iotaledger.net/
        
  - IOTA EVM
    - https://json-rpc.evm.iotaledger.net
    -  游览器资源管理器
      - https://explorer.evm.iota.org
    - IOTA EVM Testnet
        - 水龙头领取
          - https://evm-toolkit.evm.testnet.iotaledger.net/

- SDK: https://docs.iota.org/ts-sdk/typescript/
  - npm: https://www.npmjs.com/package/@iota/iota-sdk
    -  @iota/iota-sdk/client - 与 IOTA RPC 节点交互的客户端。
    -  @iota/iota-sdk/bcs - 一个为 IOTA 预定义类型的 BCS 构建器。
    -  @iota/iota-sdk/transaction - 用于构建和交互事务的实用工具。
    -  @iota/iota-sdk/keypairs/* -  KeyPair 实现。
    -  @iota/iota-sdk/verify - 交易和消息验证方法。
    -  @iota/iota-sdk/cryptography - 加密技术共享的类型和类。
    -  @iota/iota-sdk/multisig -  多签名的实用工具。
    -  @iota/iota-sdk/utils - 用于格式化和解析各种 IOTA 类型的工具。
    -  @iota/iota-sdk/faucet -请求 IOTA 水龙头的方法
  - ClientApi: https://docs.iota.org/ts-sdk/api/client/classes/IotaClient#gettransactionblock

- 扫链RPC
  - https://docs.iota.org/iota-api-ref
- 查询余额
```
  {
    "jsonrpc": "2.0",
    "method": "iotax_getBalance",
    "id": 1,
    "params": [
    "0xff790a2dcd080217af7425f5a26d30f99096128b454d4d7f90a6999bb8dc3276"
    ]
  }
  
  {
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"coinType": "0x2::iota::IOTA",
		"coinObjectCount": 2,
		"totalBalance": "2995019600"
	}
}
```



