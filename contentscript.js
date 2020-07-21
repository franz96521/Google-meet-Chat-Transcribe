window.onload = (event) => {
    document.head.innerHTML += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
    meetChat()
    $(document).on('click', '#barra_btn', function() {
        colorSwitch()
    });
    addObserverIfDesiredNodeAvailable();


};
var estado = false;
var data = "";
const fileName = 'file.txt';
var lastName = "";
const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (estado) {
            if (mutation.addedNodes.length) {
                //console.log('Añadidos', mutation.addedNodes[0])
                var chat = document.querySelectorAll('.oIy2qc')
                var names = document.querySelectorAll('.YTbUzc')
                lastName = names[names.length - 1].innerText;
                names[names.length - 1].setAttribute('data-timestamp', timestamp);
                for (var i = 0; i < chat.length; i++) {
                    //console.log('chat', i)
                    if (!chat[i].getAttribute('data-timestamp')) {
                        console.log(chat[i].getAttribute('data-message-text'))
                        var timestamp = new Date();
                        chat[i].setAttribute('data-timestamp', timestamp);

                        data += lastName + " " + chat[i].getAttribute('data-message-text') + "\n";
                        //data += chat[i].getAttribute('data-sender-name') + "\n";
                    }
                }
            }
        }
    })
});


function addObserverIfDesiredNodeAvailable() {
    var cambios = document.querySelector('.z38b6.CnDs7d.hPqowe');
    if (!cambios) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
    }
    const obsercerOptions = {
        atributes: true,
        childList: true,
        subtree: true

    };
    observer.observe(cambios, obsercerOptions);
}
async function meetChat() {
    var chat = document.querySelector('.NSvDmb.cM3h5d')
    if (chat) {
        var cc = document.querySelector('.f0WtFf')
        var button = '<div class="uArJ5e UQuaGc kCyAyd kW31ib SyIese M9Bg4d transcribechat" id="transcribechat" " ><div class="n8i9t "id="barra_btn"><div class="XFtqNb "><i class="google-material-icons "  aria-hidden="true" id= "logo_btn">chat</i></div><div class="I98jWb "  id="texto_btn">' + "save cc" + '</div></div></div>'
        cc.insertAdjacentHTML('beforebegin', button)
        colorSwitch()
    } else {
        var sl = setTimeout(function() {
            meetChat();
        }, 1000);
    }
}

function colorSwitch() {
    console.log("cambio")
    if (!estado) {
        document.getElementById("logo_btn").style.color = "#00796b";
        document.getElementById("texto_btn").style.color = "#00796b";
        estado = true;
    } else {
        document.getElementById("logo_btn").style.color = "#3c4043";
        document.getElementById("texto_btn").style.color = "#3c4043";
        estado = false;
        download(fileName, data);
    }

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    data = "";
}