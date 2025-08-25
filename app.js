/* ================== i18n ================== */
const I18N = {
  es: {
    appTitle:"Rutinas en casa", muscle:"Músculo", fullBody:"Cuerpo completo", filters:"Filtros", generate:"Generar",
    minutes:"Minutos", goal:"Objetivo", environment:"Entorno", equipment:"Equipo disponible", beginner:"Enfocar a principiantes",
    gym:"Gimnasio", home:"Casa", strength:"Fuerza", hypertrophy:"Hipertrofia", fatLoss:"Pérdida de grasa", maintenance:"Mantenimiento",
    warmup:"Calentamiento", cooldown:"Vuelta a la calma", rest:"Descanso", unilateral:"Unilateral", favorites:"Favoritos",
    saveFavorite:"Guardar en favoritos", saved:"Guardado", timer:"Temporizador", start:"Iniciar", pause:"Pausar", reset:"Reiniciar",
    selectMuscle:"Elige un músculo o activa Cuerpo completo y presiona Generar.", ready:"Listo", close:"Cerrar", timeBased:"Duración estimada",
    replace:"Sustituir", clear:"Limpiar", settings:"Ajustes", language:"Idioma", systemLang:"Sistema",
    addExercise:"Añadir ejercicio", remove:"Eliminar", searchExercises:"Buscar ejercicios", createExercise:"Crear ejercicio",
    patterns:"Patrones", unilateralQ:"¿Unilateral?", beginnerQ:"Apto principiantes", instructions:"Instrucciones",
    mediaURL:"URL multimedia (opcional)", save:"Guardar", cancel:"Cancelar", setsRepsRest:"Series / Reps / Descanso",
    feedback:"Comentarios", name:"Nombre", email:"Correo", message:"Mensaje", send:"Enviar",
    thanksFeedback:"Gracias por tus comentarios—me ayudan a mejorar.", supportDev:"Apoyar al desarrollador",
    tipJar:"Invítame un café ☕️", loading:"Cargando…", custom:"Personalizado",
    all:"Todos", use:"Usar", editTime:"Editar tiempo", max1000:"Máximo 10:00",
    minReps:"Reps mín", maxReps:"Reps máx", sets:"Series", openExternally:"Abrir en pestaña nueva"
  },
  en: {
    appTitle:"Home Routines", muscle:"Muscle", fullBody:"Full body", filters:"Filters", generate:"Generate",
    minutes:"Minutes", goal:"Goal", environment:"Environment", equipment:"Available equipment", beginner:"Beginner friendly",
    gym:"Gym", home:"Home", strength:"Strength", hypertrophy:"Hypertrophy", fatLoss:"Fat loss", maintenance:"Maintenance",
    warmup:"Warm-up", cooldown:"Cool-down", rest:"Rest", unilateral:"Unilateral", favorites:"Favorites",
    saveFavorite:"Save favorite", saved:"Saved", timer:"Timer", start:"Start", pause:"Pause", reset:"Reset",
    selectMuscle:"Pick a muscle or use Full Body, then tap Generate.", ready:"Done", close:"Close", timeBased:"Estimated duration",
    replace:"Replace", clear:"Clear", settings:"Settings", language:"Language", systemLang:"System",
    addExercise:"Add exercise", remove:"Remove", searchExercises:"Search exercises", createExercise:"Create exercise",
    patterns:"Movement patterns", unilateralQ:"Unilateral?", beginnerQ:"Beginner friendly", instructions:"Instructions",
    mediaURL:"Media URL (optional)", save:"Save", cancel:"Cancel", setsRepsRest:"Sets / Reps / Rest",
    feedback:"Feedback", name:"Name", email:"Email", message:"Message", send:"Send",
    thanksFeedback:"Thanks for your feedback—super helpful.", supportDev:"Support the developer",
    tipJar:"Tip Jar ☕️", loading:"Loading…", custom:"Custom",
    all:"All", use:"Use", editTime:"Edit time", max1000:"Max 10:00",
    minReps:"Min reps", maxReps:"Max reps", sets:"Sets", openExternally:"Open in new tab"
  }
};
const Lang = {
  key:"app_lang_v1",
  get(){
    const raw = localStorage.getItem(this.key);
    if(!raw){ return "es"; } // Español por defecto
    if(raw==="system"){
      return (navigator.language||"en").toLowerCase().startsWith("es") ? "es" : "en";
    }
    return raw;
  },
  set(v){ localStorage.setItem(this.key, v); }
};
let L = I18N[Lang.get()];
const t = (k)=> L[k] || k;
const applyStaticI18n = ()=> document.querySelectorAll("[data-i]").forEach(el=>el.textContent=t(el.dataset.i));

/* ================== Domain ================== */
const Env = {home:"home", gym:"gym"};
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };
const Muscle = ["chest","back","quads","hamstrings","glutes","shoulders","biceps","triceps","calves","core"];
const Pattern = { horizontalPush:"horizontalPush", verticalPush:"verticalPush", horizontalPull:"horizontalPull", verticalPull:"verticalPull",
  kneeDominant:"kneeDominant", hipHinge:"hipHinge", elbowFlexion:"elbowFlexion", elbowExtension:"elbowExtension",
  abAntiExtension:"abAntiExtension", abAntiRotation:"abAntiRotation", abFlexion:"abFlexion", abLateralFlexion:"abLateralFlexion",
  calfRaise:"calfRaise" };
