/*
VYNTRA provider adapters.
No provider is treated as configured until its environment variables exist.
This prevents false "sent" confirmations.
*/
export async function sendSMS({to,message}){
  if(!process.env.SMS_PROVIDER_URL||!process.env.SMS_PROVIDER_TOKEN)
    return {status:'NOT_CONFIGURED',message:'SMS provider is not configured'};
  try{
    const r=await fetch(process.env.SMS_PROVIDER_URL,{method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.SMS_PROVIDER_TOKEN}`},
      body:JSON.stringify({to,message})});
    const body=await r.text();
    if(!r.ok)return {status:'FAILED',message:`Provider HTTP ${r.status}`,body};
    return {status:'SENT',providerId:r.headers.get('x-message-id')||null};
  }catch(e){return {status:'FAILED',message:e.message};}
}
export async function sendPush({token,title,body}){
  if(!process.env.PUSH_PROVIDER_URL||!process.env.PUSH_PROVIDER_TOKEN)
    return {status:'NOT_CONFIGURED',message:'Push provider is not configured'};
  try{
    const r=await fetch(process.env.PUSH_PROVIDER_URL,{method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.PUSH_PROVIDER_TOKEN}`},
      body:JSON.stringify({token,title,body})});
    if(!r.ok)return {status:'FAILED',message:`Provider HTTP ${r.status}`};
    return {status:'SENT'};
  }catch(e){return {status:'FAILED',message:e.message};}
}
export async function uploadEvidence({buffer,fileName,mimeType}){
  if(!process.env.STORAGE_PROVIDER_URL||!process.env.STORAGE_PROVIDER_TOKEN)
    return {status:'NOT_CONFIGURED',message:'Cloud evidence storage is not configured'};
  try{
    const r=await fetch(process.env.STORAGE_PROVIDER_URL,{method:'POST',
      headers:{'Authorization':`Bearer ${process.env.STORAGE_PROVIDER_TOKEN}`,'x-file-name':fileName,'Content-Type':mimeType||'application/octet-stream'},
      body:buffer});
    if(!r.ok)return {status:'FAILED',message:`Provider HTTP ${r.status}`};
    return {status:'UPLOADED',url:r.headers.get('location')||null};
  }catch(e){return {status:'FAILED',message:e.message};}
}
