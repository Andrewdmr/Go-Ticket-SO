<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useEvents } from '../../application/event-store.js';
import Dialog from 'primevue/dialog';

const router = useRouter();
const role   = localStorage.getItem('role');

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  router.push('/');
};

const { events } = useEvents();

const search           = ref('');
const selectedCategory = ref('Todos');
const selectedStatus   = ref('Todos');
const selectedPrice    = ref('Todos');

const categoryPills = computed(() => {
  const unique = [...new Set(events.value.map(e => e.category).filter(Boolean))];
  return ['Todos', ...unique];
});

const statusPills = ['Todos', 'Disponible', 'Próximamente'];

const pricePills = [
  { label: 'Todos',       min: 0,   max: Infinity },
  { label: 'Gratis',      min: 0,   max: 0        },
  { label: 'Hasta S/100', min: 1,   max: 100      },
  { label: 'S/100–300',   min: 100, max: 300      },
  { label: 'S/300+',      min: 300, max: Infinity },
];

const filtered = computed(() => {
  const priceRange = pricePills.find(p => p.label === selectedPrice.value);

  return events.value.filter(e => {
    if (!e.title) return false;

    const matchSearch   = !search.value
      || e.title.toLowerCase().includes(search.value.toLowerCase())
      || e.location?.toLowerCase().includes(search.value.toLowerCase());

    const matchCategory = selectedCategory.value === 'Todos'
      || e.category === selectedCategory.value;

    const matchStatus = selectedStatus.value === 'Todos'
      || (selectedStatus.value === 'Disponible'   && e.status === 'ACTIVE')
      || (selectedStatus.value === 'Próximamente' && e.status === 'PENDING');

    const matchPrice = !priceRange
      || (e.price >= priceRange.min && e.price <= priceRange.max);

    return matchSearch && matchCategory && matchStatus && matchPrice;
  });
});

const activeFiltersCount = computed(() =>
  [selectedCategory.value !== 'Todos', selectedStatus.value !== 'Todos', selectedPrice.value !== 'Todos']
    .filter(Boolean).length
);

const clearFilters = () => {
  search.value           = '';
  selectedCategory.value = 'Todos';
  selectedStatus.value   = 'Todos';
  selectedPrice.value    = 'Todos';
};

const selected   = ref(null);
const showDetail = ref(false);

const openDetail = (event) => {
  selected.value   = event;
  showDetail.value = true;
};

const available = computed(() =>
  selected.value ? (selected.value.capacity ?? 0) - (selected.value.sold ?? 0) : 0
);

const soldPercent = computed(() =>
  selected.value?.capacity
    ? Math.round((selected.value.sold / selected.value.capacity) * 100)
    : 0
);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
};
</script>

