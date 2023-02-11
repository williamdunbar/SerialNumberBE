let logModel = require('../models/log.model');

module.exports = {
    getAll: async (filter) => {
        let log = await logModel.aggregate(filter);
        return log;
    },
    insert: async (entity) => {
        return await logModel.create(entity);
    }
}