
const PHOTOS=['001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg', '006.jpg', '007.jpg', '008.jpg', '009.jpg', '010.jpg', '011.jpg', '012.jpg', '013.jpg', 'weverse_1-297390107.jpg', 'weverse_1-298105017.jpg', 'weverse_1-298105018.jpg', 'weverse_3-336639365.jpg', 'weverse_3-339099838.jpg', 'weverse_4-328094447.jpg'];
const ICONS={ phone:'assets/icons/ios26_phone.png', kakao:'assets/icons/icon_kakao.png', photos:'assets/icons/ios26_photos.png', ai:'assets/icons/icon_chatgpt.png', instagram:'assets/icons/icon_instagram.png', x:'assets/icons/ios26_x.png', weverse:'assets/icons/icon_weverse.png', music:'assets/icons/ios26_music.png', calendar:'assets/icons/ios26_calendar.png', notes:'assets/icons/ios26_notes.png', safari:'assets/icons/ios26_safari.png', camera:'assets/icons/ios26_camera.png', settings:'assets/icons/icon_settings.svg', messages:'assets/icons/ios26_messages.png' };
const state={phoneTab:'all',photosTab:'library',musicTab:'playlist',incoming:false, notificationSent:false, notificationRead:false,view:'lock', pin:'', app:null, detail:null, photoIndex:null, weverseTab:'artist', xTab:'search', oldChat:false, aiThread:null, toast:null};
const calls=[
  ['신신신정환','오늘 오전 9:18','부재중'],['엄마','어제 오후 8:42','발신'],['누나','어제 오후 6:03','수신'],['010-3114-1106','어제 오후 4:17','부재중'],['누나','그제 오후 11:20','수신'],['엄마','그제 오후 7:55','발신'],['신신신정환','그제 오후 2:34','수신'],['070-3827-1003','10월 16일','부재중']
];
const kakaoRooms=[
  {name:'신신신정환', preview:'수업 끝나고 연락해 ㅋㅋ', time:'오전 9:20', badge:1, avatar:'assets/photos/009.jpg'},
  {name:'누나', preview:'너 내 충전기 가져갔지', time:'어제', badge:0, avatar:'assets/photos/012.jpg'},
  {name:'엄마', preview:'저녁 먹고 들어와', time:'어제', badge:0, avatar:'assets/photos/013.jpg'},
  {name:'무용과 동기들', preview:'내일 연습실 3시 맞지?', time:'월요일', badge:0, avatar:'assets/photos/004.jpg'},
];
const kakaoCurrent=[
['day','오늘'],['other','지훈아 수업 끝났냐'],['me','아직\n왜'],['other','왜긴\n그냥 보고싶어서'],['me','개수작 부리지마셈'],['other','?'],['other','아니 진짜로'],['me','...'],['other','수업 끝나고 연락해 ㅋㅋ'],['me','네네']
];
const kakaoPast=[['day','1교시 듣던 날'],['other','읽씹?'],['other','야 한지훈 자냐? 일어나라'],['other','보이스톡 해요'],['me','미쳤어요???'],['other','형한테 미쳤냐니...'],['me','저 수업중이라고요'],['other','전화 못 받아 그럼?'],['me','...형 학교 안 다녔어요?'],['other','대학은 안 갔지\n무시하냐?'],['me','아 에바\n뭔 또 무시예요..']];
const aiThreads=[
{title:'질투하는 게 이상한 거야?',sub:'친도랑 제일 최근에 한 대화',messages:[['me','친도야'],['bot','왜 지훈아 ㅋㅋ'],['me','상대가 다른 사람이랑 자꾸 엮이는데 신경쓰이면 어떡함'],['bot','그 사람이 진짜 뭘 한 건 아니고, 주변에서 자꾸 엮는 거면 더 애매하지. 머리로는 이해해도 기분은 별개일 수 있어.'],['me','걔 잘못은 아닌데\n짜증남'],['bot','그건 질투가 이상한 게 아니라 네가 그 관계를 진지하게 생각하고 있다는 뜻일 수도 있어.'],['me','말하면 찌질해보일까'],['bot','꼭 전부 말할 필요는 없어.\n"나 좀 서운했어" 정도만 말해도 충분해. 네가 뭘 서운해하는지 상대는 알아야 풀 수 있으니까.']]},
{title:'남자친구가 너무 바쁠 때',sub:'답답한데 이해도 돼서 더 싫음',messages:[['me','친도 바쁜 사람이랑 연애하면 원래 이렇게 연락을 못해?'],['bot','직업이나 일정에 따라 그럴 수 있어. 근데 연락 빈도보다 중요한 건 둘이 납득 가능한 방식이 있느냐야.'],['me','얘는 진짜 바쁨\n내가 이해해야 되는 건 알겠는데'],['bot','이해해주는 거랑 네가 서운하지 않아야 하는 건 다른 얘기야. 어떤 순간이 제일 서운한지 먼저 정리해볼래?'],['me','그냥 나 혼자 기다리는 느낌'],['bot','그럼 그걸 그대로 말해보자. 비난이 아니라 설명으로.']]},
{title:'남자가 남자를 좋아할 수도 있나',sub:'초반의 너무 솔직한 검색',messages:[['me','친도'],['bot','응 왔어.'],['me','남자가 남자 좋아할수도 있냐'],['bot','물론이지. 성별과 상관없이 누군가에게 끌리거나 사랑하는 감정은 충분히 자연스러운 일이야.'],['me','아오'],['bot','놀랄 수는 있어도 이상한 건 아니야 지훈아 ㅋㅋ']]},
{title:'먼저 연락하면 지는거냐',sub:'자존심과 후회 사이',messages:[['me','친도'],['bot','응 왜'],['me','먼저 연락하면 지는거냐'],['bot','연애가 가위바위보도 아니고 ㅋㅋ\n정말 연락하고 싶은데 자존심 때문에 참는 중이야?'],['me','아니 그냥'],['bot','그냥이라고 쓰는 사람 치고 그냥인 사람 별로 없더라. 하고 싶으면 해.']]},
];
const instaPosts=['009.jpg','001.jpg','002.jpg','003.jpg','010.jpg','011.jpg','012.jpg','013.jpg','004.jpg'];
const xTweets={
 search:[
  ['실트','신유 열애설','지훈이 예전에 찾아봤던 검색어 흔적'],
  ['실트','신유 성지유','찌라시 카드뉴스 때문에 더 마음 상했던 날'],
  ['실트','신유 핑크머리','컴백날 반응은 이것뿐이라 더 짜증났음']
 ],
 scandal:[
  ['@peachsoda_','신유 열애설 또 뭐야;;; 사진 각도 너무 애매함','10.03 · 21 ♥ 98'],
  ['@1sec_fan','난 그냥 회사 공지 나올 때까지 가만히 있을래', '10.03 · 8 ♥ 54'],
  ['@mylittleshy','근데 카드뉴스 진짜 억지 같은데...','10.03 · 16 ♥ 77'],
  ['@jellybear','숙소 앞 사진이 제일 찜찜하긴 함','10.03 · 12 ♥ 45']
 ]
};
const playlist=[
  ['imase','18','assets/music/18.svg'],
  ['실리카겔 · So!YoOn!','Tic Tak Tok','assets/music/tic_tak_tok.svg'],
  ['1SECOND','One More Second','assets/music/one_more_second.svg'],
  ['Liana Flores','recently','assets/music/recently.svg'],
  ['Fujii Kaze','You','assets/music/you.svg'],
  ['도시고독','비디오 환각','assets/music/video_hallucination.svg'],
  ['Billie Eilish','I love you','assets/music/i_love_you.svg'],
  ['TWS','Fire Escape','assets/music/fire_escape.svg']
];
function q(sel){return document.querySelector(sel)}
function showToast(msg){state.toast=msg; render(); if(msg) setTimeout(()=>{if(state.toast===msg){state.toast=null; render();}},2800);}
function openApp(id){state.view='app'; state.app=id; state.detail=null; state.photoIndex=null; if(id==='weverse') state.weverseTab='artist'; if(id==='x') state.xTab='search'; render();}
function goHome(){state.view='home'; state.app=null; state.detail=null; state.photoIndex=null; render();}
function openChat(name){state.detail=name; render();}
function openPhoto(i){state.photoIndex=i; render();}
function openAIThread(i){state.aiThread=i; render();}
function switchWeverse(tab){state.weverseTab=tab; render();}
function switchX(tab){state.xTab=tab; render();}
function contactDetail(i){state.detail='call'+i; render();}
function lockHTML(){return `<div class="lock"><div class="date">10월 22일 목요일</div><div class="time">9:41</div><div class="ios-notification-list" onclick="beginUnlock()"><div class="ios-notification"><span class="ios-notification__icon"><img src="${ICONS.kakao}" alt="카카오톡"></span><div class="ios-notification__body"><div class="ios-notification__head"><span class="ios-notification__title">신신신정환</span><span class="ios-notification__time">지금</span></div><p class="ios-notification__text">지훈아 수업 끝났냐<br>오늘은 읽씹하지 마셈 ㅋㅋ</p></div></div></div><button class="unlocktip" style="color:inherit;background:transparent" onclick="beginUnlock()">위로 쓸어올려 잠금 해제  ⌃</button><div class="actions"><button class="circlebtn">🔦</button><button class="circlebtn">📷</button></div></div><div class="homebar light"></div>`}
function beginUnlock(){state.view='passcode';state.pin='';state.toast=null;render();}
function pressPin(n){if(state.pin.length>=4)return;state.pin+=String(n);if(state.pin.length===4){if(state.pin==='1107'){state.view='home';state.pin='';state.toast=null;render();scheduleKakaoNotification();}else{state.pin='';render();const e=q('.pinError');if(e)e.textContent='암호가 올바르지 않습니다';}}else render();}
function scheduleKakaoNotification(){
  // The message is a fictional local event, not a real KakaoTalk push notification.
  if(state.notificationSent) return;
  state.notificationSent=true;
  setTimeout(()=>{
    if(state.view==='lock'||state.view==='passcode')return;
    state.incoming=true;
    render();
    // Use a subtle synthesized chime only after user has interacted with unlock.
    try {const Ctx=window.AudioContext||window.webkitAudioContext; if(Ctx){const c=new Ctx(); const o=c.createOscillator(), g=c.createGain();o.type='sine';o.frequency.setValueAtTime(840,c.currentTime);o.frequency.exponentialRampToValueAtTime(620,c.currentTime+.16);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.035,c.currentTime+.018);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.26);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.27);o.onended=()=>c.close();}}catch(_e){}
    setTimeout(()=>{if(state.incoming){state.incoming=false;render();}},7000);
  },1400);
}
function openIncomingKakao(){state.incoming=false;state.notificationRead=true;state.oldChat=false;state.view='app';state.app='kakao';state.detail='신신신정환';render();}
function incomingHTML(){return `<div class="ios-notification-banner" onclick="openIncomingKakao()" role="button" tabindex="0" onkeydown="if(event.key==='Enter')openIncomingKakao()" aria-label="신신신정환 카카오톡 알림 열기"><div class="ios-notification"><span class="ios-notification__icon"><img src="${ICONS.kakao}" alt="카카오톡"></span><div class="ios-notification__body"><div class="ios-notification__head"><span class="ios-notification__title">신신신정환</span><span class="ios-notification__time">지금</span></div><div class="ios-notification__subtitle">카카오톡</div><p class="ios-notification__text">야 한지훈<br>전화 좀 받아 ㅋㅋ</p></div></div></div>`}
function pinHTML(){return `<div class="pinScreen"><div class="pinTitle">암호 입력</div><div class="pinDots">${[0,1,2,3].map(i=>`<span class="${state.pin.length>i?'filled':''}"></span>`).join('')}</div><div class="pinError"></div><div class="pinGrid">${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(n=>n===''?'<span></span>':`<button onclick="${n==='⌫'?"state.pin=state.pin.slice(0,-1);render()":`pressPin(${n})`}">${n}</button>`).join('')}</div><button class="pinCancel" onclick="state.view='lock';render()">취소</button></div><div class="homebar light"></div>`;}
function safariHTML(){return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>Safari</h1><button class="close" onclick="goHome()">×</button></div><div class="content safariHistory"><div class="safariSearch">⌕ 검색 또는 웹 사이트 이름 입력</div><h2>최근 검색 기록</h2>${['원세컨드 신유','신정환','성지유'].map((x,i)=>`<div class="historyRow"><span class="historyIcon">◷</span><span>${i+1}. ${x}</span><span class="historyArrow">↗</span></div>`).join('')}</div>`);}
const diaryEntries=[{title:'다섯 번째 일기',pages:['assets/diary1.jpg']},{title:'일곱 번째 일기 : 옛날 이야기',pages:['assets/diary2.jpg','assets/diary3.jpg']},{title:'여섯 번째 일기',pages:['assets/diary4.jpg']}];
function notesHTML(){if(state.detail!==null){const d=diaryEntries[state.detail];return shell(`<div class="notesDetail"><div class="notesToolbar"><button onclick="state.detail=null;render()">‹ 메모</button><span>↶　↷　♧　···</span></div><div class="notesScroll"><h1>${d.title}</h1>${d.pages.map((src,i)=>`<img class="diaryPage" src="${src}" alt="${d.title} ${i+1}페이지 원문">`).join('')}</div><div class="notesBottom">☷　　　　▣　　　　◉　　　　□</div></div>`);}return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>메모</h1><button class="close" onclick="goHome()">×</button></div><div class="content notesList"><h2>모든 메모</h2>${diaryEntries.map((d,i)=>`<button class="noteRow" onclick="state.detail=${i};render()"><b>${d.title}</b><small>일기 · ${d.pages.length}페이지</small></button>`).join('')}</div>`);}
function appButton(id,label,badge=''){return `<button class="appbtn" onclick="openApp('${id}')"><div class="appicon"><img src="${ICONS[id]}" alt=""></div><div style="position:relative">${label}${badge?`<span class="badge">${badge}</span>`:''}</div></button>`;}
function homeHTML(){return `<div class="home"><div class="widgets"><div class="widget glass"><div class="tiny">오늘 일정</div><div class="big">3</div><div class="sub">전공 수업 · 연습 · 저녁 약속</div></div><div class="widget glass"><div class="tiny">최근 재생</div><div style="font-size:18px;font-weight:700">One More Second</div><div class="sub">1SECOND · 애플뮤직 플레이리스트</div></div></div><div class="grid">${appButton('kakao','카카오톡','1')}${appButton('photos','사진')}${appButton('ai','ChatGPT')}${appButton('instagram','Instagram')}${appButton('x','X')}${appButton('weverse','Weverse')}${appButton('music','음악')}${appButton('calendar','캘린더')}</div><div class="pages"><span></span><span></span></div><div class="dock glass">${appButton('phone','전화')}${appButton('safari','Safari')}${appButton('notes','메모')}${appButton('camera','카메라')}</div></div><div class="homebar"></div>`;}
function shell(inner, light=false){return `<div class="app">${inner}</div><div class="homebar ${light?'light':''}" onclick="goHome()"></div>`}
function phoneHTML(){ if(typeof state.detail==='string' && state.detail.startsWith('call')){ const i=Number(state.detail.slice(4)); const c=calls[i]; const isJh = c[0]==='신신신정환'; return shell(`<div class="topnav"><button class="back" onclick="state.detail=null;render()">‹ 최근 통화</button><h1>연락처</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="profilehero"><div class="avatar"><img src="${isJh?'assets/photos/009.jpg':'assets/photos/012.jpg'}"></div><div class="name">${c[0]}</div><div class="phoneNo">번호 비공개</div><div class="contactchips"><div class="chip">영상통화</div><div class="chip">메시지</div><div class="chip">공유</div></div></div><div class="sectiontitle">메모</div><div class="list"><div class="row"><div><div class="title">관계</div><div class="meta">${isJh?'저장명 바뀐 흔적 있음 · 원래는 신정환':'가족'} </div></div></div><div class="row"><div><div class="title">이스터 에그</div><div class="meta">${isJh?'말하지 않아도 다 아는 사람':'늘 저녁 챙겨먹으라고 하는 사람'} </div></div></div></div></div>`,false)} return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>전화</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="seg"><button class="active">최근 통화</button><button>부재중</button></div><div class="list">${calls.map((c,i)=>`<button class="row" onclick="contactDetail(${i})"><div><div class="title">${c[0]}</div><div class="meta">${c[2]}</div></div><div class="meta">${c[1]}</div></button>`).join('')}</div></div>`)}
function kakaoHTML(){ if(state.detail==='신신신정환'){ const msgs=(state.oldChat?kakaoPast:(state.notificationSent?[...kakaoCurrent,['other','야 한지훈'],['other','전화 좀 받아 ㅋㅋ']]:kakaoCurrent)); return shell(`<div class="chatview"><div class="chatheader"><button class="back" onclick="state.detail=null;render()" style="color:#0a84ff;font-size:18px">‹</button><div class="avatar"><img src="assets/photos/009.jpg"></div><div style="font-weight:700">신신신정환</div><div style="margin-left:auto"><button onclick="state.oldChat=!state.oldChat;render()" style="font-size:13px;color:#0a84ff">${state.oldChat?'현재 대화 보기':'과거 대화 보기'}</button></div></div><div class="messages">${msgs.map(m=>m[0]==='day'?`<div class="daymark">${m[1]}</div>`:`<div class="bubble ${m[0]==='me'?'me':'other'}">${m[1]}</div>`).join('')}</div><div class="chatinput"><div class="field">메시지 보내기</div></div></div>`,false)} return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>카카오톡</h1><button class="close" onclick="goHome()">×</button></div><div class="content chatlist">${kakaoRooms.map(r=>`<button class="row" onclick="openChat('${r.name}')"><div style="display:flex;align-items:center;min-width:0;flex:1"><div class="thumb"><img src="${r.avatar}"></div><div class="txt"><div class="name">${r.name}</div><div class="preview">${r.preview}</div></div></div><div class="right"><div>${r.time}</div>${r.badge?`<div class="badge" style="position:static;margin-left:auto;margin-top:7px;width:max-content">${r.badge}</div>`:''}</div></button>`).join('')}</div>`)}
function photosHTML(){ if(state.photoIndex!==null){ const fn=PHOTOS[state.photoIndex]; const cap = fn.includes('weverse')?'위버스에 올라온 사진 저장본':'최근 항목'; return `<div class="photoViewer"><div class="viewerTop"><button class="back" onclick="state.photoIndex=null;render()" style="color:#fff">완료</button><div>${state.photoIndex+1} / ${PHOTOS.length}</div><div></div></div><div class="stage"><img src="assets/photos/${fn}"></div><div class="cap">${cap}${fn==='010.jpg'?' · 이전에 삭제했다가 다시 복구한 사진':''}</div><div class="homebar light" onclick="goHome()"></div></div>`; } return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>사진</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="seg"><button class="active">최근 항목</button><button>즐겨찾기</button><button>최근 삭제된 항목</button></div><div class="photogrid">${PHOTOS.map((p,i)=>`<button onclick="openPhoto(${i})"><img src="assets/photos/${p}"></button>`).join('')}</div></div>`)}
function aiHTML(){ if(state.aiThread!==null){ const t=aiThreads[state.aiThread]; return shell(`<div class="topnav"><button class="back" onclick="state.aiThread=null;render()">‹ 챗 목록</button><h1>친도</h1><button class="close" onclick="goHome()">×</button></div><div class="aichat"><div class="aiMessages">${t.messages.map(m=>`<div class="msg ${m[0]}"><div class="dot">${m[0]==='bot'?'◎':'🙂'}</div><div class="box">${m[1]}</div></div>`).join('')}</div><div class="aiComposer"><input placeholder="미리 작성된 상담 기록" readonly aria-label="시뮬레이션 대화"/><button class="send" onclick="showToast('이번 버전은 미리 작성된 친도 대화로 구성했어.')">↑</button></div></div>`) } return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>ChatGPT</h1><button class="close" onclick="goHome()">×</button></div><div class="content aithreads">${aiThreads.map((t,i)=>`<button class="row" onclick="openAIThread(${i})"><div><div class="aititle">${t.title}</div><div class="aisub">${t.sub}</div></div><div class="meta">›</div></button>`).join('')}</div>`)}
function instagramHTML(){return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>Instagram</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="instaHeader"><div class="profileCard"><div class="avatar" style="width:82px;height:82px"><img src="assets/photos/003.jpg"></div><div><div style="font-size:22px;font-weight:700">jihoon.h</div><div style="font-size:13px;color:#7a8290">한지훈</div></div><div class="profileStats"><div><b>12</b>게시물</div><div><b>187</b>팔로워</div><div><b>142</b>팔로잉</div></div></div><div class="bio"><b>무용 / 그냥 사는 중</b><br>연습실, 학교, 가끔 반려견.<br><span style="color:#0a84ff">팔로잉에서 지후 선배는 사라짐.</span></div></div><div class="storyBar"><div class="story"><div class="ring"><div><img src="assets/photos/011.jpg"></div></div>연습</div><div class="story"><div class="ring"><div><img src="assets/photos/012.jpg"></div></div>두리</div><div class="story"><div class="ring"><div><img src="assets/photos/013.jpg"></div></div>초코</div><div class="story"><div class="ring"><div><img src="assets/photos/009.jpg"></div></div>아카이브</div></div><div class="instaGrid">${instaPosts.map(p=>`<img src="assets/photos/${p}">`).join('')}</div></div>`)}
function xHTML(){ let inner=''; if(state.xTab==='search'){ inner = `<div class="trends">${xTweets.search.map(t=>`<div class="row"><div><div class="title">${t[1]}</div><div class="meta">${t[2]}</div></div><button style="color:#0a84ff" onclick="switchX('scandal')">보기</button></div>`).join('')}</div>`; } else { inner = xTweets.scandal.map(t=>`<div class="tweet"><div class="user">${t[0]} <span class="handle">· 팬 계정</span></div><div class="body">${t[1]}</div><div class="meta">${t[2]}</div></div>`).join('') } return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>X</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="xheader"><div class="searchbar">🔎  신유 열애설</div></div><div class="seg"><button class="${state.xTab==='search'?'active':''}" onclick="switchX('search')">검색 기록</button><button class="${state.xTab==='scandal'?'active':''}" onclick="switchX('scandal')">팬 반응</button></div>${inner}</div>`)}
function weverseHTML(){ let feed=''; if(state.weverseTab==='artist'){ feed = `
 <div class="wvCard"><div class="wvMeta"><div class="miniava"><img src="assets/photos/009.jpg"></div><div><div class="metaTop">귀염둥이 딸기 오빠 🍓</div><div class="metaSub">10.16. 17:13</div></div></div><div class="caption">금요일 파이팅!</div><div class="screenShot"><img src="assets/weverse/post1.png"></div></div>
 <div class="wvCard"><div class="wvMeta"><div class="miniava"><img src="assets/photos/001.jpg"></div><div><div class="metaTop">귀염둥이 딸기 오빠 🍓</div><div class="metaSub">09.02. 14:06</div></div></div><div class="caption">OOTD</div><div class="screenShot"><img src="assets/weverse/post2.png"></div></div>
 <div class="wvCard"><div class="wvMeta"><div class="miniava"><img src="assets/photos/002.jpg"></div><div><div class="metaTop">귀염둥이 딸기 오빠 🍓</div><div class="metaSub">10.17. 22:24</div></div></div><div class="caption">첫만남 신유</div><div class="screenShot"><img src="assets/weverse/post3.png"></div></div>
 <div class="wvCard"><div class="wvMeta"><div class="miniava"><img src="assets/photos/003.jpg"></div><div><div class="metaTop">귀염둥이 딸기 오빠 🍓</div><div class="metaSub">09.23. 22:57</div></div></div><div class="caption">즐거운 추석을 보내세용</div><div class="screenShot"><img src="assets/weverse/post4.png"></div></div>`; } else if(state.weverseTab==='live'){ feed = `<a class="livecard" href="https://weverse.io/tws/live/2-180502498?hl=ko" target="_blank" rel="noreferrer"><div class="thumb"><img src="assets/weverse/live_thumb.png"></div><div><div class="title">제철 신(유) 🦐</div><div class="metaSub" style="margin-top:8px">09.24. 14:09 · 재생 278K · 채팅 66.6K</div><div class="pill">LIVE 링크 열기 ↗</div><div style="margin-top:10px;font-size:14px;line-height:1.45;color:#4c5563">썸네일을 누르면 실제 위버스 라이브 페이지로 이동해.</div></div></a>`; } else { feed = `<div style="padding:26px 18px;color:#65707f">${state.weverseTab} 탭은 다음 버전에서 더 채울 예정이야.</div>`; } return `<div class="wvapp"><div class="wvTop"><div class="wvToolbar"><div style="font-size:24px">☰</div><div class="brand"><span class="wlogo">w</span> 1SECOND</div><div style="margin-left:auto;display:flex;gap:14px;align-items:center"><div class="avatar" style="width:32px;height:32px;border-radius:50%"><img src="assets/photos/003.jpg"></div><div style="position:relative">🔔<span style="position:absolute;top:-8px;right:-12px;background:#ff5a5f;color:#fff;border-radius:999px;font-size:10px;padding:2px 4px">99+</span></div><div>✈️</div></div></div><div class="wvHero"><img class="bglogo" src="assets/one_second_logo.svg" alt="1SECOND"><div class="sub">4.2만 members · ✓ 가입 완료</div><h2>1SECOND</h2><div class="membership"><span class="shield">♡</span> Membership</div></div><div class="wvTabs"><button class="${state.weverseTab==='highlight'?'active':''}" onclick="switchWeverse('highlight')">Highlight</button><button class="${state.weverseTab==='fan'?'active':''}" onclick="switchWeverse('fan')">Fan</button><button class="${state.weverseTab==='artist'?'active':''}" onclick="switchWeverse('artist')">Artist</button><button class="${state.weverseTab==='fanletter'?'active':''}" onclick="switchWeverse('fanletter')">Fan Letter</button><button class="${state.weverseTab==='media'?'active':''}" onclick="switchWeverse('media')">Media</button><button class="${state.weverseTab==='live'?'active':''}" onclick="switchWeverse('live')">LIVE</button><button class="${state.weverseTab==='notice'?'active':''}" onclick="switchWeverse('notice')">Notice</button><button class="${state.weverseTab==='shop'?'active':''}" onclick="switchWeverse('shop')">Shop</button></div></div><div class="wvFeed">${feed}</div><div class="homebar" onclick="goHome()"></div></div>`}
