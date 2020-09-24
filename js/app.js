const s = Array.from(document.getElementsByTagName('section'));
const t = document.getElementById('title');
const nbl = document.getElementById('navbar__list');

function jumpTo(target) {

	if(target==null) {	

		document.querySelector('html,body').scrollIntoView({ behavior: 'smooth', block: 'start'});

	}else {

		document.querySelector(target).scrollIntoView({ behavior: 'smooth', block: 'start' });

	}
// smooth scroll to element and align it at the bottom

    //$('html,body').animate({scrollTop: target ? target.offset().top : 0}, 'fast');

}

function isSectionInView(element) {

  let border = element.getBoundingClientRect();

  return (
    border.top >= 0 &&
    border.left >= 0 &&
    border.bottom <= (document.documentElement.clientHeight) &&
    border.right <= (document.documentElement.clientWidth)
  );

}

function highlightOnScroll() {

  if (isSectionInView(t)) {

    nbl.childNodes[0].classList.add('navbar-active');
    nbl.childNodes.forEach((navLink, index) =>index && navLink.classList.remove('navbar-active'));

  } else if(!isSectionInView(t)){

    let activeSectionIndex = s.findIndex(section => isSectionInView(section.childNodes[1].childNodes[1]));
    let currentSection = s[activeSectionIndex];
    let sectionLink = nbl.childNodes[activeSectionIndex + 1];

    currentSection && currentSection.classList.add('section-active');
    sectionLink && sectionLink.classList.add('navbar-active');
    nbl.childNodes.forEach((navLink, index) =>index != (activeSectionIndex + 1) && navLink.classList.remove('navbar-active'));

  }

}
 
function drawNavbar() {

  let TopLink = document.createElement('li');

  TopLink.innerText = 'Top';
  TopLink.className = 'menu__link';
  TopLink.onclick = () => jumpTo();
  nbl.appendChild(TopLink);
  s.forEach(section => {

    if (!section.dataset || !section.dataset.nav) return;
    let li = document.createElement('li');
    li.innerText = section.dataset.nav;
    li.className = 'menu__link';
    li.onclick = () => jumpTo(`#${section.id}`);
    nbl.appendChild(li);

  });

}

window.onscroll = highlightOnScroll;
drawNavbar();
highlightOnScroll();