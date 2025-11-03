// === إظهار زر التثبيت فقط عند توفر الـ PWA prompt ===
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("installAppBtn");
  if (installBtn) installBtn.style.display = "flex";
});

document.addEventListener("click", async (e) => {
  const installBtn = document.getElementById("installAppBtn");
  if (e.target.closest("#installAppBtn") && deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    installBtn.style.display = "none";
  }
});
