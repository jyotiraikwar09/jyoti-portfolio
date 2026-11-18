// Initialize Lucide Icons
lucide.createIcons();

// ==================== 1. STUDIO PRELOADER ====================
window.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('loader-bar');
  const loader = document.getElementById('loader');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 32) + 22;
    if (progress >= 100) {
      progress = 100;
      bar.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden-loader');
        runHeroEntrance();
      }, 280);
    } else {
      bar.style.width = progress + '%';
    }
  }, 95);
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ==================== 2. SOFT STUDIO SPOTLIGHT & 3D CARD TILT ====================
const mouseAmbient = document.getElementById('mouse-ambient');

window.addEventListener('mousemove', (e) => {
  if (mouseAmbient) {
    mouseAmbient.style.background = `radial-gradient(680px circle at ${e.clientX}px ${e.clientY}px, rgba(226, 192, 141, 0.06), rgba(56, 189, 248, 0.03) 42%, transparent 75%)`;
  }
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});

// ==================== 3. HERO THREE.JS REALISTIC 3D HARDWARE STAGE ====================
(function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.15, 8.4);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Studio Three-Point Lighting (Key, Rim, Fill)
  const ambientLight = new THREE.AmbientLight(0xeef2ff, 0.65);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfff5e4, 1.8);
  keyLight.position.set(5, 6, 6);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x38BDF8, 2.4, 22);
  rimLight.position.set(-4.5, 2.5, 4);
  scene.add(rimLight);

  const warmBounce = new THREE.PointLight(0xE2C08D, 1.8, 18);
  warmBounce.position.set(3.5, -3, 3);
  scene.add(warmBounce);

  // Main Hero Group
  const heroGroup = new THREE.Group();
  heroGroup.position.set(window.innerWidth >= 1024 ? 2.45 : 0, window.innerWidth >= 1024 ? 0.05 : -1.15, 0);
  scene.add(heroGroup);

  // 1. High-DPI Realistic Flutter App Screen Canvas
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 600;
  screenCanvas.height = 1240;
  const ctx = screenCanvas.getContext('2d');

  function drawPhoneScreen(time) {
    // Sleek iOS/Android OLED Dark UI
    ctx.fillStyle = '#0B0D14';
    ctx.fillRect(0, 0, 600, 1240);

    // Subtle Top Ambient Header Glow
    const topGlow = ctx.createRadialGradient(300, 140, 20, 300, 140, 360);
    topGlow.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
    topGlow.addColorStop(1, 'rgba(11, 13, 20, 0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, 600, 500);

    // Dynamic Island Pill
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(215, 28, 170, 36, 18);
    ctx.fill();

    // Status Bar
    ctx.fillStyle = '#E4E4E7';
    ctx.font = '600 22px Inter, sans-serif';
    ctx.fillText('9:41', 46, 54);
    ctx.fillStyle = '#38BDF8';
    ctx.font = '600 19px JetBrains Mono, monospace';
    ctx.fillText('5G  100%', 455, 54);

    // Profile Header Card
    ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.beginPath();
    ctx.roundRect(38, 102, 524, 215, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Avatar Badge
    const badgeGrad = ctx.createLinearGradient(66, 132, 134, 200);
    badgeGrad.addColorStop(0, '#E2C08D');
    badgeGrad.addColorStop(1, '#38BDF8');
    ctx.fillStyle = badgeGrad;
    ctx.beginPath();
    ctx.roundRect(66, 132, 68, 68, 20);
    ctx.fill();

    ctx.fillStyle = '#090A0F';
    ctx.font = '800 28px Plus Jakarta Sans, sans-serif';
    ctx.fillText('JR', 82, 176);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 32px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Jyoti Raikwar', 154, 164);

    ctx.fillStyle = '#A1A1AA';
    ctx.font = '500 21px Inter, sans-serif';
    ctx.fillText('Flutter & Mobile Developer', 154, 198);

    // Live Build Tag
    ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
    ctx.beginPath();
    ctx.roundRect(66, 232, 275, 46, 14);
    ctx.fill();
    ctx.fillStyle = '#34D399';
    ctx.font = '600 19px JetBrains Mono, monospace';
    ctx.fillText('● Production Build Ready', 84, 261);

    // Section Label
    ctx.fillStyle = '#71717A';
    ctx.font = '600 18px JetBrains Mono, monospace';
    ctx.fillText('SHIPPED APPLICATIONS', 44, 372);

    // Realistic App List Cards
    const apps = [
      { title: 'Mahakal.com', desc: 'Darshan • Donations • Razorpay', accent: '#E2C08D', y: 400 },
      { title: 'Mandir Verse', desc: 'Bilingual Temple & Devotional App', accent: '#38BDF8', y: 590 },
      { title: 'AuraTalk / Voice Club', desc: 'User & Partner Voice Ecosystem', accent: '#F472B6', y: 780 },
    ];

    apps.forEach((item, i) => {
      const floatY = Math.sin(time * 1.6 + i * 0.9) * 4;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.beginPath();
      ctx.roundRect(38, item.y + floatY, 524, 162, 26);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Left Accent Bar
      ctx.fillStyle = item.accent;
      ctx.beginPath();
      ctx.roundRect(62, item.y + 34 + floatY, 8, 94, 4);
      ctx.fill();

      ctx.fillStyle = '#F4F4F6';
      ctx.font = '700 28px Plus Jakarta Sans, sans-serif';
      ctx.fillText(item.title, 92, item.y + 72 + floatY);

      ctx.fillStyle = '#A1A1AA';
      ctx.font = '400 21px Inter, sans-serif';
      ctx.fillText(item.desc, 92, item.y + 112 + floatY);
    });

    // Bottom iOS Dock Bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.roundRect(80, 1095, 440, 82, 41);
    ctx.fill();

    // Home Indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.roundRect(220, 1205, 160, 7, 3.5);
    ctx.fill();
  }

  drawPhoneScreen(0);
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.anisotropy = 4;

  // 2. Realistic Brushed Titanium Smartphone Chassis
  const phoneGroup = new THREE.Group();

  const chassisGeo = new THREE.BoxGeometry(2.12, 4.32, 0.19);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x232634,
    metalness: 0.9,
    roughness: 0.22,
  });
  const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
  phoneGroup.add(chassisMesh);

  // Side Hardware Buttons (Volume & Power)
  const btnMat = new THREE.MeshStandardMaterial({ color: 0x3A3F54, metalness: 0.92, roughness: 0.2 });
  const powerBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.06), btnMat);
  powerBtn.position.set(1.07, 0.55, 0);
  const volUpBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.06), btnMat);
  volUpBtn.position.set(-1.07, 0.72, 0);
  const volDownBtn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.06), btnMat);
  volDownBtn.position.set(-1.07, 0.28, 0);
  phoneGroup.add(powerBtn, volUpBtn, volDownBtn);

  // Glass Screen Surface
  const screenGeo = new THREE.PlaneGeometry(1.96, 4.14);
  const screenMat = new THREE.MeshPhysicalMaterial({
    map: screenTexture,
    roughness: 0.12,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.z = 0.098;
  phoneGroup.add(screenMesh);

  heroGroup.add(phoneGroup);

  // 3. Sculpted Metallic Flutter Emblem (Floating beside phone)
  const flutterGroup = new THREE.Group();
  flutterGroup.position.set(-1.85, 1.35, 0.55);

  const flutterUpperMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    metalness: 0.65,
    roughness: 0.2,
  });
  const flutterLowerMat = new THREE.MeshStandardMaterial({
    color: 0x0284C7,
    metalness: 0.7,
    roughness: 0.22,
  });

  const upperWing = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.24, 0.1), flutterUpperMat);
  upperWing.rotation.z = Math.PI / 4;
  upperWing.position.set(0, 0.2, 0);

  const lowerWing = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.24, 0.1), flutterLowerMat);
  lowerWing.rotation.z = -Math.PI / 4;
  lowerWing.position.set(0.11, -0.16, 0.04);

  flutterGroup.add(upperWing, lowerWing);
  heroGroup.add(flutterGroup);

  // 4. Precision Machined Orbital Ring (Subtle architectural accent)
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.65, 0.012, 16, 120),
    new THREE.MeshStandardMaterial({
      color: 0xE2C08D,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.45,
    })
  );
  orbitRing.rotation.x = Math.PI / 2.4;
  orbitRing.rotation.y = 0.25;
  heroGroup.add(orbitRing);

  // 5. Minimal Ambient Dust Motes (Subtle depth)
  const dustCount = 220;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount * 3; i += 3) {
    dustPos[i] = (Math.random() - 0.5) * 16;
    dustPos[i + 1] = (Math.random() - 0.5) * 11;
    dustPos[i + 2] = (Math.random() - 0.5) * 9 - 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xE2C08D,
    size: 0.032,
    transparent: true,
    opacity: 0.35,
  });
  const dustField = new THREE.Points(dustGeo, dustMat);
  scene.add(dustField);

  // Smooth Mouse Parallax
  let targetRotX = 0;
  let targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetRotY = nx * 0.34;
    targetRotX = ny * 0.18;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    heroGroup.position.set(window.innerWidth >= 1024 ? 2.45 : 0, window.innerWidth >= 1024 ? 0.05 : -1.15, 0);
  });

  const clock = new THREE.Clock();
  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    frame++;
    if (frame % 3 === 0) {
      drawPhoneScreen(t);
      screenTexture.needsUpdate = true;
    }

    phoneGroup.position.y = Math.sin(t * 1.2) * 0.12;
    phoneGroup.rotation.y += (targetRotY - 0.24 - phoneGroup.rotation.y) * 0.055;
    phoneGroup.rotation.x += (targetRotX - phoneGroup.rotation.x) * 0.055;

    flutterGroup.rotation.y = Math.sin(t * 0.8) * 0.45 + 0.3;
    flutterGroup.position.y = 1.35 + Math.cos(t * 1.5) * 0.1;

    orbitRing.rotation.z = t * 0.14;
    dustField.rotation.y = t * 0.02;

    renderer.render(scene, camera);
  }
  animate();
})();

