//This function sends object holding file structure as a return value, You can replace this object to other value as well.
function getData() {
    return root = {
        type: "dir",
        children: {
            home: {
                type: "dir",
        children: {
            myname: {
            type: "dir",
        children: {
            "filea.txt": {
            type: "file",
        },
            "fileb.txt": {
            type: "file",
        },
            "projects": {
            type: "dir",
        children: {
            mysupersecretproject: {
            type: "dir",
        children: {
            mysupersecretfile: {
            type: "file",
        },
        },
        }
        },
        },
        }
        },
        },
        }
        },
        };
}

 exports.getData=getData;