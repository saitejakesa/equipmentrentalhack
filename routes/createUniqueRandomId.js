    
function generateRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function isIDexists(id, moduleName, collectionName){
    const count=await moduleName.countDocuments({[collectionName]:id})
  }
  async function createUniqueRandomId(min,max,moduleName,collectionName) {
    let randomId = generateRandomNumber(min, max);
    while (await isIDexists(randomId,moduleName,collectionName)) {
      randomId = generateRandomNumber(min, max);
    }
    console.log("id generated",+randomId)
    return randomId;
  }
module.exports={createUniqueRandomId: createUniqueRandomId}
