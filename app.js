const SONGS = [
  { id: "kacheri", title: "Kacheri", artist: "Anirudh Ravichander", cover: "kacheri.jpg", cat: "cm" },
  { id: "maduraikku", title: "Maduraikku", artist: "Vijay Antony", cover: "maduraikku.jpg", cat: "cm" },
  { id: "oru-pere", title: "Oru Pere", artist: "Anirudh Ravichander", cover: "oru-pere.jpg", cat: "cm" },
  { id: "raavana", title: "Raavana Mavanda", artist: "Anirudh Ravichander", cover: "raavana.jpg", cat: "cm" },
  { id: "2000s-fast-beat", title: "2000s Fast Beat", artist: "Various Artists", cover: null, cat: "love" },
  { id: "otha-sollaala", title: "Otha Sollaala", artist: "Vijay Antony", cover: "otha-sollaala.jpg", cat: "love" },
  { id: "chella-kutti", title: "Chella Kutti", artist: "Anirudh Ravichander", cover: null, cat: "cm" },
  { id: "yaar-indha-saalai-oram", title: "Yaar Indha Saalai Oram", artist: "Vijay Antony", cover: null, cat: "cm" },
  { id: "en-kannu-kulla", title: "En Kannu Kulla", artist: "Vijay Antony", cover: "en-kannu-kulla.jpg", cat: "love" },
  { id: "sirukki-vaasam", title: "Sirukki Vaasam", artist: "Anirudh Ravichander", cover: "sirukki-vaasam.jpg", cat: "love" },
  { id: "sivappu-manjal-pachai", title: "Sivappu Manjal Pachai", artist: "Santhosh Narayanan", cover: null, cat: "love" },
  { id: "aaruyirae", title: "Aaruyirae", artist: "A.R. Rahman", cover: null, cat: "love" },
  { id: "thangapoovey", title: "Thangapoovey", artist: "Anirudh Ravichander", cover: null, cat: "love" },
  { id: "marandhu-poche", title: "Marandhu Poche", artist: "Sean Roldan", cover: null, cat: "love" },
  { id: "venmegam", title: "Venmegam", artist: "Yuvanshankar Raja", cover: null, cat: "love" },
  { id: "pavazha-malli", title: "Pavazha Malli", artist: "Sai Abhyankkar", cover: null, cat: "love" },
  { id: "kanmoodi-thirakumbothu", title: "Kanmoodi Thirakumbothu", artist: "Devi Sri Prasad", cover: null, cat: "love" },
  { id: "sidu-sidu", title: "Sidu Sidu", artist: "Vijay Antony", cover: null, cat: "love" },
  { id: "annul-maelae", title: "Annul Maelae", artist: "Harris Jayaraj", cover: null, cat: "love" },
];

const FADE_DURATION = 300;
const FADE_STEPS = 15;
const STORAGE_KEY = "songapp-state";
const PLAYLISTS_KEY = "songapp-playlists";

const audio = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
const songCount = document.getElementById("songCount");
const searchInput = document.getElementById("searchInput");
const albumArt = document.getElementById("albumArt");
const albumArtWrapper = document.getElementById("albumArtWrapper");
const albumGlow = document.getElementById("albumGlow");
const albumRing = document.getElementById("albumRing");
const loadingSpinner = document.getElementById("loadingSpinner");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songInfo = document.getElementById("songInfo");
const progressFill = document.getElementById("progressFill");
const progressThumb = document.getElementById("progressThumb");
const progressTrack = document.getElementById("progressTrack");
const progressHover = document.getElementById("progressHover");
const progressTooltip = document.getElementById("progressTooltip");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const playIcon = document.getElementById("playIcon");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const btnShuffle = document.getElementById("btnShuffle");
const btnRepeat = document.getElementById("btnRepeat");
const repeatIcon = document.getElementById("repeatIcon");
const volumeFill = document.getElementById("volumeFill");
const volumeThumb = document.getElementById("volumeThumb");
const volumeTrack = document.getElementById("volumeTrack");
const volumePct = document.getElementById("volumePct");
const volumeTooltip = document.getElementById("volumeTooltip");
const btnMute = document.getElementById("btnMute");
const volumeIcon = document.getElementById("volumeIcon");
const toastContainer = document.getElementById("toastContainer");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const shortcutsModal = document.getElementById("shortcutsModal");
const shortcutsClose = document.getElementById("shortcutsClose");
const shortcutsBtn = document.getElementById("shortcutsBtn");
const contextMenu = document.getElementById("contextMenu");
const bgGlow = document.getElementById("bgGlow");
const nowPlayingBadge = document.getElementById("nowPlayingBadge");
const customPlaylistsEl = document.getElementById("customPlaylists");
const playlistsListEl = document.getElementById("playlistsList");
const playlistsDivider = document.getElementById("playlistsDivider");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistModal = document.getElementById("playlistModal");
const playlistModalTitle = document.getElementById("playlistModalTitle");
const playlistNameInput = document.getElementById("playlistNameInput");
const playlistModalConfirm = document.getElementById("playlistModalConfirm");
const playlistModalCancel = document.getElementById("playlistModalCancel");
const playlistModalClose = document.getElementById("playlistModalClose");
const addToPlaylistModal = document.getElementById("addToPlaylistModal");
const addToPlaylistBody = document.getElementById("addToPlaylistBody");
const addToPlaylistClose = document.getElementById("addToPlaylistClose");
const addToPlaylistBtn = document.getElementById("addToPlaylistBtn");
const removeFromPlaylistBtn = document.getElementById("removeFromPlaylistBtn");
const affiliateLinks = document.getElementById("affiliateLinks");
const affAmazon = document.getElementById("affAmazon");
const affApple = document.getElementById("affApple");

