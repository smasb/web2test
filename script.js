const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open);menuToggle.textContent=open?"×":"☰";});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
const seasonMenu=document.getElementById('seasonMenu'),seasonDropdown=document.getElementById('seasonDropdown');
seasonMenu.addEventListener('click',()=>{const open=seasonDropdown.classList.toggle('open');seasonMenu.setAttribute('aria-expanded',open);});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown')){seasonDropdown.classList.remove('open');seasonMenu.setAttribute('aria-expanded','false');}});
document.getElementById('year').textContent=new Date().getFullYear();

// Gentle reveal animation for sections as they enter the viewport.
const revealTargets=document.querySelectorAll('.timeline-entry,.season-card,.project-feature,.impact-card,.team-photo,.quiz-card,.outreach-card,.document-card,.sponsor-card');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});revealTargets.forEach(el=>observer.observe(el));}else{revealTargets.forEach(el=>el.classList.add('visible'));}

// Small team quiz: correct answers and explanations are based on the season portfolios.
const questions=[
 {q:"Which season was our team's first FIRST LEGO League season?",a:["BIOGLOW","UNEARTHED","MASTERPIECE"],correct:1,why:"Correct! UNEARTHED was Pixel Pi-oneers' debut FLL season in 2025/26."},
 {q:"What was the name of our 2025/26 innovation project?",a:["CHEMTRACE","SoilScope","EcoScan"],correct:1,why:"That's right. SoilScope explored smarter archaeological site surveying."},
 {q:"Which city hosted the Asia Pacific Open Championship we attended?",a:["Singapore","Cape Town","Sydney"],correct:2,why:"Exactly — Pixel Pi-oneers represented South Africa in Sydney, Australia."}
];
let qIndex=0,answered=false,score=0;
const qEl=document.getElementById('quizQuestion'),opts=document.getElementById('quizOptions'),feedback=document.getElementById('quizFeedback'),next=document.getElementById('quizNext'),progress=document.getElementById('quizProgress');
function renderQuestion(){const q=questions[qIndex];answered=false;qEl.textContent=q.q;progress.textContent=`QUESTION 0${qIndex+1} / 03`;feedback.textContent="Choose an answer to test your Pixel knowledge.";next.disabled=true;next.textContent=qIndex===questions.length-1?"See my result →":"Next question →";opts.innerHTML="";q.a.forEach((answer,i)=>{const b=document.createElement('button');b.textContent=answer;b.addEventListener('click',()=>chooseAnswer(i));opts.appendChild(b);});}
function chooseAnswer(i){if(answered)return;answered=true;const q=questions[qIndex];[...opts.children].forEach((b,index)=>{b.disabled=true;if(index===q.correct)b.classList.add('correct');if(index===i&&i!==q.correct)b.classList.add('wrong');});if(i===q.correct)score++;feedback.textContent=(i===q.correct?"✓ ":"Not quite. ")+q.why;next.disabled=false;}
next.addEventListener('click',()=>{if(!answered)return;if(qIndex<questions.length-1){qIndex++;renderQuestion();}else{qEl.textContent=`You scored ${score} out of ${questions.length}!`;opts.innerHTML="";feedback.textContent=score===3?"Pi-oneer-level knowledge. You know our story!":"Thanks for playing — explore the seasons to learn even more about us.";next.textContent="Play again ↻";next.disabled=false;next.onclick=()=>{qIndex=0;score=0;next.onclick=null;renderQuestion();};}});
renderQuestion();
