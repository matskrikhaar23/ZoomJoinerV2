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

        chrome.storage.sync.get(['date', 'url', 'time', 'name'], function (result) {
            for (x in result.url) {
                if (todayDate == (result.date[x])) {
                    console.log(currentTime + " current time");
                    console.log(result.time[x] + " link time");
                    if (currentTime == (result.time[x]) && currentDate.getSeconds() == 0) {
                        console.log("seconds");
                        chrome.tabs.create({ url: (result.url[x])});
                        //result.date.splice(x, 1);
                        console.log(result.date);
                        chrome.storage.sync.set({ 'date': result.date }, function () {
                        

                        });
                      //zoomWorker.postMessage([result.date, result.time, result.url, result.name]);

                    }
                }
            }
        })
    }, 1000);

}
linkOpener();

