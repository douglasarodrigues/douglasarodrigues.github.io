/**
 * Main entry point — initializes all modules on DOMContentLoaded.
 */
import Navigation from './navigation.js';
import CodeShowcase from './code-showcase.js';
import Animations from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Animations.init();
  CodeShowcase.init();
});
