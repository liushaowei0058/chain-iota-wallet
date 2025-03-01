import { Ed25519Keypair,Ed25519PublicKey } from '@iota/iota-sdk/keypairs/ed25519';
import { getFullnodeUrl, IotaClient } from '@iota/iota-sdk/client';
import { decodeIotaPrivateKey, encodeIotaPrivateKey,PublicKey } from '@iota/iota-sdk/cryptography';
import { formatAddress,fromHEX,toHEX} from '@iota/iota-sdk/utils';
import { Transaction } from '@iota/iota-sdk/transactions';
// @ts-ignore
import bech32 = require('bech32');
// @ts-ignore
import base58 = require('bs58');
import {mnemonicToSeed} from "bip39";
//测试网络
const client = new IotaClient({
    //https://api.testnet.iota.cafe
    url: getFullnodeUrl('testnet'),
});


const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/4218'/0'/0'/0'";


describe('iota unit test case', () => {
    //创建账号
    test("createAccount", async () => {
        const okWallet = "auto fun permit symbol gravity brush cross one rough gentle grit topic";
        //const  iotaWallet="lunch dial group okay pigeon lizard auction flip cycle soccer knee jealous another velvet right build broom live level crowd west keep try calm"
        // iotaWallet :   0x89937666cbae038acca40a6981211039616767a564067f233c84c5631a48560a
        //iotaprivkey1qreg08ph3tcvetfsj9r76rxfrpezgltf6gz42q8naw0vkrnndrsj67f7qul

        const keypair = Ed25519Keypair.deriveKeypair(okWallet, DEFAULT_ED25519_DERIVATION_PATH);
        const param={
            //base 64
            publicKey: keypair.getPublicKey().toIotaPublicKey(),
            //Ed25519对的Bech32秘密密钥字符串
            privateKey: keypair.getSecretKey(),
            //为了生成 32 字节 IOTA 地址，IOTA 使用 BLAKE2b（256 位输出)
            address: keypair.getPublicKey().toIotaAddress()
        }
        console.log(JSON.stringify(param))
       //{"publicKey":"AJJITMgYqkMlXxHgPOx0tre0mB77jZhC76udrguJWiXS","privateKey":"iotaprivkey1qqahtf3j7aaq7t5k9rf8w7vclc85spw7nxu2qmfmtzd8wtl68fgcxqj2xwz","address":"0xff790a2dcd080217af7425f5a26d30f99096128b454d4d7f90a6999bb8dc3276"}
    });


    //余额查询
    test("getBalance", async () => {
      const ss= getFullnodeUrl('testnet');
        const balance=await client.getBalance({
            owner: '0xff790a2dcd080217af7425f5a26d30f99096128b454d4d7f90a6999bb8dc3276',
            coinType: null  //默认查询iota
        })
        //balance=totalBalance/9位数
        //{"coinType":"0x2::iota::IOTA","coinObjectCount":1,"totalBalance":"6996039200"}
        console.log(JSON.stringify(balance));

    })

    //私钥推公钥,地址
    test("importPrivateKeyAddress", async () => {
       const secretKey1 = 'iotaprivkey1qqahtf3j7aaq7t5k9rf8w7vclc85spw7nxu2qmfmtzd8wtl68fgcxqj2xwz';
        const { secretKey } = decodeIotaPrivateKey(secretKey1);
        //使用 getSecretKey 方法将密钥对导出到 Bech32 编码的密钥。
        const keypair = Ed25519Keypair.fromSecretKey(secretKey);

        const toIotaPublicKey = keypair.getPublicKey().toIotaPublicKey();
        const toIotaAddress = keypair.getPublicKey().toIotaAddress();
        console.log(toIotaPublicKey);
        console.log(toIotaAddress);
    })




    // 发送交易
    test("sendTransaction", async () => {
        // Generate a new Ed25519 Keypair
        const secretKey1 = 'iotaprivkey1qqahtf3j7aaq7t5k9rf8w7vclc85spw7nxu2qmfmtzd8wtl68fgcxqj2xwz';
        const { secretKey } = decodeIotaPrivateKey(secretKey1);
        //使用 getSecretKey 方法将密钥对导出到 Bech32 编码的密钥。
        const keypair = Ed25519Keypair.fromSecretKey(secretKey);

        const tx = new Transaction();
        //send coin  1100/(10*9)
        const [coin] = tx.splitCoins(tx.gas, [1100]);
        tx.setGasOwner("0xff790a2dcd080217af7425f5a26d30f99096128b454d4d7f90a6999bb8dc3276")
        tx.setSender("0xff790a2dcd080217af7425f5a26d30f99096128b454d4d7f90a6999bb8dc3276")
        const  toAddress="0x7be6c69befe1dcbae5c0c11c283575bba35e82204968492c73aa3e3c25daaaec"
        tx.transferObjects([coin],toAddress);
        const {digest} = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
        });
        console.log(digest);
        // {
        //     result: {
        //         digest: 'J6XjKuLChBLL3BooYEa9hcPvJ29wbhBVDVw6aQJWFT4n',
        //             confirmedLocalExecution: false
        //     }
        // }
        //https://explorer.rebased.iota.org/txblock/J6XjKuLChBLL3BooYEa9hcPvJ29wbhBVDVw6aQJWFT4n
    })


});