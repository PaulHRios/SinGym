/* SinGym — Web (ES por defecto). Diseño glass + aurora, iOS friendly. */

/* ===== Util ===== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const once = (el, ev, cb) => el.addEventListener(ev, function h(e){ el.removeEventListener(ev, h); cb(e); });
const toast = (msg)=>{
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{
    position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',
    background:'rgba(255,255,255,.15)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.25)',
    color:'#fff',padding:'10px 14px',borderRadius:'10px',zIndex:9999,fontWeight:'700'
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1400);
};
const vibrate = ms => { try{ navigator.vibrate && navigator.vibrate(ms); }catch{} };
const fmtTime = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
const norm = s => (s||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const makeId = ()=> (crypto.randomUUID ? crypto.randomUUID() : (Date.now()+"-"+Math.random()));

/* ===== i18n ===== */
const I18N = {
  es:{ appTitle:"Rutinas en casa", muscle:"Músculo", fullBody:"Cuerpo completo", filters:"Filtros", generate:"Generar",
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
       supportDev:"Apoyar al desarrollador", tipJar:"Invítame un café ☕️", loading:"Cargando…", custom:"Personalizado",
       all:"Todos", use:"Usar", editTime:"Editar tiempo", max1000:"Máximo 10:00", openNew:"Abrir en pestaña nueva" },
  en:{ appTitle:"Home Routines", muscle:"Muscle", fullBody:"Full body", filters:"Filters", generate:"Generate",
       minutes:"Minutes", goal:"Goal", environment:"Environment", equipment:"Available equipment", beginner:"Beginner friendly",
       gym:"Gym", home:"Home", strength:"Strength", hypertrophy:"Hypertrophy", fatLoss:"Fat loss", maintenance:"Maintenance",
       warmup:"Warm-up", cooldown:"Cool-down", rest:"Rest", unilateral:"Unilateral", favorites:"Favorites",
       saveFavorite:"Save favorite", saved:"Saved", timer:"Timer", start:"Start", pause:"Pause", reset:"Reset",
       selectMuscle:"Pick a muscle or switch to Full body, then Generate.", ready:"Done", close:"Close", timeBased:"Estimated duration",
       replace:"Replace", clear:"Clear", settings:"Settings", language:"Language", systemLang:"System",
       addExercise:"Add exercise", remove:"Remove", searchExercises:"Search exercises", createExercise:"Create exercise",
       patterns:"Movement patterns", unilateralQ:"Unilateral?", beginnerQ:"Beginner friendly", instructions:"Instructions",
       mediaURL:"Media URL (optional)", save:"Save", cancel:"Cancel", setsRepsRest:"Sets / Reps / Rest",
       feedback:"Feedback", name:"Name", email:"Email", message:"Message", send:"Send",
       supportDev:"Support the developer", tipJar:"Tip Jar ☕️", loading:"Loading…", custom:"Custom",
       all:"All", use:"Use", editTime:"Edit time", max1000:"Max 10:00", openNew:"Open in new tab" }
};
const Lang = {
  key:"app_lang_v1",
  get(){
    const raw = localStorage.getItem(this.key);
    if(!raw) return "es";            // Español por defecto
    if(raw==="system"){
      return (navigator.language||"en").toLowerCase().startsWith("es") ? "es" : "en";
    }
    return raw;
  },
  set(v){ localStorage.setItem(this.key, v); }
};
let L = I18N[Lang.get()];
const t = k => (L[k]||k);
const applyStaticI18n = ()=> $$('#appTitle,[data-i]').forEach(el=>{
  const key = el.id==="appTitle" ? 'appTitle' : el.dataset.i;
  if(key) el.textContent = t(key);
});

/* ===== Domain ===== */
const Env = {home:"home", gym:"gym"};
const Equip = { bodyweight:"bodyweight", dumbbells:"dumbbells", kettlebell:"kettlebell", barbell:"barbell", bench:"bench", bands:"bands", cable:"cable", machine:"machine", smith:"smith" };
const Muscles = ['chest','back','quads','hamstrings','glutes','shoulders','biceps','triceps','calves','core'];
const Pattern = { horizontalPush:"horizontalPush", verticalPush:"verticalPush", horizontalPull:"horizontalPull", verticalPull:"verticalPull",
  kneeDominant:"kneeDominant", hipHinge:"hipHinge", elbowFlexion:"elbowFlexion", elbowExtension:"elbowExtension",
  abAntiExtension:"abAntiExtension", abAntiRotation:"abAntiRotation", abFlexion:"abFlexion", abLateralFlexion:"abLateralFlexion", calfRaise:"calfRaise" };
const Goal = { strength:"strength", hypertrophy:"hypertrophy", fatLoss:"fatLoss", maintenance:"maintenance" };

const muscleTitle = m => (Lang.get()==="es"
  ? {chest:"Pecho",back:"Espalda",quads:"Cuádriceps",hamstrings:"Isquios",glutes:"Glúteos",shoulders:"Hombros",biceps:"Bíceps",triceps:"Tríceps",calves:"Pantorrillas",core:"Core"}[m]
  : {chest:"Chest",back:"Back",quads:"Quads",hamstrings:"Hamstrings",glutes:"Glutes",shoulders:"Shoulders",biceps:"Biceps",triceps:"Triceps",calves:"Calves",core:"Core"}[m]
);
const equipmentTitle = e => (Lang.get()==="es"
  ? {bodyweight:"Peso corporal",dumbbells:"Mancuernas",kettlebell:"Pesa rusa",barbell:"Barra",bench:"Banco",bands:"Ligas",cable:"Poleas",machine:"Máquina",smith:"Multipower (Smith)"}[e]
  : {bodyweight:"Bodyweight",dumbbells:"Dumbbells",kettlebell:"Kettlebell",barbell:"Barbell",bench:"Bench",bands:"Bands",cable:"Cables",machine:"Machine",smith:"Smith machine"}[e]
);

