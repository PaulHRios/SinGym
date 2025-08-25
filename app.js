/* ====== Language (default Español) ====== */
const LangKey = "app_lang_v1";
function getLang(){
  const raw = localStorage.getItem(LangKey);
  if(!raw) return "es"; // por defecto español
  if(raw === "system") return (navigator.language||"en").toLowerCase().startsWith("es") ? "es":"en";
  return raw;
}
let LANG = getLang();
const I18N = {
  es: { appTitle:"Rutinas en casa", fullBody:"Cuerpo completo", generate:"Generar", filters:"Filtros", selectMuscle:"Elige un músculo o usa Cuerpo completo", minutes:"Minutos", goal:"Objetivo", environment:"Entorno", equipment:"Equipo disponible", beginner:"Enfocar a principiantes", home:"Casa", gym:"Gimnasio", strength:"Fuerza", hypertrophy:"Hipertrofia", fatLoss:"Pérdida de grasa", maintenance:"Mantenimiento", warmup:"Calentamiento", cooldown:"Vuelta a la calma", rest:"Descanso", unilateral:"Unilateral", favorites:"Favoritos", saveFavorite:"Guardar en favoritos", saved:"Guardado", timer:"Temporizador", start:"Iniciar", pause:"Pausar", reset:"Reiniciar", ready:"Listo", close:"Cerrar", timeBased:"Duración estimada", replace:"Sustituir", clear:"Limpiar", settings:"Ajustes", language:"Idioma", systemLang:"Sistema", addExercise:"Añadir ejercicio", remove:"Eliminar", searchExercises:"Buscar ejercicios", createExercise:"Crear ejercicio", patterns:"Patrones", unilateralQ:"¿Unilateral?", beginnerQ:"Apto principiantes", instructions:"Instrucciones", mediaURL:"URL multimedia (opcional)", save:"Guardar", cancel:"Cancelar", setsRepsRest:"Series / Reps / Descanso", name:"Nombre", email:"Correo", message:"Mensaje", send:"Enviar", thanksFeedback:"¡Gracias!", supportDev:"Apoyar al desarrollador", tipJar:"Invítame un café", loading:"Cargando…", custom:"Personalizado", all:"Todos", use:"Usar", editTime:"Editar tiempo", max1000:"Máximo 10:00" },
  en: { appTitle:"Home Routines", fullBody:"Full body", generate:"Generate", filters:"Filters", selectMuscle:"Pick a muscle or use Full body", minutes:"Minutes", goal:"Goal", environment:"Environment", equipment:"Available equipment", beginner:"Beginner friendly", home:"Home", gym:"Gym", strength:"Strength", hypertrophy:"Hypertrophy", fatLoss:"Fat loss", maintenance:"Maintenance", warmup:"Warm-up", cooldown:"Cool-down", rest:"Rest", unilateral:"Unilateral", favorites:"Favorites", saveFavorite:"Save favorite", saved:"Saved", timer:"Timer", start:"Start", pause:"Pause", reset:"Reset", ready:"Done", close:"Close", timeBased:"Estimated duration", replace:"Replace", clear:"Clear", settings:"Settings", language:"Language", systemLang:"System", addExercise:"Add exercise", remove:"Remove", searchExercises:"Search exercises", createExercise:"Create exercise", patterns:"Movement patterns", unilateralQ:"Unilateral?", beginnerQ:"Beginner friendly", instructions:"Instructions", mediaURL:"Media URL (optional)", save:"Save", cancel:"Cancel", setsRepsRest:"Sets / Reps / Rest", name:"Name", email:"Email", message:"Message", send:"Send", thanksFeedback:"Thanks!", supportDev:"Support the developer", tipJar:"Tip Jar", loading:"Loading…", custom:"Custom", all:"All", use:"Use", editTime:"Edit time", max1000:"Max 10:00" }
};
function t(k){ return I18N[LANG][k] || k; }

/* ====== Domain enums ====== */
const Env = {home:"home", gym:"gym"};
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };
const Muscles = ["chest","back","quads","hamstrings","glutes","shoulders","biceps","triceps","calves","core"];
const Pattern = { horizontalPush:"horizontalPush", verticalPush:"verticalPush", horizontalPull:"horizontalPull", verticalPull:"verticalPull", kneeDominant:"kneeDominant", hipHinge:"hipHinge", elbowFlexion:"elbowFlexion", elbowExtension:"elbowExtension", abAntiExtension:"abAntiExtension", abAntiRotation:"abAntiRotation", abFlexion:"abFlexion", abLateralFlexion:"abLateralFlexion", calfRaise:"calfRaise" };
const Goal = { strength:"strength", hypertrophy:"hypertrophy", fatLoss:"fatLoss", maintenance:"maintenance" };

