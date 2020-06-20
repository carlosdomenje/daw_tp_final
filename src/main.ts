interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:number;
}
class ViewMainPage
{
    myf:MyFramework;

    constructor(myf:MyFramework)
    {
        this.myf = myf;    
    }
    
   
    showDevices(list:DeviceInt[]):void
    {
        // cargo la lista de objetos en el DOM
        let devicesUl:HTMLElement = this.myf.getElementById("devicesList");
        
        let items:string="";
        for(let i in list)
        {   
            let checkedStr="";
            if(list[i].state=="1")
                checkedStr="checked";

            switch(list[i].type)
            {
                case 0: // Lampara                     
                    items+="<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;  
                case 1: // Persiana                    
                    items+="<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>"+list[i].name+"</span> \
                                <p>"+list[i].description+"<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";  
                    break;
                // Agrego el case para que reconozca como type = 2 a los veladores    
                case 2: // Veladores                  
                items+="<li class='collection-item avatar'> \
                            <img src='images/velador_c.png' alt='' class='circle blue'> \
                            <span class='title'>"+list[i].name+"</span> \
                            <p>"+list[i].description+"<br> \
                            </p> \
                            <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                        <label> \
                                                                        Off \
                                                                        <input type='checkbox' id='dev_"+list[i].id+"' "+checkedStr+"> \
                                                                        <span class='lever'></span> \
                                                                        On \
                                                                        </label> \
                                                                    </div></a> \
                        </li>";  
                break;                                                                                                        
            }
        }

        devicesUl.innerHTML=items;
    }

    getSwitchStateById(id:string):boolean {
        let el:HTMLInputElement = <HTMLInputElement>this.myf.getElementById(id);       
        return el.checked;
    }


}
class Main implements GETResponseListener, EventListenerObject, POSTResponseListener
{ 
    myf:MyFramework;
    view:ViewMainPage;

    
    
    handleEvent(evt:Event):void
    {
        
        let obj: HTMLElement = this.myf.getElementByEvent(evt);
        console.log("click en objeto:"+ obj.id);

        
        // Busca el objeto btn el cual simboliza a un boton presionado
        if(obj.id.startsWith("btn")){
            console.log("click en boton:"+ obj.id);
            switch(obj.id){
                case "btn-all":
                    this.buttonColorContol(obj.id);
                    this.myf.requestGET("/devices?filter=0",this);
                    break;
                case "btn-light":
                    this.buttonColorContol(obj.id);
                    this.myf.requestGET("/devices?filter=1",this);
                    break;
                case "btn-window":
                    this.buttonColorContol(obj.id);
                    this.myf.requestGET("/devices?filter=2",this);
                    break;
                case "btn-lamp":
                    this.buttonColorContol(obj.id);
                    this.myf.requestGET("/devices?filter=3",this);
                    break;
            }
        }
        // Si el objeto presionado, tiene cabeceta "dev", se presiono un switch
        if(obj.id.startsWith("dev")){
            console.log("click en sw:"+ obj.id);
            let data:object = {"id":obj.id,"state":this.view.getSwitchStateById(obj.id)};
            this.myf.requestPOST("devices",data,this);
        }

       
        
    }

/* ******************************************************************* 
 * Funcion para controlar el color del boton presionado
 * - Cuando se presiona un boton este se pone en azul
 * - Los demas se ponen de color gris simulando que no estan activos.
 * *******************************************************************/
    buttonColorContol(button:string){
        let btn_all:HTMLElement = this.myf.getElementById("btn-all");
        let btn_light:HTMLElement = this.myf.getElementById("btn-light");
        let btn_window:HTMLElement = this.myf.getElementById("btn-window");
        let btn_lamp:HTMLElement = this.myf.getElementById("btn-lamp");
         
        switch (button){
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

    handleGETResponse(status:number,response:string):void{
      if(status==200)
      {
          console.log(response);
          let data:DeviceInt[] = JSON.parse(response);
          console.log(data);
          this.view.showDevices(data);    
          
          for(let i in data)
          {
              let sw:HTMLElement = this.myf.getElementById("dev_"+data[i].id);
              sw.addEventListener("click",this);                
          }
      }
    }

    handlePOSTResponse(status:number,response:string):void{
        if(status==200)
        {
            console.log(response);
        }
    }
    
    // Carga los botones a sus variables y agrega evento click de cada uno
    // Se definen colores de cada uno
    loadButtons(){
        let btn_all:HTMLElement = this.myf.getElementById("btn-all");
        btn_all.addEventListener("click",this);
            
        let btn_light:HTMLElement = this.myf.getElementById("btn-light");
        btn_light.addEventListener("click",this);
    
        let btn_window:HTMLElement = this.myf.getElementById("btn-window");
        btn_window.addEventListener("click",this);
    
        let btn_lamp:HTMLElement = this.myf.getElementById("btn-lamp");
        btn_lamp.addEventListener("click",this);
    
        btn_all.style.backgroundColor = "blue";
        btn_light.style.backgroundColor = "grey";
        btn_window.style.backgroundColor = "grey";
        btn_lamp.style.backgroundColor = "grey";
    }

    main():void 
    { 
        this.myf = new MyFramework();
    
        this.view = new ViewMainPage(this.myf);
        
        // Se realiza la consulta de los dispositivos con filtro 0
        // Se mostraran todos los dispositivos
        this.myf.requestGET("/devices?filter=0",this);
    
        // Se cargan los eventos listeners de los botones.
        this.loadButtons();
        
    } 
} 
 
window.onload = () => {
    let obj = new Main(); 
    obj.main();
};
 