/* ===== Storage ===== */
const Storage = {
  get(k, def){ try{ return JSON.parse(localStorage.getItem(k)) ?? def; }catch{return def;} },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
const CustomKey = "custom_exercises_v1";
const FavKey = "favorite_plans_v2";

/* ===== Training defaults ===== */
const TrainingDefaults = {
  targetExercises(d, full){ if(d<30) return full?3:2; if(d<45) return full?4:3; if(d<60) return full?5:4; if(d<90) return full?6:5; return full?6:6; },
  sets(goal,d){ switch(goal){ case Goal.strength: return d<40?3:4; case Goal.hypertrophy: return d<40?3:4; case Goal.fatLoss: return 3; case Goal.maintenance: return 3;} },
  repRange(goal){ switch(goal){ case Goal.strength: return [4,6]; case Goal.hypertrophy:[8,12]; case Goal.fatLoss:[12,20]; case Goal.maintenance:[8,12]; } },
  rest(goal){ switch(goal){ case Goal.strength: return 120; case Goal.hypertrophy: 90; case Goal.fatLoss:60; case Goal.maintenance:75; } }
};

/* ===== Exercise library (subset rico) ===== */
function add(list, n,m,p,eq,env,uni,beg,ins,v,media=null){
  list.push({id:makeId(), name:n, muscle:m, patterns:p, equipment:eq, environment:env, unilateral:uni, beginnerFriendly:beg, instructions:ins, variant:v, mediaURL:media});
}
const ExerciseLibrary = {
  makeAll(){
    const H = (Lang.get()==="es");
    const s = (es,en)=> H?es:en;
    const tempos = ["", s(" Tempo 3-1-1"," Tempo 3-1-1")];
    const pause = s(" con pausa 1s"," with 1s pause");
    const L=[];

    // Chest
    [
      [s("Flexiones","Push-ups"),"chest_pushup",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Manos bajo hombros, cuerpo en línea.","")],
      [s("Flexiones inclinadas","Incline Push-ups"),"chest_lower",[Equip.bodyweight,Equip.bench],[Env.home,Env.gym],false,true,s("Manos elevadas, más fácil.","")],
      [s("Flexiones declinadas","Decline Push-ups"),"chest_upper",[Equip.bodyweight,Equip.bench],[Env.home,Env.gym],false,true,s("Pies elevados. Enfatiza superior.","")],
      [s("Squeeze press con mancuernas","DB Squeeze Press"),"chest_mid_db",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],false,true,s("DBs juntas, tensión continua.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(L,n+t,"chest",["horizontalPush"],eq,env,uni,beg,ins,v)));
    [["Plano","Flat","chest_mid"],["Inclinado 15°","Incline 15°","chest_upper"]]
      .forEach(([e,ee,variant])=>{
        tempos.forEach(t=>add(L,s(`Press ${e} con mancuernas`,`DB ${ee} Press`)+t,"chest",["horizontalPush"],[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],false,true,s("2s abajo/1s arriba.",""),variant+"_db"));
        add(L,s(`Press ${e} con barra`,`Barbell ${ee} Press`)+pause,"chest",["horizontalPush"],[Equip.barbell,Equip.bench],[Env.home,Env.gym],false,false,s("Pausa al pecho.",""),variant+"_bb");
      });

    // Back
    [
      [s("Remo mancuerna un brazo","One-arm DB Row"),"back_row_db_one",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Tracción a la cadera, sin balanceo.","")],
      [s("Remo con mancuernas inclinado","Bent-over DB Row"),"back_row_db_bent",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Torso estable.","")],
      [s("Pull-apart con banda","Band Pull-apart"),"back_pullapart_band",[Equip.bands],[Env.home,Env.gym],false,true,s("Retrae escápulas.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(L,n+t,"back",["horizontalPull"],eq,env,uni,beg,ins,v)));
    add(L,s("Remo con barra","Barbell Row"),"back",["horizontalPull"],[Equip.barbell],[Env.home,Env.gym],false,false,s("Torso 30–45°, columna neutra.",""),"back_row_bb");

    // Legs: quads/ham/glutes
    [
      [s("Sentadilla goblet","Goblet Squat"),"quads_goblet",[Equip.dumbbells,Equip.kettlebell],[Env.home,Env.gym],false,true,s("Rodillas siguen puntas.","")],
      [s("Split squat búlgaro","Bulgarian Split Squat"),"quads_bulgarian",[Equip.dumbbells,Equip.bench],[Env.home,Env.gym],true,true,s("Controla la bajada.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>tempos.forEach(t=>add(L,n+t,"quads",["kneeDominant"],eq,env,uni,beg,ins,v)));

    [
      [s("RDL DB","DB RDL"),"hams_rdl_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Cadera atrás, espalda neutra.","")],
      [s("RDL a una pierna DB","DB Single-leg RDL"),"hams_rdl_single_db",[Equip.dumbbells],[Env.home,Env.gym],true,false,s("Equilibrio, cadera cuadrada.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>add(L,n,"hamstrings",["hipHinge"],eq,env,uni,beg,ins,v));

    [
      [s("Glute bridge","Glute Bridge"),"glutes_bridge_bw",[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Talones, retroversión suave.","")],
      [s("Hip thrust en banco","Bench Hip Thrust"),"glutes_hipthrust_bench",[Equip.bench,Equip.dumbbells],[Env.home,Env.gym],false,true,s("Pausa 1s arriba.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>add(L,n,"glutes",["hipHinge"],eq,env,uni,beg,ins,v));

    // Shoulders/Bis/Tris/Core/Calves
    [
      [s("Press militar DB","DB Overhead Press"),"shoulders_press_db",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Core firme, sin arco.","")],
      [s("Elevación lateral","Lateral Raise"),"shoulders_lateral",[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Sin impulso.","")]
    ].forEach(([n,v,eq,env,uni,beg,ins])=>add(L,n,"shoulders",["verticalPush"],eq,env,uni,beg,ins,v));

    add(L,s("Curl DB supinado","DB Curl"),"biceps",["elbowFlexion"],[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codo quieto, excéntrica controlada.",""),"biceps_curl_db");
    add(L,s("Extensión DB sobre cabeza","DB Overhead Triceps"),"triceps",["elbowExtension"],[Equip.dumbbells],[Env.home,Env.gym],false,true,s("Codos fijos.",""),"triceps_db_oh");
    add(L,s("Plancha frontal","Front Plank"),"core",["abAntiExtension"],[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Costillas adentro, glúteos activos.",""),"core_plank");
    add(L,s("Elevación talones de pie","Standing Calf Raise"),"calves",["calfRaise"],[Equip.bodyweight],[Env.home,Env.gym],false,true,s("Pausa 1s arriba.",""),"calves_standing");

    return L;
  }
};

/* ===== State ===== */
let AllExercises = ExerciseLibrary.makeAll().concat(Storage.get(CustomKey, []));
const Filters = { environment: Env.home, allowedEquipment: new Set(Object.values(Equip)), minutes:30, preferBeginner:true, goal:Goal.hypertrophy, fullBody:false };
let selectedMuscle = null;
let currentPlan = null;

/* Timers por ítem */
const timers = new Map(); // id -> {running:boolean, remains:number, target:number, interval:number}

/* ===== Pool & Alternatives ===== */
const poolFor = (muscle)=> AllExercises.filter(ex =>
  ex.environment.includes(Filters.environment) &&
  ex.equipment.every(e=> Filters.allowedEquipment.has(e)) &&
  (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
  (muscle ? ex.muscle===muscle : true)
);
const shuffle = a => { const x=a.slice(); for(let i=x.length-1;i>0;i--){ const j=(Math.random()* (i+1))|0; [x[i],x[j]]=[x[j],x[i]] } return x; };
const alternativesFor = (exercise)=>{
  const all = poolFor(exercise.muscle).filter(e=> e.id!==exercise.id);
  const v = all.filter(e=> e.variant===exercise.variant);
  if(v.length) return shuffle(v);
  const pat = all.filter(e=> e.patterns.some(p=> exercise.patterns.includes(p)));
  return pat.length ? shuffle(pat) : shuffle(all);
};

/* ===== Render UI ===== */
function buildMuscleChips(){
  const wrap = $('#muscleChips'); wrap.innerHTML='';
  const all = document.createElement('button');
  all.className='chip'; all.textContent=t('all');
  all.onclick = () => { selectedMuscle=null; Filters.fullBody=false; $('#chkFullBody').checked=false; render(); };
  wrap.appendChild(all);
  Muscles.forEach(m=>{
    const b = document.createElement('button');
    b.className='chip'; b.dataset.value=m; b.textContent=muscleTitle(m);
    b.onclick = ()=>{ Filters.fullBody=false; $('#chkFullBody').checked=false; selectedMuscle=m; render(); };
    wrap.appendChild(b);
  });
}
function buildEquipmentChips(){
  const wrap = $('#equipmentChips'); wrap.innerHTML='';
  Object.values(Equip).forEach(eq=>{
    const b = document.createElement('button');
    b.className='chip active'; b.textContent=equipmentTitle(eq);
    b.onclick = ()=>{
      if(Filters.allowedEquipment.has(eq)){ Filters.allowedEquipment.delete(eq); b.classList.remove('active'); }
      else { Filters.allowedEquipment.add(eq); b.classList.add('active'); }
    };
    wrap.appendChild(b);
  });
}
function highlightMuscleChips(){
  $$('#muscleChips .chip').forEach(ch=>{
    const v = ch.dataset.value;
    ch.classList.toggle('active', !!v && selectedMuscle===v && !Filters.fullBody);
  });
}

function renderHeader(){
  $('#appTitle').textContent = 'SinGym';
  $('#subtitle').textContent = t('selectMuscle');
  applyStaticI18n();
}

function renderContent(){
  const root = $('#content'); root.innerHTML='';
  $('#emptyState').style.display = currentPlan ? 'none' : 'block';
  if(!currentPlan) return;

  // Encabezado plan
  const head = document.createElement('div');
  head.className = 'card glass';
  head.innerHTML = `
    <div class="row" style="justify-content:space-between; gap:12px">
      <div>
        <div style="font-weight:800;font-size:18px">${currentPlan.muscle?muscleTitle(currentPlan.muscle):t('fullBody')}</div>
        <div class="muted" style="font-size:13px">${t(currentPlan.goal)} • ${currentPlan.durationMinutes} ${t('minutes').toLowerCase()}</div>
      </div>
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <button class="btn small" id="addExBtn">＋ ${t('addExercise')}</button>
        <button class="btn small" id="saveFavBtn">❤️ ${t('saveFavorite')}</button>
        <button class="btn small danger" id="clearBtn">🗑️ ${t('clear')}</button>
      </div>
    </div>`;
  root.appendChild(head);

  // Warmup
  const warm = document.createElement('div');
  warm.className='card glass';
  warm.innerHTML = `<div><h3 style="margin:0 0 6px">${t('warmup')}</h3><div class="muted">${currentPlan.warmup}</div></div>`;
  root.appendChild(warm);

  // Items
  currentPlan.items.forEach((item, idx)=>{
    const id = item.id;
    if(!timers.has(id)) timers.set(id, { running:false, remains:item.restSeconds, target:item.restSeconds, interval:null });

    const card = document.createElement('div');
    card.className='card glass';
    card.dataset.idx = String(idx);
    card.dataset.id = id;
    card.innerHTML = `
      <div class="row" style="justify-content:space-between; gap:10px">
        <div style="max-width:62%">
          <div style="font-weight:800">${item.exercise.name}</div>
          <div class="muted" style="font-size:12px">${item.exercise.instructions}</div>
        </div>
        <div class="row" style="gap:8px; flex-wrap:wrap">
          <span class="badge">${item.sets}×${item.reps[0]}–${item.reps[1]}</span>
          <button class="btn small" data-act="replace">${t('replace')}</button>
          <button class="btn small danger" data-act="remove">${t('remove')}</button>
        </div>
      </div>
      <div class="row" style="justify-content:space-between; margin-top:8px; gap:12px">
        <div class="meta">⏱ ${t('rest')} <span class="rest">${item.restSeconds}</span>s ${item.exercise.unilateral?`• 🔁 ${t('unilateral')}`:''}</div>
        <div class="timer">
          <span class="time" data-act="editTimer" title="${t('editTime')}">${fmtTime(timers.get(id).remains)}</span>
          <button class="btn tiny primary" data-act="start">${t('start')}</button>
          <button class="btn tiny" data-act="pause">${t('pause')}</button>
          <button class="btn tiny" data-act="reset">${t('reset')}</button>
          <button class="btn tiny" data-act="gif">GIF</button>
        </div>
      </div>`;
    root.appendChild(card);
  });

  // Cooldown
  const cool = document.createElement('div');
  cool.className='card glass';
  cool.innerHTML = `<div><h3 style="margin:0 0 6px">${t('cooldown')}</h3><div class="muted">${currentPlan.cooldown}</div></div>`;
  root.appendChild(cool);

  // Acciones globales
  $('#addExBtn').onclick = openPicker;
  $('#saveFavBtn').onclick = ()=>{ const arr = Storage.get(FavKey, []); arr.unshift(currentPlan); Storage.set(FavKey, arr); toast(`${t('saved')} ✅`); };
  $('#clearBtn').onclick = ()=>{ currentPlan=null; render(); };
}

/* ===== Event delegation para botones de cada card (Sustituir/Eliminar/Timer/GIF) ===== */
$('#content').addEventListener('click', (e)=>{
  const actBtn = e.target.closest('[data-act]'); if(!actBtn) return;
  const card = e.target.closest('[data-idx]'); if(!card) return;
  const idx = parseInt(card.dataset.idx, 10);
  const item = currentPlan.items[idx];
  const timer = timers.get(item.id);

  const act = actBtn.dataset.act;
  if(act==='remove'){
    currentPlan.items.splice(idx,1);
    timers.delete(item.id);
    render();
    return;
  }
  if(act==='replace'){
    const alt = alternativesFor(item.exercise)[0];
    if(alt){
      currentPlan.items[idx].exercise = alt;
      render();
    }
    return;
  }
  if(act==='gif'){
    openMedia(item.exercise);
    return;
  }
  if(act==='start'){
    if(timer.running) return;
    timer.running = true;
    if(timer.remains<=0) timer.remains = timer.target;
    timer.interval = setInterval(()=>{
      if(!timer.running) return;
      timer.remains--;
      const timeEl = card.querySelector('.time');
      timeEl.textContent = fmtTime(timer.remains);
      if(timer.remains<=0){
        timer.running=false; clearInterval(timer.interval); vibrate(100);
      }
    },1000);
    return;
  }
  if(act==='pause'){
    timer.running=false; clearInterval(timer.interval);
    return;
  }
  if(act==='reset'){
    timer.running=false; clearInterval(timer.interval); timer.remains = timer.target;
    card.querySelector('.time').textContent = fmtTime(timer.remains);
    return;
  }
  if(act==='editTimer'){
    openTimerEditor(item.id, timer);
    return;
  }
});

/* ===== Generador ===== */
function generate(){
  const full = Filters.fullBody;
  const pool = shuffle(poolFor(full ? null : selectedMuscle));
  const count = TrainingDefaults.targetExercises(Filters.minutes, full);
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);

  const wanted = [Pattern.horizontalPush, Pattern.horizontalPull, Pattern.kneeDominant, Pattern.hipHinge, Pattern.abAntiExtension];
  let chosen = [];
  if(full){
    for(const pat of wanted){
      const pick = pool.find(x=> x.patterns.includes(pat) && !chosen.includes(x));
      if(pick) chosen.push(pick);
      if(chosen.length===count) break;
    }
  }
  while(chosen.length<count){
    const next = pool.find(x=> !chosen.includes(x));
    if(!next) break; chosen.push(next);
  }
  if(!chosen.length && pool.length) chosen=[pool[0]];

  const items = chosen.map(ex=>({
    id: makeId(),
    exercise: ex,
    sets,
    reps: [rmin,rmax],
    restSeconds: rest,
    notes: ex.unilateral ? (Lang.get()==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (Lang.get()==="es" ? "RPE 7–8." : "RPE 7–8.")
  }));
  const warm = Lang.get()==="es" ? "5–7 min movilidad + 2 series ligeras del primer ejercicio." : "5–7 min mobility + 2 light ramp-up sets.";
  const cool = Lang.get()==="es" ? "3–5 min respiración nasal + estiramientos suaves." : "3–5 min nasal breathing + gentle stretches.";

  currentPlan = { id:makeId(), muscle: full?null:selectedMuscle, goal: Filters.goal, durationMinutes: Filters.minutes, items, warmup:warm, cooldown:cool, createdAt: Date.now() };
  timers.clear(); // reset timers
  render();
}

/* ===== Filtros / Picker / Favoritos / Ajustes ===== */
function openFilters(){
  const dlg = $('#filtersModal');
  const eqList = Object.values(Equip).map(e=>`
    <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-eq="${e}" ${Filters.allowedEquipment.has(e)?"checked":""}/> ${equipmentTitle(e)}</label>
  `).join('');
  dlg.innerHTML = `
    <div class="head"><strong>${t('filters')}</strong></div>
    <div class="body">
      <div class="row wrap gap">
        <div class="col">
          <label class="lbl">${t('goal')}</label>
          <select id="f_goal">
            <option value="strength">${t('strength')}</option>
            <option value="hypertrophy">${t('hypertrophy')}</option>
            <option value="fatLoss">${t('fatLoss')}</option>
            <option value="maintenance">${t('maintenance')}</option>
          </select>
        </div>
        <div class="col">
          <label class="lbl">${t('environment')}</label>
          <select id="f_env">
            <option value="home">${t('home')}</option>
            <option value="gym">${t('gym')}</option>
          </select>
        </div>
      </div>
      <div class="mt">
        <label class="lbl">${t('minutes')}: <span id="minsVal">${Filters.minutes}</span></label>
        <input type="range" min="20" max="120" step="5" id="f_minutes" value="${Filters.minutes}">
        <div class="muted" style="font-size:12px">${t('timeBased')}</div>
      </div>
      <hr>
      <div class="row wrap gap">
        <div class="col">
          <label class="lbl">${t('equipment')}</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${eqList}</div>
        </div>
        <div class="col-auto" style="min-width:220px">
          <label class="lbl">Opciones</label>
          <label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="f_beg" ${Filters.preferBeginner?"checked":""}/> ${t('beginner')}</label>
          <label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="f_full" ${Filters.fullBody?"checked":""}/> ${t('fullBody')}</label>
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="btn" id="f_close">✖️ ${t('close')}</button>
      <button class="btn primary" id="f_ready">✅ ${t('ready')}</button>
    </div>
  `;
  dlg.querySelector('#f_goal').value = Filters.goal;
  dlg.querySelector('#f_env').value = Filters.environment;
  dlg.querySelector('#f_minutes').oninput = e=> dlg.querySelector('#minsVal').textContent = e.target.value;
  dlg.querySelector('#f_close').onclick = ()=> dlg.close();
  dlg.querySelector('#f_ready').onclick = ()=>{
    Filters.goal = dlg.querySelector('#f_goal').value;
    Filters.environment = dlg.querySelector('#f_env').value;
    Filters.minutes = parseInt(dlg.querySelector('#f_minutes').value,10);
    Filters.preferBeginner = dlg.querySelector('#f_beg').checked;
    Filters.fullBody = dlg.querySelector('#f_full').checked;
    const set = new Set();
    dlg.querySelectorAll('[data-eq]').forEach(inp=>{ if(inp.checked) set.add(inp.dataset.eq); });
    Filters.allowedEquipment = set.size ? set : new Set(Object.values(Equip));
    dlg.close(); render();
  };
  openDialog(dlg);
}

function openPicker(){
  const dlg = $('#pickerModal');
  let q = '';
  let muscleFilter = selectedMuscle;

  const renderList = ()=>{
    const pool = AllExercises
      .filter(ex =>
        (!muscleFilter || ex.muscle===muscleFilter) &&
        ex.environment.includes(Filters.environment) &&
        ex.equipment.every(e=> Filters.allowedEquipment.has(e)) &&
        (Filters.preferBeginner ? ex.beginnerFriendly : true) &&
        (q==='' ? true :
          (norm(ex.name).includes(norm(q)) || norm(ex.instructions).includes(norm(q)) || norm(muscleTitle(ex.muscle)).includes(norm(q)) || norm(ex.variant).includes(norm(q))
        )
      )
      ).sort((a,b)=> a.name.localeCompare(b.name));

    const chips = [`<button class="chip ${!muscleFilter?"active":""}" data-muscle="">${t('all')}</button>`]
      .concat(Muscles.map(m=>`<button class="chip ${muscleFilter===m?"active":""}" data-muscle="${m}">${muscleTitle(m)}</button>`)).join('');

    dlg.innerHTML = `
      <div class="head"><strong>${t('addExercise')}</strong></div>
      <div class="body">
        <div class="row" style="gap:8px;align-items:center">
          <span>🔎</span>
          <input id="q" placeholder="${t('searchExercises')}" autocomplete="off" />
          <button class="btn small" id="mkCustom">＋ ${t('createExercise')}</button>
          <button class="btn small" id="pkClose">✖️ ${t('close')}</button>
        </div>
        <div class="chips scroll" style="margin-top:10px">${chips}</div>
        <table class="table" style="margin-top:10px">
          ${pool.map(ex=>`
            <tr>
              <td><strong>${ex.name}</strong><div class="muted" style="font-size:12px">${ex.instructions}</div></td>
              <td class="muted" style="font-size:12px">${muscleTitle(ex.muscle)}<br>${ex.equipment.map(equipmentTitle).join(', ')}</td>
              <td style="text-align:right"><button class="btn small primary" data-add="${ex.id}">＋</button></td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;

    dlg.querySelector('#q').value = q;
    dlg.querySelector('#q').oninput = e=>{ q = e.target.value; renderList(); };
    dlg.querySelector('#pkClose').onclick = ()=> dlg.close();
    dlg.querySelector('#mkCustom').onclick = ()=> openNewExerciseForm(()=>{ AllExercises = ExerciseLibrary.makeAll().concat(Storage.get(CustomKey,[])); renderList(); });
    dlg.querySelectorAll('[data-muscle]').forEach(b=> b.onclick = ()=>{
      muscleFilter = b.dataset.muscle || null; renderList();
    });
    dlg.querySelectorAll('[data-add]').forEach(b=> b.onclick = ()=>{
      const ex = pool.find(x=> x.id===b.dataset.add); if(!ex) return;
      openConfig(ex, (sets, rmin, rmax, rest)=>{
        currentPlan.items.push({ id:makeId(), exercise:ex, sets, reps:[rmin,rmax], restSeconds:rest, notes: ex.unilateral ? (Lang.get()==="es" ? "Trabaja ambos lados. RPE 7–8." : "Work both sides. RPE 7–8.") : (Lang.get()==="es" ? "RPE 7–8." : "RPE 7–8.") });
        timers.set(currentPlan.items.at(-1).id, {running:false, remains:rest, target:rest, interval:null});
        dlg.close(); render();
      });
    });
  };
  renderList();
  openDialog(dlg, ()=> setTimeout(()=> dlg.querySelector('#q')?.focus(), 60));
}

function openConfig(ex, onAdd){
  const dlg = $('#configModal');
  const sets = TrainingDefaults.sets(Filters.goal, Filters.minutes);
  const [rmin,rmax] = TrainingDefaults.repRange(Filters.goal);
  const rest = TrainingDefaults.rest(Filters.goal);
  dlg.innerHTML = `
    <div class="head"><strong>${t('addExercise')}</strong></div>
    <div class="body">
      <div style="font-weight:800">${ex.name}</div>
      <div class="muted" style="font-size:12px;margin-bottom:8px">${ex.instructions}</div>
      <div class="row wrap gap">
        <div class="col">
          <label class="lbl">${Lang.get()==="es"?"Series":"Sets"}</label>
          <input type="number" id="cfg_sets" min="1" max="10" value="${sets}" />
        </div>
        <div class="col">
          <label class="lbl">${Lang.get()==="es"?"Reps mín":"Min reps"}</label>
          <input type="number" id="cfg_min" min="1" max="30" value="${rmin}" />
        </div>
        <div class="col">
          <label class="lbl">${Lang.get()==="es"?"Reps máx":"Max reps"}</label>
          <input type="number" id="cfg_max" min="${rmin}" max="30" value="${rmax}" />
        </div>
      </div>
      <div class="mt">
        <label class="lbl">${t('rest')} (s)</label>
        <input type="number" id="cfg_rest" min="15" max="300" step="15" value="${rest}" />
      </div>
    </div>
    <div class="foot">
      <button class="btn" id="cfg_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="cfg_save">💾 ${t('save')}</button>
    </div>
  `;
  dlg.querySelector('#cfg_cancel').onclick = ()=> dlg.close();
  dlg.querySelector('#cfg_save').onclick = ()=>{
    const s = clamp(+dlg.querySelector('#cfg_sets').value,1,10);
    const mn = clamp(+dlg.querySelector('#cfg_min').value,1,30);
    const mx = clamp(+dlg.querySelector('#cfg_max').value, mn, 30);
    const rs = clamp(+dlg.querySelector('#cfg_rest').value,15,300);
    onAdd(s,mn,mx,rs);
  };
  openDialog(dlg);
}
const clamp = (n,a,b)=> Math.max(a, Math.min(b,n));

function openNewExerciseForm(onDone){
  const dlg = $('#pickerModal');
  const eqOpts = Object.values(Equip).map(e=>`<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-eq="${e}"> ${equipmentTitle(e)}</label>`).join('');
  const envOpts = [Env.home,Env.gym].map(e=>`<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-env="${e}" checked> ${t(e)}</label>`).join('');
  const patOpts = Object.values(Pattern).map(p=>`<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-p="${p}"> ${p}</label>`).join('');

  dlg.innerHTML = `
    <div class="head"><strong>${t('createExercise')}</strong></div>
    <div class="body">
      <div class="row wrap gap">
        <div class="col"><label class="lbl">${t('name')}</label><input id="nx_name" /></div>
        <div class="col"><label class="lbl">${t('muscle')}</label><select id="nx_muscle">${Muscles.map(m=>`<option value="${m}">${muscleTitle(m)}</option>`).join('')}</select></div>
      </div>
      <div class="mt"><label class="lbl">${t('patterns')}</label><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${patOpts}</div></div>
      <div class="mt"><label class="lbl">${t('equipment')}</label><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${eqOpts}</div></div>
      <div class="mt"><label class="lbl">${t('environment')}</label><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">${envOpts}</div></div>
      <div class="row wrap gap mt">
        <label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="nx_uni"> ${t('unilateralQ')}</label>
        <label class="row" style="gap:8px;align-items:center"><input type="checkbox" id="nx_beg" checked> ${t('beginnerQ')}</label>
      </div>
      <div class="mt"><label class="lbl">${t('instructions')}</label><textarea id="nx_ins" rows="3"></textarea></div>
      <div class="mt"><label class="lbl">${t('mediaURL')}</label><input id="nx_media" placeholder="https://..."></div>
    </div>
    <div class="foot">
      <button class="btn" id="nx_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="nx_save">💾 ${t('save')}</button>
    </div>
  `;
  dlg.querySelector('#nx_cancel').onclick = openPicker;
  dlg.querySelector('#nx_save').onclick = ()=>{
    const name = dlg.querySelector('#nx_name').value.trim() || (Lang.get()==="es"?"Ejercicio sin nombre":"Untitled exercise");
    const muscle = dlg.querySelector('#nx_muscle').value;
    const pats = [...dlg.querySelectorAll('[data-p]')].filter(i=>i.checked).map(i=>i.dataset.p);
    const eq = [...dlg.querySelectorAll('[data-eq]')].filter(i=>i.checked).map(i=>i.dataset.eq);
    const env = [...dlg.querySelectorAll('[data-env]')].filter(i=>i.checked).map(i=>i.dataset.env);
    const unilateral = dlg.querySelector('#nx_uni').checked;
    const beginner = dlg.querySelector('#nx_beg').checked;
    const instructions = dlg.querySelector('#nx_ins').value.trim() || (Lang.get()==="es"?"Ejercicio personalizado.":"Custom exercise.");
    const mediaURL = dlg.querySelector('#nx_media').value.trim() || null;
    const ex = { id:makeId(), name, muscle, patterns: pats.length?pats:["hipHinge"], equipment: eq.length?eq:[Equip.bodyweight], environment: env.length?env:[Env.home,Env.gym], unilateral, beginnerFriendly: beginner, instructions, variant:`custom_${muscle}`, mediaURL };
    const arr = Storage.get(CustomKey, []); arr.unshift(ex); Storage.set(CustomKey, arr);
    if(typeof onDone === 'function') onDone(ex);
  };
}

function openFavorites(){
  const dlg = $('#favoritesModal');
  const list = Storage.get(FavKey, []);
  dlg.innerHTML = `
    <div class="head"><strong>${t('favorites')}</strong></div>
    <div class="body">
      ${!list.length ? `<div class="muted">${Lang.get()==="es"?"Aún no hay favoritos.":"No favorites yet."}</div>` : ''}
      ${list.map((p,i)=>`
        <div class="card glass" style="margin:10px 0">
          <div class="row" style="justify-content:space-between;gap:12px">
            <div>
              <div style="font-weight:800">${p.muscle?muscleTitle(p.muscle):t('fullBody')}</div>
              <div class="muted" style="font-size:12px">${t(p.goal)} • ${p.durationMinutes} ${t('minutes').toLowerCase()}</div>
            </div>
            <div class="row" style="gap:8px">
              <button class="btn small primary" data-use="${i}">✔ ${t('use')}</button>
              <button class="btn small danger" data-del="${i}">🗑️</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="foot"><button class="btn" id="favClose">✖️ ${t('close')}</button></div>
  `;
  dlg.querySelector('#favClose').onclick = ()=> dlg.close();
  dlg.querySelectorAll('[data-use]').forEach(b=> b.onclick = ()=>{
    const plan = Storage.get(FavKey, [])[+b.dataset.use];
    currentPlan = plan; timers.clear(); render(); dlg.close();
  });
  dlg.querySelectorAll('[data-del]').forEach(b=> b.onclick = ()=>{
    const arr = Storage.get(FavKey, []); arr.splice(+b.dataset.del, 1); Storage.set(FavKey, arr); openFavorites();
  });
  openDialog(dlg);
}

function openSettings(){
  const dlg = $('#settingsModal');
  const cur = localStorage.getItem(Lang.key) || "system";
  dlg.innerHTML = `
    <div class="head"><strong>${t('settings')}</strong></div>
    <div class="body">
      <label class="lbl">${t('language')}</label>
      <select id="s_lang">
        <option value="system">${t('systemLang')}</option>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <div class="muted" style="margin-top:10px;font-size:12px">Feedback: <a href="mailto:paul_rios@engineer.com?subject=%5BApp%20Feedback%5D">✉️ Email</a></div>
    </div>
    <div class="foot"><button class="btn" id="s_close">✖️ ${t('close')}</button></div>
  `;
  dlg.querySelector('#s_lang').value = cur;
  dlg.querySelector('#s_close').onclick = ()=> dlg.close();
  dlg.querySelector('#s_lang').onchange = e=>{
    Lang.set(e.target.value);
    L = I18N[Lang.get()];
    AllExercises = ExerciseLibrary.makeAll().concat(Storage.get(CustomKey,[]));
    render();
  };
  openDialog(dlg);
}

/* ===== Timer editor ===== */
function openTimerEditor(itemId, timer){
  const dlg = $('#timerModal');
  const cur = timer.target || timer.remains || 90;
  const m = Math.floor(cur/60), s = cur%60;
  dlg.innerHTML = `
    <div class="head"><strong>${t('editTime')}</strong></div>
    <div class="body">
      <div class="row wrap gap">
        <div class="col">
          <label class="lbl">Min</label>
          <input id="tm_min" type="number" min="0" max="10" value="${m}">
        </div>
        <div class="col">
          <label class="lbl">Sec</label>
          <input id="tm_sec" type="number" min="0" max="59" value="${s}">
        </div>
      </div>
      <div class="muted" style="margin-top:8px;font-size:12px">${t('max1000')}</div>
    </div>
    <div class="foot">
      <button class="btn" id="tm_cancel">✖️ ${t('cancel')}</button>
      <button class="btn primary" id="tm_ok">✅ ${t('ready')}</button>
    </div>
  `;
  dlg.querySelector('#tm_cancel').onclick = ()=> dlg.close();
  dlg.querySelector('#tm_ok').onclick = ()=>{
    const mm = clamp(+dlg.querySelector('#tm_min').value,0,10);
    const ss = clamp(+dlg.querySelector('#tm_sec').value,0,59);
    let total = mm*60 + ss; total = clamp(total,1,600);
    timer.target = total;
    timer.remains = total;
    timer.running = false; clearInterval(timer.interval);
    // actualiza dom si el card sigue visible
    const card = $(`[data-id="${itemId}"]`);
    if(card) card.querySelector('.time').textContent = fmtTime(total);
    dlg.close();
  };
  openDialog(dlg);
}

/* ===== Media (GIF) modal con fallback ===== */
function openMedia(ex){
  const dlg = $('#mediaModal');
  const url = ex.mediaURL || `https://duckduckgo.com/?q=${encodeURIComponent(ex.name + ' exercise gif')}&iax=images&ia=images`;
  dlg.innerHTML = `
    <div class="head"><strong>${ex.name}</strong></div>
    <div class="body">
      <div class="iframeWrap"><iframe id="mediaFrame" src="${url}" sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>
      <div class="muted" style="margin-top:8px;font-size:12px">${Lang.get()==="es"?"Si no se carga aquí, usa:":"If it fails to load here, use:"} <a href="${url}" target="_blank" rel="noopener">${t('openNew')}</a></div>
    </div>
    <div class="foot"><button class="btn" id="mm_close">✖️ ${t('close')}</button></div>
  `;
  dlg.querySelector('#mm_close').onclick = ()=> dlg.close();
  openDialog(dlg);
}

/* ===== Dialog helpers ===== */
function openDialog(dlg, afterOpen){
  $('#backdrop').classList.add('show');
  dlg.showModal();
  once(dlg,'close',()=> $('#backdrop').classList.remove('show'));
  if(afterOpen) setTimeout(afterOpen, 10);
}

/* ===== Controles fijos ===== */
function wireControls(){
  $('#chkFullBody').addEventListener('change', e=>{ Filters.fullBody = e.target.checked; if(Filters.fullBody){ selectedMuscle=null; } highlightMuscleChips(); render(); });

  $('#goalGroup').addEventListener('click', e=>{
    if(e.target.classList.contains('seg')){
      $$('#goalGroup .seg').forEach(x=> x.classList.remove('active'));
      e.target.classList.add('active');
      Filters.goal = e.target.dataset.value;
    }
  });

  $('#minutes').addEventListener('input', e=>{
    Filters.minutes = +e.target.value;
    $('#minutesLabel').textContent = `${Filters.minutes} ${t('minutes').toLowerCase()}`;
  });

  $('#envGroup').addEventListener('click', e=>{
    if(e.target.classList.contains('seg')){
      $$('#envGroup .seg').forEach(x=> x.classList.remove('active'));
      e.target.classList.add('active');
      Filters.environment = e.target.dataset.value;
    }
  });

  $('#chkBeginner').addEventListener('change', e=> Filters.preferBeginner = e.target.checked);

  $('#btnGenerate').onclick = generate;
  $('#btnFilters').onclick = openFilters;
  $('#btnFavorites').onclick = openFavorites;
  $('#btnSettings').onclick = openSettings;
}

/* ===== Boot ===== */
function render(){
  L = I18N[Lang.get()];
  renderHeader();
  buildMuscleChips();
  highlightMuscleChips();
  buildEquipmentChips();
  $('#btnGenerate').disabled = (!Filters.fullBody && !selectedMuscle);
  renderContent();
}
wireControls();
render();

