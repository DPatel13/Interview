import { useEffect,useState } from "react";

function FolderData(props){
 //once user clicks on breadscrums then, it will take the path till the clickable index and get the child data of that.
    function settingUpPath(value,key){
        //if clicked object is file then update breadscurm and retrieve file data, if folder then get child data and update breadscrum.
        if(props.isFile){
            let lastIndex = [...props.path];
            lastIndex[props.path.length-1] = value
            props.setPath(lastIndex);
        }else{
            props.setPath(current=>[...current,value]);
        }
        
    }
    useEffect(()=>{
        props.getNextPath(props.path);
    },[props.path])
return (
    <>
    {/* This will show the childs data from which clien can click and go into it. like clicking on directory or file. */}
        {props.content.map((obj,key)=>
            <button key={key} onClick={()=>settingUpPath(obj,key)}>
                {obj}
            </button>
        )

        }
    </>
)
}
export default FolderData;