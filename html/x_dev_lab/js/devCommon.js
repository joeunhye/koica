fn_callBody();
function fn_callBody(){
    var allElements = document.getElementsByTagName('*');
    var backNode = document.getElementsByTagName('body')[0].innerHTML;
    
    Array.prototype.forEach.call(allElements, function(el) {     
        var callCnt = 0;     
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.innerHTML = this.responseText;
                    console.log(el.tagName +' Loaded');
                    
                    if(el.tagName == 'BODY'){
                        const template = document.createElement('div');
                        template.innerHTML = backNode;
                        document.getElementsByTagName('aside')[0].parentNode.appendChild(template);
                    }
                    
                }
            };
            // 동기호출 해야 함. 비동기시 wvScript.js 하고 타이밍 안맞음.
            xhttp.open('GET', includePath, false);
            xhttp.send();
        }
    });
}

