// Lista das músicas do YouTube
const tracks = [
  { id: "lM4v4sq8ypo", name: "Supersonic" },
  { id: "356OilwxvcY", name: "Vai Vai Trair" }
];

let currentTrackIndex = 0;
let player;

// Inicializa o player do YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytPlayer", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  updateMusicInfo();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  }
}

// Controles
function playPause() {
  if (!player) return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
    player.playVideo();
    document.getElementById("playPause").textContent = "⏸️";
  } else {
    player.pauseVideo();
    document.getElementById("playPause").textContent = "▶️";
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadCurrentTrack();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadCurrentTrack();
}

function loadCurrentTrack() {
  const track = tracks[currentTrackIndex];
  player.loadVideoById(track.id);
  updateMusicInfo();
}

function updateMusicInfo() {
  const track = tracks[currentTrackIndex];
  document.getElementById("music-info").textContent = `🎧 Tocando agora: ${track.name}`;
}

// Eventos
document.getElementById("playPause").addEventListener("click", playPause);
document.getElementById("next").addEventListener("click", nextTrack);
document.getElementById("prev").addEventListener("click", prevTrack);