<template>
  <div class="page">

    <!-- TOP NAVBAR -->
    <header class="topbar">
      <div class="topbar-logo">
        <div class="logo-sq">GT</div>
        <span class="logo-name">GoTicket</span>
      </div>

      <div class="topbar-right">
        <span class="topbar-user">
          <i class="pi pi-user"></i>
          {{ role === 'admin' ? 'Administrador' : 'Cliente' }}
        </span>
        <button class="topbar-logout" @click="logout">
          <i class="pi pi-sign-out"></i>
          Salir
        </button>
      </div>
    </header>

    <!-- HERO -->
    <div class="hero">
      <div class="hero-content">
        <h1>Encuentra tu próximo<br><span class="hero-highlight">evento favorito</span></h1>
        <p>Conciertos, conferencias, festivales y más — todo en un solo lugar</p>
        <div class="hero-search">
          <i class="pi pi-search"></i>
          <input
            v-model="search"
            placeholder="Buscar artistas, eventos o lugares..."
            class="hero-input"
          />
        </div>
      </div>
    </div>

    <!-- FILTERS -->
    <div class="filters-section">

      <!-- CATEGORY -->
      <div class="filter-row">
        <span class="filter-label">Categoría</span>
        <div class="pills-row">
          <button
            v-for="cat in categoryPills"
            :key="cat"
            class="pill"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >{{ cat }}</button>
        </div>
      </div>

      <!-- STATUS -->
      <div class="filter-row">
        <span class="filter-label">Estado</span>
        <div class="pills-row">
          <button
            v-for="s in statusPills"
            :key="s"
            class="pill"
            :class="{ active: selectedStatus === s }"
            @click="selectedStatus = s"
          >{{ s }}</button>
        </div>
      </div>

      <!-- PRICE -->
      <div class="filter-row">
        <span class="filter-label">Precio</span>
        <div class="pills-row">
          <button
            v-for="p in pricePills"
            :key="p.label"
            class="pill"
            :class="{ active: selectedPrice === p.label }"
            @click="selectedPrice = p.label"
          >{{ p.label }}</button>
        </div>
      </div>

    </div>

    <!-- CONTENT -->
    <div class="content">

      <!-- RESULTS BAR -->
      <div class="results-bar">
        <p class="results-label">
          <strong>{{ filtered.length }}</strong> evento{{ filtered.length !== 1 ? 's' : '' }} encontrado{{ filtered.length !== 1 ? 's' : '' }}
        </p>
        <button v-if="activeFiltersCount > 0" class="clear-btn" @click="clearFilters">
          <i class="pi pi-filter-slash"></i>
          Limpiar filtros ({{ activeFiltersCount }})
        </button>
      </div>

      <!-- GRID -->
      <div v-if="filtered.length > 0" class="events-grid">
      <div
        v-for="event in filtered"
        :key="event.id"
        class="event-card"
        @click="openDetail(event)"
      >
        <!-- IMAGE WITH OVERLAY -->
        <div class="card-img-wrap">
          <img :src="event.image" :alt="event.title" class="card-img" />
          <div class="card-overlay">
            <span class="card-category-pill">{{ event.category }}</span>
            <h3 class="card-overlay-title">{{ event.title }}</h3>
          </div>
          <span class="card-status" :class="event.status === 'ACTIVE' ? 'status-active' : 'status-pending'">
            {{ event.status === 'ACTIVE' ? 'Disponible' : 'Próximamente' }}
          </span>
        </div>

        <!-- CARD BODY -->
        <div class="card-body">
          <div class="card-meta">
            <span class="meta-item">
              <i class="pi pi-calendar"></i>
              {{ formatDate(event.date) }}
              <span v-if="event.time" class="meta-time">· {{ event.time }}</span>
            </span>
            <span class="meta-item">
              <i class="pi pi-map-marker"></i>
              {{ event.location }}
            </span>
          </div>

          <div class="card-footer">
            <div class="price-block">
              <span class="price-from">Desde</span>
              <span class="price-amount">S/ {{ event.price }}</span>
            </div>
            <button class="buy-btn">
              Comprar
              <i class="pi pi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

      <!-- EMPTY STATE -->
      <div v-else class="empty-state">
        <i class="pi pi-ticket"></i>
        <p>No hay eventos para esta búsqueda</p>
        <button class="reset-btn" @click="clearFilters">
          Ver todos los eventos
        </button>
      </div>

    </div><!-- /content -->

    <!-- DETAIL DIALOG -->
    <Dialog
      v-model:visible="showDetail"
      modal
      :show-header="false"
      :style="{ width: '620px', maxWidth: '95vw', padding: 0, borderRadius: '20px', overflow: 'hidden' }"
      :draggable="false"
      :pt="{ content: { style: 'padding: 0' } }"
    >
      <template v-if="selected">

        <!-- DIALOG HERO IMAGE -->
        <div class="modal-hero">
          <img :src="selected.image" :alt="selected.title" class="modal-img" />
          <div class="modal-img-overlay">
            <span class="modal-category">{{ selected.category }}</span>
            <h2 class="modal-title">{{ selected.title }}</h2>
          </div>
          <button class="modal-close" @click="showDetail = false">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <!-- DIALOG BODY -->
        <div class="modal-body">

          <div class="modal-info-grid">

            <div class="modal-info-item">
              <div class="modal-icon"><i class="pi pi-calendar"></i></div>
              <div>
                <small>Fecha y hora</small>
                <p>{{ formatDate(selected.date) }}<span v-if="selected.time"> · {{ selected.time }}</span></p>
              </div>
            </div>

            <div class="modal-info-item">
              <div class="modal-icon"><i class="pi pi-map-marker"></i></div>
              <div>
                <small>Ubicación</small>
                <p>{{ selected.location }}</p>
              </div>
            </div>

            <div class="modal-info-item">
              <div class="modal-icon"><i class="pi pi-wallet"></i></div>
              <div>
                <small>Precio por ticket</small>
                <p>Desde S/ {{ selected.price }}</p>
              </div>
            </div>

            <div v-if="selected.capacity" class="modal-info-item">
              <div class="modal-icon"><i class="pi pi-users"></i></div>
              <div>
                <small>Entradas disponibles</small>
                <p>{{ available }} de {{ selected.capacity }}</p>
              </div>
            </div>

          </div>

          <!-- CAPACITY BAR -->
          <div v-if="selected.capacity" class="modal-bar-wrap">
            <div class="modal-bar-labels">
              <span>{{ soldPercent }}% vendido</span>
              <span :class="available < 100 ? 'label-red' : 'label-green'">
                {{ available < 100 ? 'Pocas entradas' : 'Entradas disponibles' }}
              </span>
            </div>
            <div class="modal-bar-bg">
              <div
                class="modal-bar-fill"
                :style="{ width: soldPercent + '%' }"
                :class="soldPercent > 80 ? 'danger' : soldPercent > 50 ? 'warning' : 'ok'"
              />
            </div>
          </div>

          <!-- CTA -->
          <button
            class="modal-buy-btn"
            :disabled="available === 0"
            @click="showDetail = false"
          >
            <i class="pi pi-ticket"></i>
            {{ available === 0 ? 'Agotado' : 'Comprar tickets' }}
          </button>

        </div>

      </template>
    </Dialog>

  </div><!-- /page -->
</template>

<style scoped>

/* ─── PAGE SHELL ─────────────────────────────── */
.page {
  min-height: 100vh;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
}

