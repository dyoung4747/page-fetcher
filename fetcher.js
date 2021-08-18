const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const URL = args[0]
const FILE_PATH = args[1]

const fetchPage = function(url, path) {

  request(url, (error, response, body) => {
    console.log('error: ', error);
    console.log('statusCode: ', response && response.statusCode);
    console.log('body: ', body);

    if (response.statusCode !== 200) { //read status code and throw Error if not 200
      process.exit();
      console.log('Something went wrong');
    }
    
    fs.writeFile(path, body, (err) => {
      if(err) {
        throw Error(err.message)
      }
      const bytes = fs.statSync(path).size //read the bytes
      console.log(`Downloaded and saved ${bytes} bytes to ${FILE_PATH}`)
    })
  });
  
};

fetchPage(URL, FILE_PATH)