let currentIndex = -1;
let isPlaying = false;
let shuffle = false;
let repeat = 0;
let volume = 1;
let prevVolume = 1;
let searchQuery = "";
let activeCat = "all";
let rafId = null;
let loading = false;
let fading = false;
let fadeInterval = null;
let queue = [];
let contextSongId = null;
let fetchedCovers = {};
let coverFetchQueue = [];
let coverFetching = false;
let customPlaylists = [];
let activePlaylistId = null;
let playlistModalMode = "create";

const FALLBACK_COVERS = {
  "2000s-fast-beat": "https://picsum.photos/seed/ghilli/400",
  "chella-kutti": "https://picsum.photos/seed/theri/400",
  "yaar-indha-saalai-oram": "https://picsum.photos/seed/thalaivaa/400",
  "sivappu-manjal-pachai": "https://picsum.photos/seed/sivappu-manjal-pachai/400",
  "aaruyirae": "https://picsum.photos/seed/guru-2007/400",
  "thangapoovey": "https://picsum.photos/seed/thangapoovey/400",
  "marandhu-poche": "https://picsum.photos/seed/marandhu-poche/400",
  "venmegam": "https://picsum.photos/seed/venmegam/400",
  "pavazha-malli": "https://picsum.photos/seed/pavazha-malli/400",
  "kanmoodi-thirakumbothu": "https://picsum.photos/seed/kanmoodi-thirakumbothu/400",
  "sidu-sidu": "https://picsum.photos/seed/sidu-sidu/400",
  "annul-maelae": "https://picsum.photos/seed/annul-maelae/400",
};

let audioCtx = null;
let source = null;
let analyser = null;
let gainNode = null;
let visualizerRaf = null;
const visualizerCanvas = document.getElementById("visualizer");
const vizCtx = visualizerCanvas?.getContext("2d");

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentIndex, volume, prevVolume, shuffle, repeat, searchQuery, activeCat
    }));
  } catch (_) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (typeof s.volume === "number") { volume = s.volume; prevVolume = s.prevVolume ?? volume; }
    if (typeof s.shuffle === "boolean") shuffle = s.shuffle;
    if (typeof s.repeat === "number") repeat = s.repeat;
    if (typeof s.searchQuery === "string") { searchQuery = s.searchQuery; searchInput.value = searchQuery; }
    if (typeof s.activeCat === "string") activeCat = s.activeCat;
    if (typeof s.currentIndex === "number" && s.currentIndex >= 0 && s.currentIndex < SONGS.length)
      currentIndex = s.currentIndex;
    return true;
  } catch (_) { return false; }
}

// ===== PLAYLISTS =====
function savePlaylists() {
  try { localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(customPlaylists)); } catch (_) {}
}

function loadPlaylists() {
  try {
    const raw = localStorage.getItem(PLAYLISTS_KEY);
    if (raw) customPlaylists = JSON.parse(raw);
    if (!Array.isArray(customPlaylists)) customPlaylists = [];
  } catch (_) { customPlaylists = []; }
}

function generatePlaylistId() {
  return "pl_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
}

function createPlaylist(name) {
  const id = generatePlaylistId();
  customPlaylists.push({ id, name: name.trim(), songIds: [] });
  savePlaylists();
  renderCustomPlaylists();
  renderPlaylist();
  selectPlaylist(id);
  toast(`Playlist "${name}" created`);
}

function deletePlaylist(id) {
  const pl = customPlaylists.find(p => p.id === id);
  if (!pl) return;
  customPlaylists = customPlaylists.filter(p => p.id !== id);
  if (activePlaylistId === id) activePlaylistId = null;
  savePlaylists();
  renderCustomPlaylists();
  renderPlaylist();
  toast(`Playlist "${pl.name}" deleted`);
}

function selectPlaylist(id) {
  activePlaylistId = id;
  document.querySelectorAll(".custom-playlist-item").forEach(el => {
    el.classList.toggle("active", el.dataset.id === id);
  });
  renderPlaylist();
}

function getActivePlaylist() {
  return activePlaylistId ? customPlaylists.find(p => p.id === activePlaylistId) : null;
}

function addSongToPlaylist(playlistId, songId) {
  const pl = customPlaylists.find(p => p.id === playlistId);
  if (!pl) return;
  const song = SONGS.find(s => s.id === songId);
  if (!song) return;
  if (pl.songIds.includes(songId)) {
    toast(`"${song.title}" is already in "${pl.name}"`);
    return;
  }
  pl.songIds.push(songId);
  savePlaylists();
  renderCustomPlaylists();
  if (activePlaylistId === playlistId) renderPlaylist();
  toast(`Added "${song.title}" to "${pl.name}"`);
}

