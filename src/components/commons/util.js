export const getStringName = (listObjects, keyName) => {
      let stringName = '';
      if(listObjects) {
          listObjects.forEach((object,index) => {
              if(index !== 0) {
                  stringName+= ", ";
              }
              stringName += object[keyName];
          })
      }
      return stringName;

  }