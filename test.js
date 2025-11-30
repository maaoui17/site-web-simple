// test.js - afficher dans la console des checks rapides
window.addEventListener("DOMContentLoaded", () => {
  console.log("== Tests simples du projet ==");
  // boutons annuler et connexion existants
  const btns = document.querySelectorAll("button, a.btn, a.btn-primary, a.btn-outline");
  console.log("Nombre de boutons trouvés:", btns.length);

  // existe cursor ?
  console.log("Curseur personnalisé :", !!document.querySelector(".cursor"));

  // forms check
  const forms = document.querySelectorAll("form");
  console.log("Forms présentes:", forms.length);

  // check champs email/password sur la page connexion
  const email = document.getElementById("loginEmail");
  const pwd = document.getElementById("loginPassword");
  if(email) console.log("Champ email Ok");
  if(pwd) console.log("Champ mot de passe Ok");
});
