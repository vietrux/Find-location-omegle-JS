YOUR_TOKEN = 'XXXXXXXXXXXXXX'; //token for ipinfo service //d01df29be7f3b2
//Get IP 
window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;
window.RTCPeerConnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);
    pc.oaddIceCandidate = pc.addIceCandidate;
    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(" ");
        if (fields[7] === "srflx") {
            // IP =  fields[4]
            fetch('https://ipinfo.io/' + fields[4] + '?token=' + YOUR_TOKEN) //fetch data from ipinfo.io
                .then(response => response.json())
                .then(data => {
                    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
                    console.log('Follow me on Github: vietrux\nLoc: ' + data.loc + '\nCity: ' + data.city + '\nRegion: ' + data.region + '\nCountry: ' + regionNames.of(data.country));
                });
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
};