function removeSongFromPlaylist(playlistId, songId) {
  const pl = customPlaylists.find(p => p.id === playlistId);
  if (!pl) return;
  pl.songIds = pl.songIds.filter(id => id !== songId);
  savePlaylists();
  renderCustomPlaylists();
  renderPlaylist();
  toast(`Removed from "${pl.name}"`);
}

function renderCustomPlaylists() {
  const hasPlaylists = customPlaylists.length > 0;
  playlistsDivider.style.display = hasPlaylists ? "block" : "none";
  if (!hasPlaylists) { playlistsListEl.innerHTML = ""; return; }

  playlistsListEl.innerHTML = customPlaylists.map(pl => {
    const isActive = activePlaylistId === pl.id;
    return `
      <div class="custom-playlist-item ${isActive ? "active" : ""}" data-id="${pl.id}">
        <div class="pl-icon">♪</div>
        <div class="pl-info">
          <div class="pl-name">${pl.name}</div>
          <div class="pl-count">${pl.songIds.length} song${pl.songIds.length !== 1 ? "s" : ""}</div>
        </div>
        <button class="pl-delete" data-id="${pl.id}" aria-label="Delete playlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `;
  }).join("");

  playlistsListEl.querySelectorAll(".custom-playlist-item").forEach(el => {
    el.addEventListener("click", (e) => {
      if (e.target.closest(".pl-delete")) return;
      selectPlaylist(el.dataset.id);
    });
  });

  playlistsListEl.querySelectorAll(".pl-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const pl = customPlaylists.find(p => p.id === id);
      if (pl && confirm(`Delete playlist "${pl.name}"?`)) deletePlaylist(id);
    });
  });
}

// ===== COVER FETCHING =====
function loadCoverCache() {
  try {
    const raw = localStorage.getItem("songapp-covers-v2");
    if (raw) fetchedCovers = JSON.parse(raw);
  } catch (_) {
    fetchedCovers = {};
  }
}
function saveCoverCache() {
  try { localStorage.setItem("songapp-covers-v2", JSON.stringify(fetchedCovers)); } catch (_) {}
}

async function fetchCoverFromInternet(song) {
  if (fetchedCovers[song.id] === false) {
    if (FALLBACK_COVERS[song.id]) {
      fetchedCovers[song.id] = FALLBACK_COVERS[song.id];
      saveCoverCache();
      return FALLBACK_COVERS[song.id];
    }
    return null;
  }
  if (typeof fetchedCovers[song.id] === "string") return fetchedCovers[song.id];
  try {
    const query = encodeURIComponent(`${song.title} ${song.artist}`.replace(/&/g, "and"));
    const resp = await fetch(`https://itunes.apple.com/search?term=${query}&limit=1&media=music&entity=song`);
    const data = await resp.json();
    if (data.results?.length > 0 && data.results[0].artworkUrl100) {
      const url = data.results[0].artworkUrl100.replace("100x100bb", "400x400bb").replace("100x100", "400x400");
      fetchedCovers[song.id] = url;
      saveCoverCache();
      return url;
    }
  } catch (_) {}
  if (FALLBACK_COVERS[song.id]) {
    fetchedCovers[song.id] = FALLBACK_COVERS[song.id];
    saveCoverCache();
    return FALLBACK_COVERS[song.id];
  }
  fetchedCovers[song.id] = false;
  saveCoverCache();
  return null;
}

function getCoverSrc(song) {
  if (song.cover) return { src: `assets/covers/${song.cover}`, local: true };
  const cached = fetchedCovers[song.id];
  if (typeof cached === "string") return { src: cached, local: false };
  if (FALLBACK_COVERS[song.id]) return { src: FALLBACK_COVERS[song.id], local: false };
  return null;
}

function queueCoverFetch(song) {
  if (song.cover) return;
  if (typeof fetchedCovers[song.id] === "string") return;
  if (coverFetchQueue.some(s => s.id === song.id)) return;
  coverFetchQueue.push(song);
  processCoverQueue();
}

async function processCoverQueue() {
  if (coverFetching) return;
  coverFetching = true;
  while (coverFetchQueue.length > 0) {
    const song = coverFetchQueue.shift();
    const url = await fetchCoverFromInternet(song);
    if (url) {
      requestAnimationFrame(() => {
        const els = document.querySelectorAll(`.playlist-item[data-id="${song.id}"] .thumb img`);
        els.forEach(el => { el.src = url; el.style.opacity = "0"; requestAnimationFrame(() => el.style.opacity = "1"); });
        if (SONGS[currentIndex]?.id === song.id) {
          albumArt.innerHTML = `<img src="${url}" alt="${song.title}" />`;
        }
      });
    }
    await new Promise(r => setTimeout(r, 300));
  }
  coverFetching = false;
}

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getFilteredSongs() {
  let list = SONGS;
  const activePl = getActivePlaylist();
  if (activePl) list = list.filter(s => activePl.songIds.includes(s.id));
  if (activeCat !== "all") list = list.filter(s => s.cat === activeCat);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }
  return list;
}