/* ─── TOPBAR ─────────────────────────────────── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 62px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25);
}

.topbar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-sq {
  width: 36px;
  height: 36px;
  background: #6366f1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 13px;
}
.logo-name {
  color: white;
  font-weight: 700;
  font-size: 18px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.topbar-user {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #d1d5db;
  font-size: 14px;
}
.topbar-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1.5px solid #374151;
  color: #9ca3af;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.18s;
}
.topbar-logout:hover {
  border-color: #ef4444;
  color: #ef4444;
}

/* ─── HERO ───────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 52px 40px 44px;
  margin-bottom: 0;
}

.hero-content h1 {
  font-size: 34px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin-bottom: 10px;
}
.hero-highlight {
  color: #a78bfa;
}
.hero-content p {
  color: #a5b4fc;
  font-size: 15px;
  margin-bottom: 24px;
}

.hero-search {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 14px 20px;
  gap: 12px;
  max-width: 520px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
.hero-search i {
  color: #9ca3af;
  font-size: 16px;
  flex-shrink: 0;
}
.hero-input {
  border: none;
  outline: none;
  font-size: 15px;
  width: 100%;
  color: #111827;
  background: transparent;
}
.hero-input::placeholder { color: #9ca3af; }

/* ─── FILTERS ────────────────────────────────── */
.filters-section {
  background: white;
  padding: 20px 40px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  min-width: 72px;
  flex-shrink: 0;
}

.pills-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill {
  padding: 6px 16px;
  border-radius: 50px;
  border: 1.5px solid #e5e7eb;
  background: white;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.pill:hover {
  border-color: #6366f1;
  color: #6366f1;
}
.pill.active {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
}

/* ─── CONTENT ────────────────────────────────── */
.content {
  padding: 28px 40px 40px;
  flex: 1;
}

/* ─── RESULTS BAR ────────────────────────────── */
.results-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.results-label {
  font-size: 14px;
  color: #6b7280;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}
.clear-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
}

/* ─── GRID ───────────────────────────────────── */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* ─── CARD ───────────────────────────────────── */
.event-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  transition: transform 0.22s, box-shadow 0.22s;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.14);
}

/* IMAGE + OVERLAY */
.card-img-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s;
}
.event-card:hover .card-img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.80) 40%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  gap: 6px;
}
.card-category-pill {
  align-self: flex-start;
  background: rgba(99,102,241,0.85);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-overlay-title {
  color: white;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
}

.card-status {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.status-active  { background: #dcfce7; color: #15803d; }
.status-pending { background: #fef9c3; color: #a16207; }

/* CARD BODY */
.card-body {
  padding: 16px;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #6b7280;
}
.meta-item i { color: #6366f1; }
.meta-time { color: #9ca3af; }

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-block {
  display: flex;
  flex-direction: column;
}
.price-from {
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.price-amount {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
}

.buy-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s;
}
.buy-btn:hover {
  background: #4f46e5;
  transform: scale(1.03);
}

/* ─── EMPTY STATE ────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 0;
  color: #9ca3af;
  text-align: center;
}
.empty-state i { font-size: 52px; color: #d1d5db; }
.empty-state p { font-size: 16px; color: #6b7280; }

.reset-btn {
  background: none;
  border: 1.5px solid #6366f1;
  color: #6366f1;
  border-radius: 50px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;
}
.reset-btn:hover { background: #6366f1; color: white; }

/* ─── DIALOG ─────────────────────────────────── */
.modal-hero {
  position: relative;
  height: 260px;
  overflow: hidden;
}
.modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.modal-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.78) 45%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 24px;
  gap: 6px;
}
.modal-category {
  align-self: flex-start;
  background: rgba(99,102,241,0.85);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.modal-title {
  color: white;
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
}
.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0,0,0,0.45);
  border: none;
  color: white;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s;
}
.modal-close:hover { background: rgba(0,0,0,0.7); }

.modal-body {
  padding: 24px;
}

.modal-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 22px;
}

.modal-info-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.modal-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: #f0f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  flex-shrink: 0;
  font-size: 15px;
}
.modal-info-item small {
  display: block;
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}
.modal-info-item p {
  font-size: 14px;
  color: #111827;
  font-weight: 600;
  margin: 0;
}

/* CAPACITY BAR */
.modal-bar-wrap { margin-bottom: 22px; }
.modal-bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 7px;
}
.label-red   { color: #ef4444; font-weight: 600; }
.label-green { color: #22c55e; font-weight: 600; }

.modal-bar-bg {
  height: 8px;
  border-radius: 99px;
  background: #f3f4f6;
  overflow: hidden;
}
.modal-bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.5s ease;
}
.modal-bar-fill.ok      { background: #22c55e; }
.modal-bar-fill.warning { background: #f59e0b; }
.modal-bar-fill.danger  { background: #ef4444; }

/* CTA */
.modal-buy-btn {
  width: 100%;
  padding: 16px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.18s, transform 0.18s;
}
.modal-buy-btn:hover:not(:disabled) {
  background: #4f46e5;
  transform: scale(1.01);
}
.modal-buy-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>