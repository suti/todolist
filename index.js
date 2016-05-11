/**
 * Created by suti on 16/5/10.
 */
$(document).ready(function () {
    if(LocalStorage("")!=null){
        var list=readList(LocalStorage(""));
        setList(list[0],list[1]);
    }else{
        alert("欢迎使用TODOLIST");
    }
    $("button").click(function () {
        var con=$("input").val();
        saveList(con,"undo",-1);
    });
    $("li").click(function () {
        if($(this).attr("class")=="undo"){
            saveList("","done",$(this).attr("index").substring(2,3));
            $(this).removeClass("undo");
            $(this).addClass("done");
        }else {
            saveList("","undo",$(this).attr("index").substring(2,3));
            $(this).removeClass("done");
            $(this).addClass("undo");
        }
    })
    $("li").dblclick(function () {
        if($(this).attr("class")=="done"){
            saveList("","",$(this).attr("index").substring(2,3));
            $(this).remove();
        }else {
        }
    })
});

function LocalStorage(con) {
    if(con!=""){
        localStorage.todolist=con;
    }else{
        if(localStorage.todolist!=null){
            return JSON.parse(localStorage.todolist);
        }else {
            return null;
        }
    }
}

function setList(content,type){
    for(var i=0;i<content.length;i++){
        var temp=$(".con-list");
        temp.append('<li index="li'+i+'" class="'+type[i]+'"><a>'+content[i]+'</a></li>');
    }
}

function removeList() {
    var count=$(".con-list").children(".done");
    for(var i;i<count.length;i++){
        count[i].remove();
    }
}

function readList(jsonObj){
    var con=new Array();
    con[0]=new Array();
    con[1]=new Array();
    if(jsonObj!=null){
        var content=[];
        var type=[];
        var jsonList=jsonObj.list;
        for(var i=0;i<jsonList.length;i++){
            content[i]=jsonList[i].content;
            type[i]=jsonList[i].type;
        }
        con[0]=content;
        con[1]=type;
    }
    return con;
}

function saveList(content,type,int) {
    var con=new Array();
    con[0]=new Array();
    con[1]=new Array();
    var txt="";
    con=readList(LocalStorage(""));

    if(content!=""){
        con[0].push(content);
        con[1].push(type);
        for(var i=0;i<con[0].length;i++){
            txt+='{"content":"'+con[0][i]+'","type":"'+con[1][i]+'"},';
        }
    }else {
        if(type!=""){
            for(var i=0;i<con[0].length;i++){
                if(i==int){
                    txt+='{"content":"'+con[0][i]+'","type":"'+type+'"},';
                }
            }
        }else {
            for(var i=0;i<con[0].length;i++){
                if(i!=int){
                    txt+='{"content":"'+con[0][i]+'","type":"'+con[1][i]+'"},';
                }
            }
        }
    }
    txt=txt.substring(0,txt.length-1);
    txt='{"list":['+txt+']}';
    LocalStorage(txt);
}