function musicHTML(){return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>Apple Music</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div class="musicHero"><div class="playlistHead"><div class="playlistArt"><img src="assets/music/one_more_second.svg"></div><div><div class="playlistTitle">읽씹?
플레이리스트</div><div class="playlistMeta">지훈이 저장한 플레이리스트 · 8곡<br>최근 재생: One More Second</div></div></div></div><div class="playactions"><button class="playbtn">▶</button><button class="shuffle">⇄</button></div>${playlist.map((t,i)=>`<div class="track"><div style="width:20px;text-align:right;color:#7a8290">${i+1}</div><div class="cov"><img src="${t[2]}"></div><div><div class="tt">${t[1]}</div><div class="ta">${t[0]}</div></div></div>`).join('')}</div>`)}
function simpleApp(title,desc){return shell(`<div class="topnav"><button class="back" onclick="goHome()">‹ 홈</button><h1>${title}</h1><button class="close" onclick="goHome()">×</button></div><div class="content"><div style="padding:28px 18px;color:#616a78;line-height:1.6">${desc}</div></div>`)}
function appHTML(){ switch(state.app){ case'phone':return phoneHTML(); case'kakao':return kakaoHTML(); case'photos':return photosHTML(); case'ai':return aiHTML(); case'instagram':return instagramHTML(); case'x':return xHTML(); case'weverse':return weverseHTML(); case'music':return musicHTML(); case'safari':return safariHTML(); case'notes':return notesHTML(); case'calendar':return simpleApp('캘린더','팬싸 날짜, 학교 일정, 공연 연습 날짜 같은 작은 흔적을 넣을 예정이야.'); case'camera':return simpleApp('카메라','이번 버전에서는 사진첩을 먼저 구현했어.'); default:return '' } }

function iosTabBar(tabs, selected, app){return `<nav class="ios-tabbar" aria-label="${app} 탭"><div class="ios-tabbar__bar" style="--tabs:${tabs.length}">${tabs.map(([id,label,icon])=>`<label class="ios-tab"><input type="radio" name="${app}-tabs" aria-label="${label}" ${selected===id?'checked':''} onchange="switchAppTab('${app}','${id}')"><i class="ios-icon ios-icon--${icon}"></i><span>${label}</span></label>`).join('')}</div></nav>`;}
function switchAppTab(app,tab){if(app==='phone'){state.phoneTab=tab;state.detail=null;} if(app==='photos'){state.photosTab=tab;state.photoIndex=null;} if(app==='music')state.musicTab=tab;render();}
function iosNavbar(title,inline=true,back=null){return `<header class="ios-navbar"><div class="ios-navbar__bar"><div class="ios-navbar__leading">${back?`<button class="ios-barbutton" onclick="${back}" aria-label="뒤로"><i class="ios-icon ios-icon--chevron-left"></i></button>`:''}</div>${inline?`<h1 class="ios-navbar__inline-title">${title}</h1>`:''}<div class="ios-navbar__trailing"><button class="ios-barbutton" onclick="goHome()" aria-label="홈으로"><i class="ios-icon ios-icon--home"></i></button></div></div>${inline?'':`<h1 class="ios-navbar__large-title">${title}</h1>`}</header>`;}
function kitRow(label,detail='',action='',icon='chevron-right'){return `<button class="ios-row" onclick="${action}"><div class="ios-row__body"><span class="ios-row__title">${label}</span>${detail?`<span class="ios-row__detail">${detail}</span>`:''}<i class="ios-icon ios-icon--${icon}"></i></div></button>`;}
function kitList(rows,title=''){return `<div class="ios-list" style="padding:16px 0"><section class="ios-list__section">${title?`<h2 class="ios-list__header">${title}</h2>`:''}<div class="ios-list__group" data-variant="plain">${rows.join('')}</div></section></div>`;}
function polishKitUI(){
 const root=q('#screen');
 // Swap placeholder navigation markup for exact kit navbar structure, retaining original event handlers.
 root.querySelectorAll('.app > .topnav').forEach(old=>{
  const title=old.querySelector('h1')?.textContent?.trim()||'앱';
  const back=old.querySelector('button.back');
  const inline=!!(state.detail!==null || state.photoIndex!==null || state.aiThread!==null);
  const header=document.createElement('header');header.className='ios-navbar';
  const bar=document.createElement('div');bar.className='ios-navbar__bar';
  const leading=document.createElement('div');leading.className='ios-navbar__leading';
  if(back){const b=document.createElement('button');b.className='ios-barbutton';b.setAttribute('aria-label','뒤로');b.onclick=()=>back.click();b.innerHTML='<i class="ios-icon ios-icon--chevron-left"></i>';leading.append(b);}
  const trailing=document.createElement('div');trailing.className='ios-navbar__trailing';
  const done=document.createElement('button');done.className='ios-barbutton';done.setAttribute('aria-label','홈');done.innerHTML='<i class="ios-icon ios-icon--home"></i>';done.onclick=goHome;trailing.append(done);
  bar.append(leading);
  if(inline){const h=document.createElement('h1');h.className='ios-navbar__inline-title';h.textContent=title;bar.append(h);}
  bar.append(trailing);header.append(bar);
  if(!inline){const h=document.createElement('h1');h.className='ios-navbar__large-title';h.textContent=title;header.append(h);}
  old.replaceWith(header);
 });
 // Convert actual phone call entries into kit list rows, retaining the same call index and click behavior.
 if(state.app==='phone'&&state.view==='app'&&state.detail===null){
   const content=root.querySelector('.app>.content');if(content){
    const matches=calls.map((c,i)=>[c,i]).filter(([c])=>state.phoneTab==='all'||c[2]==='부재중');
    content.innerHTML=kitList(matches.map(([c,i])=>kitRow(c[0],c[1],`contactDetail(${i})`)),state.phoneTab==='missed'?'부재중 전화':'최근 통화');
   }
 }
 if(state.app==='notes'&&state.view==='app'&&state.detail===null){const content=root.querySelector('.app>.content');if(content){content.innerHTML=kitList(diaryEntries.map((d,i)=>kitRow(d.title,`${d.pages.length}페이지`,`state.detail=${i};render()`)),'일기');}}
 if(state.app==='ai'&&state.view==='app'&&state.aiThread===null){const content=root.querySelector('.app>.content');if(content){content.innerHTML=kitList(aiThreads.map((t,i)=>kitRow(t.title,'',`openAIThread(${i})`)),'이전 대화');}}
 if(state.app==='safari'&&state.view==='app'){
  const content=root.querySelector('.app>.content');if(content){content.innerHTML=`<div class="safariSearch">⌕ 검색 또는 웹 사이트 이름 입력</div>`+kitList(['원세컨드 신유','신정환','성지유'].map((x)=>kitRow(x,'검색 기록',`showToast('저장된 검색 기록: ${x}')`)),'최근 검색 기록');}
 }
 if(state.view==='app' && ['phone','photos','music'].includes(state.app)){
  const app=root.querySelector('.app');if(app){app.classList.add('has-ios-tabbar');let html='';
   if(state.app==='phone')html=iosTabBar([['all','최근','timer'],['missed','부재중','phone']],state.phoneTab,'phone');
   if(state.app==='photos'){
    html=iosTabBar([['library','보관함','image'],['albums','앨범','grid']],state.photosTab,'photos');
    if(state.photosTab==='albums'&&state.photoIndex===null){const content=app.querySelector('.content');if(content){content.innerHTML=kitList([kitRow('최근 항목',`${PHOTOS.length}개 사진`,"switchAppTab('photos','library')"),kitRow('즐겨찾기','사진 모음',"switchAppTab('photos','library')")],'앨범');}}
   }
   if(state.app==='music')html=iosTabBar([['playlist','플레이리스트','library'],['listen','지금 듣기','play']],state.musicTab,'music');
   app.insertAdjacentHTML('beforeend',html);
  }
 }
}
function render(){
  const root=q('#screen');
  let html='';
  if(state.view==='lock') html=lockHTML();
  else if(state.view==='passcode') html=pinHTML();
  else if(state.view==='home') html=homeHTML();
  else html=appHTML();
  if(state.toast) html += `<div class="toast">${state.toast}</div>`;
  if(state.incoming) html += incomingHTML();
  const onDark = state.view==='lock'||state.view==='passcode'||(state.view==='app'&&state.app==='photos'&&state.photoIndex!==null);
  const status = `<div class="ios-island"></div><div class="ios-statusbar" style="color:${onDark?'#fff':'#17191f'}"><div class="ios-statusbar__row"><span class="ios-statusbar__time">9:41</span><span class="ios-statusbar__island-gap"></span><span class="ios-statusbar__icons"><i class="ios-icon ios-icon--cellular"></i><i class="ios-icon ios-icon--wifi"></i><span class="ios-battery" style="--level:82"><i></i></span></span></div></div>`;
  const indicator = `<div class="ios-home-indicator"${onDark?' data-tone="white"':''} role="button" tabindex="0" aria-label="홈으로 이동" onclick="indicatorAction()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();indicatorAction()}"></div>`;
  // Status bar is first; home indicator is last, as required by the kit.
  root.innerHTML=status+html+indicator;
  polishKitUI();
}
function indicatorAction(){
  if(state.view==='lock'){beginUnlock();return;}
  if(state.view==='passcode'){state.view='lock';render();return;}
  if(state.view==='app')goHome();
}

let touchStartY=null, appGestureStart=null;
q('#screen').addEventListener('touchstart',e=>{if(state.view==='lock')touchStartY=e.touches[0].clientY; if(state.view==='app' && e.touches[0].clientY>window.innerHeight-85) appGestureStart=e.touches[0].clientY;},{passive:true});
q('#screen').addEventListener('touchend',e=>{if(state.view==='lock'&&touchStartY!==null){const dy=touchStartY-e.changedTouches[0].clientY;if(dy>55)beginUnlock();touchStartY=null;} if(state.view==='app' && appGestureStart!==null){ if(appGestureStart-e.changedTouches[0].clientY>65)goHome();appGestureStart=null;}},{passive:true});
q('#screen').addEventListener('mousedown',e=>{if(state.view==='lock')touchStartY=e.clientY});
q('#screen').addEventListener('mouseup',e=>{if(state.view==='lock'&&touchStartY!==null){if(touchStartY-e.clientY>45)beginUnlock();touchStartY=null;}});
q('#screen').addEventListener('click',e=>{if(state.view==='lock'&&e.target.closest('.notice'))beginUnlock();});

render();
