const SONGS = [
  { id: "kacheri", title: "Kacheri", artist: "Anirudh Ravichander", cover: "assets/covers/kacheri.jpg" },
  { id: "maduraikku", title: "Maduraikku", artist: "Vijay Antony", cover: "assets/covers/maduraikku.jpg" },
  { id: "oru-pere", title: "Oru Pere", artist: "Anirudh Ravichander", cover: "assets/covers/oru-pere.jpg" },
  { id: "raavana", title: "Raavana Mavanda", artist: "Anirudh Ravichander", cover: "assets/covers/raavana.jpg" },
  { id: "2000s-fast-beat", title: "2000s Fast Beat", artist: "Various Artists", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80" },
  { id: "otha-sollaala", title: "Otha Sollaala", artist: "Vijay Antony", cover: "assets/covers/otha-sollaala.jpg" },
  { id: "chella-kutti", title: "Chella Kutti", artist: "Anirudh Ravichander", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&q=80" },
  { id: "yaar-indha-saalai-oram", title: "Yaar Indha Saalai Oram", artist: "Vijay Antony", cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=500&q=80" },
  { id: "en-kannu-kulla", title: "En Kannu Kulla", artist: "Vijay Antony", cover: "assets/covers/en-kannu-kulla.jpg" },
  { id: "sirukki-vaasam", title: "Sirukki Vaasam", artist: "Anirudh Ravichander", cover: "assets/covers/sirukki-vaasam.jpg" },
  { id: "sivappu-manjal-pachai", title: "Sivappu Manjal Pachai", artist: "Santhosh Narayanan", cover: "https://images.unsplash.com/photo-1514525253344-f814d0746b55?w=500&q=80" },
  { id: "aaruyirae", title: "Aaruyirae", artist: "A.R. Rahman", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80" },
  { id: "thangapoovey", title: "Thangapoovey", artist: "Anirudh Ravichander", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80" },
  { id: "marandhu-poche", title: "Marandhu Poche", artist: "Sean Roldan", cover: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=500&q=80" },
  { id: "venmegam", title: "Venmegam", artist: "Yuvanshankar Raja", cover: "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=500&q=80" },
  { id: "pavazha-malli", title: "Pavazha Malli", artist: "Sai Abhyankkar", cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&q=80" },
  { id: "kanmoodi-thirakumbothu", title: "Kanmoodi Thirakumbothu", artist: "Devi Sri Prasad", cover: "https://images.unsplash.com/photo-1501612722-794014848490?w=500&q=80" },
  { id: "sidu-sidu", title: "Sidu Sidu", artist: "Vijay Antony", cover: "https://images.unsplash.com/photo-1420161907993-e298aa95a479?w=500&q=80" },
  { id: "annul-maelae", title: "Annul Maelae", artist: "Harris Jayaraj", cover: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=500&q=80" },
];

const audio = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
const songCount = document.getElementById("songCount");
const searchInput = document.getElementById("searchInput");

const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const miniArt = document.getElementById("miniArt");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const btnPlay = document.getElementById("btnPlay");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const volumeFill = document.getElementById("volumeFill");
const volumeTrack = document.getElementById("volumeTrack");

let currentIndex = -1;
let isPlaying = false;
let volume = 1;
let searchQuery = "";

function formatTime(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getFilteredSongs() {
  let list = SONGS;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }
  return list;
}

function renderPlaylist() {
  const list = getFilteredSongs();
  songCount.textContent = `${list.length} of ${SONGS.length} songs`;

  if (list.length === 0) {
    playlistEl.innerHTML = "<div class='empty' style='padding: 20px; color: #b3b3b3;'>No songs found</div>";
    return;
  }

  playlistEl.innerHTML = list.map(song => {
    const coverSrc = song.cover;
    const cover = coverSrc
      ? `<img src="${coverSrc}" alt="${song.title}" loading="lazy" />`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20" opacity="0.4"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
    const isActive = SONGS.indexOf(song) === currentIndex;
    return `
      <div class="playlist-item ${isActive ? "active" : ""}" data-id="${song.id}">
        <div class="thumb">${cover}</div>
        <div class="info">
          <div class="name">${song.title}</div>
          <div class="artist">${song.artist}</div>
        </div>
      </div>
    `;
  }).join("");

  playlistEl.querySelectorAll(".playlist-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = SONGS.findIndex(s => s.id === el.dataset.id);
      if (idx >= 0) songPick(idx);
    });
  });
}

function selectSong(index) {
  if (index < 0 || index >= SONGS.length) return;
  currentIndex = index;
  const song = SONGS[index];

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  miniTitle.textContent = song.title;
  miniArtist.textContent = song.artist;

  const coverSrc = song.cover;
  if (coverSrc) {
    albumArt.innerHTML = `<img src="${coverSrc}" alt="${song.title}" />`;
    miniArt.innerHTML = `<img src="${coverSrc}" alt="${song.title}" />`;
  } else {
    const placeholder = `<div class="album-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg></div>`;
    albumArt.innerHTML = placeholder;
    miniArt.innerHTML = placeholder;
  }

  audio.src = `assets/audio/${song.id}.mp3`;
  audio.load();
  progressFill.style.width = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";
  renderPlaylist();

  const amazonBtn = document.getElementById("amazonLink");
  if (amazonBtn) {
    amazonBtn.href = "https://www.amazon.com/gp/search?ie=UTF8&tag=musicplayer0a-20&keywords=" + encodeURIComponent(song.title + " " + song.artist);
    amazonBtn.style.display = "inline-flex";
  }
}

function songPick(index) {
  const wasPlaying = isPlaying;
  selectSong(index);
  if (wasPlaying) play();
}

function play() {
  if (currentIndex < 0) { selectSong(0); }
  if (!audio.src) return;
  isPlaying = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
  audio.play().catch(() => {
    isPlaying = false;
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  });
}

function pause() {
  isPlaying = false;
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
  audio.pause();
}

function togglePlay() {
  if (currentIndex < 0) { selectSong(0); }
  if (isPlaying) { pause(); } else { play(); }
}

function next() {
  const list = getFilteredSongs();
  if (list.length === 0) return;
  const currentPos = list.findIndex(s => s.id === SONGS[currentIndex]?.id);
  if (currentPos === -1) { selectSong(SONGS.indexOf(list[0])); play(); return; }
  const nextIdx = (currentPos + 1) % list.length;
  selectSong(SONGS.indexOf(list[nextIdx]));
  if (isPlaying) play();
}

function prev() {
  if (audio.currentTime > 3 && isPlaying) {
    audio.currentTime = 0;
    return;
  }
  const list = getFilteredSongs();
  if (list.length === 0) return;
  const currentPos = list.findIndex(s => s.id === SONGS[currentIndex]?.id);
  if (currentPos === -1) { selectSong(SONGS.indexOf(list[0])); play(); return; }
  const prevIdx = (currentPos - 1 + list.length) % list.length;
  selectSong(SONGS.indexOf(list[prevIdx]));
  if (isPlaying) play();
}

function setProgress(e) {
  const rect = progressTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
}

function setVolume(e) {
  const rect = volumeTrack.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  volume = pct;
  audio.volume = volume;
  volumeFill.style.width = `${volume * 100}%`;
}

function init() {
  renderPlaylist();
  selectSong(0);
  volumeFill.style.width = "100%";
  audio.volume = 1;

  btnPlay.addEventListener("click", togglePlay);
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);

  progressTrack.addEventListener("click", setProgress);
  volumeTrack.addEventListener("click", setVolume);

  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    renderPlaylist();
  });

  audio.addEventListener("loadedmetadata", () => { totalTimeEl.textContent = formatTime(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${pct}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener("ended", next);
  audio.addEventListener("play", () => { 
    isPlaying = true; 
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  });
  audio.addEventListener("pause", () => { 
    isPlaying = false; 
    playIcon.style.display = "block"; 
    pauseIcon.style.display = "none";
  });
}

window.addEventListener("DOMContentLoaded", init);