// ==================== 4. 3D SKILL CONSTELLATION UNIVERSE ====================
const skillsData = [
  { name: 'Flutter', category: 'Mobile Development', core: true, color: '#38BDF8', desc: 'Cross-platform mobile UI framework for crafting high-performance native Android & iOS applications from a single codebase.' },
  { name: 'Dart', category: 'Mobile Development', core: true, color: '#E2C08D', desc: 'Client-optimized strongly-typed programming language powering reactive Flutter widget trees and asynchronous data flows.' },
  { name: 'Android Development', category: 'Mobile Development', core: false, color: '#7DD3FC', desc: 'Native Android lifecycle management, permissions, Gradle builds, and device compatibility.' },
  { name: 'Responsive UI', category: 'Mobile Development', core: false, color: '#93C5FD', desc: 'Adaptive layouts and custom widget hierarchies calibrated across varied mobile screen dimensions.' },
  { name: 'State Management', category: 'Mobile Development', core: false, color: '#60A5FA', desc: 'Predictable application state flow, separation of business logic, and clean rebuild optimization.' },

  { name: 'REST APIs', category: 'Backend & APIs', core: false, color: '#818CF8', desc: 'Structured JSON data consumption, token headers, error handling, and real-time client-server synchronization.' },
  { name: 'Node.js', category: 'Backend & APIs', core: false, color: '#A5B4FC', desc: 'Event-driven JavaScript runtime for backend services and API middleware.' },
  { name: 'Express.js', category: 'Backend & APIs', core: false, color: '#6366F1', desc: 'Lightweight web framework for structuring RESTful endpoints and routing layers.' },
  { name: 'PHP', category: 'Backend & APIs', core: false, color: '#94A3B8', desc: 'Server-side scripting for dynamic web backends and enterprise portals.' },
  { name: 'Laravel', category: 'Backend & APIs', core: false, color: '#FB7185', desc: 'Modern MVC PHP framework powering secure authentication, admin panels, and structured APIs.' },
  { name: 'MySQL', category: 'Backend & APIs', core: false, color: '#38BDF8', desc: 'Relational database schema design, indexing, and structured query execution.' },

  { name: 'Firebase Authentication', category: 'Firebase & Integrations', core: false, color: '#FBBF24', desc: 'Secure user sign-in workflows including OTP, email/password, and session management.' },
  { name: 'Firebase Cloud Messaging', category: 'Firebase & Integrations', core: false, color: '#F59E0B', desc: 'Real-time push notification delivery and topic-based user engagement.' },
  { name: 'Push Notifications', category: 'Firebase & Integrations', core: false, color: '#FCD34D', desc: 'Foreground and background alert pipelines with deep-link routing.' },
  { name: 'Razorpay Integration', category: 'Firebase & Integrations', core: false, color: '#38BDF8', desc: 'In-app checkout, order verification, donations, and subscription payment flows.' },
  { name: 'Payment Gateway Integration', category: 'Firebase & Integrations', core: false, color: '#34D399', desc: 'End-to-end digital transaction handling with callback validation and receipts.' },

  { name: 'Git', category: 'Tools & Workflow', core: false, color: '#F472B6', desc: 'Distributed version control, branching strategies, and clean commit history.' },
  { name: 'GitHub', category: 'Tools & Workflow', core: false, color: '#E4E4E7', desc: 'Collaborative repositories, pull request reviews, and codebase management.' },
  { name: 'Postman', category: 'Tools & Workflow', core: false, color: '#FB923C', desc: 'API endpoint testing, payload inspection, and environment debugging.' },
  { name: 'Android Studio', category: 'Tools & Workflow', core: false, color: '#4ADE80', desc: 'Android SDK profiling, emulator testing, and Flutter device debugging.' },
  { name: 'VS Code', category: 'Tools & Workflow', core: false, color: '#60A5FA', desc: 'Fast Flutter/Dart development workflow with DevTools, linters, and Git integration.' },
  { name: 'Agile Methodology', category: 'Tools & Workflow', core: false, color: '#E2C08D', desc: 'Iterative sprint planning, cross-team coordination, and milestone-driven delivery.' },
];

