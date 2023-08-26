***Si quieres ver el documento en español, por favor consulta el archivo README_es.md***

***My natural language is Spanish. All texts have been translated with Google Translator.***
---

# api-m77-raspberry-wifi-node

**Node.js** server with **express** that creates an API with the functionality of the [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node) module that I developed earlier in which you can configure the **Raspberry Pi** Wifi network using **wpa_cli** from **wpa_supplicant**.

For developers who need to create a frontend with the functionality of the [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node) module, it will be much easier. implement it as backend.


### Why do I do it?

Same as with the [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node) module. Because I have benefited a lot from the work of other people and organizations that offer development modules and I want to give something back to the community.

I hope you find it very useful and recommend it so that it reaches more developers :-)


## Install
From git
```
git clone https://github.com/mangos77/api-m77-raspberry-wifi-node.git
cd api-m77-raspberry-wifi-node
npm install
```

From npm
```
mkdir api-m77-raspberry-wifi-node
cd api-m77-raspberry-wifi-node
npm install api-m77-raspberry-wifi-node --no-save
mv node_modules/api-m77-raspberry-wifi-node/* ./
rm -rf node_modules
npm install
```


## Config
It is very easy to configure the package, it will be done in two files:

### package.json
It is optional and only to modify the execution scripts to pass environment variables, such as the port for each type of execution:
```
"scripts": {
    "dev": "PORT=8081 NODE_ENV=development node src/index",
    "start": "PORT=8080 NODE_ENV=production node src/index"
},
```

### src/config.js
In this file is the configuration of all the operation for the execution of the API

There are two blocks to configure depending on whether the execution is development or production:
```
const config = () => {
    const config_dev = {}
    const config_prod = {}
```

If run in production mode with the environment variable ***NODE_ENV=production*** ***config_prod will overwrite the values ​​of config_dev***

The values ​​to adjust are:
- *port*: By default the PORT environment variable is taken, otherwise 8081, but you can set the desired value
- *allowHosts*: In a simple array that can contain: domain names, ip addresses or iface=[Wifi interface]. This is to provide security by only accepting API calls to a given url, for example if you only want the API to be accessible from http://127.0.0.1:8081 or http://localhost then the array should be ['localhost', '127.0.0.1']. In the case of the ***iface*** the API will obtain the associated IP address automatically.
- *wifi_config*: JSON object that will set the default values ​​in the API calls and are based on the parameters of the init() method of [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node) (device, debugLevel, scan_timeout, connect_timeout)

Example:
```
const config_dev = {
    name: pkjson.name,
    version: pkjson.version,
    production: false,
    port: process.env.PORT || 8081,
    allowHosts: ['localhost', '127.0.0.1', 'iface=eth0'],
    wifi_config: { debugLevel: 2 }
}

const config_prod = {
    production: true,
    port: process.env.PORT || 8080,
    allowHosts: ['localhost', '127.0.0.1'],
    wifi_config: { debugLevel: 0 }
}
```

## Documentation
In the docs folder you will find two files:
- *endpoints.pdf*: PDF with the documentation of the endpoints
- *postman_collection.json*: Postman collection to be imported and used


## Endpoints
In order to understand all the responses of each endpoint, it can be of great help to see the documentation of the module on which this api is based [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node)

___

The available endpoints are:

### GET /api/wifi/list_interfaces
List available Wifi interfaces
- No parameters required

---
***IMPORTANT NOTE***
All of the following endpoints can ***optionally*** be sent with the following parameters in the URL (*device*, *debugLevel*, *scan_timeout*, *connect_timeout*).

These values ​​have higher priority than those specified in ***config.js -> wifi_config*** and are used to give more control of the actions if required.

---

### GET /api/wifi/status
Wifi interface status

### GET /api/wifi/has_connection
Know if the interface has a connection to a Wi-Fi network or not

### GET /api/wifi/saved_networks
List of saved Wi-Fi networks

### DELETE /api/wifi/remove_all_networks
Delete all saved networks

### GET /api/wifi/scan
List of all Wi-Fi networks available within reach of the device

### GET scan_in_types
List of all Wi-Fi networks available within reach of the device **organized by type of connection**

### POST /api/wifi/connect
Establish connection to a Wi-Fi network
- Requires sending data in the request body:
```
{
    "ssid": "mangos77",
    "psk": "asdfasd3322Fs",
    "bssid": "",
    "removeAllNetworks": false,
    "hidden": false
}
```
- *ssid* - The ssid of the network you want to connect to
- *psk* - Network password. **Empty string if it is an open network**
- *bssid* - (Optional) It is used to fix the connection to a bssid of the ssid, one of its uses is when the same ssid is multi-band and you need to connect to a specific one
- *removeAllNetworks* - (Optional) In case you want to remove all saved networks before configuring the new connection
- *hidden* - (Optional) Define if it is a hidden network


***More details of these parameters in the connect() method of [**m77-raspberry-wifi-node**](https://github.com/mangos77/m77-raspberry-wifi-node)***


### PUT /api/wifi/disconnect
Disconnect the Wi-Fi from the device

### PUT /api/wifi/reconnect
Try to reconnect to one of the saved Wi-Fi networks

# Extra information

## Run the server from boot
You can install [**pm2**](https://pm2.keymetrics.io/docs/usage/quick-start/) to manage startup, number of instances etc.



## Host the frontend
- Load your frontend in the ***public*** directory (haven't tested it yet)
- You can install and configure [NGINX](https://www.nginx.com/) as a web server


## Redirect to port 80
By default it is not possible for you to ask to set port 80 for execution as ports lower than 1024 are only accessible by the user ***root*** or by ***sudo**.

But you can fix it with:
- *iptables*: `sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 8081`
- You can create a proxy redirect with [NGINX](https://www.nginx.com/)


---
I hope it helps you and please tell me about any errors or comments
___
