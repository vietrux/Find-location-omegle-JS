
window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;
window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);
  pc.oaddIceCandidate = pc.addIceCandidate;
  pc.addIceCandidate = async function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");
    if (fields[7] === "srflx") {
      // IP =  fields[4]
      const url = 'https://corsproxy.io/?' + encodeURIComponent(`http://ip-api.com/json/${fields[4]}`);
      const response = await fetch(url);
      const json = await response.json();
      var data = `
latitude: ${json.lat},
longitude: ${json.lon},
city: ${json.city},
region: ${json.regionName},
country: ${json.country},
      `
      console.log(data);
    }
    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };
  return pc;
};