// Render Directory Sidebar
const skillDirectoryEl = document.getElementById('skill-directory');
const categories = ['Mobile Development', 'Backend & APIs', 'Firebase & Integrations', 'Tools & Workflow'];

function renderSkillDirectory(activeCat = 'all') {
  if (!skillDirectoryEl) return;
  skillDirectoryEl.innerHTML = '';

  categories
    .filter((cat) => activeCat === 'all' || cat === activeCat)
    .forEach((cat) => {
      const items = skillsData.filter((s) => s.category === cat);
      const block = document.createElement('div');
      block.innerHTML = `
        <p class="font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">${cat}</p>
        <div class="flex flex-wrap gap-1.5">
          ${items
            .map(
              (item) => `
            <button
              onclick="selectSkillByName('${item.name}')"
              class="px-2.5 py-1 rounded-lg text-[11px] transition-all border ${
                item.core
                  ? 'bg-flutterSky/15 border-flutterSky/40 text-flutterSky font-semibold'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-300 hover:border-champagne/40 hover:text-white'
              }"
            >
              ${item.name}
            </button>
          `
            )
            .join('')}
        </div>
      `;
      skillDirectoryEl.appendChild(block);
    });
}
renderSkillDirectory();

function selectSkillByName(name) {
  const skill = skillsData.find((s) => s.name === name);
  if (!skill) return;
  document.getElementById('insp-cat').textContent = skill.core ? `${skill.category} • Core` : skill.category;
  document.getElementById('insp-name').textContent = skill.name;
  document.getElementById('insp-desc').textContent = skill.desc;
}

