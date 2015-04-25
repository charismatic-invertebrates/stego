chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {

        if (request.command == "location") {
            console.log("locatttttion");
            return true;

            // navigator.geolocation.getCurrentPosition (function (position) {
            //     sendResponse ( {
            //         geoLocation: (
            //               "latitude="    + position.coords.latitude
            //             + ", longitude=" + position.coords.longitude
            //         )
            //     } );
            // } );
            // return true; // Needed because the response is asynchronous
        }
    }
);