function getNextIndex(from) {
  if (queue.length > 0) return queue.shift();
  const list = getFilteredSongs();
  if (list.length === 0) return -1;
  const currentPos = list.findIndex(s => s.id === SONGS[currentIndex]?.id);
  if (currentPos === -1) return SONGS.indexOf(list[0]);
  if (shuffle) {
    let candidates = list.filter((_, i) => i !== currentPos);
    if (candidates.length === 0) return currentPos;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    return SONGS.indexOf(pick);
  }
  const next = (currentPos + 1) % list.length;
  return SONGS.indexOf(list[next]);
}

function getPrevIndex(from) {
  const list = getFilteredSongs();
  if (list.length === 0) return -1;
  const currentPos = list.findIndex(s => s.id === SONGS[currentIndex]?.id);
  if (currentPos === -1) return SONGS.indexOf(list[0]);
  const prev = (currentPos - 1 + list.length) % list.length;
  return SONGS.indexOf(list[prev]);
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function showLoading() { loading = true; loadingSpinner.classList.add("show"); }
function hideLoading() { loading = false; loadingSpinner.classList.remove("show"); }

// ===== RIPPLE EFFECT =====
function handleRipple(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

document.querySelectorAll(".ripple").forEach(el => el.addEventListener("click", handleRipple));

// ===== RENDER =====
function renderPlaylist() {
  const list = getFilteredSongs();
  const activePl = getActivePlaylist();
  if (activePl) {
    songCount.textContent = `${list.length} of ${activePl.songIds.length} songs`;
  } else {
    songCount.textContent = `${list.length} of ${SONGS.length} songs`;
  }

  if (list.length === 0) {
    playlistEl.innerHTML = `<div class="empty-state">${activePl ? "This playlist is empty" : "No songs found"}</div>`;
    return;
  }

  playlistEl.innerHTML = list.map((song) => {
    const coverSrc = getCoverSrc(song);
    const cover = coverSrc
      ? `<img src="${coverSrc.src}" alt="${song.title}" loading="lazy" style="transition:opacity 0.3s" />`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16" opacity="0.4"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
    const isActive = SONGS.indexOf(song) === currentIndex;
    if (!coverSrc) queueCoverFetch(song);
    const bars = isActive && isPlaying
      ? `<div class="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>`
      : `<span style="font-size:0.7rem;color:var(--accent)">${isActive ? "♫" : ""}</span>`;
    const qIdx = queue.indexOf(SONGS.indexOf(song));
    const qBadge = qIdx >= 0 ? `<span class="queue-badge">${qIdx + 1}</span>` : "";
    return `
      <div class="playlist-item ${isActive ? "active" : ""}" data-id="${song.id}" draggable="true">
        <div class="thumb">
          ${cover}
          <div class="thumb-overlay">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="info">
          <div class="name">${song.title}</div>
          <div class="artist">${song.artist}</div>
        </div>
        <div class="playing-indicator" style="position:relative">${qBadge}${bars}</div>
      </div>
    `;
  }).join("");

  playlistEl.querySelectorAll(".playlist-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = SONGS.findIndex(s => s.id === el.dataset.id);
      if (idx >= 0) songPick(idx);
    });
    el.addEventListener("contextmenu", (e) => showContextMenu(e, el.dataset.id));
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("drop", handleDrop);
    el.addEventListener("dragend", handleDragEnd);
  });
}

const emptyStateStyle = document.createElement("style");
emptyStateStyle.textContent = `.empty-state { padding: 32px 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem; }`;
document.head.appendChild(emptyStateStyle);

// ===== SONG SELECTION =====
function selectSong(index) {
  if (index < 0 || index >= SONGS.length) return;
  if (index === currentIndex && isPlaying) return;
  currentIndex = index;
  const song = SONGS[index];

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songTitle.classList.remove("slide-in");
  void songTitle.offsetWidth;
  songTitle.classList.add("slide-in");
  songArtist.style.animation = "none";
  void songArtist.offsetWidth;
  songArtist.style.animation = "";

  const coverSrc = getCoverSrc(song);
  if (coverSrc) {
    albumArt.innerHTML = `<img src="${coverSrc.src}" alt="${song.title}" />`;
  } else {
    albumArt.innerHTML = `<div class="album-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg></div>`;
    queueCoverFetch(song);
  }

  const query = encodeURIComponent(`${song.title} ${song.artist}`);
  affAmazon.href = `https://www.amazon.com/s?k=${query}&tag=YOUR-AMAZON-TAG-20`;
  affApple.href = `https://music.apple.com/search?term=${query}`;
  affiliateLinks.classList.add("show");

  audio.src = `assets/audio/${song.id}.mp3`;
  audio.load();
  resetProgress();
  renderPlaylist();
  saveState();
}

function songPick(index) {
  const wasPlaying = isPlaying;
  selectSong(index);
  if (wasPlaying) play();
}

function resetProgress() {
  progressFill.style.width = "0%";
  progressThumb.style.left = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
}

// ===== QUEUE =====
function addToQueue(index) {
  if (index < 0 || index === currentIndex) return;
  queue.push(index);
  renderPlaylist();
  updateQueueBadge();
  toast(`Added "${SONGS[index].title}" to queue`);
}

