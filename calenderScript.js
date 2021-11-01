const currentDate = new Date();
const date = new Date();                                                                //saves the Date() function as "date"
document.querySelector(".scheduler").id = "hidden";

const renderCalendar = () => {                                                          //This function creates the calender

    date.setDate(1);

    const monthDays = document.querySelector(".days");                                  //this gets the <div class ="days></div> from popup.html and saves it as the constant "monthDays"


    const lastDay = new Date(                                                           //this takes the current month and year, and subtracts one from the date to get the day before the first of that month. used to find the value of the previous day
        date.getFullYear(),
        date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(                                                       //this variable takes what numerical day the last day of the previous month will be.
        date.getFullYear(),
        date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();                                                //

    const lastDayIndex = new Date(                                                      //
        date.getFullYear(),
        date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;                                              //this takes the amount of days in the lastDayIndex, subtracts 1, an subtracts it from 7 in order to find the 

    const months = [                                                                    //Finds the name value for the numerical counterpart that the Date() function outputs (e.g. 0 becomes January, 1 becomes February, etc.)
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".date h1").textContent = months[date.getMonth()] + ' ' + date.getFullYear();        //displays the current selected month and year at the top of the calender

    document.querySelector(".date p").innerHTML = new Date().toDateString();                                    //displays today's date below the selected month and year

    

    let days = "";                                                                                              //initializes the days variable, which will be used to hold the div class .days


    for (let x = firstDayIndex; x > 0; x--) {                                                                   //this creates x numbers of div classes titled "prev-dates" which will store the dates come before the current selected month's, in which x represents the firstDayIndex
        days += `<div class="prev-date${x}">${prevLastDay - x + 1}</div>`;
    }


    
    for (let i = 1; i <= lastDay; i++) {                                                                        //creates div classes for both today and all other dates in the current selected month
        if (
            i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
        ) {
            days += `<div class="today">${i}</div>`;
           
            
        } else {
            days += `<div class="day${i}">${i}</div>`;
        }
        
    }

    for (let j = 1; j <= nextDays; j++) {                                                                        //this creates divs for the dates following the current selected month   

        days += `<div class="next-date${j}">${j}</div>`;
    }

    monthDays.innerHTML = days;                                                                                  //gives the string "days" the value of the constant "monthDays", which is equal to the div class ".days"


    for (let j = 1; j <= nextDays; j++) {                                                                        //this adds a listener for clicks on the "next-dates" div classes, which when activated will increase the current selected month by one, and store information on the last day clicked.
        document.querySelector(`.next-date${j}`).addEventListener("click", () => {
            date.setMonth(date.getMonth() + 1);
            console.log(`You clicked: ${date.getMonth() + 1} / ${j} / ${date.getFullYear()}`);
            document.querySelector(".scheduler h1").innerHTML = `${date.getMonth() + 1} / ${j} / ${date.getFullYear()}`;
            document.querySelector(".scheduler").id = "";
            renderCalendar();
            document.getElementById("time").value = `${date.getHours()}:${date.getMinutes()}`;
            if (j === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                document.querySelector(`.today`).id = "selectedDate";
            } else {
                console.log(j);
                document.querySelector(`.day${j}`).id = "selectedDate";
            }
            
        });

    }
    

    for (let x = firstDayIndex; x > 0; x--) {                                                                     //adds a listener for clicks on the "prev-dates" div classes, which when clicked will decrease the current selected month by one and store the last day clicked.

        document.querySelector(`.prev-date${x}`).addEventListener("click", () => {

            date.setMonth(date.getMonth() - 1);

            document.querySelector(".scheduler h1").innerHTML = `${date.getMonth() + 1} / ${prevLastDay - x + 1} / ${date.getFullYear()}`;
            document.querySelector(".scheduler").id = "";
            renderCalendar();
            document.getElementById("time").value = `${date.getHours()}:${date.getMinutes()}`;
            document.querySelector(`.day${prevLastDay - x + 1}`).id = "selectedDate";

        });

    }

    for (let i = 1; i <= lastDay; i++) {                                                                          //this loop adds click listeners on the "today" and "day" divs, which store the last clicked day when clicked
        if (
            i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
        ) {          

            document.querySelector(`.today`).addEventListener("click", () => {                                                                              //I know, i know, this whole for loop is a pain to read. I'll try to document it to the best of my abilities, though. I'm sure there is a better way to write this but it is currently 2:29 AM and I can't think straight and I probably won't come back to fix it. Sorry.
                for (let q = 1; q <= lastDay; q++) {                                                                                                        //checks every single day in the current month for the "day(some number)" and "today" divs, and clears any tags they may have. this is so that only one day can be selected at once
                    if (                                                                                                                                                            
                        q === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()          //checks if the variable q's value is today's date                                    
                    ) {                                                                                                                                                                     
                        document.querySelector(`.today`).id = "";                                                                                           //if it is today's date, it clears its tags                                                    
                    } else {                                                                                                                                                             
                        document.querySelector(`.day${q}`).id = "";                                                                                         //if it isn't today's date, it clears its tags. the reason the if else statment is necessary is because today's date is stored as today, rather than day(some number).                                    
                    }                                                                                                                                                                           
                }
                if (date.getMinutes() < 10) {
                    console.log('test');

                    var currentMinutes = `0${date.getMinutes()}`;
                    console.log("zero added to minutes");
                }
                else {
                    currentMinutes = `${date.getMinutes()}`;

                }

                if (date.getHours() < 10) {
                    
                    var currentHours = `0${date.getHours()}`;
                    console.log("zero added to hourss");
                }
                else {
                    currentHours = `${date.getHours()}`;

                }

                document.getElementById("time").value = (`${currentHours}:${currentMinutes}`);
                document.querySelector(`.today`).id = "selectedDate";                                                                                       //sets todays date to  "selectedDate"
                                                                                   //"opens" the scheduler                                    
                document.querySelector(".scheduler").id = "";
                document.querySelector(".scheduler h1").innerHTML = `${date.getMonth() + 1} / ${i} / ${date.getFullYear()}`;                                   //displays the date in the scheduler
            });                                                                                                                                                                                 
        } else {                                                                                                                                                                                
            document.querySelector(`.day${i}`).addEventListener("click", () => {                                                                            //checks if the selected date is any day other than today's date                              
                for (let q = 1; q <= lastDay; q++) {                                                                                                        //checks every single day in that month                                    
                    if (                                                                                                                                                                        
                        q === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()          //checks if the variable q's value is today's date
                    ) {                                                                                                                                                              
                        document.querySelector(`.today`).id = "";                                                                                           //clears today's tag                                    
                    } else {                                                                                                                                                                    
                        document.querySelector(`.day${q}`).id = "";                                                                                         //clears day(some number)'s tag                                   
                    }                                                                                                                                                                        
                }
                
                if (date.getMinutes() < 10) {
                    console.log('test');
                    
                    var currentMinutes = `0${date.getMinutes()}`;
                    console.log("zero added to minutes");
                }
                else {
                    currentMinutes = `${date.getMinutes()}`;

                }

                if (date.getHours() < 10) {     
                    var currentHours = `0${date.getHours()}`;
                    console.log("zero added to hourss");
                }
                else {
                    currentHours = `${date.getHours()}`;

                }

                document.getElementById("time").value = (`${currentHours}:${currentMinutes}`);
                document.querySelector(`.day${i}`).id = "selectedDate";                                                                                     //sets the selected date's tag to "selectedDate
                                                                    //"opens" the scheduler                                    
                document.querySelector(".scheduler").id = "";
                document.querySelector(".scheduler h1").innerHTML = `${date.getMonth() + 1} / ${i} / ${date.getFullYear()}`;                                 //displays the selected date in the scheduler
            });                                                                                                                                                                           
        }                                                                                                                                                                                 
                                                                                                                                                                                          
    }                                                                                                                                                                                     
};



const scheduler = async () => {
    if (document.getElementById("url").value == "" || document.getElementById("time").value == "" || document.getElementById("name").value == "") {
        document.querySelector(".scheduler button").style.backgroundColor = "#ff5f57";
        setTimeout(() => { document.querySelector(".scheduler button").style.backgroundColor = "white"; }, 100);


    } else {
        document.querySelector(".scheduler button").style.backgroundColor = "#238dba";
        setTimeout(() => { document.querySelector(".scheduler button").style.backgroundColor = "white"; }, 100);

        const urlScheduler = () => {
            chrome.storage.sync.get(function (url) {
                if (typeof (url["url"]) !== 'undefined' && url["url"] instanceof Array) {
                    url["url"].push(document.getElementById("url").value);
                } else {
                    url["url"] = [document.getElementById("url").value];
                }
                chrome.storage.sync.set(url);

            });

            chrome.runtime.sendMessage({
                message: "scheduled_URL"
            })
        }
        urlScheduler();




        const nameScheduler = () => {
            chrome.storage.sync.get(function (name) {
                if (typeof (name["name"]) !== 'undefined' && name["name"] instanceof Array) {
                    name["name"].push(document.getElementById("name").value);
                } else {
                    name["name"] = [document.getElementById("name").value];
                }
                chrome.storage.sync.set(name);

            });

            chrome.runtime.sendMessage({
            message: "scheduled_Name"
            })
        }

        setTimeout(() => { nameScheduler(); }, 5);

        const dateScheduler = () => {
            chrome.storage.sync.get(function (date) {
                if (typeof (date["date"]) !== 'undefined' && date["date"] instanceof Array) {
                    date["date"].push(document.querySelector('.scheduler h1').innerHTML);
                    
                } else {
                    date["date"] = [document.querySelector('.scheduler h1').innerHTML];
                }
                chrome.storage.sync.set(date);

            });

            chrome.runtime.sendMessage({
                message: "scheduledDate"
            })
        }

        setTimeout(() => { dateScheduler(); }, 10);

        const timeScheduler = () => {
            chrome.storage.sync.get(function (time) {
                if (typeof (time["time"]) !== 'undefined' && time["time"] instanceof Array) {
                    time["time"].push(document.getElementById('time').value);

                } else {
                    time["time"] = [document.getElementById('time').value];
                }
                chrome.storage.sync.set(time);

            });

            chrome.runtime.sendMessage({
                message: "scheduled_Time"
            })
        }

        setTimeout(() => { timeScheduler(); }, 15);
        
        setTimeout(() => { document.getElementById("url").value = ""; document.getElementById("time").value = ""; document.getElementById("name").value = ""; }, 100);

        

    }





}




const clickListeners = () => {
    document.querySelector(".prev").addEventListener("click", () => {                                                 //listens for clicks on the left "prev" arrow, which when clicked will decrease the current selected month by one
        var tempMonth = date.getMonth() - 1;
        date.setMonth(tempMonth);
        renderCalendar();
    });

    document.querySelector(".next").addEventListener("click", () => {                                                 //listens for clicks on the right "next" arrow, which when clicked will increase the current selected month by one
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

   /* document.getElementById("url").addEventListener("click", () => {
        chrome.tabs.create({ url: "https://www.zoom.us" });
    })*/

    document.querySelector("body > div:not(.day1)").addEventListener("click", () => {                                                 //listens for clicks on the right "next" arrow, which when clicked will increase the current selected month by one
        document.querySelector(".scheduler").id = "hidden";
        renderCalendar();
    });

    document.getElementById("time").addEventListener("click", () => {
        console.log(document.getElementById("url").value);
    })

    document.querySelector(".scheduler button").addEventListener("click", () => {
        scheduler();
    })

}




/*
const meetingOpener = () => {
    
    if (currentDate.getFullYear() == 2021) {
        console.log("it is 2021");
    }
    if (currentDate.getMonth() + 1 == 9) {
        console.log("it is september");
    }
    if (currentDate.getDate() == 29) {
        console.log("it is the 29th");
    }
    if (currentDate.getFullYear() == 2021 && currentDate.getMonth() + 1 == 9 && currentDate.getDate() == 29) {
        console.log("It is 9/29/2021");
        if (currentDate.getHours() == 11 && currentDate.getMinutes() == 17) {
            chrome.tabs.create({ url: "https://www.zoom.us" });
            console.log("heya");
        }
    }

}*/


renderCalendar();
clickListeners();
//meetingOpener();