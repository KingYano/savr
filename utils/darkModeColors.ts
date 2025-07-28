// Nouveau schéma de couleurs dark mode inspiré de cedric.design
export const darkModeColors = {
  // Arrière-plans
  primary: '#080808',      // Noir profond principal
  secondary: '#1A1A1A',    // Gris très sombre pour les cartes
  tertiary: '#242424',     // Gris légèrement plus clair
  quaternary: '#3D3D3D',   // Charcoal pour les éléments interactifs
  
  // Textes
  text: {
    primary: '#FFFFFF',      // Blanc pur pour les titres
    secondary: 'rgba(255, 255, 255, 0.8)', // Blanc à 80% pour le texte principal
    tertiary: 'rgba(255, 255, 255, 0.6)',  // Blanc à 60% pour le texte secondaire
    muted: 'rgba(255, 255, 255, 0.4)',     // Blanc à 40% pour les éléments discrets
  },
  
  // Bordures
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',   // Bordures subtiles
    secondary: 'rgba(255, 255, 255, 0.05)', // Bordures très subtiles
    hover: 'rgba(255, 255, 255, 0.2)',     // Bordures au hover
  },
  
  // Couleurs d'accent (gardées vives pour le contraste)
  accent: {
    blue: '#0099FF',         // Bleu vif pour les liens/actions
    green: '#10B981',        // Vert pour les revenus
    red: '#EF4444',          // Rouge pour les dépenses
    orange: '#F59E0B',       // Orange pour les alertes
    purple: '#8B5CF6',       // Violet pour les éléments spéciaux
  },
  
  // États des éléments interactifs
  interactive: {
    hover: 'rgba(255, 255, 255, 0.05)',    // Hover subtil
    active: 'rgba(255, 255, 255, 0.1)',    // Active subtil
    focus: 'rgba(0, 153, 255, 0.2)',       // Focus avec accent bleu
  }
};

// Fonction helper pour appliquer les couleurs dark
export const getDarkColor = (path: string) => {
  const keys = path.split('.');
  let current: any = darkModeColors;
  
  for (const key of keys) {
    current = current[key];
    if (!current) return '';
  }
  
  return current;
};

// Classes Tailwind personnalisées pour le dark mode
export const darkModeClasses = {
  // Arrière-plans
  bgPrimary: 'bg-[#080808]',
  bgSecondary: 'bg-[#1A1A1A]',
  bgTertiary: 'bg-[#242424]',
  bgQuaternary: 'bg-[#3D3D3D]',
  
  // Textes
  textPrimary: 'text-white',
  textSecondary: 'text-white/80',
  textTertiary: 'text-white/60',
  textMuted: 'text-white/40',
  
  // Bordures
  borderPrimary: 'border-white/10',
  borderSecondary: 'border-white/5',
  borderHover: 'border-white/20',
  
  // États interactifs
  hoverBg: 'hover:bg-white/5',
  activeBg: 'active:bg-white/10',
  focusRing: 'focus:ring-2 focus:ring-blue-500/20',
};