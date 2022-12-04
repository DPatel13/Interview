import {useState,useEffect} from "react";
import $ from  'jquery';
import FolderData from "./components/FolderData";
import FileData from "./components/FileData";
function App() {
  const [path,setPath] = useState([]);
  const [content,setContent] =useState([]);
  const [isFile,setIsFile] = useState(false);
  const [fileData,setFileData] = useState("");
  //when app starts first time it will requests for the initial path. 
  useEffect(()=>{
    getNextPath(path);
  },[]);
//This below method will take current path of traversal and send it to server to find next child.
  function getNextPath(pathArray,prevFolder){
      var getRoot = {
        "url": 'http://' + window.location.hostname+':4000'+'/path?mypath[]='+pathArray,
              "method": "GET",
              "timeout": 0,
              "headers": {
              }
      
    };
    $.ajax(getRoot).done(function (response) {
        if(response.result == '1'){
          //if response is 1 means next child is folder and response.value keeps the folder details.
            setContent([]);
            setIsFile(false);
            if(prevFolder){
              setPath(current=>[...current,prevFolder]);
            }
            //if it is a single child then add it as a singe value, otherwise as a array of values. It will be then loaded into FolderData component.
            if(response.value.length >1){
                response.value.map(function(obj,key){
                  setContent(current=>[...current,obj]);
                }
              )
            }else if(response.value.length ==1){
              setFileData("");
              setContent([response.value]);
            }
          // setContent(current=>[...current,response.value]);
        }else if(response.result == '0'){
          //if response is 2 means the type of child elementis file and contains the value of file. 
        }else if(response.result == '2'){
          setIsFile(true);
          setFileData(response.value);
        }
    }) 
  }
//If client is clicking at any point from breadcrums then, this it will take the path till clicked index and update the child value.
  function getPathFromHere(index) {
    var copyOfPath =[];
    setPath([])
      for(let i=0;i<=index;i++){
        copyOfPath[i]=path[i];
      }
      setPath(copyOfPath);
      getNextPath(path);
  }
  return (
    <div >
      <h1>ParseHub</h1>
      <ul>
        {/* It will present the clickable breadscrums. */}
      { path.map((obj,key)=>
          <li key={key}>
            <h1 style={{color: "blue"}} onClick={()=>getPathFromHere(key)}>{obj}</h1>
          </li>
        )
      }
      </ul>
      {/* This will show the childs data from which clien can click and go into it. like clicking on directory or file. */}
      <FolderData content={content}
      getNextPath={getNextPath}
      path={path}
      setPath={setPath}
      isFile={isFile}
      />
    {/* if client clicks on the file then this component will show the data of the file. */}
      <FileData
        fileData={fileData}
      />
    </div>
  );
}

export default App;
