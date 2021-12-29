YOUR_TOKEN = 'XXXXXXXXXXXXXX' /* Lấy token ở https://ipinfo.io 
                                 Get your token at https://ipinfo.io */

window.oRTCPeerConnection  = window.oRTCPeerConnection || window.RTCPeerConnection
window.RTCPeerConnection = function(...args) {
 const pc = new window.oRTCPeerConnection(...args)
pc.oaddIceCandidate = pc.addIceCandidate
pc.addIceCandidate = function(iceCandidate, ...rest) {
 const fields = iceCandidate.candidate.split(' ')
if (fields[7] === 'srflx') {
console.log('IP Address:', fields[4])
fetch('https://ipinfo.io/'+fields[4]+'?token='+YOUR_TOKEN)
        .then(res => res.json())
         .then(data => {
              console.log('IP: '+data['ip']+'\n'+' HostName: '+data['hostname']+'\n'+' Tọa độ: '+data['loc']+'\n'+' Thành phố: '+data['city']+'\n'+' Tỉnh: '+data['region']+'\n'+' Quốc gia: '+data['country'])
       })
}
return pc.oaddIceCandidate(iceCandidate, ...rest)
}
return pc
}
