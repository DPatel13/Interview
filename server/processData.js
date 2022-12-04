function findChildData(value,key,pathFromClient) {
    let matched =0;
    let keyMatched="";
    //I have complete path from client side, So i will travers through actuall data untill the last index of path.
    if(pathFromClient[key]){
        //check if the next child is directory or file, If directory then traverse into depth if not then send the data of the file.
        if(value.type == "dir"){
            //find if current directory is empty or has child subdirectories
            if(value.children !== null){
                //if it has child sub directories then try find matching child from the client's path, that way we will know from which directory we have to move next.
                Object.keys(value.children).forEach(keys => {
                    if(keys == pathFromClient[key]){
                        //now check the type of the matched child, if file then set matched as 2. otherwise if folder then set it as 1.
                        if(value['children'][keys]["type"]=="file" && value['children'][keys]["type"]!= undefined){
                            keyMatched=keys;
                            matched=2;
                        }else{
                            matched = 1;
                        }
                    }
                });
                
            }
            
        }else if(value.type == "file"){
            //this else statement is not necessary 
        }
        //if matched found then check if this is the last step of clients path, if yes then send childrens as result.
        if(matched==1 && pathFromClient.length == key+1){
            return {result:1,value:Object.keys(value['children'][pathFromClient[key]]['children'])};
        //if matched found But it is not last step of clients path, then traverse to the next matching directory from path by recursive calling of the same function. 
        }else if(matched==1 && pathFromClient.length != key+1){
            return findChildData( value.children[pathFromClient[key]],key+1,pathFromClient); 
        //if matched is 2 mean the matching type is file then send the file data as a result.
        }else if(matched==2){
            return {result:2,value:"This is the data for file named "+keyMatched};
        }
        //if at the starting or any poitnt path is not readable than send previous successful steps.
    }else {
        return {result:1,value:Object.keys(value['children'])};
    }
    
}
exports.findChildData=findChildData;