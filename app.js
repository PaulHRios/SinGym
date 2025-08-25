/* ===================== i18n ===================== */
const I18N = {
  es: {
    appTitle:"Rutinas en casa", muscle:"Músculo", fullBody:"Cuerpo completo", filters:"Filtros", generate:"Generar",
    minutes:"Minutos", goal:"Objetivo", environment:"Entorno", equipment:"Equipo disponible", beginner:"Enfocar a principiantes",
    gym:"Gimnasio", home:"Casa", strength:"Fuerza", hypertrophy:"Hipertrofia", fatLoss:"Pérdida de grasa", maintenance:"Mantenimiento",
    warmup:"Calentamiento", cooldown:"Vuelta a la calma", rest:"Descanso", unilateral:"Unilateral", favorites:"Favoritos",
    saveFavorite:"Guardar en favoritos", saved:"Guardado", timer:"Temporizador", start:"Iniciar", pause:"Pausar", reset:"Reiniciar",
    selectMuscle:"Elige un músculo o activa Cuerpo completo y presiona Generar.",
    ready:"Listo", close:"Cerrar", timeBased:"Duración estimada",
    replace:"Sustituir", clear:"Limpiar", settings:"Ajustes", language:"Idioma", systemLang:"Sistema",
    addExercise:"Añadir ejercicio", remove:"Eliminar", searchExercises:"Buscar ejercicios", createExercise:"Crear ejercicio",
    patterns:"Patrones", unilateralQ:"¿Unilateral?", beginnerQ:"Apto principiantes", instructions:"Instrucciones",
    mediaURL:"URL multimedia (opcional)", save:"Guardar", cancel:"Cancelar", setsRepsRest:"Series / Reps / Descanso",
    feedback:"Comentarios", name:"Nombre", email:"Correo", message:"Mensaje", send:"Enviar",
    thanksFeedback:"Gracias por tus comentarios.",
    supportDev:"Apoyar al desarrollador", tipJar:"Invítame un café ☕️", loading:"Cargando…", custom:"Personalizado",
    all:"Todos", use:"Usar", editTime:"Editar tiempo", max1000:"Máximo 10:00"
  },
  en: {
    appTitle:"Home Routines", muscle:"Muscle", fullBody:"Full body", filters:"Filters", generate:"Generate",
    minutes:"Minutes", goal:"Goal", environment:"Environment", equipment:"Available equipment", beginner:"Beginner friendly",
    gym:"Gym", home:"Home", strength:"Strength", hypertrophy:"Hypertrophy", fatLoss:"Fat loss", maintenance:"Maintenance",
    warmup:"Warm-up", cooldown:"Cool-down", rest:"Rest", unilateral:"Unilateral", favorites:"Favorites",
    saveFavorite:"Save favorite", saved:"Saved", timer:"Timer", start:"Start", pause:"Pause", reset:"Reset",
    selectMuscle:"Pick a muscle or switch to Full body, then tap Generate.",
    ready:"Done", close:"Close", timeBased:"Estimated duration",
    replace:"Replace", clear:"Clear", settings:"Settings", language:"Language", systemLang:"System",
    addExercise:"Add exercise", remove:"Remove", searchExercises:"Search exercises", createExercise:"Create exercise",
    patterns:"Movement patterns", unilateralQ:"Unilateral?", beginnerQ:"Beginner friendly", instructions:"Instructions",
    mediaURL:"Media URL (optional)", save:"Save", cancel:"Cancel", setsRepsRest:"Sets / Reps / Rest",
    feedback:"Feedback", name:"Name", email:"Email", message:"Message", send:"Send",
    thanksFeedback:"Thanks for your feedback.",
    supportDev:"Support the developer", tipJar:"Tip Jar ☕️", loading:"Loading…", custom:"Custom",
    all:"All", use:"Use", editTime:"Edit time", max1000:"Max 10:00"
  }
};
// por defecto español
const Lang = {
  key:"app_lang_v1",
  get(){ const raw=localStorage.getItem(this.key)||"es"; return raw==="system" ? ((navigator.language||"en").toLowerCase().startsWith("es")?"es":"en") : raw; },
  set(v){ localStorage.setItem(this.key,v); }
};
let L = I18N[Lang.get()];
function t(k){ return (L[k] ?? k); }
function applyStaticI18n(){ document.querySelectorAll("[data-i]").forEach(n => n.textContent = t(n.dataset.i)); }
const $ = sel => document.querySelector(sel);

