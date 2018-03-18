const SHA256 = require("crypto-js/sha256");
// const x= 2;
class Block {
    constructor(blockNumber, timestamp, data, previousHash = '') {
        this.blockNumber = blockNumber;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nounce=this.calculateNounce();
    }

    
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.nounce + JSON.stringify(this.data)).toString();
    }
    calculateNounce(){
        
        return (this.blockNumber+2);
    }
}

class Blockchain{
    constructor() {
        
        this.chain = [this.createGenesisBlock()];
        
    }

    createGenesisBlock() {
        return new Block(0, "18/03/2018", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    ChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let Miner = new Blockchain();
Miner.addBlock(new Block(1, "31/03/2018", { amount: 4 }));
Miner.addBlock(new Block(2, "31/03/2018", { amount: 8 }));

console.log(JSON.stringify(Miner, null, 4));

// // Check if chain is valid (will return true)
// console.log('Blockchain valid? The ans is = ' + Miner.ChainValid());

// // Let's now manipulate the data
// Miner.chain[1].data = { amount: 100 };


// // Check our chain again (will now return false)
// console.log("Blockchain valid?  The ans is =  " + Miner.ChainValid());