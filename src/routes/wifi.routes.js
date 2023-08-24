const express = require('express');
const router = express.Router();
const path = require('path')
const config = require(path.join(__basedir, 'config'))

// Import controller
const Controller = require( path.join(__basedir, 'controllers', 'wifi.controller') )
const controller = new Controller()


// Middleware options
async function md_options(req, res, next){
    const options = {...{}, ...config.wifi_config, ...req.query}
    const result = await controller.init(options)
    if(result.success === false){
        return res.json(result)
    } else {
        next()
    }
}

// List wifi devices
router.get('/list_interfaces', controller.listInterfaces)

// Status of wifi device
router.get('/status', md_options, controller.status)

// Check if there is a connection
router.get('/has_connection', md_options, controller.hasConnection)

// List of saved networks
router.get('/saved_networks', md_options, controller.savedNetworks)

// Delete all saved networks
router.delete('/remove_all_networks', md_options, controller.removeAllNetworks)

// List of all available networks
router.get('/scan', md_options, controller.scan)

// List of available networks separated by frequency group
router.get('/scan_in_types', md_options, controller.scanInTypes)

// Connect to network
router.post('/connect', md_options, controller.connect)

// Disconnect 
router.put('/disconnect', md_options, controller.disconnect)

// Reconnect
router.put('/reconnect', md_options, controller.reconnect)


/*
// Logout de usuario
router.get('/logout', validToken.validate, auth.logout)

// Verificar token
router.get('/login', (req, res) => {
    validToken.validate(req, res, false);
})
*/


module.exports = router;