/* Titles */
const MUSCLE_T = {
  es:{chest:"Pecho",back:"Espalda",quads:"Cuádriceps",hamstrings:"Isquios",glutes:"Glúteos",shoulders:"Hombros",biceps:"Bíceps",triceps:"Tríceps",calves:"Pantorrillas",core:"Core"},
  en:{chest:"Chest",back:"Back",quads:"Quads",hamstrings:"Hamstrings",glutes:"Glutes",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",calves:"Calves",core:"Core"}
};
const EQUIP_T = {
  es:{bodyweight:"Peso corporal",dumbbells:"Mancuernas",kettlebell:"Pesa rusa",barbell:"Barra",bench:"Banco",bands:"Ligas",cable:"Poleas",machine:"Máquina",smith:"Multipower (Smith)"},
  en:{bodyweight:"Bodyweight",dumbbells:"Dumbbells",kettlebell:"Kettlebell",barbell:"Barbell",bench:"Bench",bands:"Bands",cable:"Cables",machine:"Machine",smith:"Smith machine"}
};
const PATTERN_T = {
  es:{horizontalPush:"Empuje horizontal",verticalPush:"Empuje vertical",horizontalPull:"Tracción horizontal",verticalPull:"Tracción vertical",kneeDominant:"Dominante rodilla",hipHinge:"Bisagra cadera",elbowFlexion:"Flexión codo",elbowExtension:"Extensión codo",abAntiExtension:"Anti-extensión",abAntiRotation:"Anti-rotación",abFlexion:"Flexión abdominal",abLateralFlexion:"Flexión lateral",calfRaise:"Pantorrilla"},
  en:{horizontalPush:"Horizontal push",verticalPush:"Vertical push",horizontalPull:"Horizontal pull",verticalPull:"Vertical pull",kneeDominant:"Knee dominant",hipHinge:"Hip hinge",elbowFlexion:"Elbow flexion",elbowExtension:"Elbow extension",abAntiExtension:"Anti-extension",abAntiRotation:"Anti-rotation",abFlexion:"Ab flexion",abLateralFlexion:"Lateral flexion",calfRaise:"Calf raise"}
};
const mTitle = m => MUSCLE_T[LANG][m];
const eTitle = e => (EQUIP_T[LANG][e]||e);
const pTitle = p => (PATTERN_T[LANG][p]||p);

/* Storage */
const Store = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{return def;} },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const CustomKey = "custom_exercises_v1";
const FavKey    = "favorite_plans_v2";

/* Defaults */
const TrainingDefaults = {
  targetExercises(duration, fullBody){ if(duration<30) return fullBody?3:2; if(duration<45) return fullBody?4:3; if(duration<60) return fullBody?5:4; if(duration<90) return fullBody?6:5; return fullBody?6:6; },
  sets(goal, duration){ switch(goal){ case Goal.strength: return duration<40?3:4; case Goal.hypertrophy: return duration<40?3:4; case Goal.fatLoss: return 3; case Goal.maintenance: return 3; } },
  repRange(goal){ switch(goal){ case Goal.strength: return [4,6]; case Goal.hypertrophy: return [8,12]; case Goal.fatLoss: return [12,20]; case Goal.maintenance: return [8,12]; } },
  rest(goal){ switch(goal){ case Goal.strength: return 120; case Goal.hypertrophy: return 90; case Goal.fatLoss: return 60; case Goal.maintenance: return 75; } }
};

/* VM state */
let EXERCISES = [];      // from JSON + custom
let Filters = { environment:Env.home, allowedEquipment:new Set(Object.values(Equip)), minutes:30, preferBeginner:true, goal:Goal.hypertrophy, fullBody:false };
let selectedMuscle = null;
let currentPlan = null;

/* Utils */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : (Date.now()+"-"+Math.random()));
function shuffle(a){ const x=[...a]; for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x; }
function toast(msg){ const box=$("#toast"); box.textContent=msg; box.hidden=false; setTimeout(()=>box.hidden=true,1200); }

