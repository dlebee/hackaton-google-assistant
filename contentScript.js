function setRecordingState(isRecording) {
    chrome.runtime.sendMessage({
        type: 'recordingState',
        enabled: isRecording
    }, function(response) {
        console.log(response);
    });
}

document.addEventListener('keypress', function(e) {
    if (e.shiftKey == true && e.keyCode == 32)
        {
            alert(2);
            var txt = "research";
            var res = findLinkInPage(txt);
            if(res.length)
            alert(res[0].getAttribute("href"));
        }
});

function getAbsPath(path)
{
    try
    {
        new URL(path);
        return path;
    }
    catch(e)
    {
        return new URL(window.location.href+"/"+path).href;
    }
}

function makeElIfNotExist(id,tagname)
{
    if(!document.getElementById(String(id)))
    {
        var newel=document.createElement(tagname);
        newel.setAttribute("id",id);
        document.body.appendChild(newel);
    }
    else
    {
        document.getElementById(String(id)).innerHTML="";
    }
}

var divId="divzzzz";
var styleId="stylezzz";

function closeLinks()
{
    document.getElementById(divId).outerHTML="";
}

function showLinksHTML(txt)
{
    var res=findLinkInPage(txt);
    var showArr=[];
    for(var i=0;i<res.length;i++)
    {
        var el=res[i];

        showArr.push({
            link:getAbsPath(el.getAttribute("href")),
            txt:el.innerText
        })
    }
    
    if(document.getElementById(styleId))
        document.getElementById(styleId).innerHTML="";
    if(document.getElementById(divId))
        document.getElementById(divId).innerHTML="";
 
    makeElIfNotExist(styleId,"style");
    makeElIfNotExist(divId,"div");

    var divTxt="";
    for(var i=0;i<showArr.length;i++)
    {
        divTxt+="<b onclick='closeLinks()'>Exit</b><div onclick='"+window.open(showArr[i].link, '_blank')+"'><a href='"+showArr[i].link+"' target='_blank'>";
        divTxt+="Link: "+showArr[i].link+"<br/><br/>";
        divTxt+="Text: "+showArr[i].txt;
        divTxt+="</a></div>";
    }
    var cssTxt=`
    #divzzzz {  box-shadow: rgba(0,0,0,0.7) 0px 0px 100px 1000px;overflow-y:auto;position: fixed; left: 10%; top: 10%; width: 80%; height: 80%; background-color: white; z-index: 9999999;}
    div#divzzzz > div {
        border: black solid;
        margin: 20px;
        font-size: 50px;
        cursor:pointer;
    }
    div#divzzzz > b
    {
        text-align: center;
    float: left;
    left: 0;
    width: auto;
    height: auto;
    position: relative;
    font-size: 5rem;
    border: red 1px solid;
    left: 50%;
    transform: translateX(-50%);
    }
    div#divzzzz > div:nth-child(2)
    {
        margin-top:200px;
    }
    `;
    document.getElementById(divId).innerHTML=divTxt;
    document.getElementById(styleId).innerHTML=cssTxt;
}

function findLinkInPage(txt)
{
    function isIncludedInText(element)
    {
        var eltxt = element.innerText.toLowerCase();

        if (!eltxt)
            return false;

        if (eltxt.indexOf(txt.toLowerCase()) > -1)
            return true;

        return false;
    }

    function checkIfIsLink(doc)
    {
        arr = [];
        if (doc.tagName.toLowerCase() == "a")
        {
            if (isIncludedInText(doc))
            {
                arr.push(doc);
            }
        }
        var children = Array.from(doc.children||[]);

        for (var i = 0; i < children.length; i++)
        {
            var child = children[i];
            arr=arr.concat(checkIfIsLink(child));
        }

        return arr;
    }

    var dp = new DOMParser();
    var doc = document.documentElement;
    var arr=checkIfIsLink(doc);
   
    return arr;
}