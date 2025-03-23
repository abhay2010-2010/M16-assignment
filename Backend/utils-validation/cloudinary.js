const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// require("dotenv").config(); // ✅ Load environment variables

// ✅ Configure Cloudinary properly
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ Corrected
    api_key: process.env.CLOUDINARY_API_KEY,       // ✅ Corrected
    api_secret: process.env.CLOUDINARY_API_SECRET  // ✅ Corrected
});

// ✅ Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // ✅ Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("✅ File uploaded successfully:", response.url);

        // ✅ Remove local file after successful upload
        fs.unlinkSync(localFilePath);
        
        return response;
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error.message);

        // ✅ Remove local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

module.exports = uploadOnCloudinary;