// Three.js 3D Skill Constellation
(function initSkillsUniverse() {
  const canvas = document.getElementById('skills-canvas');
  const wrapper = document.getElementById('skill-canvas-wrapper');
  const tooltip = document.getElementById('skill-tooltip');
  if (!canvas || !wrapper || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, wrapper.clientWidth / wrapper.clientHeight, 0.1, 100);
  camera.position.z = 11.5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dirLight = new THREE.DirectionalLight(0xfff5e4, 1.5);
  dirLight.position.set(6, 6, 8);
  scene.add(dirLight);

  const constellation = new THREE.Group();
  scene.add(constellation);

  const nodeMeshes = [];
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3F445E, transparent: true, opacity: 0.35 });

  const nonCore = skillsData.filter((s) => !s.core);
  let nonCoreIdx = 0;

  skillsData.forEach((skill) => {
    const radius = skill.core ? 0.54 : 0.25;
    const geo = new THREE.SphereGeometry(radius, 28, 28);
    const mat = new THREE.MeshStandardMaterial({
      color: skill.color,
      emissive: skill.color,
      emissiveIntensity: skill.core ? 0.28 : 0.14,
      roughness: 0.25,
      metalness: 0.55,
    });

    const mesh = new THREE.Mesh(geo, mat);

    if (skill.name === 'Flutter') {
      mesh.position.set(-0.92, 0.22, 0.35);
    } else if (skill.name === 'Dart') {
      mesh.position.set(0.92, -0.22, 0.35);
    } else {
      const i = nonCoreIdx++;
      const total = nonCore.length;
      const phi = Math.acos(-1 + (2 * i + 1) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      const r = 4.25;
      mesh.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }

    if (skill.core) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.018, 16, 64),
        new THREE.MeshBasicMaterial({ color: skill.color, transparent: true, opacity: 0.55 })
      );
      mesh.add(ring);
    }

    mesh.userData = skill;
    constellation.add(mesh);
    nodeMeshes.push(mesh);

    if (!skill.core) {
      const targetCore = mesh.position.x < 0 ? new THREE.Vector3(-0.92, 0.22, 0.35) : new THREE.Vector3(0.92, -0.22, 0.35);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([mesh.position, targetCore]);
      constellation.add(new THREE.Line(lineGeo, lineMaterial));
    } else if (skill.name === 'Flutter') {
      const bridgeGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.92, 0.22, 0.35),
        new THREE.Vector3(0.92, -0.22, 0.35),
      ]);
      constellation.add(
        new THREE.Line(bridgeGeo, new THREE.LineBasicMaterial({ color: 0xE2C08D, transparent: true, opacity: 0.65 }))
      );
    }
  });

  // Category Filter Pills
  document.querySelectorAll('.skill-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.skill-filter-btn').forEach((b) => {
        b.classList.remove('active', 'bg-white', 'text-obsidian');
        b.classList.add('studio-card', 'text-zinc-300');
      });
      btn.classList.add('active', 'bg-white', 'text-obsidian');
      btn.classList.remove('studio-card', 'text-zinc-300');

      const cat = btn.dataset.cat;
      renderSkillDirectory(cat);

      nodeMeshes.forEach((m) => {
        const match = cat === 'all' || m.userData.category === cat || m.userData.core;
        m.material.opacity = match ? 1 : 0.16;
        m.material.transparent = !match;
        m.scale.setScalar(match ? 1 : 0.72);
      });
    });
  });

  // Drag Orbit & Raycasting Hover
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-99, -99);

  wrapper.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  wrapper.addEventListener('pointermove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      constellation.rotation.y += dx * 0.0065;
      constellation.rotation.x += dy * 0.0065;
      prevX = e.clientX;
      prevY = e.clientY;
    }

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(nodeMeshes);

    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const skill = hitObj.userData;
      wrapper.style.cursor = 'pointer';

      tooltip.classList.remove('hidden');
      tooltip.style.left = `${Math.min(e.clientX - rect.left + 14, rect.width - 250)}px`;
      tooltip.style.top = `${Math.min(e.clientY - rect.top + 14, rect.height - 110)}px`;
      document.getElementById('tooltip-title').textContent = skill.name;
      document.getElementById('tooltip-cat').textContent = skill.category;
      document.getElementById('tooltip-desc').textContent = skill.desc;
      document.getElementById('tooltip-dot').style.backgroundColor = skill.color;

      selectSkillByName(skill.name);
    } else {
      wrapper.style.cursor = isDragging ? 'grabbing' : 'grab';
      tooltip.classList.add('hidden');
    }
  });

  window.addEventListener('resize', () => {
    if (!wrapper.clientWidth) return;
    camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  });

  function animateSkills() {
    requestAnimationFrame(animateSkills);
    if (!isDragging) {
      constellation.rotation.y += 0.0025;
    }
    nodeMeshes.forEach((m) => {
      if (m.userData.core && m.children[0]) {
        m.children[0].rotation.z += 0.015;
        m.children[0].rotation.x += 0.008;
      }
    });
    renderer.render(scene, camera);
  }
  animateSkills();
})();

