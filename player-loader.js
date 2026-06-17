(function () {
  if (document.getElementById('rmtz-player')) return; // evita duplicatas

  /* ── CSS ── */
  var css = `
#rmtz-player,#rmtz-player *{box-sizing:border-box;margin:0;padding:0}
#rmtz-player{position:fixed;bottom:24px;right:24px;z-index:99999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}
#rmtz-pill{display:flex;align-items:center;gap:10px;background:#111;border:1px solid rgba(255,255,255,.08);border-radius:50px;padding:8px 16px 8px 8px;cursor:pointer;box-shadow:0 8px 32px rgba(0,0,0,.5);transition:transform .2s ease,box-shadow .2s ease;user-select:none}
#rmtz-pill:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.6)}
#rmtz-player .rmtz-pill-logo{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#1e7b34,#2da64a);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
#rmtz-player .rmtz-pill-logo svg{width:18px;height:18px;fill:#fff}
#rmtz-player .rmtz-pill-info{display:flex;flex-direction:column;line-height:1.2}
#rmtz-player .rmtz-pill-name{font-size:12px;font-weight:600;color:#fff;letter-spacing:.3px}
#rmtz-player .rmtz-pill-sub{font-size:10px;color:rgba(255,255,255,.45);letter-spacing:.2px}
#rmtz-player .rmtz-live-dot{width:6px;height:6px;border-radius:50%;background:#e53e3e;flex-shrink:0;animation:rmtz-pulse 1.8s ease-in-out infinite}
@keyframes rmtz-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
#rmtz-card{position:absolute;bottom:calc(100% + 12px);right:0;width:280px;background:#111;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.7);transform-origin:bottom right;transform:scale(.85) translateY(8px);opacity:0;pointer-events:none;transition:transform .25s cubic-bezier(.34,1.56,.64,1),opacity .2s ease}
#rmtz-card.rmtz-open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
#rmtz-player .rmtz-card-header{background:linear-gradient(135deg,#1a4a28,#0f2e18);padding:20px;display:flex;align-items:center;gap:12px;position:relative;overflow:hidden}
#rmtz-player .rmtz-card-header::before{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.04)}
#rmtz-player .rmtz-card-header::after{content:'';position:absolute;bottom:-20px;left:40px;width:70px;height:70px;border-radius:50%;background:rgba(255,255,255,.03)}
#rmtz-player .rmtz-card-logo{width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid rgba(255,255,255,.1);overflow:hidden}
#rmtz-player .rmtz-card-logo svg{width:24px;height:24px;fill:rgba(255,255,255,.8)}
#rmtz-player .rmtz-card-title{flex:1;z-index:1}
#rmtz-player .rmtz-card-title h3{font-size:15px;font-weight:700;color:#fff;letter-spacing:-.2px;line-height:1.2}
#rmtz-player .rmtz-card-title p{font-size:11px;color:rgba(255,255,255,.5);margin-top:2px}
#rmtz-player .rmtz-badge{display:inline-flex;align-items:center;gap:5px;background:#e53e3e;color:#fff;font-size:9px;font-weight:700;letter-spacing:.8px;padding:3px 7px;border-radius:4px;z-index:1;flex-shrink:0}
#rmtz-player .rmtz-badge .dot{width:5px;height:5px;border-radius:50%;background:#fff;animation:rmtz-pulse 1.8s ease-in-out infinite}
#rmtz-btn-close{position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.08);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);transition:background .15s ease,color .15s ease;z-index:2;line-height:1}
#rmtz-btn-close:hover{background:rgba(255,255,255,.15);color:#fff}
#rmtz-btn-close svg{width:10px;height:10px;fill:currentColor}
#rmtz-player .rmtz-waveform{display:flex;align-items:center;justify-content:center;gap:3px;height:40px;padding:0 20px;background:#0d0d0d}
#rmtz-player .rmtz-bar{width:3px;border-radius:2px;background:linear-gradient(180deg,#2da64a,#1e7b34);height:4px;opacity:.3;animation:rmtz-wave 1.2s ease-in-out infinite paused}
#rmtz-player .rmtz-bar:nth-child(1){animation-delay:0s}#rmtz-player .rmtz-bar:nth-child(2){animation-delay:.1s}#rmtz-player .rmtz-bar:nth-child(3){animation-delay:.2s}#rmtz-player .rmtz-bar:nth-child(4){animation-delay:.3s}#rmtz-player .rmtz-bar:nth-child(5){animation-delay:.4s}#rmtz-player .rmtz-bar:nth-child(6){animation-delay:.3s}#rmtz-player .rmtz-bar:nth-child(7){animation-delay:.2s}#rmtz-player .rmtz-bar:nth-child(8){animation-delay:.1s}#rmtz-player .rmtz-bar:nth-child(9){animation-delay:0s}#rmtz-player .rmtz-bar:nth-child(10){animation-delay:.15s}#rmtz-player .rmtz-bar:nth-child(11){animation-delay:.25s}#rmtz-player .rmtz-bar:nth-child(12){animation-delay:.35s}
@keyframes rmtz-wave{0%,100%{height:4px}50%{height:22px}}
#rmtz-player.rmtz-playing .rmtz-bar{opacity:1;animation-play-state:running}
#rmtz-player .rmtz-controls{padding:16px 20px 18px;display:flex;flex-direction:column;gap:14px}
#rmtz-player .rmtz-controls-row{display:flex;align-items:center;justify-content:center}
#rmtz-btn-play{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#2da64a,#1e7b34);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s ease,box-shadow .15s ease;box-shadow:0 4px 20px rgba(45,166,74,.4);flex-shrink:0}
#rmtz-btn-play:hover{transform:scale(1.06);box-shadow:0 6px 28px rgba(45,166,74,.55)}
#rmtz-btn-play:active{transform:scale(.96)}
#rmtz-btn-play svg{width:20px;height:20px;fill:#fff}
#rmtz-btn-play .rmtz-spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:rmtz-spin .7s linear infinite;display:none}
@keyframes rmtz-spin{to{transform:rotate(360deg)}}
#rmtz-player.rmtz-loading #rmtz-btn-play .rmtz-icon-play,#rmtz-player.rmtz-loading #rmtz-btn-play .rmtz-icon-pause{display:none}
#rmtz-player.rmtz-loading #rmtz-btn-play .rmtz-spinner{display:block}
#rmtz-player.rmtz-playing #rmtz-btn-play .rmtz-icon-play{display:none}
#rmtz-player.rmtz-playing #rmtz-btn-play .rmtz-icon-pause{display:block}
#rmtz-player:not(.rmtz-playing) #rmtz-btn-play .rmtz-icon-play{display:block}
#rmtz-player:not(.rmtz-playing) #rmtz-btn-play .rmtz-icon-pause{display:none}
#rmtz-player .rmtz-vol-row{display:flex;align-items:center;gap:10px}
#rmtz-player .rmtz-vol-icon{width:16px;height:16px;flex-shrink:0;color:rgba(255,255,255,.4);display:flex;align-items:center}
#rmtz-player .rmtz-vol-icon svg{width:100%;height:100%;fill:currentColor}
#rmtz-player #rmtz-volume{-webkit-appearance:none;appearance:none;flex:1;height:3px;background:rgba(255,255,255,.12);border-radius:3px;outline:none;cursor:pointer}
#rmtz-player #rmtz-volume::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:#2da64a;cursor:pointer;box-shadow:0 0 0 3px rgba(45,166,74,.2);transition:box-shadow .15s ease}
#rmtz-player #rmtz-volume::-webkit-slider-thumb:hover{box-shadow:0 0 0 5px rgba(45,166,74,.3)}
#rmtz-player #rmtz-volume::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:#2da64a;cursor:pointer;border:none}
#rmtz-player .rmtz-vol-pct{font-size:10px;color:rgba(255,255,255,.35);width:28px;text-align:right}
#rmtz-player .rmtz-status{font-size:10px;color:rgba(255,255,255,.3);text-align:center;letter-spacing:.3px;min-height:14px}
#rmtz-btn-mute{background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center}
`;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── HTML ── */
  var html = `
<div id="rmtz-card">
  <div class="rmtz-card-header">
    <div class="rmtz-card-logo">
      <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1 13V8l6 4-6 4z"/></svg>
    </div>
    <div class="rmtz-card-title"><h3>Rádio Montanheza</h3><p>FM 93.5 • Ao vivo</p></div>
    <div class="rmtz-badge"><span class="dot"></span>LIVE</div>
    <button id="rmtz-btn-close" title="Fechar">
      <svg viewBox="0 0 10 10"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
    </button>
  </div>
  <div class="rmtz-waveform">
    <div class="rmtz-bar"></div><div class="rmtz-bar"></div><div class="rmtz-bar"></div>
    <div class="rmtz-bar"></div><div class="rmtz-bar"></div><div class="rmtz-bar"></div>
    <div class="rmtz-bar"></div><div class="rmtz-bar"></div><div class="rmtz-bar"></div>
    <div class="rmtz-bar"></div><div class="rmtz-bar"></div><div class="rmtz-bar"></div>
  </div>
  <div class="rmtz-controls">
    <div class="rmtz-controls-row">
      <button id="rmtz-btn-play" title="Play / Pause">
        <svg class="rmtz-icon-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <svg class="rmtz-icon-pause" viewBox="0 0 24 24" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        <div class="rmtz-spinner"></div>
      </button>
    </div>
    <div class="rmtz-vol-row">
      <button id="rmtz-btn-mute" title="Mute">
        <div class="rmtz-vol-icon">
          <svg class="rmtz-icon-vol-on" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          <svg class="rmtz-icon-vol-off" viewBox="0 0 24 24" style="display:none"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
        </div>
      </button>
      <input type="range" id="rmtz-volume" min="0" max="100" value="80" title="Volume">
      <span class="rmtz-vol-pct" id="rmtz-vol-pct">80%</span>
    </div>
    <div class="rmtz-status" id="rmtz-status">Clique para ouvir</div>
  </div>
</div>
<div id="rmtz-pill">
  <div class="rmtz-pill-logo">
    <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1 13V8l6 4-6 4z"/></svg>
  </div>
  <div class="rmtz-pill-info">
    <span class="rmtz-pill-name">Rádio Montanheza</span>
    <span class="rmtz-pill-sub">FM 93.5 • Ao vivo</span>
  </div>
  <div class="rmtz-live-dot"></div>
</div>`;

  var wrapper = document.createElement('div');
  wrapper.id = 'rmtz-player';
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  var audio = document.createElement('audio');
  audio.id = 'rmtz-audio';
  audio.preload = 'none';
  document.body.appendChild(audio);

  /* ── Lógica ── */
  function initPlayer() {
    var STREAM    = 'https://5a57bda70564a.streamlock.net/montanheza/montanheza.stream/playlist.m3u8';
    var player    = document.getElementById('rmtz-player');
    var card      = document.getElementById('rmtz-card');
    var pill      = document.getElementById('rmtz-pill');
    var btnPlay   = document.getElementById('rmtz-btn-play');
    var btnClose  = document.getElementById('rmtz-btn-close');
    var btnMute   = document.getElementById('rmtz-btn-mute');
    var volSlider = document.getElementById('rmtz-volume');
    var volPct    = document.getElementById('rmtz-vol-pct');
    var statusEl  = document.getElementById('rmtz-status');
    var iconVolOn = btnMute.querySelector('.rmtz-icon-vol-on');
    var iconVolOff= btnMute.querySelector('.rmtz-icon-vol-off');
    var hls = null, isPlaying = false, isLoading = false;

    function initHLS() {
      if (window.Hls && Hls.isSupported()) {
        if (hls) hls.destroy();
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(STREAM);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          audio.play().catch(function () { setStatus('Erro ao iniciar'); });
        });
        hls.on(Hls.Events.ERROR, function (_, data) {
          if (data.fatal) {
            setStatus('Reconectando…');
            setTimeout(function () { if (isPlaying) initHLS(); }, 3000);
          }
        });
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = STREAM;
        audio.play().catch(function () { setStatus('Erro ao iniciar'); });
      } else {
        setStatus('Navegador não suportado');
      }
    }

    function stopHLS() {
      if (hls) { hls.stopLoad(); hls.detachMedia(); hls.destroy(); hls = null; }
      audio.src = ''; audio.load();
    }

    function setStatus(m) { statusEl.textContent = m; }
    function setLoading(v) {
      isLoading = v;
      player.classList.toggle('rmtz-loading', v);
      if (v) { player.classList.remove('rmtz-playing'); setStatus('Carregando…'); }
    }
    function setPlaying(v) {
      isPlaying = v;
      player.classList.toggle('rmtz-playing', v);
      setStatus(v ? 'Ao vivo ●' : 'Pausado');
    }

    audio.addEventListener('waiting', function () { setLoading(true); });
    audio.addEventListener('playing', function () { setLoading(false); setPlaying(true); });
    audio.addEventListener('pause',   function () { setLoading(false); setPlaying(false); });
    audio.addEventListener('error',   function () { setLoading(false); setStatus('Erro no stream'); });

    btnPlay.addEventListener('click', function () {
      if (isLoading) return;
      if (isPlaying) { stopHLS(); setPlaying(false); } else { setLoading(true); initHLS(); }
    });

    audio.volume = volSlider.value / 100;
    volSlider.addEventListener('input', function () {
      var v = volSlider.value;
      audio.volume = v / 100; audio.muted = (v == 0);
      volPct.textContent = v + '%';
      updateVolIcon(); updateTrack();
    });
    btnMute.addEventListener('click', function () {
      audio.muted = !audio.muted;
      if (audio.muted) { volSlider.value = 0; volPct.textContent = '0%'; }
      else { var r = audio.volume > 0 ? Math.round(audio.volume * 100) : 60; audio.volume = r / 100; volSlider.value = r; volPct.textContent = r + '%'; }
      updateVolIcon(); updateTrack();
    });
    function updateVolIcon() {
      var m = audio.muted || audio.volume === 0;
      iconVolOn.style.display  = m ? 'none' : 'block';
      iconVolOff.style.display = m ? 'block' : 'none';
    }
    function updateTrack() {
      var p = volSlider.value + '%';
      volSlider.style.background = 'linear-gradient(to right,#2da64a ' + p + ',rgba(255,255,255,.12) ' + p + ')';
    }
    updateTrack();

    pill.addEventListener('click', function () { card.classList.toggle('rmtz-open'); });
    btnClose.addEventListener('click', function (e) { e.stopPropagation(); card.classList.remove('rmtz-open'); });
    document.addEventListener('click', function (e) { if (!player.contains(e.target)) card.classList.remove('rmtz-open'); });

    /* pré-carrega HLS.js */
    if (!window.Hls) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1';
      document.head.appendChild(s);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
})();
