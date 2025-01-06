const resourceService = require('../services');

const createResource = async (req, res) => {
    try {
        if (!req.body?.name || !req.body?.description) {
            throw new Error('Missing argument name')
        }
        const { name, description } = req.body;
        const resource = await resourceService.createResource({ name, description });

        return res.status(200).json(resource);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
const getListResource = async (req, res) => {
    try {
        const filters = { limit: 10, offset: 0, search: null }
        if (req.query?.limit) {
            filters.limit = req.query.limit;
        }
        if (req.query?.page) {
            filters.offset = req.query.page * filters.limit - filters.limit;
        }
        if (req.query?.search) {
            filters.search = req.query.search
        }
        const {data, count} = await resourceService.getList(filters);
        return res.status(200).json({
            data,
            total: count,
            page: req.query?.page || 1
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
const getDetailResource = async (req, res) => {
    try {
        if (!req.params?.id) {
            throw new Error('Missing parameter id')
        }
        const resource = await resourceService.getDetail(req.params?.id);

        return res.status(200).json(resource);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
const updateResource = async (req, res) => {
    try {
        if (!req.params?.id) {
            throw new Error('Missing parameter id')
        }
        if (!req.body?.name && !req.body?.description) {
            throw new Error('Missing updated arguments')
        }
        const resource = await resourceService.updateResource(req.params.id, req.body);
        return res.status(200).json(resource);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
const deleteResource = async (req, res) => {
    try {
        if (!req.params?.id) {
            throw new Error('Missing parameter id')
        }
        await resourceService.removeResource(req.params.id);
        return res.status(200).json('Delete successfully');
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createResource,
    getListResource,
    getDetailResource,
    updateResource,
    deleteResource
}