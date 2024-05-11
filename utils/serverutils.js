const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"))

const boot = (app)=>{
    return new Promise(async(resolve, reject) =>{
        let bootDir = `${__dirname}/../boot`;
        const files = await fs.readdirAsync(bootDir);
        for (let file of files){
            try{
                console.log(`${bootDir}/${file}`)
                await require(`${bootDir}/${file}`)(app)
            }
            catch(e) {
                reject(e)
            }
        }
        resolve()
    })
}

module.exports = {boot}