const Goal = { strength:"strength", hypertrophy:"hypertrophy", fatLoss:"fatLoss", maintenance:"maintenance" };

/* l10n helpers */
function muscleTitle(m){
  const es={chest:"Pecho",back:"Espalda",quads:"Cuádriceps",hamstrings:"Isquios",glutes:"Glúteos",shoulders:"Hombros",biceps:"Bíceps",triceps:"Tríceps",calves:"Pantorrillas",core:"Core"};
  const en={chest:"Chest",back:"Back",quads:"Quads",hamstrings:"Hamstrings",glutes:"Glutes",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",calves:"Calves",core:"Core"};
  return (Lang.get()==="es"?es:en)[m];
}
function equipmentTitle(e){
  const es={bodyweight:"Peso corporal",dumbbells:"Mancuernas",kettlebell:"Pesa rusa",barbell:"Barra",bench:"Banco",bands:"Ligas",cable:"Poleas",machine:"Máquina",smith:"Multipower (Smith)"};
  const en={bodyweight:"Bodyweight",dumbbells:"Dumbbells",kettlebell:"Kettlebell",barbell:"Barbell",bench:"Bench",bands:"Bands",cable:"Cables",machine:"Machine",smith:"Smith machine"};
  return (Lang.get()==="es"?es:en)[e]||e;
}
function patternTitle(p){
  const es={horizontalPush:"Empuje horizontal",verticalPush:"Empuje vertical",horizontalPull:"Tracción horizontal",verticalPull:"Tracción vertical",kneeDominant:"Dominante rodilla",hipHinge:"Bisagra cadera",elbowFlexion:"Flexión codo",elbowExtension:"Extensión codo",abAntiExtension:"Anti-extensión",abAntiRotation:"Anti-rotación",abFlexion:"Flexión abdominal",abLateralFlexion:"Flexión lateral",calfRaise:"Pantorrilla"};
  const en={horizontalPush:"Horizontal push",verticalPush:"Vertical push",horizontalPull:"Horizontal pull",verticalPull:"Vertical pull",kneeDominant:"Knee dominant",hipHinge:"Hip hinge",elbowFlexion:"Elbow flexion",elbowExtension:"Elbow extension",abAntiExtension:"Anti-extension",abAntiRotation:"Anti-rotation",abFlexion:"Ab flexion",abLateralFlexion:"Lateral flexion",calfRaise:"Calf raise"};
  return (Lang.get()==="es"?es:en)[p];
}

/* Storage */
const Storage = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{ return def; } },
  set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
};

/* Training defaults */
const TrainingDefaults = {
  targetExercises(d, full){ if(d<30) return full?3:2; if(d<45) return full?4:3; if(d<60) return full?5:4; if(d<90) return full?6:5; return full?6:6; },
  sets(goal,d){ switch(goal){ case Goal.strength: return d<40?3:4; case Goal.hypertrophy: return d<40?3:4; case Goal.fatLoss: return 3; case Goal.maintenance: return 3; } },
  repRange(goal){ switch(goal){ case Goal.strength: return [4,6]; case Goal.hypertrophy: return [8,12]; case Goal.fatLoss: return [12,20]; case Goal.maintenance: return [8,12]; } },
  rest(goal){ switch(goal){ case Goal.strength: return 120; case Goal.hypertrophy: return 90; case Goal.fatLoss: return 60; case Goal.maintenance: return 75; } }
};

