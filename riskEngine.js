/*
Pluggable risk-engine boundary.
This is a deterministic safety rules engine, not a trained medical/forensic model.
A trained model can be called here later without changing the emergency API contract.
*/
export function scoreRisk(signals={}){
 let score=0,reasons=[];
 if(signals.manualSOS){score+=45;reasons.push('Manual SOS activated');}
 if(signals.voiceDanger){score+=40;reasons.push('Configured danger phrase detected');}
 if(signals.missedCheckin){score+=35;reasons.push('Safety check-in expired');}
 if(signals.highAudioStress){score+=20;reasons.push('Audio stress signal');}
 if(signals.locationUnavailable){score+=5;reasons.push('Location unavailable');}
 score=Math.min(100,score);
 const riskLevel=score<=30?'SAFE':score<=60?'CAUTION':score<=80?'DANGER':'CRITICAL';
 return {score,riskLevel,reasons};
}
