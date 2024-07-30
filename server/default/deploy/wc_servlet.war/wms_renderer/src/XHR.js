

export default class XHR {

    static ajax({method = "GET", url, success, error, data, dataType = "json"}){
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onreadystatechange = function(){
                //debugger;
                let response = xhr.responseText;
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(XHR.parseData(dataType, response));
                    }else{
                        reject(response);
                    }
                }
            };
            xhr.send(data);
        });

        promise.then(success, error);
        return promise;
    }

    static post(url, data, success, error){
        return XHR.ajax({
            url: url,
            method: "POST",
            data: data,
            success: success,
            error: error
        });
    }

    static get(url, success, error){
        return XHR.ajax({
            url: url,
            method: "GET",
            success: success,
            error: error
        });
    }

    static parseData(type, data){
        let res = data;
        switch(type){
            case "json": try { res = JSON.parse(data) }catch(e){} break;
        }
        return res;
    }
}