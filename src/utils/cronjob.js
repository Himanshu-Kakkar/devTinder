const cron  = require("node-cron");
// subDays to subtract days from todays date

const sendEmail = require("./sendEmail");
const {subDays, startOfDay, endOfDay} = require("date-fns");
const ConnectionRequestModel = require("../models/connectionReq");

// This Cron job is run at ...time
// 1 * seconds (optional)
// 2 * minute
// 3 * hour
// 4 * day of month
// 5 * month
// 6 * day of week
// * means every

// To practice at what time
// https://crontab.guru/

// to calculate yesterday date or other calucated date wrt todays date
// npm package date-fns

// npm package moment

// This job will run at 8 am morning daily "0 8 * * *"
cron.schedule("0 15 * * *", async ()=> {
    // sample 
    // console.log("Hello World " + new Date());

    // Send Emails to all people who got requests the previous day
    try {
        // 1 din phle ki date
        const yesterday = subDays(new Date(), 0);
        // yesterday kitne baje start hua
        const yesterdayStart = startOfDay(yesterday);
        // yesterday kitne baje end hua
        const yesterdayEnd = endOfDay(yesterday);
        // pending requests of yesterday
        const pendingRequests = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                // older way if not use date-fns package
                // $gte: new Date(new Date().setDate(new Date().getDate() -1)),
                // $lt: new Date(),
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map(req=> req.toUserId.emailId))];

        console.log(listOfEmails);

        for(const email of listOfEmails){
            // send emails
            try {
                const res = await sendEmail.run("new frined request pending for " + email,
                    "There can be more requests, please login to devTinder to make friends");
                console.log(res);

            } catch (err) {
                console.log(err);
            }
            
        }
    } catch (err) {
        console.log(err);
    }

})