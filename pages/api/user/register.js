// database
import { userDb } from '../../../database'
// API Guard
import { apiGuestGuard } from '../../../src/utils/apiGuard';
//
import { userAgentFromString } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ----------------------------------------------------------------------

export default async function handler(req, res) {
    apiGuestGuard(req, res, ['POST'], async (i18n) => {   
        try{
            const { headers, body } = req;
            const csrf_token = headers['x-csrf-token'];
            if (!csrf_token) {
                return res.status(401).json({ message: i18n.__('unauthorized') });
            }
    
            const { email, password, fullName } = body;
        
            const user = await userDb.insertUser(email, "student", email, password, fullName);
            const { os, browser } = userAgentFromString(headers['user-agent']);
            const access_token = crypto.randomBytes(64).toString('hex');

            await userDb.insertUserSignedInDevice(user.id, browser.name, os.name, csrf_token, access_token);
            const payload = {
                id: user.id,
                username: user.username, 
                role: user.app, 
                email: user.email,
                access_token: access_token
            }

            return res.status(201).json({
                jwtToken: jwt.sign(payload, process.env.JWT_TOKEN_SECRET),
                user: {                
                    id: user.id,
                    username: user.username, 
                    role: user.role, 
                    email: user.email,
                    fullName: user.full_name
                }
            });
        } catch(e) {
            if (e == "User exists") {
                return res.status(409).json({ message: i18n.__('email-exists') });
            } else if (e == "Data is incompleted") {
                return res.status(400).json({ message: i18n.__('please-enter-all-required-fields') });
            } else  {
                return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
            }
        }
    })
}
