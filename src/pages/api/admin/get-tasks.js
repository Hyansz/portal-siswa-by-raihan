import Tasks from "@/models/tasks";
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

        // Pemeriksaan token di headers Authorization
        const token = req.headers.authorization;

        console.log("token:", token);
        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: "Tidak ada token" });
        }

        // Cek apakah user ada
        const user = await Users.findOne({ token });
        console.log("user: ", user);

        // Jika user tidak ditemukan
        if (!user || !user.nis) {
            return res.status(400).json({
                error: true,
                message: "Token tidak valid",
            });
        }

        // Cek apakah sebagai admin
        if (user.role !== 1) {
            return res.status(400).json({
                error: true,
                message:
                    "Anda tidak memiliki hak akses/authorization sebagai admin",
            });
        }

        const tasks = await Tasks.find({});

        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}