(function() {
    'use strict';

    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [], time = 0;
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }
    
    function initParticles() {
        const count = Math.floor(width * height / 6000);
        particles = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 50 + Math.random() * 400;
            particles.push({
                angle, radius,
                speed: 0.002 + Math.random() * 0.006,
                size: 1 + Math.random() * 3,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    function drawBackground() {
        time += 0.005;
        ctx.fillStyle = '#0a0406';
        ctx.fillRect(0, 0, width, height);
        
        const centerX = width / 2, centerY = height / 2;
        
        for (let arm = 0; arm < 3; arm++) {
            const armOffset = (arm * Math.PI * 2) / 3;
            for (let i = 0; i < 200; i++) {
                const t = i / 200;
                const spiralR = 50 + t * 500;
                const spiralAngle = time * 2 + armOffset + t * 15;
                const x = centerX + Math.cos(spiralAngle) * spiralR;
                const y = centerY + Math.sin(spiralAngle) * spiralR;
                const alpha = (1 - t) * 0.08;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 35);
                grad.addColorStop(0, `rgba(198, 40, 40, ${alpha})`);
                grad.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(x, y, 30, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }
        }
        
        particles.forEach(p => {
            p.angle += p.speed;
            p.radius += 0.1;
            if (p.radius > 500) p.radius = 50;
            
            const x = centerX + Math.cos(p.angle) * p.radius;
            const y = centerY + Math.sin(p.angle) * p.radius;
            const opacity = 0.25 + Math.sin(time * 4 + p.pulse) * 0.1;
            
            const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 5);
            grad.addColorStop(0, `rgba(220, 50, 50, ${opacity})`);
            grad.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            
            ctx.fillStyle = `rgba(255, 80, 80, ${opacity * 1.2})`;
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(drawBackground);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawBackground();

    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('pageTitle');
    const pageContent = document.getElementById('pageContent');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    const contentDB = {
        main: {
    title: 'Фракция демонов',
    html: `
        <div class="creator-card">
            <div class="creator-avatar">O_o</div>
            <div class="creator-info">
                <h3>Мудзан Кибуцуджи</h3>
                <p><i class="fas fa-user"></i> Создатель сайта, Прародитель демонов</p>
                <p><i class="fab fa-discord"></i> livgard</p>
            </div>
        </div>
        <div class="info-card">
            <p>Демоны — преимущественно плотоядный, вампирический вид, основной пищей которых являются люди. Солнечный свет смертельно опасен для них и сожжёт дотла, поэтому вся активность исключительно ночная. Демоны обладают аномально мощными физическими характеристиками и способностью к регенерации, что делает их невосприимчивыми к обычному оружию и даёт возможность с лёгкостью восстанавливаться после любой раны, включая повторное отращивание головы.</p>
        </div>
        <h3>Быстрый доступ</h3>
        <div class="quick-tabs">
            <div class="quick-tab" data-nav="oath"><i class="fas fa-scroll"></i><span>Клятва крови</span></div>
            <div class="quick-tab" data-nav="promotion"><i class="fas fa-arrow-up"></i><span>Повышение</span></div>
            <div class="quick-tab" data-nav="territories"><i class="fas fa-map"></i><span>Территории</span></div>
            <div class="quick-tab" data-nav="duels"><i class="fas fa-crosshairs"></i><span>Дуэли крови</span></div>
            <div class="quick-tab" data-nav="limits"><i class="fas fa-tint"></i><span>Повышение предела</span></div>
            <div class="quick-tab" data-nav="coven"><i class="fas fa-gavel"></i><span>Закон Ковена</span></div>
        </div>
    `
},
        oath: {
            title: 'Клятвы крови',
            html: `
                <div class="info-card">
                    <h3>Иерархия</h3>
                    <p style="font-family:monospace;text-align:center;padding:1.5rem;background:hsl(var(--primary)/0.05);border-radius:var(--radius-lg);">Прародитель<br>↓<br>Высшие Луны<br>↓<br>Низшие Луны<br>↓<br>Кровавая Элита | Пятый Предел<br>↓<br>CMD<br>↓<br>Командиры | D.CMD | Старший Инструктор<br>↓<br>Зам. командиров | Третий Предел<br>↓<br>Второй Предел<br>↓<br>Лунный Аколит<br>↓<br>Первый предел<br>↓<br>Демоны без должности</p>
                    <h3>Общие положения</h3>
                    <ul class="rule-list">
                        <li>Каждый демон обязан подчиняться вышестоящему по иерархии. Исключение: Демоны 12 лун, Прародитель.</li>
                        <li>Луны не обязаны подчиняться друг другу. Решения оспариваются дуэлью крови.</li>
                        <li>При виде луны падать ниц. Общение уважительное.</li>
                        <li>Боевые действия вне додзё караются.</li>
                        <li>Запрет на магию крови для атаки вне додзё.</li>
                    </ul>
                </div>
            `
        },
        promotion: {
            title: 'Система повышения',
            html: `
                <div class="info-card">
                    <h3>Ограничение на повышение</h3>
                    <ul class="rule-list">
                        <li><strong>Otokuma / Demon</strong> — 1 день</li>
                        <li><strong>Keykon / Hofuma / Chisuma / Chikuma</strong> — 2 дня</li>
                        <li><strong>Asakuma / Hobura / Shateigashira / Wakagashira / Tsukomon / Shiko</strong> — 3 дня</li>
                    </ul>
                    <div class="note-block">Кд сбрасываются в 0:00. Пример: повышение в 22:00 09.03 → следующее 10.03 в 0:10</div>
                </div>
                <div class="tabs-container" id="rankTabs"></div>
                <div class="tab-content" id="rankContent"><p>Выберите ранг для просмотра требований</p></div>
            `
        },
        territories: {
            title: 'Территории',
            html: `
                <h3>Комнаты цитадели</h3>
                <div class="gallery-grid" id="galleryGrid"></div>
                <h3>Вне цитадели</h3>
                <div class="gallery-grid" id="galleryOutside"></div>
                <div class="info-card">
                    <h4>Отрядные комнаты</h4>
                    <ul class="rule-list"><li>Комната Лисов — 1 этаж</li><li>Комната Песка — 2 этаж</li><li>Комната Хаос — 3 этаж</li><li>Комната Церберы — 4 этаж</li></ul>
                    <h4>Малые додзё</h4>
                    <ul class="rule-list"><li>Дальняя левая — Инструктора</li><li>Ближняя левая — Мрак</li><li>Дальняя правая — Отрёкшиеся</li><li>Ближняя правая — Раншики</li></ul>
                </div>
            `
        },
        duels: {
            title: 'Дуэли Крови',
            html: `
                <div class="info-card">
                    <h3>Основное понятие</h3>
                    <p>Дуэль Крови — поединок между двумя демонами для доказательства силы. Вызванный может выставить ответные условия.</p>
                    <h3>Порядок проведения</h3>
                    <ol class="rule-list"><li>Вызов</li><li>Ожидание (24 часа)</li><li>Организация (Аказа)</li><li>Бой (3 раунда)</li><li>Клятва крови</li></ol>
                    <h3>Правила</h3>
                    <ul class="rule-list"><li>Вызывать равного или выше (с Хофума).</li><li>2 отказа, после дуэли сброс.</li><li>Ответ в течение 24 часов.</li><li>Запрещены баффы.</li></ul>
                </div>
            `
        },
        limits: {
            title: 'Повышение предела',
            html: `
                <div class="info-card">
                    <h3>Пределы крови (HDS 1 → HDS 5)</h3>
                    <div class="note-block">Задержка 3 дня. Почетанием закрыть 1 пункт.</div>
                </div>
                <div class="tabs-container" id="limitTabs"></div>
                <div class="tab-content" id="limitContent"><p>Выберите предел для просмотра требований</p></div>
            `
        },
        coven: {
            title: 'Закон Ковена',
            html: `
                <div class="info-card" style="text-align:center;padding:4rem 2rem;">
                    <i class="fas fa-lock" style="font-size:3rem;color:hsl(var(--primary));margin-bottom:1.5rem;"></i>
                    <h3 style="border:none;padding:0;">Недоступно</h3>
                    <p style="opacity:0.6;">Данный раздел находится в разработке</p>
                </div>
            `
        }
    };

    const rankDetails = {
        'Otokuma → Demon': '<ul class="rule-list"><li>Пройти проверку клятвы крови.</li><li>Прослушать лекцию от инструктора+</li><li>Получить одобрение от инструктора+</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 1 день</span></p>',
        'Demon → Keykon': '<ul class="rule-list"><li>Захватить три точки с демоном 12 лун.</li><li>Убить 4 истребителей.</li><li>Тренировка от Кровавой элиты.</li><li>Обряд просвещения от инструктора+</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 1 день</span></p>',
        'Keykon → Hofuma': '<ul class="rule-list"><li>Поручение от демона 12 лун.</li><li>Похитить истребителя, выпытать информацию.</li><li>Убить 3 истребителей, сделать украшение.</li><li>Одобрение демона 12 лун.</li></ul><div class="note-block">"Демон малой крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Hofuma → Chisuma': '<ul class="rule-list"><li>Вызвать на дуэль крови любого демона.</li><li>Проверка конспирации у инструктора+</li><li>Задание от демона 12 лун + одобрение.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Chisuma → Chikuma': '<ul class="rule-list"><li>Мероприятие от инструктора+</li><li>Клятва Доуме (или Аказе/Кокушибе).</li><li>Участие в сборе на диверсию.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Chikuma → Asakuma': '<ul class="rule-list"><li>Проверка клятвы от первой тройки лун.</li><li>Убить 10 истребителей, подарок 6 луне.</li><li>Признание D.CMD+</li><li>2 мероприятия от элиты/лун.</li></ul><div class="note-block">"Демон средней крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Asakuma → Hobura': '<ul class="rule-list"><li>Одобрение первой тройки высших лун.</li><li>Украсть катану и хаори.</li><li>Похвала на тренировке.</li><li>Убить 15 истребителей.</li><li>Мероприятие Энму/Руи.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Hobura → Shateigashira': '<ul class="rule-list"><li>Подарок Высшей луне + реакция.</li><li>Собрать строй на вылазку/тренировку.</li><li>Убить 10 истребителей.</li><li>Битва крови с Низшей луной/элитой + одобрение.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Shateigashira → Wakagashira': '<ul class="rule-list"><li>Личная тренировка от инструктора+</li><li>Убить 30 истребителей.</li><li>Почтение от Высшей луны.</li><li>Одобрение Прародителя.</li></ul><div class="note-block">"Демон магии крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Wakagashira → Tsukomon': '<ul class="rule-list"><li>2 сбора строя.</li><li>Признание высшей луны.</li><li>Поручение прародителя.</li><li>Одобрение прародителя.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Tsukomon → Shiko': '<div class="note-block">Условия: четвёртый предел + первый Shiko в отряде</div><ul class="rule-list"><li>Поручение трёх первых лун.</li><li>3 тренировки от 3 лун.</li><li>Информация о голубой лилии.</li><li>Задание Руи.</li><li>Развить искусство крови.</li><li>Дуэль с 12 луной (50% хп).</li><li>Одобрение Прародителя.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>'
    };

    const limitDetails = {
        'HDS 1': '<ul class="rule-list"><li>Одобрение 2 демонов 12 лун.</li><li>Дуэль с HDS 4/5 или Низшей луной.</li><li>Ранг Tsukomon.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 2': '<ul class="rule-list"><li>Одобрение 2 высших лун.</li><li>Дуэль с высшей (40% хп).</li><li>HDS 1, 10 истребителей.</li><li>3 поручения 12 лун.</li></ul><div class="note-block">"Низшая Магия крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 3': '<ul class="rule-list"><li>4 поручения высших лун.</li><li>Дуэль с Д.КМД+.</li><li>HDS 2, тренировка, 2 сбора.</li></ul><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 4': '<ul class="rule-list"><li>4 поручения высших лун.</li><li>Дуэль с высшей (50% хп).</li><li>HDS 3, 20 истребителей.</li><li>Испытание, 10 точек.</li></ul><div class="note-block">Можно на Shiko</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 5': '<ul class="rule-list"><li>Ранг Shiko, одобрение Тройки.</li><li>HDS 4, поручение Прародителя.</li><li>25 истребителей, 3 сбора.</li><li>2 тренировки, почтение 3.</li></ul><div class="note-block">"Высшая Магия Крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>'
    };

    const territoryRules = {
        natagumo: '<h3> Гора Натагумо</h3><ul class="rule-list"><li>Не перечить Младшему Брату.</li><li>Не трогать ловушки.</li><li>Покинуть за 10 сек.</li><li>Не прыгать по крышам.</li><li>Главные — Семья Пауков.</li></ul>',
        otrekshiesya: '<h3> Дом Отрёкшихся</h3><ul class="rule-list"><li>Не перечить членам отряда.</li><li>Своя иерархия в доме.</li><li>Не создавать беспорядок.</li><li>Посещение с разрешения.</li></ul>'
    };

    function switchTab(pageId) {
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
        renderPage(pageId);
    }

    function renderPage(pageId) {
        const data = contentDB[pageId];
        if (!data) return;
        pageTitle.textContent = data.title;
        pageContent.innerHTML = data.html;

        if (pageId === 'main') {
            document.querySelectorAll('.quick-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const nav = tab.dataset.nav;
                    if (nav) switchTab(nav);
                });
            });
        }

        if (pageId === 'promotion') {
            const container = document.getElementById('rankTabs');
            const contentDiv = document.getElementById('rankContent');
            if (container) {
                container.innerHTML = '';
                Object.keys(rankDetails).forEach(rank => {
                    const btn = document.createElement('button');
                    btn.className = 'tab-btn'; btn.textContent = rank;
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('#rankTabs .tab-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        contentDiv.innerHTML = rankDetails[rank];
                    });
                    container.appendChild(btn);
                });
                container.firstChild?.classList.add('active');
                contentDiv.innerHTML = rankDetails[Object.keys(rankDetails)[0]];
            }
        }

        if (pageId === 'limits') {
            const container = document.getElementById('limitTabs');
            const contentDiv = document.getElementById('limitContent');
            if (container) {
                container.innerHTML = '';
                Object.keys(limitDetails).forEach(limit => {
                    const btn = document.createElement('button');
                    btn.className = 'tab-btn'; btn.textContent = limit;
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('#limitTabs .tab-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        contentDiv.innerHTML = limitDetails[limit];
                    });
                    container.appendChild(btn);
                });
                container.firstChild?.classList.add('active');
                contentDiv.innerHTML = limitDetails[Object.keys(limitDetails)[0]];
            }
        }

        if (pageId === 'territories') {
            const indoor = document.getElementById('galleryGrid');
            const outside = document.getElementById('galleryOutside');
            if (indoor) {
                const rooms = ['Отрядные', 'Додзё', 'Зал Высших', 'Зал Прародителя', 'Переход', 'Башня', 'Площадь', 'Полумесяц', 'Церберы'];
                const imgs = ['BWzrbRt', 'BWzi9zF', 'BWzsZAB', 'BWzLk0J', 'BWzQDEg', 'BWztgOQ', 'BWzbaFn', 'BWzmNsI', 'BWzynae'];
                indoor.innerHTML = rooms.map((n, i) => `<div class="gallery-item" data-terr="indoor${i}"><img src="https://iili.io/${imgs[i]}.png" alt="${n}" loading="lazy"><div class="gallery-label">${n}</div></div>`).join('');
            }
            if (outside) {
                outside.innerHTML = `
                    <div class="gallery-item" data-terr="natagumo"><img src="https://iili.io/BWzymoQ.png" alt="Гора" loading="lazy"><div class="gallery-label">Гора Натагумо</div></div>
                    <div class="gallery-item" data-terr="otrekshiesya"><img src="https://iili.io/BWIHr37.png" alt="Дом" loading="lazy"><div class="gallery-label">Дом Отрёкшихся</div></div>
                `;
            }
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', () => {
                    const t = item.dataset.terr;
                    if (t === 'natagumo') modalBody.innerHTML = territoryRules.natagumo;
                    else if (t === 'otrekshiesya') modalBody.innerHTML = territoryRules.otrekshiesya;
                    else modalBody.innerHTML = `<h3>${item.querySelector('.gallery-label').textContent}</h3><p>Описание локации.</p>`;
                    modal.classList.add('show');
                });
            });
        }
    }

    function closeMenu() { menuDropdown.classList.remove('show'); menuToggle.setAttribute('aria-expanded', 'false'); }
    function openMenu() { menuDropdown.classList.add('show'); menuToggle.setAttribute('aria-expanded', 'true'); }

    menuToggle.addEventListener('click', (e) => { e.stopPropagation(); menuDropdown.classList.contains('show') ? closeMenu() : openMenu(); });
    document.addEventListener('click', (e) => { if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) closeMenu(); });

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            closeMenu();
            renderPage(this.dataset.page);
        });
    });

    modalClose.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); modal.classList.remove('show'); } });

    renderPage('main');
})();