const linkOpener = () => {
    console.log('repeated');
    setInterval(() => {
        console.log('1s');
        currentDate = new Date();
        todayDate = (`${currentDate.getMonth() + 1} / ${currentDate.getDate()} / ${currentDate.getFullYear()}`);
        if (currentDate.getMinutes() < 10) {
            var currentMinutes = `0${currentDate.getMinutes()}`;
        }
        else {
            currentMinutes = `${currentDate.getMinutes()}`;
        }
        if (currentDate.getHours() < 10) {
            var currentHours = `0${currentDate.getHours()}`;
        }
        else {
            currentHours = `${currentDate.getHours()}`;

        }
        currentTime = (`${currentHours}:${currentMinutes}`);

        chrome.storage.sync.get(['date', 'url', 'time'], function (result) {
            for (let x = 0; x < (result.url).length; x++) {
                if (todayDate == (result.date[x])) {
                    if (currentTime == (result.time[x]) && currentDate.getSeconds() == 0) {
                        chrome.tabs.create({ url: (result.url[x]) });
                        return;
                        
                    }
                }
            }
        })
    }, 1000);

}
linkOpener();
