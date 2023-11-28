// src/api/user.js

import Users from "@/models/users";
import { connectMongoDB } from "@/db/mongoDB";
connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "GET") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        // Ambil data pengguna berdasarkan token
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: "Tidak ada token" });
        }

        const user = await Users.findOne({ token });

        if (!user) {
            return res
                .status(404)
                .json({ error: true, message: "Pengguna tidak ditemukan" });
        }

        // Mengembalikan data nama dan token
        const userData = {
            nama: user.nama,
            token: user.token,
        };

        return res.status(200).json(userData);
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}
