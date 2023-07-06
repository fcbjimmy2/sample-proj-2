// database
import { userDb } from '../../../database'
// API Guard
import { apiGuestGuard } from '../../../src/utils/apiGuard';
//
import { userAgentFromString } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
// only office auth
import { onlyofficeAuth } from '../../../helper/onlyoffice';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
    apiGuestGuard(req, res, ['POST'], async (i18n) => {
        try {
            const { headers, body } = req;
            
            const csrf_token = headers['x-csrf-token'];
            if (!csrf_token) {
                return res.status(401).json({ message: i18n.__('unauthorized') });
            }
    
            const { email, password } = body
            if (!email || !password) {
                return res.status(400).json({ message: i18n.__('email-password-required') });
            }
            
            const userDetail = await userDb.getUserByUsernameOrEmail(email);
            const passwordIsValid = !!userDetail && !!userDetail.password && bcrypt.compareSync(password, userDetail.password);

            if (!passwordIsValid) {
                return res.status(401).json({ message: i18n.__('email-password-incorrect') });
            }            
            
            const { os, browser } = userAgentFromString(headers['user-agent']);
            const access_token = crypto.randomBytes(64).toString('hex');

            await userDb.insertUserSignedInDevice(userDetail.user_guid, browser.name, os.name, csrf_token, access_token);
            const payload = {
                id: userDetail.user_guid,
                username: userDetail.username, 
                role: userDetail.app, 
                email: userDetail.email,
                access_token: access_token
            }

            const onlyoffice_token = await onlyofficeAuth.getAuthTokenByUser(userDetail.email);

            return res.status(200).json({
                jwtToken: jwt.sign(payload, process.env.JWT_TOKEN_SECRET),
                user: {
                    id: userDetail.user_guid,
                    username: userDetail.username, 
                    role: userDetail.app, 
                    email: userDetail.email,
                    fullName: userDetail.full_name,
                    photo: userDetail.photo,
                    onlyoffice_token: onlyoffice_token,
                }
            });
        } catch (e) {
            if (e == "User does not exist") {            
                return res.status(401).json({ message: i18n.__('email-password-incorrect') });
            } else {
                return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
            }
        }
    })
}