// ==================== 5. PROJECT ARCHITECTURE MODAL ====================
const projectDetails = {
  mahakal: {
    tag: 'Spiritual Digital Ecosystem',
    title: 'Mahakal.com',
    overview:
      'A multi-surface spiritual digital platform encompassing mobile applications, web interfaces, and backend APIs designed to streamline devotee services and vendor workflows.',
    bullets: [
      'Developed core Flutter mobile application interfaces and state flows.',
      'Integrated REST APIs for dynamic content, bookings, and user profiles.',
      'Configured Firebase Cloud Messaging (FCM) for real-time push notifications.',
      'Implemented Razorpay payment gateway and recurring subscription workflows.',
      'Engineered Darshan, donation, and vendor-related functional modules.',
      'Led product coordination and cross-functional team collaboration.',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Firebase Push Notifications', 'Razorpay', 'Product Coordination'],
  },
  mandir: {
    tag: 'Devotional Mobile Application',
    title: 'Mandir Verse',
    overview:
      'A dedicated temple and devotional mobile application delivering curated spiritual content with bilingual Hindi and English support.',
    bullets: [
      'Built structured temple and devotional browsing experiences in Flutter.',
      'Integrated RESTful APIs for dynamic devotional content delivery.',
      'Implemented seamless Hindi and English bilingual content switching.',
      'Crafted a clean, accessible, and modern mobile user interface.',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Hindi & English Localization', 'Modern Mobile UI'],
  },
  auratalk: {
    tag: 'Dual-App Voice Social Concept',
    title: 'AuraTalk / Voice Club',
    overview:
      'A voice-based social application concept architected as two dedicated companion apps: a User application and a Partner/Host application.',
    bullets: [
      'Designed and built responsive mobile UI flows for both User and Partner apps.',
      'Focused on intuitive audio-room interaction and smooth user experience.',
      'Structured modular Flutter application architecture for scalable feature expansion.',
    ],
    tech: ['Flutter', 'Dart', 'Mobile UI/UX', 'Dual-App Architecture'],
  },
  kadtech: {
    tag: 'Full-Stack Recruitment & Job Portal',
    title: 'Kadtech HR Solutions',
    overview:
      'A web-based recruitment and job portal connecting candidates and hiring teams with structured job listings and administrative controls.',
    bullets: [
      'Built dynamic job listings and candidate recruitment workflows.',
      'Implemented interactive contact and inquiry forms connected via REST APIs.',
      'Developed administrative management features backed by Laravel, PHP, and MySQL.',
      'Delivered a fully responsive web interface using React.js.',
    ],
    tech: ['React.js', 'Laravel', 'PHP', 'MySQL', 'REST APIs', 'Responsive Design'],
  },
};

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;
  document.getElementById('modal-tag').textContent = data.tag;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-overview').textContent = data.overview;
  document.getElementById('modal-bullets').innerHTML = data.bullets
    .map((b) => `<li class="flex items-start gap-2"><span class="text-champagne mt-0.5">▹</span><span>${b}</span></li>`)
    .join('');
  document.getElementById('modal-tech').innerHTML = data.tech
    .map((t) => `<span class="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[11px] text-flutterSky">${t}</span>`)
    .join('');
  document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.add('hidden');
}

document.getElementById('project-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') closeProjectModal();
});

