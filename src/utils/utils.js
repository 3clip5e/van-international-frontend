export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleSubmit = (e) => {
  e.preventDefault();
  alert("Formulaire de démonstration. Il faut maintenant le relier à un backend ou à un service d'email.");
};
