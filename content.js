window.addEventListener("load", () => {
  console.log("[Poki Ad Blocker] Script loaded and monitoring ads...");
  console.log("Poki Ad Blocker @ Brainless Dip");

  let adActive = false;

  setInterval(() => {
    const isAdPlaying = document.body.innerText.includes("Playing Ad");
    document
      .querySelectorAll("div")
      .forEach(
        (el) => el.textContent.trim() === "Advertisement" && el.remove()
      );
    if (isAdPlaying !== adActive) {
      adActive = isAdPlaying;

      const adContainer = document.getElementById("poki-video-ad-container");
      const mediaElements = document.querySelectorAll("video, audio");

      if (adContainer) {
        adContainer.style.visibility = "hidden";
      }

      const elements = document.querySelectorAll("div");
      for (const el of elements) {
        if (el.textContent.trim() === "We’ll be back after this short break") {
          el.textContent = "Poki Ad Blocker @ Brainless Dip";
          break;
        }
      }
      mediaElements.forEach((media) => {
        media.muted = adActive;

        if (adActive && Number.isFinite(media.duration)) {
          try {
            media.currentTime = media.duration;
            console.log("[Poki Ad Blocker] Ad bypassed. Reward claimed.");
          } catch (error) {
            console.error("[Poki Ad Blocker] Error skiping ad", error);
          }
        }
      });
    }
  }, 1);
});
