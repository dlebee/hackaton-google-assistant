document.addEventListener('keypress', function(e) {
    console.log(e);
    if (e.shiftKey == true && e.keyCode == 32)
        {
            alert(2);
            var txt = "research";
            var res = findLinkInPage(txt);
            if(res.length)
            alert(res[0].getAttribute("href"));
        }
});

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

function showLinksHTML(txt)
{
    var res=findLinkInPage(txt);
    var showArr=[];
    for(var i=0;i<res.length;i++)
    {
        var el=res[i];

        showArr.push({
            link:el.getAttribute("href"),
            txt:el.innerText
        })
    }
    

    var SearchEl=
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