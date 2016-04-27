import dynalite from "dynalite";

import setupDynamodb from "./setup-dynamodb";

dynalite({createTableMs: 0})
    .listen(8000, async err => {
        if (err) {
            console.log("Error starting dynalite server");
            console.log(err.stack);
            process.exit(1);
            return;
        }
        try {
            await setupDynamodb();
            console.log("dynalite started on http://localhost:8000");
        } catch (e) {
            console.log("dynalite setup error");
            console.log(e);
        }
    });
