class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        // cargo la lista de objetos en el DOM
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            switch (list[i].type) {
                case 0: // Lampara                     
                    items += "<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                case 1: // Persiana                    
                    items += "<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                // Agrego el case para que reconozca como type = 3 a los veladores    
                case 3: // Veladores                  
                    items += "<li class='collection-item avatar'> \
                            <img src='images/velador_c.png' alt='' class='circle blue'> \
                            <span class='title'>" + list[i].name + "</span> \
                            <p>" + list[i].description + "<br> \
                            </p> \
                            <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                        <label> \
                                                                        Off \
                                                                        <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                        <span class='lever'></span> \
                                                                        On \
                                                                        </label> \
                                                                    </div></a> \
                        </li>";
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
}
class Main {
    handleEvent(evt) {
        let obj = this.myf.getElementByEvent(evt);
        console.log("click en objeto:" + obj.id);
        //let sw: HTMLElement = this.myf.getElementByEvent(evt);
        //console.log("click en device:"+sw.id);
        if (obj.id.startsWith("btn")) {
            console.log("click en boton:" + obj.id);
            switch (obj.id) {
                case "btn-all":
                    this.buttonColorContol(obj.id);
                    break;
                case "btn-light":
                    this.buttonColorContol(obj.id);
                    break;
                case "btn-window":
                    this.buttonColorContol(obj.id);
                    break;
                case "btn-lamp":
                    this.buttonColorContol(obj.id);
                    break;
            }
        }
        if (obj.id.startsWith("dev")) {
            console.log("click en sw:" + obj.id);
            let data = { "id": obj.id, "state": this.view.getSwitchStateById(obj.id) };
            this.myf.requestPOST("devices", data, this);
        }
    }
    buttonColorContol(button) {
        let btn_all = this.myf.getElementById("btn-all");
        let btn_light = this.myf.getElementById("btn-light");
        let btn_window = this.myf.getElementById("btn-window");
        let btn_lamp = this.myf.getElementById("btn-lamp");
        switch (button) {
            case "btn-all":
                btn_all.style.backgroundColor = "blue";
                btn_light.style.backgroundColor = "grey";
                btn_window.style.backgroundColor = "grey";
                btn_lamp.style.backgroundColor = "grey";
                break;
            case "btn-light":
                btn_all.style.backgroundColor = "grey";
                btn_light.style.backgroundColor = "blue";
                btn_window.style.backgroundColor = "grey";
                btn_lamp.style.backgroundColor = "grey";
                break;
            case "btn-window":
                btn_all.style.backgroundColor = "grey";
                btn_light.style.backgroundColor = "grey";
                btn_window.style.backgroundColor = "blue";
                btn_lamp.style.backgroundColor = "grey";
                break;
            case "btn-lamp":
                btn_all.style.backgroundColor = "grey";
                btn_light.style.backgroundColor = "grey";
                btn_window.style.backgroundColor = "grey";
                btn_lamp.style.backgroundColor = "blue";
                break;
        }
    }
    handleGETResponse(status, response) {
        if (status == 200) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            for (let i in data) {
                let sw = this.myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
            let btn_all = this.myf.getElementById("btn-all");
            btn_all.addEventListener("click", this);
            let btn_light = this.myf.getElementById("btn-light");
            btn_light.addEventListener("click", this);
            let btn_window = this.myf.getElementById("btn-window");
            btn_window.addEventListener("click", this);
            let btn_lamp = this.myf.getElementById("btn-lamp");
            btn_lamp.addEventListener("click", this);
            btn_all.style.backgroundColor = "blue";
            btn_light.style.backgroundColor = "grey";
            btn_window.style.backgroundColor = "grey";
            btn_lamp.style.backgroundColor = "grey";
        }
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    main() {
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        this.myf.requestGET("devices", this);
    }
}
window.onload = () => {
    let obj = new Main();
    obj.main();
};