/* --------- DATA LOAD --------- */
async function loadExercises(){
  try{
    const res = await fetch("exercises.json",{cache:"no-store"});
    const base = await res.json();
    const custom = Store.get(CustomKey, []);
    EXERCISES = base.concat(custom);
  }catch(e){
    EXERCISES = Store.get(CustomKey, []); // fallback only custom
  }
}

/* --------- FILTERING & GENERATION --------- */
function pool(muscle){
  return EXERCISES.filter(ex =>
    ex.environment.includes(Filters.environment) &&
    ex.equipment.every(eq=>Filters.allowedEquipment.has(eq)) &&
    (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
    (muscle ? ex.muscle===muscle : true)
  );
}
function alternatives(ex){
  const all = pool(ex.muscle).filter(e=>e.id!==ex.id);
  const sameVariant = all.filter(e=>e.variant===ex.variant);
  if(sameVariant.length) return shuffle(sameVariant);
  const samePattern = all.filter(e=>e.patterns.some(p=>ex.patterns.includes(p)));
  return (samePattern.length?shuffle(samePattern):shuffle(all));
}
function generate(){
  const p = shuffle(pool(Filters.fullBody?null:selectedMuscle));
  const count = TrainingDefaults.targetExercises(Filters.minutes, Filters.fullBody);
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  const wanted = [Pattern.horizontalPush,Pattern.horizontalPull,Pattern.kneeDominant,Pattern.hipHinge,Pattern.abAntiExtension];

  let chosen=[];
  if(Filters.fullBody){
    for(const pat of wanted){
      const pick = p.find(e=>e.patterns.includes(pat) && !chosen.includes(e));
      if(pick) chosen.push(pick);
      if(chosen.length===count) break;
    }
  }
  while(chosen.length<count){
    const next = p.find(e=>!chosen.includes(e)); if(!next) break; chosen.push(next);
  }
  if(!chosen.length && p.length) chosen=[p[0]];

  const items = chosen.map(ex=>({
    id: makeId(),
    exercise: ex,
    sets, reps:[rmin,rmax], restSeconds: rest,
    notes: ex.unilateral ? (LANG==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (LANG==="es" ? "RPE 7–8." : "RPE 7–8.")
  }));

  const warm = LANG==="es" ? "5–7 min movilidad + 2 series ligeras del primer ejercicio." : "5–7 min mobility + 2 light ramp-up sets.";
  const cool = LANG==="es" ? "3–5 min respiración nasal + estiramientos suaves." : "3–5 min nasal breathing + gentle stretches.";

  currentPlan = { id:makeId(), muscle: Filters.fullBody?null:selectedMuscle, goal:Filters.goal, durationMinutes:Filters.minutes, items, warmup:warm, cooldown:cool, createdAt: Date.now() };
  render();
}

/* --------- RENDER --------- */
function renderHeader(){
  $("#appTitle").textContent = t("appTitle");
  $("#subtitle").textContent = t("selectMuscle");
}
function renderMuscleChips(){
  const c = $("#muscleChips"); c.innerHTML="";
  const full = document.createElement("button");
  full.className = "chip"+(Filters.fullBody?" active":"");
  full.textContent = t("fullBody");
  full.onclick = () => { Filters.fullBody=!Filters.fullBody; if(Filters.fullBody) selectedMuscle=null; render(); };
  c.appendChild(full);
  for(const m of Muscles){
    const b = document.createElement("button");
    b.className = "chip"+((selectedMuscle===m && !Filters.fullBody)?" active":"");
    b.textContent = mTitle(m);
    b.onclick = () => { Filters.fullBody=false; selectedMuscle=m; render(); };
    c.appendChild(b);
  }
}
function renderContent(){
  const root = $("#content"); root.innerHTML="";
  if(!currentPlan){
    root.appendChild(el(`<div class="empty"><div><div style="font-size:56px">💪</div><div>${t("selectMuscle")}</div></div></div>`));
    return;
  }
  // Head
  root.appendChild(el(`<div class="card">
    <div class="row">
      <div>
        <div class="item-title">${currentPlan.muscle?mTitle(currentPlan.muscle):t("fullBody")}</div>
        <div class="caption">${t(currentPlan.goal)} • ${currentPlan.durationMinutes} ${t("minutes").toLowerCase()}</div>
      </div>
    </div>
  </div>`));

  // Warmup
  root.appendChild(el(`<div class="card"><div class="row"><div><strong>${t("warmup")}</strong><div class="caption">${currentPlan.warmup}</div></div></div></div>`));

  // Items
  currentPlan.items.forEach((item, idx) => {
    const card = el(`
      <div class="card" data-item-id="${item.id}">
        <div class="row">
          <div style="max-width:64%">
            <div class="item-title">${item.exercise.name}</div>
            <div class="caption">${item.exercise.instructions||""}</div>
          </div>
          <div class="item-actions">
            <span class="badge">${item.sets}×${item.reps[0]}–${item.reps[1]}</span>
            <button class="btn small" data-act="replace">${t("replace")}</button>
            <button class="btn small" data-act="remove">${t("remove")}</button>
          </div>
        </div>
        <div class="row" style="margin-top:8px">
          <div class="caption">⏱ ${t("rest")} ${item.restSeconds}s ${item.exercise.unilateral?`• ${t("unilateral")}`:""}</div>
          <div class="timer">
            <span class="time" data-time title="${t("editTime")}">${formatTime(item.restSeconds)}</span>
            <button class="btn small primary" data-act="start">${t("start")}</button>
            <button class="btn small" data-act="pause">${t("pause")}</button>
            <button class="btn small" data-act="reset">${t("reset")}</button>
            <button class="btn small" data-act="gif">GIF</button>
          </div>
        </div>
      </div>
    `);
    root.appendChild(card);
  });

  // Cooldown **antes** de los botones (para que “Vuelta a la calma” quede al final de la rutina)
  root.appendChild(el(`<div class="card"><div class="row"><div><strong>${t("cooldown")}</strong><div class="caption">${currentPlan.cooldown}</div></div></div></div>`));

  // Buttons
  const actions = el(`
    <div class="card">
      <div class="grid cols-3">
        <button class="btn primary" id="addEx">＋ ${t("addExercise")}</button>
        <button class="btn" id="saveFav">❤️ ${t("saveFavorite")}</button>
        <button class="btn danger" id="clearPlan">🗑️ ${t("clear")}</button>
      </div>
    </div>
  `);
  root.appendChild(actions);
}

/* Event delegation on content (fixes replace/remove reliability) */
$("#content").addEventListener("click", (ev)=>{
  const btn = ev.target.closest("[data-act]"); if(!btn) return;
  const card = ev.target.closest("[data-item-id]"); if(!card) return;
  const id = card.getAttribute("data-item-id");
  const idx = currentPlan.items.findIndex(it => it.id === id);
  if(idx < 0) return;

  const action = btn.getAttribute("data-act");
  const item = currentPlan.items[idx];

  if(action === "replace"){
    const alt = alternatives(item.exercise)[0]; if(!alt) return;
    currentPlan.items[idx] = {...item, exercise: alt};
    render();
  }
  if(action === "remove"){
    currentPlan.items.splice(idx, 1); render();
  }
  if(action === "gif"){
    const q = encodeURIComponent(`${item.exercise.name} exercise gif`);
    // abrir en nueva pestaña, más fiable en iOS
    window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`, "_blank", "noopener");
  }
  if(action === "start"){
    startTimer(card, item);
  }
  if(action === "pause"){
    pauseTimer(card);
  }
  if(action === "reset"){
    resetTimer(card, item.restSeconds);
  }
});

/* Editable time by tapping the time label */
$("#content").addEventListener("click", (ev)=>{
  const timeEl = ev.target.closest("[data-time]"); if(!timeEl) return;
  const card = ev.target.closest("[data-item-id]");
  const id = card.getAttribute("data-item-id");
  const item = currentPlan.items.find(it=>it.id===id);
  if(!item) return;
  const cur = parseTimeToSec(timeEl.textContent) || item.restSeconds;
  const user = prompt(`${t("rest")} (s)`, cur);
  if(user==null) return;
  const sec = Math.min(600, Math.max(1, parseInt(user,10)||cur));
  timeEl.textContent = formatTime(sec);
  // If timer is running, reset to new value
  resetTimer(card, sec);
});

/* Timers per-card */
const runningTimers = new Map(); // cardEl -> {remaining, interval}
function formatTime(s){ const m=Math.floor(s/60), r=s%60; return `${m}:${String(r).padStart(2,"0")}`; }
function parseTimeToSec(str){
  const m = String(str).trim().split(":"); if(m.length!==2) return NaN;
  const mm = parseInt(m[0],10), ss=parseInt(m[1],10);
  return (isNaN(mm)||isNaN(ss))?NaN:(mm*60+ss);
}
function startTimer(card, item){
  const timeEl = card.querySelector("[data-time]");
  let cur = parseTimeToSec(timeEl.textContent) || item.restSeconds;
  // avoid duplicate intervals
  if(runningTimers.has(card)) clearInterval(runningTimers.get(card).interval);
  const interval = setInterval(()=>{
    cur--; timeEl.textContent = formatTime(Math.max(0, cur));
    if(cur<=0){ clearInterval(interval); runningTimers.delete(card); if(navigator.vibrate) navigator.vibrate(100); }
  },1000);
  runningTimers.set(card,{interval});
}
function pauseTimer(card){
  if(!runningTimers.has(card)) return;
  clearInterval(runningTimers.get(card).interval);
  runningTimers.delete(card);
}
function resetTimer(card, seconds){
  pauseTimer(card);
  const timeEl = card.querySelector("[data-time]");
  timeEl.textContent = formatTime(seconds);
}

/* --------- SHEETS --------- */
const backdrop = $("#backdrop");
function openSheet(el){ backdrop.hidden=false; el.hidden=false; }
function closeSheets(){ backdrop.hidden=true; $$(".sheet").forEach(s=>s.hidden=true); }
backdrop.addEventListener("click", closeSheets);

/* Filters sheet (re-diseñada) */
function openFilters(){
  const el = $("#filtersModal");
  const eq = Object.values(Equip).map(e=>`
    <label><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}> ${eTitle(e)}</label>
  `).join("");

  el.innerHTML = `
    <div class="header">
      <h3>🎚️ ${t("filters")}</h3>
      <button class="btn small" id="f_close">✖️ ${t("close")}</button>
    </div>
    <div class="grid cols-2">
      <div>
        <label>${t("goal")}</label>
        <select id="f_goal">
          <option value="strength">${t("strength")}</option>
          <option value="hypertrophy">${t("hypertrophy")}</option>
          <option value="fatLoss">${t("fatLoss")}</option>
          <option value="maintenance">${t("maintenance")}</option>
        </select>
      </div>
      <div>
        <label>${t("environment")}</label>
        <select id="f_env">
          <option value="home">${t("home")}</option>
          <option value="gym">${t("gym")}</option>
        </select>
      </div>
    </div>

    <div style="margin-top:8px">
      <label>${t("minutes")}: <strong id="minsVal">${Filters.minutes}</strong></label>
      <input class="input" type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
      <div class="caption">${t("timeBased")}</div>
    </div>

    <div class="grid" style="margin-top:10px">
      <label>${t("equipment")}</label>
      <div class="grid cols-3">${eq}</div>
    </div>

    <div class="grid cols-2" style="margin:10px 0">
      <label><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}> ${t("beginner")}</label>
      <label><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}> ${t("fullBody")}</label>
    </div>

    <div class="grid cols-2" style="margin-top:12px">
      <button class="btn ghost" id="f_cancel">✖️ ${t("close")}</button>
      <button class="btn primary" id="f_apply">✅ ${t("ready")}</button>
    </div>
  `;

  el.querySelector("#f_goal").value = Filters.goal;
  el.querySelector("#f_env").value = Filters.environment;
  el.querySelector("#f_minutes").oninput = e => el.querySelector("#minsVal").textContent = e.target.value;
  el.querySelector("#f_cancel").onclick = closeSheets;
  el.querySelector("#f_close").onclick  = closeSheets;
  el.querySelector("#f_apply").onclick = ()=>{
    Filters.goal = el.querySelector("#f_goal").value;
    Filters.environment = el.querySelector("#f_env").value;
    Filters.minutes = parseInt(el.querySelector("#f_minutes").value,10);
    Filters.preferBeginner = el.querySelector("#f_beg").checked;
    Filters.fullBody = el.querySelector("#f_full").checked;
    const set = new Set([...el.querySelectorAll("[data-eq]")].filter(i=>i.checked).map(i=>i.dataset.eq));
    Filters.allowedEquipment = set.size?set:new Set(Object.values(Equip));
    closeSheets(); render();
  };

  openSheet(el);
}

/* Picker sheet */
function openPicker(){
  const el = $("#pickerModal");
  let q=""; let muscleFilter = selectedMuscle || null;

  const filtered = () => {
    const nn = normalize(q);
    return EXERCISES.filter(ex =>
      (muscleFilter==null || ex.muscle===muscleFilter) &&
      ex.environment.includes(Filters.environment) &&
      ex.equipment.every(eq=>Filters.allowedEquipment.has(eq)) &&
      (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
      (nn==="" ? true : (normalize(ex.name).includes(nn) || normalize(ex.instructions||"").includes(nn) || normalize(mTitle(ex.muscle)).includes(nn) || normalize(ex.variant||"").includes(nn)))
    ).sort((a,b)=> a.name.localeCompare(b.name));
  };

  function refresh(){
    const chips = `<button class="chip ${muscleFilter==null?"active":""}" data-mus="">${t("all")}</button>` +
      Muscles.map(m=>`<button class="chip ${muscleFilter===m?"active":""}" data-mus="${m}">${mTitle(m)}</button>`).join("");

    const rows = filtered().map(ex=>`
      <tr>
        <td><strong>${ex.name}</strong><div class="caption">${ex.instructions||""}</div></td>
        <td class="caption">${mTitle(ex.muscle)}<br>${ex.equipment.map(eTitle).join(", ")}</td>
        <td style="text-align:right"><button class="btn small primary" data-add="${ex.id}">＋</button></td>
      </tr>`).join("");

    el.innerHTML = `
      <div class="header">
        <h3>＋ ${t("addExercise")}</h3>
        <div class="row" style="gap:6px">
          <button class="btn small" id="mkCustom">＋ ${t("createExercise")}</button>
          <button class="btn small" id="p_close">✖️ ${t("close")}</button>
        </div>
      </div>
      <div class="row" style="gap:8px; margin:8px 0 6px">
        <span>🔎</span><input class="input" id="q" placeholder="${t("searchExercises")}" autocomplete="off">
      </div>
      <div class="chips" id="chips">${chips}</div>
      <table class="table">${rows}</table>
    `;

    el.querySelector("#q").value = q;
    setTimeout(()=> el.querySelector("#q").focus(), 10);
    el.querySelector("#q").oninput = e => { q = e.target.value; refresh(); };
    el.querySelector("#p_close").onclick = closeSheets;
    el.querySelector("#mkCustom").onclick = ()=> openNewExerciseForm(()=>{ loadExercises().then(refresh); });

    el.querySelectorAll("[data-mus]").forEach(b=> b.onclick = ()=>{ const v=b.dataset.mus; muscleFilter = v?v:null; refresh(); });
    el.querySelectorAll("[data-add]").forEach(b => b.onclick = ()=>{
      const ex = filtered().find(e=>e.id===b.dataset.add); if(!ex) return;
      openConfig(ex, (sets,min,max,rest)=>{
        currentPlan.items.push({ id:makeId(), exercise:ex, sets, reps:[min,max], restSeconds:rest, notes: ex.unilateral ? (LANG==="es"?"Trabaja ambos lados. RPE 7–8.":"Work both sides. RPE 7–8.") : (LANG==="es"?"RPE 7–8.":"RPE 7–8.") });
        closeSheets(); render();
      });
    });
  }
  refresh();
  openSheet(el);
}

/* Config sheet (sets/reps/rest) */
function openConfig(ex, onAdd){
  const el = $("#configModal");
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);

  el.innerHTML = `
    <div class="header"><h3>⚙️ ${t("setsRepsRest")}</h3><button class="btn small" id="c_close">✖️ ${t("close")}</button></div>
    <div class="card" style="margin:10px 0">
      <strong>${ex.name}</strong><div class="caption">${ex.instructions||""}</div>
    </div>
    <div class="grid cols-3">
      <div><label>${LANG==="es"?"Series":"Sets"}</label><input class="input" type="number" id="cfg_sets" min="1" max="10" value="${sets}"></div>
      <div><label>${LANG==="es"?"Reps mín":"Min reps"}</label><input class="input" type="number" id="cfg_min" min="1" max="30" value="${rmin}"></div>
      <div><label>${LANG==="es"?"Reps máx":"Max reps"}</label><input class="input" type="number" id="cfg_max" min="${rmin}" max="30" value="${rmax}"></div>
    </div>
    <div style="margin:10px 0"><label>${t("rest")} (s)</label><input class="input" type="number" id="cfg_rest" min="15" max="300" step="15" value="${rest}"></div>
    <div class="grid cols-2">
      <button class="btn ghost" id="cfg_cancel">✖️ ${t("cancel")}</button>
      <button class="btn primary" id="cfg_save">💾 ${t("save")}</button>
    </div>
  `;
  el.querySelector("#c_close").onclick = closeSheets;
  el.querySelector("#cfg_cancel").onclick = closeSheets;
  el.querySelector("#cfg_save").onclick = ()=>{
    const s = clamp(parseInt(el.querySelector("#cfg_sets").value||sets),1,10);
    const min = clamp(parseInt(el.querySelector("#cfg_min").value||rmin),1,30);
    const max = Math.max(min, clamp(parseInt(el.querySelector("#cfg_max").value||rmax),1,30));
    const r = clamp(parseInt(el.querySelector("#cfg_rest").value||rest),15,600);
    onAdd(s,min,max,r);
  };
  openSheet(el);
}

/* New custom exercise (saved to localStorage) */
function openNewExerciseForm(onDone){
  const el = $("#pickerModal");
  const eq = Object.values(Equip).map(e=>`<label><input type="checkbox" data-eq="${e}"> ${eTitle(e)}</label>`).join("");
  const pat = Object.values(Pattern).map(p=>`<label><input type="checkbox" data-p="${p}"> ${pTitle(p)}</label>`).join("");
  const env = [Env.home,Env.gym].map(e=>`<label><input type="checkbox" data-env="${e}" checked> ${t(e)}</label>`).join("");

  el.innerHTML = `
    <div class="header"><h3>＋ ${t("createExercise")}</h3><button class="btn small" id="n_close">✖️ ${t("close")}</button></div>
    <div class="grid cols-2">
      <div><label>${t("name")}</label><input class="input" id="nx_name"></div>
      <div><label>${t("muscle")||"Músculo"}</label>
        <select class="input" id="nx_muscle">${Muscles.map(m=>`<option value="${m}">${mTitle(m)}</option>`).join("")}</select>
      </div>
    </div>
    <div style="margin-top:8px"><label>${t("patterns")}</label><div class="grid cols-3">${pat}</div></div>
    <div style="margin-top:8px"><label>${t("equipment")}</label><div class="grid cols-3">${eq}</div></div>
    <div style="margin-top:8px"><label>${t("environment")}</label><div class="grid cols-2">${env}</div></div>
    <div class="grid cols-2" style="margin:10px 0">
      <label><input type="checkbox" id="nx_uni"> ${t("unilateralQ")}</label>
      <label><input type="checkbox" id="nx_beg" checked> ${t("beginnerQ")}</label>
    </div>
    <div><label>${t("instructions")}</label><textarea class="input" id="nx_ins" rows="3"></textarea></div>
    <div><label>${t("mediaURL")}</label><input class="input" id="nx_media" placeholder="https://..."></div>
    <div class="grid cols-2" style="margin-top:10px">
      <button class="btn ghost" id="nx_cancel">✖️ ${t("cancel")}</button>
      <button class="btn primary" id="nx_save">💾 ${t("save")}</button>
    </div>
    <p class="caption">${t("custom")}</p>
  `;
  el.querySelector("#n_close").onclick = openPicker;
  el.querySelector("#nx_cancel").onclick = openPicker;
  el.querySelector("#nx_save").onclick = ()=>{
    const name = (el.querySelector("#nx_name").value||"").trim() || (LANG==="es"?"Ejercicio sin nombre":"Untitled exercise");
    const muscle = el.querySelector("#nx_muscle").value;
    const pats = [...el.querySelectorAll("[data-p]")].filter(i=>i.checked).map(i=>i.dataset.p);
    const eq   = [...el.querySelectorAll("[data-eq]")].filter(i=>i.checked).map(i=>i.dataset.eq);
    const envs = [...el.querySelectorAll("[data-env]")].filter(i=>i.checked).map(i=>i.dataset.env);
    const unilateral = el.querySelector("#nx_uni").checked;
    const beginner = el.querySelector("#nx_beg").checked;
    const instructions = (el.querySelector("#nx_ins").value||"").trim() || (LANG==="es"?"Ejercicio personalizado.":"Custom exercise.");
    const mediaURL = (el.querySelector("#nx_media").value||"").trim() || null;
    const ex = { id:makeId(), name, muscle, patterns: (pats.length?pats:["hipHinge"]), equipment: (eq.length?eq:[Equip.bodyweight]), environment: (envs.length?envs:[Env.home,Env.gym]), unilateral, beginnerFriendly: beginner, instructions, variant:`custom_${muscle}`, mediaURL };
    const arr = Store.get(CustomKey, []); arr.unshift(ex); Store.set(CustomKey, arr);
    if(typeof onDone==="function") onDone(ex);
    toast(LANG==="es"?"Guardado":"Saved");
  };
}

/* Favorites sheet */
function openFavorites(){
  const el = $("#favoritesModal");
  const list = Store.get(FavKey, []);
  el.innerHTML = `
    <div class="header"><h3>❤️ ${t("favorites")}</h3><button class="btn small" id="fav_close">✖️ ${t("close")}</button></div>
    ${!list.length? `<div class="caption" style="padding:10px">${LANG==="es"?"Aún no hay favoritos.":"No favorites yet."}</div>`: ""}
    ${list.map((p,i)=>`
      <div class="card">
        <div class="row">
          <div>
            <div class="item-title">${p.muscle?mTitle(p.muscle):t("fullBody")}</div>
            <div class="caption">${t(p.goal)} • ${p.durationMinutes} ${t("minutes").toLowerCase()}</div>
          </div>
          <div class="item-actions">
            <button class="btn small primary" data-use="${i}">✔ ${t("use")}</button>
            <button class="btn small" data-del="${i}">🗑️</button>
          </div>
        </div>
      </div>
    `).join("")}
    <div><button class="btn ghost" id="closeFav">✖️ ${t("close")}</button></div>
  `;
  el.querySelector("#fav_close").onclick = closeSheets;
  el.querySelector("#closeFav").onclick = closeSheets;
  el.querySelectorAll("[data-use]").forEach(b => b.onclick = ()=>{
    const idx = parseInt(b.dataset.use,10);
    const plan = Store.get(FavKey, [])[idx];
    currentPlan = plan; closeSheets(); render();
  });
  el.querySelectorAll("[data-del]").forEach(b => b.onclick = ()=>{
    const idx = parseInt(b.dataset.del,10);
    const arr = Store.get(FavKey, []); arr.splice(idx,1); Store.set(FavKey, arr); openFavorites();
  });
  openSheet(el);
}

/* Settings sheet */
function openSettings(){
  const el = $("#settingsModal");
  const cur = localStorage.getItem(LangKey) || "es";
  el.innerHTML = `
    <div class="header"><h3>⚙️ ${t("settings")}</h3><button class="btn small" id="s_close">✖️ ${t("close")}</button></div>
    <div style="margin:10px 0">
      <label>${t("language")}</label>
      <select class="input" id="s_lang">
        <option value="system">${t("systemLang")}</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
    <p class="caption">SinGym © 2025 — LocalStorage, sin cuentas.</p>
  `;
  el.querySelector("#s_lang").value = cur;
  el.querySelector("#s_close").onclick = closeSheets;
  el.querySelector("#s_lang").onchange = (e)=>{
    localStorage.setItem(LangKey, e.target.value);
    LANG = getLang();
    renderAll();
  };
  openSheet(el);
}

/* Helpers */
function el(html){ const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function normalize(s){ return (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(); }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

/* Buttons */
$("#openFilters").onclick = openFilters;
$("#btnFilters").onclick = openFilters;
$("#btnFavorites").onclick = openFavorites;
$("#btnSettings").onclick = openSettings;
$("#generate").onclick = generate;

/* Save favs */
document.addEventListener("click",(e)=>{
  if(e.target && e.target.id==="saveFav"){ const arr = Store.get(FavKey, []); arr.unshift(currentPlan); Store.set(FavKey, arr); toast(`${t("saved")} ✅`); }
  if(e.target && e.target.id==="addEx"){ openPicker(); }
  if(e.target && e.target.id==="clearPlan"){ currentPlan=null; render(); }
});

/* Render all */
function renderAll(){ renderHeader(); renderMuscleChips(); $("#generate").disabled = (!Filters.fullBody && !selectedMuscle); renderContent(); }

/* Boot */
(async function(){
  renderHeader(); renderMuscleChips();
  await loadExercises();
  renderAll();
})();