/* Helpers */
function makeId(){ return (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`); }
function shuffle(a){ const x=[...a]; for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x; }
function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function norm(s){ return (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(); }

/* Exercise library (resumida pero variada) */
function add(list, n,m,p,eq,env,uni,beg,ins,v,media=null){
  list.push({id:makeId(), name:n, muscle:m, patterns:p, equipment:eq, environment:env, unilateral:uni, beginnerFriendly:beg, instructions:ins, variant:v, mediaURL:media});
}
const ExerciseLibrary = {
  makeAll(){
    const H = (Lang.get()==="es");
    const s = (es,en)=> H?es:en;
    const tempos = ["", s(" Tempo 3-1-1"," Tempo 3-1-1"), s(" Tempo 5-0-1"," Tempo 5-0-1")];
    const pause = s(" con pausa 1s"," with 1s pause");
    const LST=[];

    // Chest
    [
      [s("Flexiones","Push-ups"),"chest_pushup",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Manos bajo hombros, cuerpo en línea.","Hands under shoulders, body in line.")],
      [s("Flexiones inclinadas","Incline Push-ups"),"chest_lower",[Equip.bodyweight,Equip.bench],[Env.home,Env.gym],false,true,s("Manos elevadas, más fácil.","Hands elevated, easier.")],
      [s("Flexiones declinadas","Decline Push-ups"),"chest_upper",[Equip.bodyweight,Equip.bench],[Env.home,Env.gym],false,true,s("Pies elevados. Enfatiza porción superior.","Feet elevated. Upper-chest bias.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(LST,n+t,"chest",["horizontalPush"],eq,env,uni,beg,ins,v)));
    [["Plano","Flat","chest_mid"],["Inclinado 15°","Incline 15°","chest_upper"],["Declinado 15°","Decline 15°","chest_lower"]]
      .forEach(([e,ee,variant])=>{
        tempos.forEach(t=>add(LST,s(`Press ${e} con mancuernas`,`DB ${ee} Press`)+t,"chest",["horizontalPush"],[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],false,true,s("Escápulas retraídas, 2s abajo/1s arriba.","Scap retracted, 2s down/1s up."),variant+"_db"));
        add(LST,s(`Press ${e} con barra`,`Barbell ${ee} Press`)+pause,"chest",["horizontalPush"],[Equip.barbell,Equip.bench],[Env.home,Env.gym],false,false,s("Pausa al pecho, trayecto vertical.","Pause on chest, vertical path."),variant+"_bb");
      });

    // Back
    [
      [s("Remo mancuerna un brazo","One-arm DB Row"),"back_row_db_one",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Tracción hacia la cadera, sin balanceo.","Row to hip, no swing.")],
      [s("Remo con mancuernas inclinado","Bent-over DB Row"),"back_row_db_bent",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Torso estable.","Stable torso.")],
      [s("Pull-apart con banda","Band Pull-apart"),"back_pullapart_band",[Equip.bands],[Env.home,Env.gym],false,true,s("Retrae escápulas.","Retract scap.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(LST,n+t,"back",["horizontalPull"],eq,env,uni,beg,ins,v)));
    add(LST,s("Remo con barra","Barbell Row"),"back",["horizontalPull"],[Equip.barbell],[Env.home,Env.gym],false,false,s("Torso 30–45°, columna neutra.","Torso 30–45°, neutral."),"back_row_bb");

    // Quads
    [
      [s("Sentadilla goblet","Goblet Squat"),"quads_goblet",[Equip.dumbbells,Equip.kettlebell],[Env.home,Env.gym],false,true,s("Rodillas siguen puntas, tronco estable.","Knees track toes, stable torso.")],
      [s("Split squat búlgaro","Bulgarian Split Squat"),"quads_bulgarian",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Controla la bajada.","Control the descent.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(LST,n+t,"quads",["kneeDominant"],eq,env,uni,beg,ins,v)));

    // Hamstrings
    [
      [s("Peso muerto rumano DB","DB RDL"),"hams_rdl_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Cadera atrás, columna neutra.","Hips back, neutral.")],
      [s("RDL a una pierna DB","DB Single-leg RDL"),"hams_rdl_single_db",[Equip.dumbbells],[Env.home,Env.gym],true,false,s("Equilibrio, cadera cuadrada.","Balance, hips square.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(LST,n+t,"hamstrings",["hipHinge"],eq,env,uni,beg,ins,v)));

    // Glutes
    [
      [s("Glute bridge","Glute Bridge"),"glutes_bridge_bw",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Empuja desde talones.","Drive through heels.")],
      [s("Hip thrust en banco","Bench Hip Thrust"),"glutes_hipthrust_bench",[Equip.bench,Equip.dumbbells],[Env.home,Env.gym],false,true,s("Retroversión arriba, pausa 1s.","Posterior tilt, 1s squeeze.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>add(LST,n,"glutes",["hipHinge"],eq,env,uni,beg,ins,v));

    // Shoulders
    [
      [s("Press militar DB","DB Overhead Press"),"shoulders_press_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Core firme, evita arco lumbar.","Brace core, avoid lumbar arch.")],
      [s("Elevación lateral","Lateral Raise"),"shoulders_lateral",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Sin impulso.","No swing.")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>add(LST,n,"shoulders",["verticalPush"],eq,env,uni,beg,ins,v));

    // Biceps, Triceps (clave para búsqueda)
    add(LST,s("Curl DB supinado","DB Curl (supinated)"),"biceps",["elbowFlexion"],[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codo quieto, excéntrica controlada.","Elbow still, controlled eccentric."),"biceps_curl_db");
    add(LST,s("Extensión DB sobre cabeza","DB Overhead Triceps"),"triceps",["elbowExtension"],[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codos fijos.","Elbows fixed."),"triceps_db_oh");

    // Core + Calves
    add(LST,s("Plancha frontal","Front Plank"),"core",["abAntiExtension"],[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Costillas adentro, glúteos activos.","Ribs down, glutes on."),"core_plank");
    add(LST,s("Elevación talones de pie","Standing Calf Raise"),"calves",["calfRaise"],[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Pausa 1s arriba.","1s top pause."),"calves_standing");

    return LST;
  }
};

/* Custom & Favorites */
const CustomStoreKey = "custom_exercises_v1";
const FavoriteKey = "favorite_plans_v2";
const CustomStore = {
  list(){ return Storage.get(CustomStoreKey,[]); },
  add(ex){ const arr=this.list(); arr.unshift(ex); Storage.set(CustomStoreKey,arr); }
};
const Favorites = {
  list(){ return Storage.get(FavoriteKey,[]); },
  add(plan){ const arr=this.list(); arr.unshift(plan); Storage.set(FavoriteKey,arr); },
  removeAt(i){ const arr=this.list(); arr.splice(i,1); Storage.set(FavoriteKey,arr); }
};

/* Filters & VM */
let AllExercises = ExerciseLibrary.makeAll().concat(CustomStore.list());
const Filters = {
  environment: Env.home,
  allowedEquipment: new Set(Object.values(Equip)),
  minutes: 30,
  preferBeginner: true,
  goal: Goal.hypertrophy,
  fullBody: false
};
let selectedMuscle = null;
let currentPlan = null;

/* Selection helpers */
function pool(muscle){
  return AllExercises.filter(ex =>
    ex.environment.includes(Filters.environment) &&
    ex.equipment.every(e=>Filters.allowedEquipment.has(e)) &&
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
  const wanted=[Pattern.horizontalPush,Pattern.horizontalPull,Pattern.kneeDominant,Pattern.hipHinge,Pattern.abAntiExtension];

  let chosen=[];
  if(Filters.fullBody){
    for(const pat of wanted){
      const pick = p.find(e=>e.patterns.includes(pat) && !chosen.includes(e));
      if(pick) chosen.push(pick);
      if(chosen.length===count) break;
    }
  }
  while(chosen.length<count){ const next = p.find(e=>!chosen.includes(e)); if(!next) break; chosen.push(next); }
  if(!chosen.length && p.length) chosen=[p[0]];

  const items = chosen.map(ex=>({
    id: makeId(), exercise: ex, sets, reps:[rmin,rmax], restSeconds:rest,
    notes: ex.unilateral ? (Lang.get()==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (Lang.get()==="es" ? "RPE 7–8." : "RPE 7–8.")
  }));
  const warm = Lang.get()==="es" ? "5–7 min movilidad + 2 series ligeras del primer ejercicio." : "5–7 min mobility + 2 light ramp-up sets.";
  const cool = Lang.get()==="es" ? "3–5 min respiración nasal + estiramientos suaves." : "3–5 min nasal breathing + gentle stretches.";

  currentPlan = { id: makeId(), muscle: Filters.fullBody?null:selectedMuscle, goal: Filters.goal, durationMinutes: Filters.minutes, items, warmup:warm, cooldown:cool, createdAt: Date.now() };
  render();
}

/* ---------- UI ---------- */
function renderHeader(){
  document.getElementById('appTitle').textContent = t('appTitle');
  document.getElementById('subtitle').textContent = t('selectMuscle');
}
function renderMuscleChips(){
  const cont = document.getElementById('muscleChips'); cont.innerHTML="";
  const full = el(`<button class="chip ${Filters.fullBody?'active':''}">${t('fullBody')}</button>`);
  full.onclick=()=>{ Filters.fullBody=!Filters.fullBody; if(Filters.fullBody) selectedMuscle=null; render(); };
  cont.appendChild(full);
  for(const m of Muscle){
    const chip = el(`<button class="chip ${selectedMuscle===m && !Filters.fullBody?'active':''}">${muscleTitle(m)}</button>`);
    chip.onclick=()=>{ Filters.fullBody=false; selectedMuscle=m; render(); };
    cont.appendChild(chip);
  }
}

/* timers per-item to preserve state across renders */
const Timers = new Map(); // id -> {remaining, running, interval, target}

function renderContent(){
  const root = document.getElementById('content'); root.innerHTML="";
  if(!currentPlan){
    root.appendChild(el(`<div class="empty"><div><div style="font-size:54px">💪</div>${t('selectMuscle')}</div></div>`));
    return;
  }

  /* Header card */
  root.appendChild(el(`<div class="card">
    <div class="row">
      <div>
        <div style="font-weight:800">${currentPlan.muscle?muscleTitle(currentPlan.muscle):t('fullBody')}</div>
        <div class="caption">${t(currentPlan.goal)} • ${currentPlan.durationMinutes} ${t('minutes').toLowerCase()}</div>
      </div>
    </div>
  </div>`));

  /* Warmup */
  root.appendChild(el(`<div class="card"><div class="row"><div><strong>${t('warmup')}</strong><div class="caption">${currentPlan.warmup}</div></div></div></div>`));

  /* Items */
  currentPlan.items.forEach((item, idx)=>{
    const timer = Timers.get(item.id) || { remaining:item.restSeconds, running:false, target:item.restSeconds, interval:null };
    Timers.set(item.id, timer);

    const card = el(`<div class="card" data-idx="${idx}">
      <div class="row">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700">${item.exercise.name}</div>
          <div class="caption">${item.exercise.instructions}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end">
          <span class="badge">${item.sets}×${item.reps[0]}–${item.reps[1]}</span>
          <button class="btn ghost small" data-act="replace">${t('replace')}</button>
          <button class="btn ghost small" data-act="remove">${t('remove')}</button>
        </div>
      </div>
      <div class="row">
        <div class="caption">⏱ ${t('rest')} ${item.restSeconds}s ${item.exercise.unilateral?` • 🔁 ${t('unilateral')}`:""}</div>
        <div class="timer" data-timer>
          <span class="time" data-time title="${t('editTime')}">${formatTime(timerDisplay(timer))}</span>
          <button class="btn primary small" data-act="start">${t('start')}</button>
          <button class="btn ghost small" data-act="pause">${t('pause')}</button>
          <button class="btn ghost small" data-act="reset">${t('reset')}</button>
          <button class="btn ghost small" data-act="gif">GIF</button>
        </div>
      </div>
    </div>`);

    // Delegated click handling for this card
    card.addEventListener('click', (ev)=>{
      const btn = ev.target.closest('[data-act]');
      if(!btn) return;

      const act = btn.dataset.act;
      if(act==="replace"){
        const alt = alternatives(item.exercise)[0]; if(!alt) return;
        currentPlan.items[idx] = {...item, exercise:alt};
        render();
      } else if(act==="remove"){
        currentPlan.items.splice(idx,1);
        Timers.delete(item.id);
        render();
      } else if(act==="gif"){
        openGif(item.exercise.name);
      } else if(act==="start"){
        startTimer(item.id, item.restSeconds);
      } else if(act==="pause"){
        pauseTimer(item.id);
      } else if(act==="reset"){
        resetTimer(item.id, item.restSeconds);
      }
    });

    // Tap on time to edit
    card.querySelector('[data-time]').addEventListener('click', ()=>{
      openTimeEditor(item, (totalSeconds)=>{
        const tmr = Timers.get(item.id);
        tmr.target = totalSeconds;
        tmr.remaining = totalSeconds;
        tmr.running = false;
        updateTimeEl(card, tmr);
      });
    });

    // set initial display
    updateTimeEl(card, timer);

    root.appendChild(card);
  });

  /* Footer actions */
  const footer = el(`<div class="card">
    <div class="grid cols3">
      <button class="btn primary" id="addEx">＋ ${t('addExercise')}</button>
      <button class="btn ghost" id="saveFav">❤️ ${t('saveFavorite')}</button>
      <button class="btn ghost" id="clearPlan">🗑️ ${t('clear')}</button>
    </div>
    <div class="row" style="margin-top:8px"><div><strong>${t('cooldown')}</strong><div class="caption">${currentPlan.cooldown}</div></div></div>
  </div>`);
  footer.querySelector('#addEx').onclick=openPicker;
  footer.querySelector('#saveFav').onclick=()=>{ Favorites.add(currentPlan); flashSaved(); };
  footer.querySelector('#clearPlan').onclick=()=>{ currentPlan=null; Timers.clear(); render(); };
  root.appendChild(footer);
}

/* Timer helpers */
function timerDisplay(t){ return (t.running || t.remaining>0) ? t.remaining : (t.target || 60); }
function formatTime(s){ const m=Math.floor(s/60), r=s%60; return `${m}:${String(r).padStart(2,"0")}`; }
function updateTimeEl(card, timer){ const el = card.querySelector('[data-time]'); el.textContent = formatTime(timerDisplay(timer)); }
function startTimer(id, defaultSec){
  const tmr = Timers.get(id) || {remaining:defaultSec,target:defaultSec,running:false,interval:null};
  if(tmr.running) return;
  if(tmr.remaining<=0) tmr.remaining = tmr.target || defaultSec;
  tmr.running = true;
  tmr.interval = setInterval(()=>{
    if(!tmr.running) return;
    tmr.remaining--;
    document.querySelectorAll(`.card [data-idx]`); // no-op: keep
    const card = document.querySelector(`.card[data-idx]`); // not specific; we'll update all times below
    // repaint all times for this id
    document.querySelectorAll(`[data-idx]`).forEach(c=>{
      const idx = parseInt(c.dataset.idx,10);
      const it = currentPlan?.items[idx];
      if(!it) return;
      if(it.id===id){ updateTimeEl(c, tmr); }
    });
    if(tmr.remaining<=0){
      tmr.running=false; clearInterval(tmr.interval); tmr.interval=null;
      if(navigator.vibrate) navigator.vibrate(120);
    }
  },1000);
  Timers.set(id, tmr);
}
function pauseTimer(id){
  const tmr = Timers.get(id); if(!tmr) return;
  tmr.running=false; if(tmr.interval){ clearInterval(tmr.interval); tmr.interval=null; }
}
function resetTimer(id, defaultSec){
  const tmr = Timers.get(id) || {remaining:defaultSec,target:defaultSec};
  tmr.running=false; if(tmr.interval){ clearInterval(tmr.interval); tmr.interval=null; }
  tmr.remaining = tmr.target || defaultSec;
  Timers.set(id, tmr);
  // update UI
  document.querySelectorAll(`[data-idx]`).forEach(c=>{
    const idx = parseInt(c.dataset.idx,10);
    const it = currentPlan?.items[idx];
    if(it && it.id===id) updateTimeEl(c, tmr);
  });
}

/* Flash */
function flashSaved(){
  const n = el(`<div class="flash">${t('saved')} ✅</div>`);
  document.body.appendChild(n); setTimeout(()=>n.remove(),1200);
}

/* Filters modal */
function openFilters(){
  const m = document.getElementById('filtersModal');
  const eqList = Object.values(Equip).map(e=>`
    <label><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}> ${equipmentTitle(e)}</label>
  `).join('<br>');

  m.innerHTML = `
    <div class="sticky"><h3>${t('filters')}</h3></div>
    <div class="grid cols2">
      <div>
        <label>${t('goal')}</label>
        <select id="f_goal">
          <option value="strength">${t('strength')}</option>
          <option value="hypertrophy">${t('hypertrophy')}</option>
          <option value="fatLoss">${t('fatLoss')}</option>
          <option value="maintenance">${t('maintenance')}</option>
        </select>
      </div>
      <div>
        <label>${t('environment')}</label>
        <select id="f_env">
          <option value="home">${t('home')}</option>
          <option value="gym">${t('gym')}</option>
        </select>
      </div>
    </div>
    <div class="grid">
      <div>
        <label>${t('minutes')}: <strong id="minsVal">${Filters.minutes}</strong></label>
        <input type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
        <div class="caption">${t('timeBased')}</div>
      </div>
    </div>
    <div class="grid">
      <label>${t('equipment')}</label>
      <div class="grid">${eqList}</div>
    </div>
    <div class="grid cols2">
      <label><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}> ${t('beginner')}</label>
      <label><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}> ${t('fullBody')}</label>
    </div>
    <div class="grid cols2">
      <button class="btn ghost" id="f_close">✖️ ${t('close')}</button>
      <button class="btn primary" id="f_ready">✅ ${t('ready')}</button>
    </div>
  `;
  m.querySelector('#f_goal').value = Filters.goal;
  m.querySelector('#f_env').value = Filters.environment;
  m.querySelector('#f_minutes').oninput = e => m.querySelector('#minsVal').textContent = e.target.value;
  m.querySelector('#f_close').onclick = closeModals;
  m.querySelector('#f_ready').onclick = ()=>{
    Filters.goal = m.querySelector('#f_goal').value;
    Filters.environment = m.querySelector('#f_env').value;
    Filters.minutes = parseInt(m.querySelector('#f_minutes').value,10);
    Filters.preferBeginner = m.querySelector('#f_beg').checked;
    Filters.fullBody = m.querySelector('#f_full').checked;
    const inputs=[...m.querySelectorAll('[data-eq]')];
    const set=new Set(); inputs.forEach(inp=>{ if(inp.checked) set.add(inp.dataset.eq); });
    Filters.allowedEquipment = set.size?set:new Set(Object.values(Equip));
    closeModals(); render();
  };
  showModal('filtersModal');
}

/* Picker modal */
function openPicker(){
  const m = document.getElementById('pickerModal');
  const startMuscle = selectedMuscle;
  let query="";
  let muscleFilter = startMuscle || null;

  function filtered(){
    const pool = AllExercises;
    const q = norm(query);
    return pool.filter(ex =>
      (muscleFilter==null || ex.muscle===muscleFilter) &&
      ex.environment.includes(Filters.environment) &&
      ex.equipment.every(e=>Filters.allowedEquipment.has(e)) &&
      (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
      (q==="" ? true : (
        norm(ex.name).includes(q) ||
        norm(ex.instructions).includes(q) ||
        norm(muscleTitle(ex.muscle)).includes(q) ||
        norm(ex.variant).includes(q)
      ))
    ).sort((a,b)=> a.name.localeCompare(b.name));
  }

  function renderPicker(){
    const chipsMuscles = `<button class="chip ${muscleFilter==null?"active":""}" data-muscle="">${t('all')}</button>` +
      Muscle.map(m=>`<button class="chip ${muscleFilter===m?"active":""}" data-muscle="${m}">${muscleTitle(m)}</button>`).join('');
    const items = filtered().map(ex=>`
      <tr>
        <td><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></td>
        <td class="small">${muscleTitle(ex.muscle)}<br><span class="caption">${ex.equipment.map(equipmentTitle).join(", ")}</span></td>
        <td style="text-align:right"><button class="btn primary small" data-add="${ex.id}">＋</button></td>
      </tr>`).join('');

    m.innerHTML = `
      <div class="sticky">
        <h3 style="margin:0">${t('addExercise')}</h3>
        <div class="grid cols2" style="margin-top:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <span>🔎</span>
            <input id="q" placeholder="${t('searchExercises')}" autocomplete="off">
          </div>
          <div style="text-align:right">
            <button class="btn ghost small" id="mkCustom">＋ ${t('createExercise')}</button>
            <button class="btn ghost small" id="closePicker">✖️ ${t('close')}</button>
          </div>
        </div>
        <div class="chips" id="chips">${chipsMuscles}</div>
      </div>
      <table class="table">${items}</table>
    `;
    m.querySelector('#q').value=query;
    setTimeout(()=>m.querySelector('#q').focus(), 50);
    m.querySelector('#q').oninput = e=>{ query=e.target.value; renderPicker(); };
    m.querySelector('#closePicker').onclick=closeModals;
    m.querySelector('#mkCustom').onclick=()=>openNewExerciseForm(()=>{ AllExercises = ExerciseLibrary.makeAll().concat(CustomStore.list()); renderPicker(); });

    m.querySelectorAll('[data-muscle]').forEach(b=>b.onclick=()=>{
      const v=b.dataset.muscle; muscleFilter = v? v : null; renderPicker();
    });
    m.querySelectorAll('[data-add]').forEach(btn=>btn.onclick=()=>{
      const ex = filtered().find(e=>e.id===btn.dataset.add); if(!ex) return;
      openConfig(ex, (sets,repsMin,repsMax,rest)=>{
        currentPlan.items.push({ id:makeId(), exercise:ex, sets, reps:[repsMin,repsMax], restSeconds:rest,
          notes: ex.unilateral ? (Lang.get()==="es"?"Trabaja ambos lados. RPE 7–8.":"Work both sides. RPE 7–8.") : (Lang.get()==="es"?"RPE 7–8.":"RPE 7–8.") });
        closeModals(); render();
      });
    });
  }
  renderPicker();
  showModal('pickerModal');
}

/* Add-exercise config */
function openConfig(ex, onAdd){
  const m = document.getElementById('configModal');
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('addExercise')}</h3></div>
    <div class="grid">
      <div><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></div>
    </div>
    <div class="grid cols3">
      <div><label>${t('sets')}</label><input type="number" id="cfg_sets" min="1" max="10" value="${sets}"></div>
      <div><label>${t('minReps')}</label><input type="number" id="cfg_min" min="1" max="30" value="${rmin}"></div>
      <div><label>${t('maxReps')}</label><input type="number" id="cfg_max" min="${rmin}" max="30" value="${rmax}"></div>
    </div>
    <div class="grid"><div><label>${t('rest')} (s)</label><input type="number" id="cfg_rest" min="15" max="300" step="15" value="${rest}"></div></div>
    <div class="grid cols2">
      <button class="btn ghost" id="cfg_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="cfg_save">💾 ${t('save')}</button>
    </div>
  `;
  m.querySelector('#cfg_cancel').onclick=closeModals;
  m.querySelector('#cfg_save').onclick=()=>{
    const s = Math.max(1,Math.min(10,parseInt(m.querySelector('#cfg_sets').value||sets)));
    const min = Math.max(1,parseInt(m.querySelector('#cfg_min').value||rmin));
    const max = Math.max(min,parseInt(m.querySelector('#cfg_max').value||rmax));
    const r = Math.max(15,parseInt(m.querySelector('#cfg_rest').value||rest));
    onAdd(s,min,max,r);
  };
  showModal('configModal');
}

