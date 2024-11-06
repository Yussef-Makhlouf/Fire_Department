const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// المجلد الذي يحتوي على الصور
const inputFolder = '../img/testimonials'; // استبدل "images" بمسار مجلد الصور
const outputFolder = '../img/output2';

// تأكد من وجود مجلد الإخراج
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// قراءة جميع الملفات في المجلد
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error("خطأ في قراءة المجلد:", err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputFolder, file);
        const outputFilePath = path.join(outputFolder, `${path.parse(file).name}.webp`);

        // تحويل الصورة إلى WebP باستخدام sharp
        sharp(inputFilePath)
            .toFormat('webp')
            .toFile(outputFilePath, (err, info) => {
                if (err) {
                    console.error(`خطأ في تحويل ${file}:`, err);
                } else {
                    console.log(`تم تحويل ${file} إلى WebP بنجاح`);
                }
            });
    });
});
