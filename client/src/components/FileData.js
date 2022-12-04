import { useEffect,useState } from "react";

function FileData(props){
   
return (
    <>
    {/* if client clicks on the file then this component will show the data of the file. */}
        <h1>{props.fileData}</h1>
    </>
)
}
export default FileData;