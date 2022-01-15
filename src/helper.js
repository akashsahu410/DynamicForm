const helpers = {
    randomString: function(){
        let r = (Math.random() + 1).toString(36).substring(8);
        return r;
    },
    isEmptyObject:function(obj) {
        return Object.keys(obj).length === 0;
    },
    unionOfObjects:function(sourceObj,targetObj){
        let finalObj = [],data
        for(const x of sourceObj){
        data = x
        for(const y of targetObj){
            if(x.name === y.name && y.status === true){
            data = y
            break
            }
        }
        finalObj.push(data)
        }
        console.log(finalObj)
        return finalObj
    }
}

export default helpers;