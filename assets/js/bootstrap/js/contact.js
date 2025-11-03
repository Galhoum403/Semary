document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  if (!form) {
    console.warn("Form element not found!");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    msg.innerHTML = "<div class='alert alert-info'>⏳ جاري الإرسال...</div>";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      // نقرأ الرد كنص عادي بدل JSON
      const text = await response.text();

      if (response.ok || text.includes('"ok":true')) {
        msg.innerHTML = "<div class='alert alert-success'>✅ تم إرسال الرسالة بنجاح!</div>";
        form.reset();
      } else {
        msg.innerHTML = "<div class='alert alert-danger'>❌ حدث خطأ أثناء الإرسال. حاول مرة أخرى.</div>";
        console.error("Response:", text);
      }
    } catch (err) {
      msg.innerHTML = "<div class='alert alert-warning'>⚠️ لم يتم الاتصال بالخادم. جرب بعد التصدير أو الرفع على الإنترنت.</div>";
      console.error("Fetch Error:", err);
    }
  });
});