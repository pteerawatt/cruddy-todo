const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueID();
  // items[id] = text;
  // callback(null, {id, text})

  // whatever cb we use, will have access to (null, counterString)
  // want to create new textfile as {CounterString}.txt with content as {text}
  counter.getNextUniqueId((err, uniqueID) =>{
    // write text with name uniqueID.txt with text as content
    let dirForID = path.join(exports.dataDir, `${uniqueID}.txt`);
    // console.log(dirForID);
    fs.writeFile(dirForID, text, (err) => {
      if (err) {
        throw ('Unable to create item');
      } else {
        callback(null, {'id': uniqueID, 'text': text});

      }
    });
  });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);

};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }

  // find the text at the id
  // pass it in to the callback

  // use dataDir add id to path
  let filePath = path.join(exports.dataDir, `${id}.txt`);
  // read file at id
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      // assign that to text
      callback(null, { 'id': id, 'text': fileData });
    }
  });
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  // find value at id
  // changing the value at such id to new text
  // pass new value and id to a callback

  // findPath
  let filePath = path.join(exports.dataDir, `${id}.txt`);
  // readfile (callback ())
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      //    if err
      //        callback
      callback(new Error(`No item with id: ${id}`));
    } else {
      //    if success
      //        callback pass in id and text
      callback(null, { 'id': id, 'text': text });
    }
  });
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
