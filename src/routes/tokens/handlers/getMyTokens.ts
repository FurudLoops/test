import handleError from "../../../helpers/handle-error";
import { algow } from '../../../AlgoIPFS';
import * as algosdk from 'algosdk';

const getMyTokens = async (req, res) => {
    try {
        // Construct the transaction
        let params = await algow.algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;

        // from, to, amount, closeRemainderTo, note, suggestedParams
        const note = algosdk.encodeObj({marc: 'note'});
        let txn = algosdk.makeAssetTransferTxn(algow.account.addr, req.body.wallet, undefined, undefined, params.fee, req.body.quantity, params.firstRound, params.lastRound, note, params.genesisHash, params.genesisID, 19267953);
        txn.fee = params.fee;

        // Sign the transaction
        let signedTxn = txn.signTxn(algow.account.sk);
        let txId = txn.txID().toString();

        // Submit the transaction
        await algow.algodClient.sendRawTransaction(signedTxn).do()

        res
            .status(200)
            .json({ result: 'OK' })
    } catch (err) {
        handleError(err, res)
    }

}

export default getMyTokens;