const { Op } = require('sequelize');
const Resources = require('../models/resources');

const createResource = async (payload) => {
    try {
        const checkExistName = await Resources.findOne({ where: { name: payload.name }});
        if (checkExistName) {
            throw new Error('Resource name is existed')
        }
        return await Resources.create(payload);
    } catch (error) {
        throw new Error(error)
    }
};
const getList = async (filters) => {
    try {
        const pagination = {
            limit: filters.limit,
            offset: filters.offset
        }
        let filterConditions = {};

        if (filters.search) {
            filterConditions.where = {
                // [Op.or]: [
                //     {
                //         name: { [Op.iLike]: `%${filters.search}%` }
                //     },
                //     {
                //         description: { [Op.iLike]: `%${filters.search}%` }
                //     }
                // ]
                name: filters?.search ? { [Op.iLike]: `%${filters.search}%` } : {}
            }
        }

        const [data, count] = await Promise.all([
            Resources.findAll({
                ...pagination,
                ...filterConditions
            }),
            Resources.count(filterConditions)
        ])
        return {data, count};
    } catch (error) {
        throw new Error(error)
    }
};
const getDetail = async (id) => {
    try {
        const resourceDetail = await Resources.findOne({ id });
        if (!resourceDetail) {
            throw new Error('Resource id is not existed')
        }
        return await resourceDetail;
    } catch (error) {
        throw new Error(error)
    }
};
const updateResource = async (id, payload) => {
    try {
        const [rowsUpdated, updatedResources] = await Resources.update(payload, { where: { id }, returning: true});

        if (rowsUpdated === 0) {
            throw new Error('Resource not found or no changes made.');
          }
      
        return updatedResources[0];
    } catch (error) {
        throw new Error(error)
    }
};
const removeResource = async (id) => {
    try {
        const rowsDeleted = await Resources.destroy({ where: { id }})
        
        if (rowsDeleted === 0) {
            throw new Error('Resource not found or already deleted.');
        }

        return;
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = {
    createResource,
    getList,
    getDetail,
    updateResource,
    removeResource
}