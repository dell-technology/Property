// Component loader utility
export async function loadComponent(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const source = container.getAttribute('data-source');
  if (!source) return;

  try {
    const basePath = window.location.origin + '/api/preview-68a4b5c8466f555588854b83/';
    const response = await fetch(basePath + source);
    if (response.ok) {
      const html = await response.text();
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(`Failed to load component from ${source}:`, error);
  }
}

// Load multiple components
export async function loadComponents(selectors) {
  const promises = selectors.map(selector => loadComponent(selector));
  await Promise.all(promises);
}