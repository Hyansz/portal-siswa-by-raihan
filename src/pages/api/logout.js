import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    nis: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        default: "",
    },
});

const Users = mongoose.models.User || mongoose.model("User", userSchema);

const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://raihanregitappqita:R4ihanregita@ppqitadb.ebdkl0n.mongodb.net/portal-siswa",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res
                .status(405)
                .json({ error: true, message: "metode tidak diijinkan" });
        }

        const { token } = req.body;

        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: "tidak ada token" });
        }

        const user = await Users.findOne({ token });

        if (!user || !user.nis) {
            return res.status(400).json({
                error: true,
                message: "token tidak valid atau sudah logout",
            });
        }

        const updatedUser = await Users.findOneAndUpdate(
            { nis: user.nis },
            { token: "" },
            { new: true }
        );

        return res
            .status(200)
            .json({ error: false, message: "berhasil logout" });
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            error: true,
            message: "ada masalah harap hubungi developer",
        });
    }
}
