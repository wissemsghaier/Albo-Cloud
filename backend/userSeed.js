import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectToDatabase from "./db/db.js";

const userRegister = async () => {
    await connectToDatabase();

    try {
        // Déclaration du mot de passe
        const plainPassword = "admin";

        // Hachage du mot de passe avec bcrypt (10 rounds)
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Création de l'utilisateur avec le mot de passe hashé
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword, // Stocker uniquement le hash
            role: "admin",
        });

        await newUser.save();
        console.log("✅ Utilisateur enregistré avec succès !");
        console.log("🔑 Mot de passe hashé :", hashedPassword);
    } catch (error) {
        console.error("❌ Erreur lors de l'inscription :", error);
    }
};

userRegister();