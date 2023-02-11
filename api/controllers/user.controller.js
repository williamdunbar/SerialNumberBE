const { Types } = require('mongoose');
const { CONST } = require('../../constants/const');
const { ApiResponse } = require('../../helper/response/Api_Response');
const userService = require('../services/user.service');
const version = 1;

module.exports = {
    getMe: async (req, res) => {
        try {
            let ans = await userService.getOneById(req.userId);

            return ApiResponse(res, 200, CONST.MESSAGE.SUCCESS, ans, version);

        } catch (error) {
            return ApiResponse(res, 500, CONST.MESSAGE.ERROR, {}, version);
        }
    },
    getAll: async (req, res) => {
        try {

            let filter = [
                {
                    $sort: {
                        created_at: -1
                    }
                },
                {
                    $project: {
                        password: 0
                    }
                }
            ];

            let result = await userService.getAll(filter);

            return ApiResponse(res, 200, CONST.MESSAGE.SUCCESS, result, version);

        } catch (error) {
            return ApiResponse(res, 500, CONST.MESSAGE.ERROR, {}, version);
        }
    },
}