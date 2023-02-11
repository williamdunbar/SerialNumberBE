const to = require('await-to-js').default;
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service');
const { CONST } = require('../../constants/const');
const bcrypt = require('bcrypt');
const { ApiResponse } = require('../../helper/response/Api_Response');
const logService = require('../services/log.service');


const version = 1;


module.exports = {
    login: async (req, res) => {
        try {
            let { user_name, password } = req.body;
            let error, result;

            [error, result] = await to(authService.login(user_name, password));
            if (error) {
                let log = {
                    created_at: Date.now(),
                    method: req.method,
                    protocol: req.protocol,
                    path: req.path,
                    content: error,
                    ip: req.ip,
                    status: res.statusCode,
                };
                await logService.insert(log);
                return ApiResponse(res, 400, error, {}, version);
            }
            else {

                if (req.body.computer_code == result.computer_code) {

                    let log = {
                        created_at: Date.now(),
                        method: req.method,
                        protocol: req.protocol,
                        path: req.path,
                        content: "Đăng nhập thành công",
                        ip: req.ip,
                        status: res.statusCode,
                    };
                    await logService.insert(log);

                    return ApiResponse(res, 200, CONST.MESSAGE.SUCCESS, result, version);
                } else {

                    let log = {
                        created_at: Date.now(),
                        method: req.method,
                        protocol: req.protocol,
                        path: req.path,
                        content: "Mã máy không chính xác",
                        ip: req.ip,
                        status: res.statusCode,
                    };
                    await logService.insert(log);

                    return ApiResponse(res, 400, "Mã máy không chính xác, Không mượn tài khoản nhá", result, version);
                }
            }
        } catch (error) {
            return ApiResponse(res, 400, CONST.MESSAGE.ERROR, {}, version);
        }

    },
    register: async (req, res) => {
        try {
            let { password, confirm_password, computer_code } = req.body;

            let error, result;

            [error, result] = await to(Promise.all([
                authService.check_password(password, confirm_password),
                authService.check_computer_code(computer_code)
            ]));

            if (error) {
                let log = {
                    created_at: Date.now(),
                    method: req.method,
                    protocol: req.protocol,
                    path: req.path,
                    content: error,
                    ip: req.ip,
                    status: res.statusCode,
                };
                await logService.insert(log);
                return ApiResponse(res, 400, error, {}, version);
            } else {

                let log = {
                    created_at: Date.now(),
                    method: req.method,
                    protocol: req.protocol,
                    path: req.path,
                    content: "Đăng ký tài khoản thành công",
                    ip: req.ip,
                    status: res.statusCode,
                };
                await logService.insert(log);
                req.body.password = await bcrypt.hash(password, 10);
                await authService.register(req.body);
                return ApiResponse(res, 200, CONST.MESSAGE.SUCCESS, {}, version);
            }
        } catch (error) {
            return ApiResponse(res, 500, CONST.MESSAGE.ERROR, {}, version);
        }
    }
}