/* New Exercise form */
function openNewExerciseForm(onDone){
  const m = document.getElementById('pickerModal');
  const eqOpts = Object.values(Equip).map(e=>`<label><input type="checkbox" data-eq="${e}"> ${equipmentTitle(e)}</label>`).join('<br>');
  const envOpts = [Env.home,Env.gym].map(e=>`<label><input type="checkbox" data-env="${e}" checked> ${t(e)}</label>`).join('<br>');
  const patOpts = Object.values(Pattern).map(p=>`<label><input type="checkbox" data-p="${p}"> ${patternTitle(p)}</label>`).join('<br>');

  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('createExercise')}</h3></div>
    <div class="grid cols2">
      <div><label>${t('name')}</label><input id="nx_name" placeholder="${t('name')}"></div>
      <div><label>${t('muscle')}</label>
        <select id="nx_muscle">
          ${Muscle.map(m=>`<option value="${m}">${muscleTitle(m)}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="grid"><label>${t('patterns')}</label><div class="grid">${patOpts}</div></div>
    <div class="grid"><label>${t('equipment')}</label><div class="grid">${eqOpts}</div></div>
    <div class="grid"><label>${t('environment')}</label><div class="grid">${envOpts}</div></div>
    <div class="grid cols2">
      <label><input type="checkbox" id="nx_uni"> ${t('unilateralQ')}</label>
      <label><input type="checkbox" id="nx_beg" checked> ${t('beginnerQ')}</label>
    </div>
    <div class="grid"><label>${t('instructions')}</label><textarea id="nx_ins" rows="3"></textarea></div>
    <div class="grid"><label>${t('mediaURL')}</label><input id="nx_media" placeholder="https://..."></div>
    <div class="grid cols2">
      <button class="btn ghost" id="nx_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="nx_save">💾 ${t('save')}</button>
    </div>
    <div class="caption">${t('custom')}</div>
  `;
  m.querySelector('#nx_cancel').onclick = openPicker;
  setTimeout(()=>m.querySelector('#nx_name').focus(),50);
  m.querySelector('#nx_save').onclick=()=>{
    const name = (m.querySelector('#nx_name').value||"").trim() || (Lang.get()==="es"?"Ejercicio sin nombre":"Untitled exercise");
    const muscle = m.querySelector('#nx_muscle').value;
    const pats=[...m.querySelectorAll('[data-p]')].filter(i=>i.checked).map(i=>i.dataset.p);
    const eq=[...m.querySelectorAll('[data-eq]')].filter(i=>i.checked).map(i=>i.dataset.eq);
    const env=[...m.querySelectorAll('[data-env]')].filter(i=>i.checked).map(i=>i.dataset.env);
    const unilateral = m.querySelector('#nx_uni').checked;
    const beginner = m.querySelector('#nx_beg').checked;
    const instructions = (m.querySelector('#nx_ins').value||"").trim() || (Lang.get()==="es"?"Ejercicio personalizado.":"Custom exercise.");
    const mediaURL = (m.querySelector('#nx_media').value||"").trim() || null;
    const ex = { id:makeId(), name, muscle, patterns: pats.length?pats:["hipHinge"], equipment: eq.length?eq:[Equip.bodyweight], environment: env.length?env:[Env.home,Env.gym], unilateral, beginnerFriendly: beginner, instructions, variant:`custom_${muscle}`, mediaURL };
    CustomStore.add(ex);
    if(typeof onDone==="function") onDone(ex);
  };
}

/* Favorites modal */
function openFavorites(){
  const m = document.getElementById('favoritesModal');
  const list = Favorites.list();
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('favorites')}</h3></div>
    ${!list.length? `<div class="caption" style="padding:10px">${Lang.get()==="es"?"Aún no hay favoritos.":"No favorites yet."}</div>`: ""}
    <div>
      ${list.map((p,i)=>`
        <div class="card">
          <div class="row">
            <div>
              <div style="font-weight:700">${p.muscle?muscleTitle(p.muscle):t('fullBody')}</div>
              <div class="caption">${t(p.goal)} • ${p.durationMinutes} ${t('minutes').toLowerCase()}</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <button class="btn primary small" data-use="${i}">✔ ${t('use')}</button>
              <button class="btn ghost small" data-del="${i}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div><button class="btn ghost" id="favClose">✖️ ${t('close')}</button></div>
  `;
  m.querySelector('#favClose').onclick=closeModals;
  m.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>{
    const plan = Favorites.list()[parseInt(b.dataset.use,10)];
    currentPlan = plan; closeModals(); render();
  });
  m.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{
    Favorites.removeAt(parseInt(b.dataset.del,10)); openFavorites();
  });
  showModal('favoritesModal');
}