function playNext(index) {
  if (index < 0 || index === currentIndex) return;
  queue.unshift(index);
  renderPlaylist();
  updateQueueBadge();
  toast(`"${SONGS[index].title}" will play next`);
}

function updateQueueBadge() {
  if (queue.length > 0) {
    nowPlayingBadge.textContent = `${queue.length} in queue`;
    nowPlayingBadge.classList.add("show");
  } else {
    nowPlayingBadge.classList.remove("show");
  }
}

// ===== AUDIO CONTEXT =====
function setupAudioContext() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 128;
  gainNode = audioCtx.createGain();
  gainNode.gain.value = volume;
  source.connect(analyser);
  analyser.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  audio.volume = 1;
}

function startVisualizer() {
  if (!analyser || !vizCtx) return;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    if (!isPlaying || !analyser) { visualizerRaf = null; return; }
    visualizerRaf = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    const w = visualizerCanvas.width;
    const h = visualizerCanvas.height;
    vizCtx.clearRect(0, 0, w, h);
    const barCount = Math.min(bufferLength, 48);
    const gap = 2;
    const barW = (w - (barCount - 1) * gap) / barCount;
    const halfH = h / 2;
    for (let i = 0; i < barCount; i++) {
      const val = dataArray[i] / 255;
      const barH = Math.max(1.5, val * h * 0.85);
      const x = i * (barW + gap);
      const y = halfH - barH / 2;
      const r = Math.round(30 + val * 215);
      const g = Math.round(215);
      const b = Math.round(96 - val * 96);
      vizCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.2 + val * 0.6})`;
      vizCtx.beginPath();
      const rad = Math.min(2, barW / 2);
      vizCtx.moveTo(x + rad, y);
      vizCtx.lineTo(x + barW - rad, y);
      vizCtx.quadraticCurveTo(x + barW, y, x + barW, y + rad);
      vizCtx.lineTo(x + barW, y + barH - rad);
      vizCtx.quadraticCurveTo(x + barW, y + barH, x + barW - rad, y + barH);
      vizCtx.lineTo(x + rad, y + barH);
      vizCtx.quadraticCurveTo(x, y + barH, x, y + barH - rad);
      vizCtx.lineTo(x, y + rad);
      vizCtx.quadraticCurveTo(x, y, x + rad, y);
      vizCtx.closePath();
      vizCtx.fill();
    }
  }
  draw();
}

function stopVisualizer() {
  if (visualizerRaf) { cancelAnimationFrame(visualizerRaf); visualizerRaf = null; }
  if (vizCtx) vizCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
}

function resizeVisualizer() {
  if (!visualizerCanvas) return;
  const rect = visualizerCanvas.getBoundingClientRect();
  visualizerCanvas.width = rect.width * (window.devicePixelRatio || 1);
  visualizerCanvas.height = rect.height * (window.devicePixelRatio || 1);
  vizCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
}

// ===== PLAYBACK =====
function play() {
  if (currentIndex < 0) { selectSong(0); }
  if (!audio.src) return;
  isPlaying = true;
  albumArt.classList.add("playing");
  albumGlow.classList.add("show");
  albumRing.classList.add("show");
  btnPlay.classList.add("playing");
  hideLoading();
  audio.play().catch(() => {
    isPlaying = false;
    albumArt.classList.remove("playing");
    albumGlow.classList.remove("show");
    albumRing.classList.remove("show");
    btnPlay.classList.remove("playing");
    updatePlayButton();
    renderPlaylist();
    toast("Could not play this song");
  });
  updatePlayButton();
  renderPlaylist();
  rafId = requestAnimationFrame(updateProgress);
  startVisualizer();
}

function pause() {
  isPlaying = false;
  albumArt.classList.remove("playing");
  albumGlow.classList.remove("show");
  albumRing.classList.remove("show");
  btnPlay.classList.remove("playing");
  audio.pause();
  updatePlayButton();
  renderPlaylist();
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  stopVisualizer();
}

function togglePlay() {
  if (currentIndex < 0) { selectSong(0); }
  if (isPlaying) { pause(); } else {
    if (!audioCtx) setupAudioContext();
    if (audioCtx?.state === "suspended") audioCtx.resume();
    play();
  }
}

function fadeOut(cb) {
  if (!gainNode || !isPlaying) { cb(); return; }
  fading = true;
  const startVal = gainNode.gain.value;
  let step = 0;
  if (fadeInterval) clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    step++;
    gainNode.gain.value = startVal * (1 - step / FADE_STEPS);
    if (step >= FADE_STEPS) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      fading = false;
      cb();
    }
  }, FADE_DURATION / FADE_STEPS);
}

function fadeIn() {
  if (!gainNode) return;
  fading = true;
  const target = volume;
  let step = 0;
  if (fadeInterval) clearInterval(fadeInterval);
  gainNode.gain.value = 0;
  fadeInterval = setInterval(() => {
    step++;
    gainNode.gain.value = target * (step / FADE_STEPS);
    if (step >= FADE_STEPS) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      fading = false;
    }
  }, FADE_DURATION / FADE_STEPS);
}

function cancelFade() {
  if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
  fading = false;
}

function next() {
  cancelFade();
  const idx = getNextIndex(currentIndex);
  if (idx < 0) return;
  if (gainNode && isPlaying) {
    fadeOut(() => {
      selectSong(idx);
      gainNode.gain.value = 0;
      play();
      fadeIn();
    });
  } else {
    selectSong(idx);
    if (isPlaying) play();
  }
  updateQueueBadge();
}

function prev() {
  if (audio.currentTime > 3 && isPlaying && currentIndex >= 0) {
    if (gainNode) {
      fadeOut(() => {
        audio.currentTime = 0;
        gainNode.gain.value = 0;
        play();
        fadeIn();
      });
    } else {
      audio.currentTime = 0;
    }
    return;
  }
  cancelFade();
  const idx = getPrevIndex(currentIndex);
  if (idx < 0) return;
  if (gainNode && isPlaying) {
    fadeOut(() => {
      selectSong(idx);
      gainNode.gain.value = 0;
      play();
      fadeIn();
    });
  } else {
    selectSong(idx);
    if (isPlaying) play();
  }
}

// ===== PROGRESS =====
function updateProgress() {
  if (!audio.duration || !isPlaying) {
    rafId = requestAnimationFrame(updateProgress);
    return;
  }
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${pct}%`;
  progressThumb.style.left = `${pct}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  rafId = requestAnimationFrame(updateProgress);
}

function setProgress(e) {
  const rect = progressTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
}

function handleProgressHover(e) {
  const rect = progressTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  progressHover.style.width = `${pct * 100}%`;
  progressTooltip.textContent = formatTime(pct * (audio.duration || 0));
  progressTooltip.style.left = `${e.clientX - rect.left}px`;
}

// ===== VOLUME =====
function setVolume(e) {
  if (fading) cancelFade();
  const rect = volumeTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  volume = pct;
  if (gainNode) gainNode.gain.value = volume;
  audio.volume = volume;
  volumeFill.style.width = `${volume * 100}%`;
  volumeThumb.style.left = `${volume * 100}%`;
  volumePct.textContent = `${Math.round(volume * 100)}%`;
  volumeTooltip.textContent = `${Math.round(volume * 100)}%`;
  updateVolumeIcon();
  saveState();
}

function toggleMute() {
  if (audio.volume > 0) {
    prevVolume = audio.volume;
    audio.volume = 0;
    if (gainNode) gainNode.gain.value = 0;
    volumeFill.style.width = "0%";
    volumeThumb.style.left = "0%";
    volumePct.textContent = "0%";
    volumeTooltip.textContent = "0%";
  } else {
    const restored = prevVolume || 0.5;
    audio.volume = restored;
    if (gainNode) gainNode.gain.value = restored;
    volumeFill.style.width = `${restored * 100}%`;
    volumeThumb.style.left = `${restored * 100}%`;
    volumePct.textContent = `${Math.round(restored * 100)}%`;
    volumeTooltip.textContent = `${Math.round(restored * 100)}%`;
  }
  updateVolumeIcon();
  saveState();
}

function updateVolumeIcon() {
  if (audio.volume === 0) {
    volumeIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
  } else if (audio.volume < 0.5) {
    volumeIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>`;
  } else {
    volumeIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>`;
  }
}

function updatePlayButton() {
  playIcon.innerHTML = isPlaying
    ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
    : '<path d="M8 5v14l11-7z"/>';
}

// ===== SHUFFLE / REPEAT =====
function toggleShuffle() {
  shuffle = !shuffle;
  btnShuffle.classList.toggle("active", shuffle);
  toast(shuffle ? "Shuffle On" : "Shuffle Off");
  saveState();
}

function toggleRepeat() {
  repeat = (repeat + 1) % 3;
  const labels = ["Repeat Off", "Repeat All", "Repeat One"];
  btnRepeat.classList.toggle("active", repeat > 0);
  if (repeat === 1) {
    repeatIcon.innerHTML = `<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>`;
  } else if (repeat === 2) {
    repeatIcon.innerHTML = `<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="12" y="17" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">1</text>`;
  } else {
    repeatIcon.innerHTML = `<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>`;
  }
  toast(labels[repeat]);
  saveState();
}

