const SHA1 = require("crypto-js/sha1");
// const x= 2;
class Block {
    constructor(blockNumber, nounce, data, previousHash = '') {
        this.blockNumber = blockNumber;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
        this.nounce=nounce;
    }

    
    calculateHash() {
        return SHA1(this.blockNumber + this.previousHash + this.nounce + JSON.stringify(this.data)).toString();
    }
    // calculateNounce(){
        
    //     return (this.blockNumber*2);
    // }
    pangaBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}

class Blockchain{
    constructor() {
        
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        
    }

    createGenesisBlock() {
        return new Block(1, 1, "Genesis block 1", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.pangaBlock(this.difficulty);//is par sara time lag gaya
        this.chain.push(newBlock);
    }

    isValid() {


        // for (let i = 1; i < this.chain.length; i++){
        // const currentBlock = this.chain[10]
        // this.hash = '00' + calculateHash();

        // }

        //     if (currentBlock.hash !== this.hash) {
            
        //         nounce++;
        //     }
        
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
Miner.addBlock(new Block(2, 2,  "data2"));
Miner.addBlock(new Block(3, 3, "data3"));
Miner.addBlock(new Block(4, 4, "data4"));
Miner.addBlock(new Block(5, 5, "data5"));
Miner.addBlock(new Block(6, 6, "data6"));
Miner.addBlock(new Block(7, 7, "data7"));
Miner.addBlock(new Block(8, 8, "data8"));
Miner.addBlock(new Block(9, 9, "data9"));
Miner.addBlock(new Block(10, 10,  "data10"));


console.log(JSON.stringify(Miner, null, 4));

// // // Check if chain is valid (will return true)
// console.log('Blockchain valid? The ans is = ' + Miner.isValid());

// // ub ye existing chain ko manipulate kariegy to invalid hojaegi chain
// Miner.chain[1].data = { amount: 100 };
// Miner.chain[1].previousHash = "6287342g42g4u2487";



// // Again check (now it will return false)
// console.log("Blockchain valid?  The ans is =  " + Miner.isValid());

// console.log('Mining block 1');
// savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));

// console.log('Mining block 2');
// savjeeCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));