// ==================== 6. RESUME GENERATOR & DOWNLOAD ====================
function downloadResume() {
  const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Jyoti Raikwar - Flutter Developer Resume</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #111827; max-width: 820px; margin: 32px auto; padding: 0 24px; line-height: 1.5; }
  h1 { margin: 0; font-size: 28px; color: #0F172A; }
  .subtitle { color: #0284C7; font-weight: 600; font-size: 15px; margin-top: 2px; }
  .meta { font-size: 12.5px; color: #4B5563; margin-top: 6px; border-bottom: 2px solid #E5E7EB; padding-bottom: 12px; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #0F172A; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-top: 20px; }
  .role { display: flex; justify-content: space-between; font-weight: 700; font-size: 14.5px; margin-top: 10px; }
  .org { font-weight: 600; color: #374151; font-size: 13.5px; }
  ul { margin: 6px 0 12px 18px; padding: 0; font-size: 13px; color: #1F2937; }
  li { margin-bottom: 4px; }
  .skills-grid { font-size: 13px; }
  .skills-grid p { margin: 4px 0; }
  @media print { .no-print { display: none; } }
</style>
</head>
<body>
  <div class="no-print" style="background:#F4F4F5;padding:10px 14px;border-radius:8px;margin-bottom:18px;font-size:13px;display:flex;justify-content:space-between;align-items:center;">
    <span><strong>Jyoti Raikwar — Resume</strong> (Update contact placeholders before sharing)</span>
    <button onclick="window.print()" style="background:#090A0F;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:600;">Print / Save as PDF</button>
  </div>
  <h1>JYOTI RAIKWAR</h1>
  <div class="subtitle">Flutter Developer | Software Engineer (B.Tech Information Technology)</div>
  <div class="meta">India • Email: [jyoti.raikwar@example.com] • LinkedIn: [Add LinkedIn URL] • GitHub: [Add GitHub URL]</div>

  <h2>Summary</h2>
  <p style="font-size:13px;">B.Tech Information Technology graduate (8.78 CGPA) with hands-on experience in Flutter mobile application development, Dart, REST API integration, Firebase services, payment gateway integrations, and end-to-end product coordination.</p>

  <h2>Professional Experience</h2>
  <div class="role"><span>Product Development Coordinator / Flutter Developer</span><span>~2 Years</span></div>
  <div class="org">Mahakal Astrotech Pvt. Ltd.</div>
  <ul>
    <li>Developed and maintained cross-platform mobile applications using Flutter and Dart.</li>
    <li>Integrated REST APIs, Firebase services (Authentication, Cloud Messaging), and Razorpay payment gateways.</li>
    <li>Coordinated product planning, feature delivery, team workflows, and client communication.</li>
  </ul>

  <div class="role"><span>Android Development Intern (Flutter)</span><span>January 2024 – June 2024</span></div>
  <div class="org">Manal Softech Pvt. Ltd.</div>
  <ul>
    <li>Implemented responsive mobile UI components in Flutter and Dart.</li>
    <li>Integrated REST APIs, Firebase modules, and Git-based collaborative workflows.</li>
    <li>Performed application debugging and performance improvements.</li>
  </ul>

  <h2>Key Projects</h2>
  <ul>
    <li><strong>Mahakal.com:</strong> Spiritual digital platform with Flutter mobile app, REST APIs, Firebase push notifications, Razorpay subscriptions, and Darshan/donation/vendor modules.</li>
    <li><strong>Mandir Verse:</strong> Temple and devotional Flutter application featuring API-based data integration and Hindi &amp; English bilingual support.</li>
    <li><strong>AuraTalk / Voice Club:</strong> Voice-based social application concept architected with separate User and Partner Flutter apps.</li>
    <li><strong>Kadtech HR Solutions:</strong> Recruitment and job portal built with React.js, Laravel, PHP, MySQL, and REST APIs.</li>
  </ul>

  <h2>Technical Skills</h2>
  <div class="skills-grid">
    <p><strong>Mobile Development:</strong> Flutter, Dart, Android Development, Responsive UI, State Management</p>
    <p><strong>Backend &amp; APIs:</strong> REST APIs, Node.js, Express.js, PHP, Laravel, MySQL</p>
    <p><strong>Firebase &amp; Integrations:</strong> Firebase Authentication, Firebase Cloud Messaging, Push Notifications, Razorpay Integration, Payment Gateway Integration</p>
    <p><strong>Tools &amp; Workflow:</strong> Git, GitHub, Postman, Android Studio, VS Code, Agile Methodology</p>
  </div>

  <h2>Education</h2>
  <div class="role"><span>B.Tech – Information Technology (CGPA: 8.78)</span><span>2020 – 2024</span></div>
  <div class="org">Mahakal Institute of Technology, Ujjain • RGPV University</div>
</body>
</html>`;

  const blob = new Blob([resumeHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jyoti_Raikwar_Flutter_Developer_Resume.html';
    a.click();
  }
}

// ==================== 7. CONTACT FORM ====================
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('sender-name').value.trim();
  const subject = document.getElementById('sender-subject').value;
  const feedback = document.getElementById('form-feedback');

  feedback.textContent = `Thank you, ${name}! Your message regarding "${subject}" is ready. Please reach out via email or LinkedIn to connect directly.`;
  feedback.classList.remove('hidden');
  e.target.reset();
});

// ==================== 8. GSAP ENTRANCE & SCROLL ANIMATIONS ====================
function runHeroEntrance() {
  if (!window.gsap) return;
  gsap.from('.hero-stagger > *', {
    y: 22,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('section:not(#hero)').forEach((sec) => {
    gsap.from(sec, {
      opacity: 0,
      y: 28,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        once: true,
      },
    });
  });
}