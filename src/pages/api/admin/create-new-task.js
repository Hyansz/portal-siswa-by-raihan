import Users from "@/models/users";
import Tasks from "@/models/tasks"; // Import model tasks
import createNewTask from './create-new-task';
import getTasks from './get-tasks'; // Import endpoint get-tasks
import getTaskById from './get-task-by-id'; // Import endpoint get-task-by-id
import editTask from './edit-task'; // Import endpoint edit-task
import deleteTask from './delete-task'; // Import endpoint delete-task

export { createNewTask, getTasks, getTaskById, editTask, deleteTask };
import { connectMongoDB } from "@/db/mongoDB";
connectMongoDB();

export default async function handler(req, res) {
    try {
        // Pemeriksaan metode, hanya izinkan metode POST
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "Metode tidak diizinkan" });
        }

        // Pemeriksaan token di headers Authorization
        const token = req.headers.authorization;
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

        // Destructuring data yang diterima dari client
        const { date, deadline, link, note } = req.body;

        // Pemeriksaan apakah data yang dibutuhkan sudah ada
        if (!date || !deadline || !link) {
            return res.status(400).json({
                error: true,
                message: "Data yang Anda kirimkan belum lengkap",
            });
        }

        // Siapkan data yang akan disimpan
        const data = {
            date,
            deadline,
            note,
            link,
            teacher_id: user.id,
            status: 1,
        };

        // Simpan data ke database menggunakan model Tasks
        const tasks = new Tasks(data);
        await tasks.save();

        // Berikan respons sukses
        return res
            .status(201)
            .json({ message: "Data sudah berhasil diinputkan" });
    } catch (error) {
        console.error("Error:", error);
        return res
            .status(500)
            .json({ message: "Silahkan hubungi tim support" });
    }
}
