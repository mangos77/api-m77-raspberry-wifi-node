/*
    Wifi controller
*/

class Controller {
    #wifi = null
    #options = {}
    constructor() {
        const M77RaspberryWIFI = require('m77-raspberry-wifi-node')
        this.#wifi = new M77RaspberryWIFI()
    }

    init = async(options = {}) => {
        return new Promise(async (resolve, reject) => {
            const result = await this.#wifi.init(options)
            resolve(result)
        })
    }

    listInterfaces = async (req, res) => {
        const result = await this.#wifi.listInterfaces()
        res.json(result)
    }

    status = async (req, res) => {
        const result = await this.#wifi.status()
        res.json(result)
    }

    hasConnection = async (req, res) => {
        const result = await this.#wifi.hasConnection()
        res.json(result)
    }

    savedNetworks = async (req, res) => {
        const result = await this.#wifi.savedNetworks()
        res.json(result)
    }

    removeAllNetworks = async (req, res) => {
        const result = await this.#wifi.removeAllNetworks()
        res.json(result)
    }

    scan = async (req, res) => {
        const result = await this.#wifi.scan()
        res.json(result)
    }

    scanUniques = async (req, res) => {
        const result = await this.#wifi.scanUniques()
        res.json(result)
    }

    scanInTypes = async (req, res) => {
        const result = await this.#wifi.scanInTypes()
        res.json(result)
    }

    connect = async (req, res) => {
        const config_net = {...{}, ...req.body}
        const result = await this.#wifi.connect(config_net)
        res.json(result)
    }


    disconnect = async (req, res) => {
        const result = await this.#wifi.disconnect()
        res.json(result)
    }

    reconnect = async (req, res) => {
        const result = await this.#wifi.reconnect()
        res.json(result)
    }


}

module.exports = Controller