// ===== SIDEBAR =====
function openSidebar() { sidebar.classList.add("open"); sidebarOverlay.classList.add("show"); }
function closeSidebar() { sidebar.classList.remove("open"); sidebarOverlay.classList.remove("show"); }

// ===== TOUCH SWIPE =====
let touchStartX = 0;
let touchStartY = 0;
function handleTouchStart(e) { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }
function handleTouchEnd(e) {
  const diffX = e.changedTouches[0].clientX - touchStartX;
  const diffY = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) prev();
    else next();
  }
}

// ===== DRAG REORDER =====
let dragSrcId = null;
function handleDragStart(e) {
  dragSrcId = e.currentTarget.dataset.id;
  e.currentTarget.style.opacity = "0.4";
}
function handleDragOver(e) { e.preventDefault(); e.currentTarget.style.transform = "scale(1.02)"; }
function handleDrop(e) {
  e.preventDefault();
  const srcIdx = SONGS.findIndex(s => s.id === dragSrcId);
  const tgtIdx = SONGS.findIndex(s => s.id === e.currentTarget.dataset.id);
  if (srcIdx >= 0 && tgtIdx >= 0 && srcIdx !== tgtIdx) {
    const currentSongId = SONGS[currentIndex]?.id;
    const [removed] = SONGS.splice(srcIdx, 1);
    const insertAt = srcIdx < tgtIdx ? tgtIdx - 1 : tgtIdx;
    SONGS.splice(insertAt, 0, removed);
    currentIndex = SONGS.findIndex(s => s.id === currentSongId);
    renderPlaylist();
    saveState();
    toast("Playlist reordered");
  }
  e.currentTarget.style.transform = "";
}
function handleDragEnd(e) { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }

