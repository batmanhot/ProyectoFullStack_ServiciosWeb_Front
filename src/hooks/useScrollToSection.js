export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function useScrollToSection() {
  const scrollTo = (sectionId) => scrollToSection(sectionId);
  return { scrollTo };
}