/* Settings */
function openSettings(){
  const m = document.getElementById('settingsModal');
  const cur = localStorage.getItem(Lang.key) || "es";
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('settings')}</h3></div>
    <div class="grid">
      <label>${t('language')}</label>
      <select id="s_lang">
        <option value="system">${t('systemLang')}</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <div class="caption">${Lang.get()==="es" ? "Por defecto está en Español." : "Spanish is the default."}</div>
    </div>
    <div class="grid"><button class="btn ghost" id="s_close">✖️ ${t('close')}</button></div>
  `;
  m.querySelector('#s_lang').value = cur;
  m.querySelector('#s_close').onclick=closeModals;
  m.querySelector('#s_lang').onchange=e=>{
    const v=e.target.value; Lang.set(v);
    AllExercises = ExerciseLibrary.makeAll().concat(CustomStore.list());
    L = I18N[Lang.get()];
    render();
  };
  showModal('settingsModal');
}

/* Time editor */
function openTimeEditor(item, onSave){
  const m = document.getElementById('configModal');
  const tmr = Timers.get(item.id) || {target:item.restSeconds};
  const target = Math.max(1, Math.min(600, tmr.target || item.restSeconds));
  const initMin = Math.floor(target/60), initSec = target%60;
  m.innerHTML = `
    <div class="sticky"><h3>${t('editTime')}</h3></div>
    <div class="grid cols2">
      <div><label>Min</label><input type="number" id="m" min="0" max="10" value="${initMin}"></div>
      <div><label>Seg</label><input type="number" id="s" min="0" max="59" value="${initSec}"></div>
    </div>
    <div class="caption">${t('max1000')}</div>
    <div class="grid cols2" style="margin-top:8px">
      <button class="btn ghost" id="c_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="c_ok">💾 ${t('save')}</button>
    </div>
  `;
  m.querySelector('#c_cancel').onclick=closeModals;
  m.querySelector('#c_ok').onclick=()=>{
    let mins = parseInt(m.querySelector('#m').value||initMin,10);
    let secs = parseInt(m.querySelector('#s').value||initSec,10);
    mins = Math.max(0,Math.min(10,mins)); secs = Math.max(0,Math.min(59,secs));
    const total = Math.max(1, Math.min(600, mins*60 + secs));
    closeModals(); onSave(total);
  };
  showModal('configModal');
}

/* GIF Lightbox (tries iframe; fallbacks to new tab) */
function openGif(name){
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(name + " exercise gif")}&iax=images&ia=images`;
  const lb = document.getElementById('gifLightbox');
  const frame = document.getElementById('gifFrame');
  const fb = document.getElementById('gifFallback');
  fb.textContent = "";
  frame.src = url;
  let opened = false;
  const t = setTimeout(()=>{
    // If CSP blocks embedding, give fallback
    fb.innerHTML = `<a target="_blank" rel="noopener" href="${url}" class="btn ghost small">${t('openExternally')}</a>`;
  }, 900);
  document.getElementById('gifClose').onclick=()=>{
    frame.src="about:blank"; lb.classList.remove('show');
  };
  lb.classList.add('show');
}

/* Modals */
function showModal(id){ document.getElementById('backdrop').classList.add('show'); document.getElementById(id).classList.add('show'); }
function closeModals(){ document.getElementById('backdrop').classList.remove('show'); document.querySelectorAll('.sheet').forEach(m=>m.classList.remove('show')); document.getElementById('gifLightbox').classList.remove('show'); }
document.getElementById('backdrop').onclick=closeModals;

/* Header buttons */
document.getElementById('openFilters').onclick=openFilters;
document.getElementById('btnFilters').onclick=openFilters;
document.getElementById('btnFavorites').onclick=openFavorites;
document.getElementById('btnSettings').onclick=openSettings;
document.getElementById('generate').onclick=generate;

/* Render root */
function render(){
  L = I18N[Lang.get()];
  applyStaticI18n();
  renderHeader();
  renderMuscleChips();
  document.getElementById('generate').disabled = (!Filters.fullBody && !selectedMuscle);
  renderContent();
}

/* Boot */
render();