// ===== CONTEXT MENU =====
function showContextMenu(e, songId) {
  e.preventDefault();
  contextSongId = songId;
  const activePl = getActivePlaylist();
  removeFromPlaylistBtn.style.display = activePl ? "flex" : "none";
  contextMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 200)}px`;
  contextMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 160)}px`;
  contextMenu.classList.add("show");
}

function hideContextMenu() { contextMenu.classList.remove("show"); }

function showAddToPlaylistPicker() {
  hideContextMenu();
  if (customPlaylists.length === 0) {
    toast("No playlists yet. Create one first!");
    return;
  }
  addToPlaylistBody.innerHTML = customPlaylists.map(pl => {
    const song = SONGS.find(s => s.id === contextSongId);
    const hasSong = pl.songIds.includes(contextSongId);
    return `
      <div class="playlist-picker-item ${hasSong ? "active" : ""}" data-playlist-id="${pl.id}">
        <div class="pl-picker-icon">♪</div>
        <span>${pl.name} ${hasSong ? "✓" : ""}</span>
      </div>
    `;
  }).join("");
  addToPlaylistBody.querySelectorAll(".playlist-picker-item").forEach(el => {
    el.addEventListener("click", () => {
      addSongToPlaylist(el.dataset.playlistId, contextSongId);
      addToPlaylistModal.classList.remove("show");
    });
  });
  addToPlaylistModal.classList.add("show");
}

// ===== SHORTCUTS MODAL =====
function toggleShortcuts(show) {
  shortcutsModal.classList.toggle("show", show ?? !shortcutsModal.classList.contains("show"));
}

// ===== BACKGROUND GLOW FOLLOW =====
function handleMouseMove(e) {
  if (!isPlaying) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  bgGlow.style.left = `${x}%`;
  bgGlow.style.top = `${y}%`;
}

