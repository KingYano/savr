<template>
  <div :class="[
    'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50',
    'transition-all duration-500 ease-out',
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
  ]">
    <!-- Navigation flottante -->
    <div :class="[
      'flex items-center gap-2 px-4 py-3 rounded-full',
      'backdrop-blur-md border shadow-2xl transition-all duration-300',
      isDarkMode 
        ? 'bg-[#1A1A1A]/90 border-white/10 shadow-black/40' 
        : 'bg-white/80 border-gray-200/50 shadow-black/10',
      'hover:scale-105 hover:shadow-3xl'
    ]">
      
      <!-- Bouton Dark Mode -->
      <button
        @click="toggleDarkMode"
        :class="[
          'p-3 rounded-full transition-all duration-300',
          'hover:scale-110 active:scale-95',
          isDarkMode 
            ? 'bg-[#242424] hover:bg-[#3D3D3D] text-yellow-400' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        ]"
        :title="isDarkMode ? 'Mode clair' : 'Mode sombre'"
      >
        <component 
          :is="isDarkMode ? Sun : Moon" 
          class="h-5 w-5 transition-transform duration-300"
          :class="isDarkMode ? 'rotate-180' : 'rotate-0'"
        />
      </button>

      <!-- Séparateur -->
      <div :class="[
        'h-8 w-px',
        isDarkMode ? 'bg-white/10' : 'bg-gray-300'
      ]"></div>

      <!-- Bouton Ajouter -->
      <button
        @click="$emit('add-movement')"
        :class="[
          'p-3 rounded-full transition-all duration-300',
          'hover:scale-110 active:scale-95',
          'bg-emerald-500 hover:bg-emerald-600 text-white',
          'shadow-lg hover:shadow-emerald-500/25'
        ]"
        title="Ajouter un mouvement"
      >
        <Plus class="h-5 w-5" />
      </button>

      <!-- Séparateur -->
      <div :class="[
        'h-8 w-px',
        isDarkMode ? 'bg-white/10' : 'bg-gray-300'
      ]"></div>

      <!-- Bouton Statistiques -->
      <NuxtLink
        to="/stats"
        :class="[
          'p-3 rounded-full transition-all duration-300',
          'hover:scale-110 active:scale-95',
          'bg-blue-500 hover:bg-blue-600 text-white',
          'shadow-lg hover:shadow-blue-500/25'
        ]"
        title="Voir les statistiques"
      >
        <BarChart3 class="h-5 w-5" />
      </NuxtLink>

      <!-- Indicateur de position (si sur la page stats) -->
      <div 
        v-if="$route.path === '/stats'"
        :class="[
          'absolute -top-1 left-1/2 transform -translate-x-1/2',
          'w-2 h-2 rounded-full bg-blue-500'
        ]"
      ></div>
    </div>

    <!-- Tooltip flottant -->
    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div 
        v-if="showTooltip && tooltipText"
        :class="[
          'absolute -top-12 left-1/2 transform -translate-x-1/2',
          'px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap',
          'pointer-events-none',
          isDarkMode 
            ? 'bg-gray-800 text-white border border-white/10' 
            : 'bg-black text-white'
        ]"
      >
        {{ tooltipText }}
        <!-- Flèche -->
        <div :class="[
          'absolute top-full left-1/2 transform -translate-x-1/2',
          'border-4 border-transparent',
          isDarkMode ? 'border-t-gray-800' : 'border-t-black'
        ]"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Sun, Moon, Plus, BarChart3 } from 'lucide-vue-next';

  interface Props {
    isDarkMode: boolean;
  }

  const props = defineProps<Props>();
  
  const emit = defineEmits<{
    'toggle-dark-mode': [];
    'add-movement': [];
  }>();

  const isVisible = ref(true);
  const showTooltip = ref(false);
  const tooltipText = ref('');
  const lastScrollY = ref(0);

  // Gestion du scroll pour masquer/afficher la nav
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 100) {
      isVisible.value = true;
    } else if (currentScrollY > lastScrollY.value && currentScrollY > 200) {
      // Scrolling down
      isVisible.value = false;
    } else if (currentScrollY < lastScrollY.value) {
      // Scrolling up
      isVisible.value = true;
    }
    
    lastScrollY.value = currentScrollY;
  };

  // Gestion des tooltips
  const showTooltipFor = (text: string) => {
    tooltipText.value = text;
    showTooltip.value = true;
  };

  const hideTooltip = () => {
    showTooltip.value = false;
    setTimeout(() => {
      tooltipText.value = '';
    }, 150);
  };

  const toggleDarkMode = () => {
    emit('toggle-dark-mode');
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Animation d'entrée
    setTimeout(() => {
      isVisible.value = true;
    }, 500);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style scoped>
  /* Effet de flou personnalisé */
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Shadow personnalisée plus intense */
  .shadow-3xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  /* Animation de pulsation subtile */
  @keyframes subtle-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .animate-subtle-pulse {
    animation: subtle-pulse 3s ease-in-out infinite;
  }

  /* Amélioration de la transition pour les boutons */
  button, a {
    transform-origin: center;
    will-change: transform;
  }

  /* Gradient subtle sur hover */
  button:hover, a:hover {
    background-image: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  }
</style>