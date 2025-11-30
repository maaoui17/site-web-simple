// script.js - validations et navigation
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", e => {
    if(cursor){ cursor.style.left = e.pageX + "px"; cursor.style.top = e.pageY + "px"; }
  });

  /* ---------- LOGIN ---------- */
  const loginForm = document.getElementById("loginForm");
  if(loginForm){
    const resetLogin = document.getElementById("resetLogin");
    const loginMsg = document.getElementById("loginMsg");
    resetLogin.addEventListener("click", () => { loginForm.reset(); loginMsg.textContent = ""; });

    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const pwd = document.getElementById("loginPassword").value;

      if(!validateEmail(email)){ loginMsg.textContent = "E-mail invalide."; return; }
      if(!validatePassword(pwd)){ loginMsg.textContent = "Mot de passe invalide (min 8, lettre+chiffre+symbole)."; return; }

      // simulate success -> redirect to system page
      window.location.href = "system.html";
    });
  }

  /* ---------- REGISTER ---------- */
  const registerForm = document.getElementById("registerForm");
  if(registerForm){
    const resetRegister = document.getElementById("resetRegister");
    const registerMsg = document.getElementById("registerMsg");
    resetRegister.addEventListener("click", () => { registerForm.reset(); registerMsg.textContent = ""; });

    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const pwd = document.getElementById("regPassword").value;

      if(!/^\d{8}$/.test(phone)){ registerMsg.textContent = "Le téléphone doit contenir exactement 8 chiffres."; return; }
      if(!validateEmail(email)){ registerMsg.textContent = "E-mail invalide."; return; }
      if(!validatePassword(pwd)){ registerMsg.textContent = "Mot de passe invalide (min 8, lettre+chiffre+symbole)."; return; }

      // simulate registration success -> redirect to connexion
      alert("Inscription réussie !");
      window.location.href = "index.html";
    });
  }

  /* ---------- FORGOT ---------- */
  const forgotNext = document.getElementById("forgotNext");
  if(forgotNext){
    forgotNext.addEventListener("click", () => {
      const method = document.querySelector('input[name="method"]:checked').value;
      if(method === "phone") location.href = "recover_phone.html";
      else location.href = "recover_email.html";
    });
  }

  /* ---------- RECOVER PHONE ---------- */
  const phoneForm = document.getElementById("phoneForm");
  if(phoneForm){
    const phoneMsg = document.getElementById("phoneMsg");
    phoneForm.addEventListener("submit", e => {
      e.preventDefault();
      const num = document.getElementById("recoverPhone").value.trim();
      if(!/^\d{8}$/.test(num)){ phoneMsg.textContent = "Numéro invalide (8 chiffres requis)."; return; }
      // goto enter code
      sessionStorage.setItem("recoveryMethod","phone");
      window.location.href = "enter_code.html";
    });
  }

  /* ---------- RECOVER EMAIL ---------- */
  const emailForm = document.getElementById("emailForm");
  if(emailForm){
    const emailMsg = document.getElementById("emailMsg");
    emailForm.addEventListener("submit", e => {
      e.preventDefault();
      const em = document.getElementById("recoverEmail").value.trim();
      if(!validateEmail(em)){ emailMsg.textContent = "E-mail invalide."; return; }
      sessionStorage.setItem("recoveryMethod","email");
      window.location.href = "enter_code.html";
    });
  }

  /* ---------- ENTER CODE ---------- */
  const codeForm = document.getElementById("codeForm");
  if(codeForm){
    const codeMsg = document.getElementById("codeMsg");
    codeForm.addEventListener("submit", e => {
      e.preventDefault();
      const code = document.getElementById("codeInput").value.trim();
      if(!/^\d{6}$/.test(code)){ codeMsg.textContent = "Code invalide (6 chiffres requis)."; return; }
      // if success -> new password
      window.location.href = "new_password.html";
    });
  }

  /* ---------- NEW PASSWORD ---------- */
  const newPassForm = document.getElementById("newPassForm");
  if(newPassForm){
    const newPassMsg = document.getElementById("newPassMsg");
    newPassForm.addEventListener("submit", e => {
      e.preventDefault();
      const newP = document.getElementById("newPass").value;
      const confirmP = document.getElementById("confirmPass").value;
      if(!validatePassword(newP)){ newPassMsg.textContent = "Mot de passe invalide."; return; }
      if(newP !== confirmP){ newPassMsg.textContent = "Les mots de passe ne correspondent pas."; return; }
      alert("Mot de passe modifié avec succès !");
      window.location.href = "index.html";
    });
  }
});

/* ---------- Helpers ---------- */
function validateEmail(email){
  // simple email regex (contient @ et domaine)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(pwd){
  // min 8 chars, au moins 1 lettre, 1 chiffre, 1 symbole non-alphanum
  return /^(?=.{8,}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(pwd);
}
