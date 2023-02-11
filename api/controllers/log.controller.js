const { CONST } = require('../../constants/const');
const { ApiResponse } = require('../../helper/response/Api_Response');
const logService = require('../services/log.service');
const version = 1;

module.exports = {
    getAll: async (req, res) => {
        try {

            let filter = [{
                $sort: {
                    created_at: -1
                }
            }];

            let result = await logService.getAll(filter);

            return ApiResponse(res, 200, CONST.MESSAGE.SUCCESS, result, version);

        } catch (error) {
            return ApiResponse(res, 500, CONST.MESSAGE.ERROR, {}, version);
        }
    },
}