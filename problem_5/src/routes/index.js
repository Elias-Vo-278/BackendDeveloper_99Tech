const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/resources', controllers.createResource);
router.get('/resources', controllers.getListResource)
router.get('/resources/:id', controllers.getDetailResource)
router.put('/resources/:id', controllers.updateResource)
router.delete('/resources/:id', controllers.deleteResource)

module.exports = router;