// ===== INIT =====
function init() {
  loadState();
  document.querySelectorAll(".playlist-tab").forEach(b => {
    b.classList.toggle("active", b.dataset.cat === activeCat);
  });
  loadCoverCache();
  loadPlaylists();
  renderCustomPlaylists();
  renderPlaylist();
  selectSong(currentIndex >= 0 ? currentIndex : 0);

  volumeFill.style.width = `${volume * 100}%`;
  volumeThumb.style.left = `${volume * 100}%`;
  volumePct.textContent = `${Math.round(volume * 100)}%`;
  volumeTooltip.textContent = `${Math.round(volume * 100)}%`;
  audio.volume = volume;
  if (shuffle) btnShuffle.classList.add("active");
  if (repeat > 0) {
    btnRepeat.classList.add("active");
    if (repeat === 2) {
      repeatIcon.innerHTML = `<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="12" y="17" font-size="10" font-weight="bold" fill="currentColor" text-anchor="middle">1</text>`;
    }
  }
  updateVolumeIcon();
  SONGS.forEach(s => queueCoverFetch(s));

  btnPlay.addEventListener("click", togglePlay);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  progressTrack.addEventListener("click", setProgress);
  progressTrack.addEventListener("mousemove", handleProgressHover);
  progressTrack.addEventListener("mouseleave", () => { progressHover.style.width = "0%"; progressTooltip.style.opacity = "0"; });

  let dragging = false;
  progressThumb.addEventListener("mousedown", (e) => { e.stopPropagation(); dragging = true; });
  document.addEventListener("mousemove", (e) => { if (dragging) setProgress(e); });
  document.addEventListener("mouseup", () => { dragging = false; });

  volumeTrack.addEventListener("click", setVolume);
  btnMute.addEventListener("click", toggleMute);
  volumeTrack.addEventListener("mousemove", (e) => {
    const rect = volumeTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    volumeTooltip.textContent = `${Math.round(pct)}%`;
    volumeTooltip.style.left = `${e.clientX - rect.left}px`;
    volumeTooltip.classList.add("show");
  });
  volumeTrack.addEventListener("mouseleave", () => volumeTooltip.classList.remove("show"));

  let volDragging = false;
  volumeThumb.addEventListener("mousedown", (e) => { e.stopPropagation(); volDragging = true; });
  document.addEventListener("mousemove", (e) => { if (volDragging) setVolume(e); });
  document.addEventListener("mouseup", () => { volDragging = false; });

  btnShuffle.addEventListener("click", toggleShuffle);
  btnRepeat.addEventListener("click", toggleRepeat);

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    renderPlaylist();
    saveState();
  });

  document.querySelectorAll(".playlist-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".playlist-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.dataset.cat;
      if (activePlaylistId) {
        activePlaylistId = null;
        renderCustomPlaylists();
      }
      renderPlaylist();
      saveState();
    });
  });

  audio.addEventListener("loadstart", showLoading);
  audio.addEventListener("canplay", hideLoading);
  audio.addEventListener("waiting", showLoading);
  audio.addEventListener("playing", hideLoading);
  audio.addEventListener("loadedmetadata", () => { totalTimeEl.textContent = formatTime(audio.duration); });
  audio.addEventListener("ended", () => {
    if (repeat === 2) { audio.currentTime = 0; play(); }
    else {
      cancelFade();
      const idx = getNextIndex(currentIndex);
      if (idx < 0) return;
      if (gainNode) {
        gainNode.gain.value = 0;
        selectSong(idx);
        play();
        fadeIn();
      } else {
        selectSong(idx);
        play();
      }
      updateQueueBadge();
    }
  });
  audio.addEventListener("play", () => { isPlaying = true; updatePlayButton(); renderPlaylist(); });
  audio.addEventListener("pause", () => { isPlaying = false; updatePlayButton(); renderPlaylist(); });
  audio.addEventListener("error", () => {
    hideLoading();
    if (isPlaying) { isPlaying = false; updatePlayButton(); renderPlaylist(); toast("Error loading audio"); }
  });

  sidebarToggle.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  albumArtWrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
  albumArtWrapper.addEventListener("touchend", handleTouchEnd, { passive: true });

  resizeVisualizer();
  window.addEventListener("resize", resizeVisualizer);

  shortcutsBtn.addEventListener("click", () => toggleShortcuts());
  shortcutsClose.addEventListener("click", () => toggleShortcuts(false));
  shortcutsModal.addEventListener("click", (e) => { if (e.target === shortcutsModal) toggleShortcuts(false); });

  contextMenu.addEventListener("click", (e) => {
    const item = e.target.closest(".context-item, #addToPlaylistBtn");
    if (!item) return;
    const idx = SONGS.findIndex(s => s.id === contextSongId);
    if (idx < 0) return;
    if (item.id === "addToPlaylistBtn") { showAddToPlaylistPicker(); return; }
    if (item.id === "removeFromPlaylistBtn") {
      const pl = getActivePlaylist();
      if (pl) removeSongFromPlaylist(pl.id, contextSongId);
      hideContextMenu();
      return;
    }
    const action = item.dataset.action;
    if (action === "play-now") songPick(idx);
    else if (action === "play-next") playNext(idx);
    else if (action === "add-queue") addToQueue(idx);
    hideContextMenu();
  });
  document.addEventListener("click", hideContextMenu);
  document.addEventListener("contextmenu", hideContextMenu);

  document.addEventListener("mousemove", handleMouseMove);

  // ===== PLAYLIST EVENTS =====
  function openPlaylistModal(mode, existingName) {
    playlistModalMode = mode;
    if (mode === "create") {
      playlistModalTitle.textContent = "New Playlist";
      playlistModalConfirm.textContent = "Create";
    }
    playlistNameInput.value = existingName || "";
    playlistNameInput.focus();
    playlistModal.classList.add("show");
  }

  function closePlaylistModal() {
    playlistModal.classList.remove("show");
    playlistNameInput.value = "";
  }

  function handlePlaylistConfirm() {
    const name = playlistNameInput.value.trim();
    if (!name) { toast("Please enter a name"); return; }
    if (playlistModalMode === "create") createPlaylist(name);
    closePlaylistModal();
  }

  createPlaylistBtn.addEventListener("click", () => openPlaylistModal("create"));
  playlistModalConfirm.addEventListener("click", handlePlaylistConfirm);
  playlistModalCancel.addEventListener("click", closePlaylistModal);
  playlistModalClose.addEventListener("click", closePlaylistModal);
  playlistModal.addEventListener("click", (e) => { if (e.target === playlistModal) closePlaylistModal(); });
  playlistNameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handlePlaylistConfirm(); if (e.key === "Escape") closePlaylistModal(); });

  addToPlaylistClose.addEventListener("click", () => addToPlaylistModal.classList.remove("show"));
  addToPlaylistModal.addEventListener("click", (e) => { if (e.target === addToPlaylistModal) addToPlaylistModal.classList.remove("show"); });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") { e.preventDefault(); togglePlay(); }
    if (e.code === "ArrowRight") { next(); }
    if (e.code === "ArrowLeft") { prev(); }
    if (e.code === "KeyS") { toggleShuffle(); }
    if (e.code === "KeyR") { toggleRepeat(); }
    if (e.code === "KeyM") { toggleMute(); }
    if (e.code === "Slash" && e.shiftKey) { e.preventDefault(); toggleShortcuts(); }
    if (e.code === "KeyH") { toggleShortcuts(); }
    if (e.code === "Escape") {
      toggleShortcuts(false);
      closePlaylistModal();
      addToPlaylistModal.classList.remove("show");
    }
  });
}

window.addEventListener("DOMContentLoaded", init);