/* ===================== Domain ===================== */
const Env = { home:"home", gym:"gym" };
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };
const Muscles = ["chest","back","quads","hamstrings","glutes","shoulders","biceps","triceps","calves","core"];
const Pattern = { horizontalPush:"horizontalPush", verticalPush:"verticalPush", horizontalPull:"horizontalPull", verticalPull:"verticalPull",
  kneeDominant:"kneeDominant", hipHinge:"hipHinge", elbowFlexion:"elbowFlexion", elbowExtension:"elbowExtension",
  abAntiExtension:"abAntiExtension", abAntiRotation:"abAntiRotation", abFlexion:"abFlexion", abLateralFlexion:"abLateralFlexion", calfRaise:"calfRaise" };
const Goal = { strength:"strength", hypertrophy:"hypertrophy", fatLoss:"fatLoss", maintenance:"maintenance" };

function mTitle(m){
  const es = {chest:"Pecho",back:"Espalda",quads:"Cuádriceps",hamstrings:"Isquios",glutes:"Glúteos",shoulders:"Hombros",biceps:"Bíceps",triceps:"Tríceps",calves:"Pantorrillas",core:"Core"};
  const en = {chest:"Chest",back:"Back",quads:"Quads",hamstrings:"Hamstrings",glutes:"Glutes",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",calves:"Calves",core:"Core"};
  return (Lang.get()==="es"?es:en)[m];
}
function equipTitle(e){
  const es = {bodyweight:"Peso corporal",dumbbells:"Mancuernas",kettlebell:"Pesa rusa",barbell:"Barra",bench:"Banco",bands:"Ligas",cable:"Poleas",machine:"Máquina",smith:"Multipower (Smith)"};
  const en = {bodyweight:"Bodyweight",dumbbells:"Dumbbells",kettlebell:"Kettlebell",barbell:"Barbell",bench:"Bench",bands:"Bands",cable:"Cables",machine:"Machine",smith:"Smith machine"};
  return (Lang.get()==="es"?es:en)[e] || e;
}

/* ===================== Storage ===================== */
const Storage = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{ return def; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const CustomStoreKey = "custom_exercises_v1";
const FavoriteKey = "favorite_plans_v2";
const CustomStore = { list(){ return Storage.get(CustomStoreKey,[]); }, add(ex){const a=this.list(); a.unshift(ex); Storage.set(CustomStoreKey,a);} };
const Favorites = { list(){ return Storage.get(FavoriteKey,[]); }, add(p){ const a=this.list(); a.unshift(p); Storage.set(FavoriteKey,a); }, removeAt(i){ const a=this.list(); a.splice(i,1); Storage.set(FavoriteKey,a);} };

/* ===================== Defaults ===================== */
const TrainingDefaults = {
  targetExercises(d, fb){ if(d<30) return fb?3:2; if(d<45) return fb?4:3; if(d<60) return fb?5:4; if(d<90) return fb?6:5; return fb?6:6; },
  sets(goal,d){ switch(goal){ case Goal.strength: return d<40?3:4; case Goal.hypertrophy: return d<40?3:4; case Goal.fatLoss: return 3; case Goal.maintenance: return 3; } },
  repRange(goal){ switch(goal){ case Goal.strength: return [4,6]; case Goal.hypertrophy: return [8,12]; case Goal.fatLoss: return [12,20]; case Goal.maintenance: return [8,12]; } },
  rest(goal){ switch(goal){ case Goal.strength: return 120; case Goal.hypertrophy: return 90; case Goal.fatLoss: return 60; case Goal.maintenance: return 75; } }
};

// Estado VM (con tus defaults pedidos)
let EXERCISES = []; // ejercicios base + custom
let Filters = {
  environment: Env.home,
  // Todo activo MENOS poleas/cable, máquina y smith:
  allowedEquipment: new Set(Object.values(Equip).filter(e => !["cable","machine","smith"].includes(e))),
  minutes: 30,
  preferBeginner: false, // principiantes APAGADO
  goal: Goal.hypertrophy,
  fullBody: false
};
let selectedMuscle = null;
let currentPlan = null;

/* ===================== Helpers ===================== */
const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const el = html => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };
const showModal = id => { $("#backdrop").classList.add("show"); $("#"+id).classList.add("show"); };
const closeModals = () => { $("#backdrop").classList.remove("show"); document.querySelectorAll(".modal").forEach(m=>m.classList.remove("show")); };
$("#backdrop").onclick = closeModals;
const shuffle = a => { const x=[...a]; for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x; };
const norm = s => (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

/* ===================== Exercise Library (subset + fetch externo) ===================== */
function addEx(list, n,m,p,eq,env,uni,beg,ins,v,media=null){
  list.push({id:makeId(), name:n, muscle:m, patterns:p, equipment:eq, environment:env, unilateral:uni, beginnerFriendly:beg, instructions:ins, variant:v, mediaURL:media});
}
function builtInLibrary(){
  const H = (Lang.get()==="es");
  const s = (es,en)=> H?es:en;
  const L=[];
  // Chest
  [["Flexiones","Push-ups","chest_pushup",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Manos bajo hombros, cuerpo en línea.","Hands under shoulders, body in line.")],
   ["Press plano con mancuernas","DB Flat Press","chest_mid_db",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],false,true,s("Escápulas retraídas, 2s abajo/1s arriba.","Scap retracted, 2s down/1s up.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "chest", ["horizontalPush"], eq, env, uni, beg, ins, v));
  // Back
  [["Remo mancuerna un brazo","One-arm DB Row","back_row_db_one",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Tracción hacia la cadera, sin balanceo.","Row to hip, no swing.")],
   ["Remo con barra","Barbell Row","back_row_bb",[Equip.barbell],[Env.home,Env.gym],false,false,s("Torso 30–45°, columna neutra.","Torso 30–45°, neutral.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "back", ["horizontalPull"], eq, env, uni, beg, ins, v));
  // Quads
  [["Sentadilla goblet","Goblet Squat","quads_goblet",[Equip.dumbbells,Equip.kettlebell],[Env.home,Env.gym],false,true,s("Rodillas siguen puntas.","Knees track toes.")],
   ["Split squat búlgaro","Bulgarian Split Squat","quads_bulgarian",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Controla la bajada.","Control descent.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "quads", ["kneeDominant"], eq, env, uni, beg, ins, v));
  // Hams
  [["Peso muerto rumano DB","DB RDL","hams_rdl_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Cadera atrás, columna neutra.","Hips back, neutral.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "hamstrings", ["hipHinge"], eq, env, uni, beg, ins, v));
  // Glutes
  [["Glute bridge","Glute Bridge","glutes_bridge_bw",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Empuja desde talones.","Drive through heels.")],
   ["Hip thrust en banco","Bench Hip Thrust","glutes_hipthrust_bench",[Equip.bench,Equip.dumbbells],[Env.home,Env.gym],false,true,s("Retroversión arriba.","Posterior tilt at top.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "glutes", ["hipHinge"], eq, env, uni, beg, ins, v));
  // Shoulders
  [["Press militar DB","DB Overhead Press","shoulders_press_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Core firme.","Brace core.")],
   ["Elevación lateral","Lateral Raise","shoulders_lateral",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Sin impulso.","No swing.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "shoulders", ["verticalPush"], eq, env, uni, beg, ins, v));
  // Biceps / Triceps / Core / Calves
  [["Curl DB supinado","DB Curl (supinated)","biceps_curl_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codo quieto.","Elbow still.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "biceps", ["elbowFlexion"], eq, env, uni, beg, ins, v));
  [["Extensión DB sobre cabeza","DB Overhead Triceps","triceps_db_oh",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codos fijos.","Elbows fixed.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "triceps", ["elbowExtension"], eq, env, uni, beg, ins, v));
  [["Plancha frontal","Front Plank","core_plank",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Costillas adentro.","Ribs down.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "core", ["abAntiExtension"], eq, env, uni, beg, ins, v));
  [["Elevación talones de pie","Standing Calf Raise","calves_standing",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Pausa 1s arriba.","1s top pause.")]]
   .forEach(([es,en,v,eq,env,uni,beg,ins])=> addEx(L, s(es,en), "calves", ["calfRaise"], eq, env, uni, beg, ins, v));

  return L;
}
async function loadExercises(){
  try{
    const res = await fetch("exercises.json?v=3", {cache:"no-store"});
    if(!res.ok) throw new Error("HTTP "+res.status);
    const json = await res.json();
    return json.concat(CustomStore.list());
  }catch{
    return builtInLibrary().concat(CustomStore.list());
  }
}

/* ===================== Generator ===================== */
function pool(muscle){
  return EXERCISES.filter(ex =>
    ex.environment.includes(Filters.environment) &&
    ex.equipment.every(e => Filters.allowedEquipment.has(e)) &&
    (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
    (muscle ? ex.muscle === muscle : true)
  );
}
function alternatives(ex){
  const all = pool(ex.muscle).filter(e=>e.id!==ex.id);
  const sameVariant = all.filter(e=>e.variant===ex.variant);
  if(sameVariant.length) return shuffle(sameVariant);
  const samePattern = all.filter(e=>e.patterns.some(p => ex.patterns.includes(p)));
  return samePattern.length ? shuffle(samePattern) : shuffle(all);
}
function generate(){
  const p = shuffle(pool(Filters.fullBody?null:selectedMuscle));
  const count = TrainingDefaults.targetExercises(Filters.minutes, Filters.fullBody);
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  const wanted = [Pattern.horizontalPush,Pattern.horizontalPull,Pattern.kneeDominant,Pattern.hipHinge,Pattern.abAntiExtension];

  let chosen = [];
  if(Filters.fullBody){
    for(const pat of wanted){
      const pick = p.find(e => e.patterns.includes(pat) && !chosen.includes(e));
      if(pick) chosen.push(pick);
      if(chosen.length === count) break;
    }
  }
  while(chosen.length < count){
    const next = p.find(e => !chosen.includes(e));
    if(!next) break;
    chosen.push(next);
  }
  if(!chosen.length && p.length) chosen=[p[0]];

  const items = chosen.map(ex => ({
    id: makeId(),
    exercise: ex,
    sets,
    reps: [rmin,rmax],
    restSeconds: rest,
    notes: ex.unilateral ? (Lang.get()==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (Lang.get()==="es" ? "RPE 7–8." : "RPE 7–8.")
  }));

  const warm = Lang.get()==="es" ? "5–7 min movilidad + 2 series ligeras del primer ejercicio." : "5–7 min mobility + 2 light ramp-up sets.";
  const cool = Lang.get()==="es" ? "3–5 min respiración nasal + estiramientos suaves." : "3–5 min nasal breathing + gentle stretches.";

  currentPlan = {
    id: makeId(),
    muscle: Filters.fullBody ? null : selectedMuscle,
    goal: Filters.goal,
    durationMinutes: Filters.minutes,
    items,
    warmup: warm,
    cooldown: cool,
    createdAt: Date.now()
  };
  renderAll();
}

/* ===================== Render ===================== */
function renderHeader(){
  $("#appTitle").textContent = t("appTitle");
  $("#subtitle").textContent = t("selectMuscle");
}
function renderMuscleChips(){
  const c = $("#muscleChips");
  c.innerHTML = "";
  const full = document.createElement("button");
  full.className = "chip"+(Filters.fullBody?" active":"");
  full.textContent = t("fullBody");
  full.onclick = () => { Filters.fullBody = !Filters.fullBody; if(Filters.fullBody) selectedMuscle = null; renderAll(); };
  c.appendChild(full);

  for(const m of Muscles){
    const b = document.createElement("button");
    b.className = "chip"+((selectedMuscle===m && !Filters.fullBody)?" active":"");
    b.textContent = mTitle(m);
    b.onclick = () => { Filters.fullBody = false; selectedMuscle = m; renderAll(); };
    c.appendChild(b);
  }
}
function flashSaved(){
  const n = el(`<div style="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#00dc82;color:#000;border-radius:999px;padding:8px 14px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.3)">✅ ${t('saved')}</div>`);
  document.body.appendChild(n);
  setTimeout(()=>n.remove(),1200);
}
function renderContent(){
  const root = $("#content");
  root.innerHTML = "";

  if(!currentPlan){
    root.appendChild(el(`<div class="empty">
      <div>
        <div style="font-size:56px;line-height:1">🏋️</div>
        <div>${t('selectMuscle')}</div>
      </div>
    </div>`));
    return;
  }

  // Encabezado del plan
  root.appendChild(el(`<div class="card">
    <div class="row">
      <div>
        <div style="font-weight:700">${currentPlan.muscle?mTitle(currentPlan.muscle):t('fullBody')}</div>
        <div class="caption">${t(currentPlan.goal)} • ${currentPlan.durationMinutes} ${t('minutes').toLowerCase()}</div>
      </div>
    </div>
  </div>`));

  // Calentamiento
  root.appendChild(el(`<div class="card"><div class="group"><h3>${t('warmup')}</h3><div class="caption">${currentPlan.warmup}</div></div></div>`));

  // Ejercicios
  currentPlan.items.forEach((item, idx) => {
    const card = el(`<div class="card">
      <div class="row">
        <div style="max-width:60%">
          <div style="font-weight:700">${item.exercise.name}</div>
          <div class="caption">${item.exercise.instructions}</div>
        </div>
        <div class="row-right">
          <div class="caption">${item.sets}×${item.reps[0]}–${item.reps[1]}</div>
          <button class="btn secondary small" data-act="replace">${t('replace')}</button>
          <button class="btn secondary small" data-act="remove">${t('remove')}</button>
        </div>
      </div>
      <div class="row" style="margin-top:6px">
        <div class="caption">⏱ ${t('rest')} ${item.restSeconds}s ${item.exercise.unilateral?` • 🔁 ${t('unilateral')}`:""}</div>
        <div class="timer">
          <span class="time" data-time>0:00</span>
          <button class="btn primary small" data-act="start">${t('start')}</button>
          <button class="btn secondary small" data-act="pause">${t('pause')}</button>
          <button class="btn secondary small" data-act="reset">${t('reset')}</button>
          <button class="btn secondary small" data-act="gif">GIF</button>
        </div>
      </div>
    </div>`);

    // ---- Timer ----
    const timeEl = card.querySelector("[data-time]");
    let remaining = item.restSeconds, running=false, int=null;

    function fmt(s){ const m=Math.floor(s/60), r=s%60; return `${m}:${r.toString().padStart(2,"0")}`; }
    function draw(){ timeEl.textContent = fmt(remaining); }
    function start(){
      if(running) return;
      running = true;
      if(remaining<=0) remaining = item.restSeconds;
      int = setInterval(()=>{
        if(!running) return;
        remaining--;
        draw();
        if(remaining<=0){ running=false; clearInterval(int); if(navigator.vibrate) navigator.vibrate(100); }
      },1000);
    }
    function pause(){ running=false; clearInterval(int); }
    function reset(){ running=false; clearInterval(int); remaining=item.restSeconds; draw(); }

    // editar tocando el tiempo
    timeEl.style.cursor="pointer";
    timeEl.title = t("editTime");
    timeEl.onclick = ()=>{
      const cur = remaining || item.restSeconds;
      const raw = prompt(Lang.get()==="es" ? "Segundos (1–600):" : "Seconds (1–600):", String(cur));
      if(!raw) return;
      let v = parseInt(raw,10);
      if(isNaN(v)) return;
      v = Math.max(1, Math.min(600, v));
      item.restSeconds = v;
      remaining = v;
      draw();
    };

    draw();
    card.querySelector('[data-act="start"]').onclick = start;
    card.querySelector('[data-act="pause"]').onclick = pause;
    card.querySelector('[data-act="reset"]').onclick = reset;
    card.querySelector('[data-act="gif"]').onclick = ()=>{
      const q = encodeURIComponent(`${item.exercise.name} exercise gif`);
      window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`,"_blank","noopener");
    };

    // ---- Replace / Remove ----
    card.querySelector('[data-act="replace"]').onclick = () => {
      const alt = alternatives(item.exercise)[0];
      if(!alt) return;
      currentPlan.items[idx] = { ...item, exercise: alt };
      renderAll();
    };
    card.querySelector('[data-act="remove"]').onclick = () => {
      currentPlan.items.splice(idx,1);
      renderAll();
    };

    // tap en cabecera abre GIF también
    card.querySelector(".row").onclick = (e)=>{
      if(e.target.closest("button")) return; // no si fue botón
      const q = encodeURIComponent(`${item.exercise.name} exercise gif`);
      window.open(`https://duckduckgo.com/?q=${q}&iax=images&ia=images`,"_blank","noopener");
    };

    root.appendChild(card);
  });

  // Barra de acciones (antes del cooldown)
  const actions = el(`<div class="card">
    <div class="grid cols3" style="margin-top:4px">
      <button class="btn primary" id="addEx">＋ ${t('addExercise')}</button>
      <button class="btn secondary" id="saveFav">❤️ ${t('saveFavorite')}</button>
      <button class="btn danger" id="clearPlan">🗑️ ${t('clear')}</button>
    </div>
  </div>`);
  root.appendChild(actions);

  // Cooldown (al final)
  root.appendChild(el(`<div class="card"><div class="group"><h3>${t('cooldown')}</h3><div class="caption">${currentPlan.cooldown}</div></div></div>`));

  // handlers de acciones
  $("#addEx").onclick = openPicker;
  $("#saveFav").onclick = () => { Favorites.add(currentPlan); flashSaved(); };
  $("#clearPlan").onclick = () => { currentPlan = null; renderAll(); };
}
function renderAll(){
  L = I18N[Lang.get()];
  applyStaticI18n();
  renderHeader();
  renderMuscleChips();
  $("#generate").disabled = (!Filters.fullBody && !selectedMuscle);
  renderContent();
}
// Alias por si algún handler usa render()
function render(){ renderAll(); }

/* ===================== Filtros ===================== */
function openFilters(){
  const m = $("#filtersModal");
  const eqList = Object.values(Equip).map(e=>`
    <label><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}> ${equipTitle(e)}</label>
  `).join('<br>');
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('filters')}</h3></div>
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
    <div class="group">
      <label>${t('minutes')}: <span id="minsVal">${Filters.minutes}</span></label>
      <input type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
      <div class="caption">${t('timeBased')}</div>
    </div>
    <div class="group">
      <label>${t('equipment')}</label>
      <div class="grid">${eqList}</div>
    </div>
    <div class="group grid cols2">
      <label><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}> ${t('beginner')}</label>
      <label><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}> ${t('fullBody')}</label>
    </div>
    <div class="grid cols2">
      <button class="btn secondary" id="f_close">✖️ ${t('close')}</button>
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

    const inputs = [...m.querySelectorAll('[data-eq]')];
    const set = new Set();
    inputs.forEach(inp => { if(inp.checked) set.add(inp.dataset.eq); });
    Filters.allowedEquipment = set.size ? set : new Set(Object.values(Equip));

    closeModals();
    renderAll();
  };
  showModal('filtersModal');
}

/* ===================== Picker (añadir ejercicios) ===================== */
function openPicker(){
  const m = $("#pickerModal");
  const startMuscle = selectedMuscle;
  let query = "";
  let muscleFilter = startMuscle || null;

  function filtered(){
    const q = norm(query);
    return EXERCISES.filter(ex =>
      (muscleFilter==null || ex.muscle===muscleFilter) &&
      ex.environment.includes(Filters.environment) &&
      ex.equipment.every(e => Filters.allowedEquipment.has(e)) &&
      (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
      (q==="" ? true : (
        norm(ex.name).includes(q) ||
        norm(ex.instructions).includes(q) ||
        norm(mTitle(ex.muscle)).includes(q) ||
        norm(ex.variant).includes(q)
      ))
    ).sort((a,b)=> a.name.localeCompare(b.name));
  }

  function renderPicker(){
    const chipsMuscles = `<button class="chip ${muscleFilter==null?"active":""}" data-muscle="">${t('all')}</button>` +
      Muscles.map(m=>`<button class="chip ${muscleFilter===m?"active":""}" data-muscle="${m}">${mTitle(m)}</button>`).join('');
    const items = filtered().map(ex=>`
      <tr>
        <td><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></td>
        <td class="small">${mTitle(ex.muscle)}<br><span class="caption">${ex.equipment.map(equipTitle).join(", ")}</span></td>
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
            <button class="btn secondary small" id="mkCustom">＋ ${t('createExercise')}</button>
            <button class="btn secondary small" id="closePicker">✖️ ${t('close')}</button>
          </div>
        </div>
        <div class="chips" id="chips">${chipsMuscles}</div>
      </div>
      <table class="table">${items}</table>
    `;

    m.querySelector('#q').value = query;
    setTimeout(()=>m.querySelector('#q').focus(), 50);
    m.querySelector('#q').oninput = e => { query = e.target.value; renderPicker(); };
    m.querySelector('#closePicker').onclick = closeModals;
    m.querySelector('#mkCustom').onclick = () => openNewExerciseForm(()=>{ EXERCISES = builtInLibrary().concat(CustomStore.list()); renderPicker(); });

    m.querySelectorAll('[data-muscle]').forEach(b => b.onclick = () => { const v=b.dataset.muscle; muscleFilter = v? v : null; renderPicker(); });
    m.querySelectorAll('[data-add]').forEach(btn => btn.onclick = () => {
      const ex = filtered().find(e=>e.id===btn.dataset.add); if(!ex) return;
      openConfig(ex, (sets,repsMin,repsMax,rest)=>{
        currentPlan.items.push({ id:makeId(), exercise:ex, sets, reps:[repsMin,repsMax], restSeconds:rest,
          notes: ex.unilateral ? (Lang.get()==="es"?"Trabaja ambos lados. RPE 7–8.":"Work both sides. RPE 7–8.") : (Lang.get()==="es"?"RPE 7–8.":"RPE 7–8.") });
        closeModals(); renderAll();
      });
    });
  }
  renderPicker();
  showModal('pickerModal');
}

/* ===================== Config (sets/reps/rest) ===================== */
function openConfig(ex, onAdd){
  const m = $("#configModal");
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('addExercise')}</h3></div>
    <div class="group"><strong>${ex.name}</strong><div class="caption">${ex.instructions}</div></div>
    <div class="grid cols3">
      <div><label>${Lang.get()==="es"?"Series":"Sets"}</label><input type="number" id="cfg_sets" min="1" max="10" value="${sets}"></div>
      <div><label>${Lang.get()==="es"?"Reps mín":"Min reps"}</label><input type="number" id="cfg_min" min="1" max="30" value="${rmin}"></div>
      <div><label>${Lang.get()==="es"?"Reps máx":"Max reps"}</label><input type="number" id="cfg_max" min="${rmin}" max="30" value="${rmax}"></div>
    </div>
    <div class="group"><label>${t('rest')} (s)</label><input type="number" id="cfg_rest" min="15" max="300" step="15" value="${rest}"></div>
    <div class="grid cols2">
      <button class="btn secondary" id="cfg_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="cfg_save">💾 ${t('save')}</button>
    </div>
  `;
  m.querySelector('#cfg_cancel').onclick = closeModals;
  m.querySelector('#cfg_save').onclick = () => {
    const s = Math.max(1,Math.min(10,parseInt(m.querySelector('#cfg_sets').value||sets)));
    const min = Math.max(1,parseInt(m.querySelector('#cfg_min').value||rmin));
    const max = Math.max(min,parseInt(m.querySelector('#cfg_max').value||rmax));
    const r = Math.max(15,parseInt(m.querySelector('#cfg_rest').value||rest));
    onAdd(s,min,max,r);
  };
  showModal('configModal');
}

/* ===================== New custom exercise ===================== */
function openNewExerciseForm(onDone){
  const m = $("#pickerModal"); // reutilizamos para mantener foco
  const eqOpts = Object.values(Equip).map(e=>`<label><input type="checkbox" data-eq="${e}"> ${equipTitle(e)}</label>`).join('<br>');
  const envOpts = [Env.home,Env.gym].map(e=>`<label><input type="checkbox" data-env="${e}" checked> ${t(e)}</label>`).join('<br>');
  const patOpts = Object.values(Pattern).map(p=>`<label><input type="checkbox" data-p="${p}"> ${p}</label>`).join('<br>');

  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('createExercise')}</h3></div>
    <div class="grid cols2">
      <div><label>${t('name')}</label><input id="nx_name" placeholder="${t('name')}"></div>
      <div><label>${t('muscle')}</label>
        <select id="nx_muscle">${Muscles.map(m=>`<option value="${m}">${mTitle(m)}</option>`).join('')}</select>
      </div>
    </div>
    <div class="group"><label>${t('patterns')}</label><div class="grid">${patOpts}</div></div>
    <div class="group"><label>${t('equipment')}</label><div class="grid">${eqOpts}</div></div>
    <div class="group"><label>${t('environment')}</label><div class="grid">${envOpts}</div></div>
    <div class="grid cols2">
      <label><input type="checkbox" id="nx_uni"> ${t('unilateralQ')}</label>
      <label><input type="checkbox" id="nx_beg" checked> ${t('beginnerQ')}</label>
    </div>
    <div class="group"><label>${t('instructions')}</label><textarea id="nx_ins" rows="3"></textarea></div>
    <div class="group"><label>${t('mediaURL')}</label><input id="nx_media" placeholder="https://..."></div>
    <div class="grid cols2">
      <button class="btn secondary" id="nx_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="nx_save">💾 ${t('save')}</button>
    </div>
    <div class="footer-note">${t('custom')}</div>
  `;
  m.querySelector('#nx_cancel').onclick = openPicker;
  setTimeout(()=>m.querySelector('#nx_name').focus(),50);
  m.querySelector('#nx_save').onclick = () => {
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

/* ===================== Favorites ===================== */
function openFavorites(){
  const m = $("#favoritesModal");
  const list = Favorites.list();
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('favorites')}</h3></div>
    ${!list.length? `<div class="caption" style="padding:10px">${Lang.get()==="es"?"Aún no hay favoritos.":"No favorites yet."}</div>`: ""}
    <div>
      ${list.map((p,i)=>`
        <div class="card">
          <div class="row">
            <div>
              <div style="font-weight:700">${p.muscle?mTitle(p.muscle):t('fullBody')}</div>
              <div class="caption">${t(p.goal)} • ${p.durationMinutes} ${t('minutes').toLowerCase()}</div>
            </div>
            <div class="row-right">
              <button class="btn primary small" data-use="${i}">✔ ${t('use')}</button>
              <button class="btn secondary small" data-del="${i}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div><button class="btn secondary" id="favClose">✖️ ${t('close')}</button></div>
  `;
  m.querySelector('#favClose').onclick = closeModals;
  m.querySelectorAll('[data-use]').forEach(b => b.onclick = () => {
    const plan = Favorites.list()[parseInt(b.dataset.use,10)];
    currentPlan = plan; closeModals(); renderAll();
  });
  m.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    Favorites.removeAt(parseInt(b.dataset.del,10)); openFavorites();
  });
  showModal('favoritesModal');
}

/* ===================== Settings ===================== */
function openSettings(){
  const m = $("#settingsModal");
  const cur = localStorage.getItem(Lang.key)||"es";
  m.innerHTML = `
    <div class="sticky"><h3 style="margin:0">${t('settings')}</h3></div>
    <div class="group">
      <label>${t('language')}</label>
      <select id="s_lang">
        <option value="system">${t('systemLang')}</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
    <div class="group">
      <label>${t('feedback')}</label>
      <div><a href="mailto:paul_rios@engineer.com?subject=%5BApp%20Feedback%5D">✉️ Email</a></div>
    </div>
    <div class="group">
      <label>${t('supportDev')}</label>
      <div class="caption">${t('tipJar')} — ${Lang.get()==="es"?"(en web es informativo)":"(informational on web)"}.</div>
    </div>
    <div><button class="btn secondary" id="s_close">✖️ ${t('close')}</button></div>
  `;
  m.querySelector('#s_lang').value = cur;
  m.querySelector('#s_close').onclick = closeModals;
  m.querySelector('#s_lang').onchange = e => {
    Lang.set(e.target.value);
    EXERCISES = builtInLibrary().concat(CustomStore.list());
    renderAll();
  };
  showModal('settingsModal');
}

/* ===================== Events & Boot ===================== */
$("#openFilters").onclick = openFilters;
$("#btnFilters").onclick = openFilters;
$("#btnFavorites").onclick = openFavorites;
$("#btnSettings").onclick = openSettings;
$("#generate").onclick = generate;

async function boot(){
  EXERCISES = await loadExercises();
  renderAll();
}
boot();
