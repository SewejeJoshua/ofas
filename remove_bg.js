const Jimp = require('jimp');

async function removeBackground() {
    try {
        console.log("Reading image...");
        const image = await Jimp.read('public/campus_rep_student_bg.png');

        // Target background color is pure solid #0808b2 -> RGB(8, 8, 178)
        const targetR = 8;
        const targetG = 8;
        const targetB = 178;
        const tolerance = 60; // DALL-E sometimes adds noise

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // Check if pixel is close to the target dark blue background
            if (
                Math.abs(r - targetR) <= tolerance &&
                Math.abs(g - targetG) <= tolerance &&
                Math.abs(b - targetB) <= tolerance &&
                b > 100 // ensure it's a strongly blue pixel, not a shadow or dark part of the student
            ) {
                // Set alpha to 0 (fully transparent)
                this.bitmap.data[idx + 3] = 0;
            }
        });

        // Also perform a second pass to feather the edges slightly if needed, 
        // but for now, the color keying should remove the vast majority of the solid background.

        await image.writeAsync('public/campus_rep_student_transparent.png');
        console.log("Background removed and saved to public/campus_rep_student_transparent.png");
    } catch (err) {
        console.error("Error removing background:", err);
    }
}

removeBackground();
