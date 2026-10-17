
const $ = (id) => document.getElementById(id);

const fields = [
  "template",
  "businessName",
  "tagline",
  "services",
  "email",
  "color",
  "plan",
  "domain",
  "booking"
];

const templates = {
  artisan: {
    type: "ARTISAN & SERVICES",
    button: "Parlons de ton projet",
    servicesTitle: "Nos services"
  },
  restaurant: {
    type: "RESTAURANT & GASTRONOMIE",
    button: "Découvrir notre établissement",
    servicesTitle: "À la carte"
  },
  coach: {
    type: "ACCOMPAGNEMENT & CONSEIL",
    button: "Réserver un premier échange",
    servicesTitle: "Mes accompagnements"
  }
};

function updateSite() {
  const name = $("businessName").value.trim()
    || "Nom de votre activité";

  const tagline = $("tagline").value.trim()
    || "Présentez votre activité et vos services.";

  const services = $("services").value.trim()
    || "Vos services apparaîtront ici.";

  const email = $("email").value.trim();
  const color = $("color").value;
  const template = templates[$("template").value];

  // Actualiser les informations du site
  $("previewName").textContent = name;
  $("previewTitle").textContent = name;
  $("previewTagline").textContent = tagline;
  $("previewServices").textContent = services;
  $("previewType").textContent = template.type;
  $("navLink").textContent = "Contact";
  $("previewEmail").textContent = email || "E-mail à renseigner";
  $("previewEmail").href = email
    ? `mailto:${email}`
    : "#contact";

  $("previewFooter").textContent = `© 2026 ${name}`;
  $("colorLabel").textContent = color.toUpperCase();

  // Actualiser la couleur du site
  $("website").style.setProperty("--site-accent", color);

  document.querySelector(".cta").textContent = template.button;
  document.querySelector(".services h2").textContent =
    template.servicesTitle;

  // Calculer le tarif estimé
  const basePrice = Number($("plan").value);
  const domainPrice = $("domain").checked ? 2 : 0;
  const bookingPrice = $("booking").checked ? 5 : 0;

  const total = basePrice + domainPrice + bookingPrice;

  $("price").textContent = `${total} €/mois`;

  const details = [];
  details.push(`${basePrice} € de forfait`);

  if (domainPrice) details.push("domaine : +2 €");
  if (bookingPrice) details.push("réservations : +5 €");

  $("priceDetails").textContent = details.join(" · ");
}

// Mettre à jour l'aperçu à chaque modification
fields.forEach((id) => {
  $(id).addEventListener("input", updateSite);
  $(id).addEventListener("change", updateSite);
});

// Restaurer les valeurs initiales
$("reset").addEventListener("click", () => {
  $("template").value = "artisan";
  $("businessName").value = "Atelier Horizon";
  $("tagline").value =
    "Des services de qualité, avec passion et savoir-faire.";
  $("services").value =
    "Conseil, création, accompagnement";
  $("email").value = "contact@exemple.fr";
  $("color").value = "#635bdb";
  $("plan").value = "12";
  $("domain").checked = true;
  $("booking").checked = false;

  updateSite();
});

// Initialiser l'aperçu
updateSite();
