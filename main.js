const SHA = require('crypto-js/sha512');

class Block{
  constructor(index,timestamp,data,previousHash=''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }
  calculateHash(){
    return SHA(this.index+this.timestamp+this.nonce+this.previousHash+JSON.stringify(this.data)).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
        // console.log(this.nonce);
    }
    console.log("Got a valid block with hash: " + this.hash + "with a nonce value: " + this.nonce);
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.startJourney()];
    this.difficulty = 5;//Math.round(Math.random()*2+3);
  }

  startJourney() {
        return new Block(0, "01/01/2018", "First block", "0");
  }

  getLatestBlock() {
        return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  checkValidity(){
    for (let i=1;i<this.chain.length;i++){
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()) return false;
      if(currentBlock.previousHash !== prevBlock.hash) return false;
    }
    return true;
  }

}
var baggicoin = new Blockchain();
var i=1;
while(true){
  console.log("Mining Block "+i+" ....");
  baggicoin.addNewBlock(new Block(i, Math.round(Math.random()*27+3)+"/01/2018", { amount: Math.round(Math.random()*10+1),
                                                                                  transaction: Math.round(Math.random()*76+4)}));
  i++;
  if(i === 40){
    console.log(JSON.stringify(baggicoin,null,2));
    break;
  }

}
