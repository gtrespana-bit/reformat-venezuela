const routeMap = {
'/': '/en',
'/en': '/',
'/servicios': '/en/services',
'/en/services': '/servicios',
'/servicios/cocinas': '/en/services/kitchens',
'/en/services/kitchens': '/servicios/cocinas',
'/servicios/banos': '/en/services/bathrooms',
'/en/services/bathrooms': '/servicios/banos',
'/servicios/integrales': '/en/services/whole-home',
'/en/services/whole-home': '/servicios/integrales',
'/servicios/electricidad': '/en/services/electrical',
'/en/services/electrical': '/servicios/electricidad',
'/servicios/fontaneria': '/en/services/plumbing',
'/en/services/plumbing': '/servicios/fontaneria',
'/servicios/pintura-acabados': '/en/services/painting',
'/en/services/painting': '/servicios/pintura-acabados',
'/servicios/suelos': '/en/services/flooring',
'/en/services/flooring': '/servicios/suelos',
'/proyectos': '/en/projects',
'/en/projects': '/proyectos',
'/contacto': '/en/contact',
'/en/contact': '/contacto',
'/blog/cuanto-cuesta-reforma-cocina-valencia': '/en/blog/kitchen-remodel-cost-valencia-guide',
'/en/blog/kitchen-remodel-cost-valencia-guide': '/blog/cuanto-cuesta-reforma-cocina-valencia',
'/blog/porcelanato-vs-ceramica': '/en/blog/porcelain-tile-vs-ceramic-tile-guide',
'/en/blog/porcelain-tile-vs-ceramic-tile-guide': '/blog/porcelanato-vs-ceramica',
'/blog/presupuesto-reforma-errores': '/en/blog/remodel-budget-mistakes-avoid',
'/en/blog/remodel-budget-mistakes-avoid': '/blog/presupuesto-reforma-errores',
'/blog/reformas-banos-carabobo': '/en/blog/bathroom-remodel-carabobo-guide',
'/en/blog/bathroom-remodel-carabobo-guide': '/blog/reformas-banos-carabobo',
'/blog/tendencias-cocinas-2025': '/en/blog/kitchen-design-trends-2026',
'/en/blog/kitchen-design-trends-2026': '/blog/tendencias-cocinas-2025'
};

const langSwitchBtn = document.querySelector('.lang-switch-visible');
if (langSwitchBtn) {
langSwitchBtn.addEventListener('click', () => {
const currentPath = window.location.pathname;
const newPath = routeMap[currentPath];
if (newPath) {
const newLang = currentPath.startsWith('/en') ? 'es' : 'en';
localStorage.setItem('reformat-lang', newLang);
window.location.href = newPath;
} else {
if (currentPath.startsWith('/en')) {
localStorage.setItem('reformat-lang', 'es');
window.location.href = currentPath.replace(/^\/en/, '') || '/';
} else {
localStorage.setItem('reformat-lang', 'en');
window.location.href = '/en' + currentPath;
}
}
});
}

const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
menuBtn.addEventListener('click', () => {
const isOpen = navLinks.style.display === 'flex';
navLinks.style.display = isOpen ? 'none' : 'flex';
});
}

window.addEventListener('scroll', () => {
const navbar = document.getElementById('navbar');
if (navbar) {
navbar.classList.toggle('scrolled', window.scrollY > 80);
}
});

window.shareArticle = (platform) => {
const url = window.location.href;
const title = document.title;
const links = {
whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
};
if (links[platform]) {
window.open(links[platform], '_blank', 'width=600,height=400');
}
};
