/*
* CHECK IF A FILE EXISTS
*/
function checkIfFileExists(path, success, error){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, { create: false }, success, error);
    }, fail); //of requestFileSystem
}
function fail(evt) {
    //console.log(evt.target.error.code);
    //analytics.trackEvent("Action_fail", "file_system_err", evt.target.error.code, 1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*   GROUPS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
* TOR READ DATA
*/
function got_data_FS_TO_READ(fileSystem) {
    fileSystem.root.getFile("Android/data/com.carolinebesnard.mylo/files/data.txt", { create: true}, got_data_FileEntry_TO_READ, fail);
}
function got_data_FileEntry_TO_READ(fileEntry) {
    //group_fileEntry = fileEntry;
    fileEntry.file(readDataAsText, fail);
}
function readDataAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        //console.log("Read as text");
        //console.log(evt.target.result);
        
        //var result = JSON.parse(evt.target.result);

        if(evt.target.result.length<=0){//no data in localfile system => check local storage
            //console.log("localfile data.txt null"); 
            if(localStorage.getItem("userGroups") === null && localStorage.getItem("userLocs") === null){//no data in local storage either => brand new groups
                //var userGroups = new Array();
                //console.log("localstorage null"); 
            }else{//existing groups in local storage
                //console.log("existing local storage");
                //analytics.trackEvent("Flags", "storage", "upgrade_to_file_system", 1);
                //update local file system groups
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, got_data_FS_TO_WRITE, fail);
                //
                if(localStorage.getItem("userLocs") === null){
                    //var locations = new Array(); 
                }else{
                    locations = JSON.parse(localStorage["userLocs"]);
                }
                /**/
                if(localStorage.getItem("userGroups") === null){
                    //var locations = new Array(); 
                }else{
                    userGroups = JSON.parse(localStorage["userGroups"]);
                }
                //userGroups = JSON.parse(localStorage["userGroups"]);
            }
        }else{
            var datas = JSON.parse(evt.target.result);
            userGroups = datas.groups;
            locations = datas.locs;
        }

        nb_user_group = userGroups.length; 
        //console.log(nb_user_group);
        var i = 0;
        //for(i=locations.length-1;i>=0;i--)
        for(i=0;i<userGroups.length;i++)    //user's groups ids start at 1
        {   //alert(userGroups[i].id);      // 0 id is reserved for default group (gray color)
            groups[userGroups[i].id].name = userGroups[i].name; 
        }//so here we fill the groups array from 1 to nb of user's group
        showUserGroups(displayUserDatas);
        //displayUserDatas();

    };
    reader.readAsText(file);
}
/*
* TOR WRITE GROUPS
*/
function got_data_FS_TO_WRITE(fileSystem) {
    //alert('got groups fileEntry');
    fileSystem.root.getFile("Android/data/com.carolinebesnard.mylo/files/data.txt", {create: true}, got_data_FileEntry_TO_WRITE, fail);
}
function got_data_FileEntry_TO_WRITE(fileEntry) {
    //alert('got groups fileEntry');
    fileEntry.createWriter(writeDatas, fail);
}
function writeDatas(writer) {
    //alert('write groups');
    var dataToWrite = {locs:locations,groups:userGroups};
    //get local storage groups data
    if(localStorage.getItem("userGroups") === null && localStorage.getItem("userLocs") === null){
    //var userGroups = new Array();
    //console.log("no existing localstorage"); 
    }else{
        //console.log("localstorage exists => writing local file with localstorage content");
        if(localStorage.getItem("userLocs") === null){
            //var locations = new Array(); 
        }else{
            dataToWrite.locs = JSON.parse(localStorage["userLocs"]);
        }
        /**/
        if(localStorage.getItem("userGroups") === null){
            //var locations = new Array(); 
        }else{
            dataToWrite.groups = JSON.parse(localStorage["userGroups"]);
        }
        //clear localstorage
        localStorage.removeItem("userGroups");
        localStorage.removeItem("userLocs"); 
        //console.log("datas removed from local storage");
    }
    writer.onwrite = function(evt) {
        //console.log("write successful");
    };
    var string_to_write = JSON.stringify(dataToWrite);
    writer.write(string_to_write);
}


