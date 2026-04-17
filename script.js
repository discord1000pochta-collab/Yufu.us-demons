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
                    <p style="font-family:monospace;text-align:center;padding:1.5rem;background:hsl(var(--primary)/0.05);border-radius:var(--radius-lg);">Прародитель Демонов<br>↓<br>Высшие Луны<br>↓<br>Низшие Луны<br>↓<br>Кровавая Элита | Пятый Предел<br>↓<br>Лунный Сенсей (CMD)<br>↓<br>Командиры Отрядов | Лунный Сенсей (D.CMD) | Старший Инструктор | Отец Паук | Наборный Шико<br>↓<br>Зам. командиров отряда | Лунный Мечник | Третий Предел | Мать Паук<br>↓<br>Второй Предел | Демон высшей магии крови (Без предела)<br>↓<br>Лунный Аколит | Сусамара/Яхаба<br>↓<br>Первый предел | Демон низшей магии крови (Без предела)<br>↓<br>Демоны без должности (По уменьшению ранга Shiko 🡢 ... 🡢 Otokuma)</p>
                    <h3>Общие положения</h3>
                    <ol class="rule-list">
                        <li>Каждый демон, не зависимо от того какой пост он занимает, обязан подчиниться приказу выше находящего по иерархии и проявлять уважение. Исключение: Демоны 12-ти лун. Прародитель.</li>
                        <li>Луны не обязаны подчиняться друг другу. Внутри низших и высших лун оспорить решения можно дуэлью крови. Низшие Луны не могут оспорить решения Высших Лун. Низшие по отношению к высшим лунам должны проявлять уважения.</li>
                        <li>При виде луны, каждый демон обязан падать ниц для приветствия или обращения к той или иной луне. Общение с лунами должно сопровождаться уважительным тоном.</li>
                        <li>Любые боевые действия вне додзё будут караться. Исключение: Демоны 12-ти лун и Прародитель.</li>
                        <li>Запрет на использование магии крови для атаки вне додзё. Магию Крови для передвижения можно использовать.</li>
                        <li>Демонам запрещено посещать отрядные комнаты, залы Высших/Низших лун и комнату Прародителя без их разрешения.</li>
                        <li>Луны обладают повышенным приоритетом приказов.</li>
                        <li>Согласно иерархии, демоны могут отдавать приказы нижестоящим по должности/рангу с ограничениями.</li>
                        <li>Запрещено неадекватное поведение и неуважение по отношению к демонам выше себя по иерархии.</li>
                        <li>Некорректным приказом является приказ, унижающий достоинство игрока.</li>
                    </ol>
                    <h3>Правила додзё</h3>
                    <ol class="rule-list">
                        <li>Запрещено наносить какой либо вред находящимся в додзё без причины или для вызова на бой. Исключение: Демоны 12-ти лун.</li>
                        <li>Запрещено влезать вне своей очереди. Запрещено вступать в начавшийся бой.</li>
                        <li>Запрещено приказывать сражаться с кем-либо. Исключение: Тренировка / приказ демона 12-ти лун / Прародителя.</li>
                        <li>Запрещено во время дуэли находиться рядом с наблюдающими с целью прикрыть себя.</li>
                        <li>Дуэлянтам запрещено покидать додзе во время активного боя. Исключение: Зов по телепатии / Приказ демона 12-ти лун / Прародителя.</li>
                    </ol>
                    <h3>Правила тренировок, мероприятий и построений</h3>
                    <ol class="rule-list">
                        <li>Между окончанием и началом тренировок / захватов / мероприятий должно пройти не менее 15 минут.</li>
                        <li>Запрещены однотипные, плохо разработанные тренировки.</li>
                        <li>Запрещено покидать мероприятия без веской причины.</li>
                        <li>На тренировке все участники должны слушаться проводящего.</li>
                        <li>В строю запрещено проявлять любую самовольность: разговаривать без разрешения, использовать эмоции, выходить из строя.</li>
                        <li>Во время строя падать ниц нужно только при виде Прародителя.</li>
                    </ol>
                    <h3>Устой крови</h3>
                    <p><strong>Типы наказаний:</strong> Физическое наказание, Предупреждение, Выговор, Строгий выговор.</p>
                    <p><strong>Применять наказания могут:</strong> Демоны от четвёртого предела, D.CMD/CMD Отрядов, Наборные Shiko, Инструктора, Главный Инструктор.</p>
                    <ol class="rule-list">
                        <li>Наличие выговора запрещает повышать ранг.</li>
                        <li>Наличие строгого выговора запрещает переводиться и повышать ранг.</li>
                        <li>Максимальное количество выговоров исключает из фракции с ЧС.</li>
                    </ol>
                    <h3>Почтения</h3>
                    <p>Почтения — награда, которая даёт возможность пропустить пункт (пункты) повышения. Всего есть четыре степени почтений.</p>
                    <ol class="rule-list">
                        <li>Первая степень почтения — позволяет пропустить один пункт повышения.</li>
                        <li>Вторая степень почтения — позволяет пропустить два пункта повышения.</li>
                        <li>Третья степень почтения — позволяет пропустить три пункта повышения.</li>
                        <li>Первородная Кровь — позволяет повыситься вне ограничений.</li>
                    </ol>
                    <h3>Правила Переводов</h3>
                    <ol class="rule-list">
                        <li>После перевода, на человека накладывается кд в течении недели.</li>
                        <li>Запрещено выдавать роли отряда без одобрения перевода с двух сторон.</li>
                        <li>Перевод разрешён лишь с ранга Кейкон.</li>
                        <li>Запрещено переводиться 2+ раз за месяц.</li>
                        <li>Запрещено переводить человека в отряд в случае действия кд.</li>
                    </ol>
                </div>
            `
        },
        promotion: {
            title: 'Система повышения',
            html: `
                <div class="info-card">
                    <h3>Ограничение на повышение</h3>
                    <ol class="rule-list">
                        <li><strong>Otokuma / Demon</strong> — Один день</li>
                        <li><strong>Keykon / Hofuma / Chisuma / Chikuma</strong> — Два дня</li>
                        <li><strong>Asakuma / Hobura / Shateigashira / Wakagashira / Tsukomon / Shiko</strong> — Три дня</li>
                    </ol>
                    <div class="note-block">Примечание: Кд на повышения сбрасываются в 0:00. Пример: Человек повысился в 22:00 09.03, он сможет повыситься вновь 10.03 в 0:10</div>
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
                    <ol class="rule-list plain"><li>Комната Лисов — 1-й этаж</li><li>Комната Песка — 2-й этаж</li><li>Комната Хаос — 3-й этаж</li><li>Комната Церберы — 4-й этаж</li></ol>
                    <h4>Малые додзё</h4>
                    <ol class="rule-list plain"><li>Дальняя левая комната — Инструктора</li><li>Ближняя левая комната — Мрак</li><li>Дальняя правая комната — Отрёкшиеся</li><li>Ближняя правая комната — Раншики (Временно)</li></ol>
                    <h4>Зал Высших лун</h4>
                    <ol class="rule-list plain"><li>Данный зал является местом сбора всех Высших лун.</li><li>Вход в эту комнату строго запрещен. Исключение: Прародитель и с одобрением любой Высшей луны.</li></ol>
                    <h4>Зал Прародителя</h4>
                    <ol class="rule-list plain"><li>Вход в комнату лишь с разрешения Прародителя. Данный зал является покоями Кибуцуджи Мудзана.</li><li>Нужно запросить разрешение через телепатию. Исключение: Кокушибо.</li></ol>
                    <h4>Переход</h4>
                    <ol class="rule-list plain"><li>Комната является коридором, пролегающим в другие комнаты.</li><li>Посещение разрешено любым демонам.</li><li>Проход в иные комнаты запрещено без присмотра Кровавой элиты, низших/высших лун, прародителя.</li></ol>
                    <h4>Общедоступная башня</h4>
                    <ol class="rule-list plain"><li>Комната является общедоступной и там может находится любой желающий.</li><li>Никто не может запретить вам находиться в этой башне. Исключение: Демоны 12 лун, Прародитель.</li><li>Нахождение в данной комнате не даёт право нарушать клятвы крови.</li></ol>
                    <h4>Площадь Построений</h4>
                    <ol class="rule-list plain"><li>Площадь построения создана для построения демонов, правила построения остаются всё теми же.</li><li>Строй организовывают напротив деревянной стенки по линии.</li></ol>
                    <h4>Комната полумесяца</h4>
                    <ol class="rule-list plain"><li>Комната полумесяца скрыта от лишних глаз и проход туда разрешается лишь приглашённым или членам отряда. Исключение: Низшие/Высшие луны, Прародитель.</li></ol>
                    <h4>Комната Церберов</h4>
                    <ol class="rule-list plain"><li>Комната является владением отряда Церберов.</li><li>Посещение разрешено только по приглашению или же демонам отряда цербер. Исключение: Демоны 12 лун, Прародитель.</li><li>В помещении работает внутренний устав, что не должен нарушать общую клятву крови.</li></ol>
                </div>
            `
        },
        duels: {
            title: 'Дуэли Крови',
            html: `
                <div class="info-card">
                    <h3>Основное понятие</h3>
                    <p>Дуэль Крови — поединок между двумя демонами, где каждый из соперников стремится доказать другому свою силу и превосходство. Несогласный со своим положением демон, или тот, кто стремится получить для себя различные привилегии, может вызвать на дуэль другого демона и поставить свои условия. Однако, вызванный на дуэль может выставить ответные условия, и в случае победы, вызывающий будет обязан их исполнить.</p>
                    
                    <h3>Порядок проведения дуэли</h3>
                    <ol class="rule-list">
                        <li><strong>Вызов:</strong> Демон бросает вызов.</li>
                        <li><strong>Ожидание:</strong> Соперник принимает вызов или отказывается.</li>
                        <li><strong>Организация:</strong> Аказа согласует дату и время с дополнительными заявками, объявляет дуэль.</li>
                        <li><strong>Бой:</strong> 3 раунда до двух побед на специальной арене.</li>
                        <li><strong>Клятва:</strong> Проигравший приносит клятву крови.</li>
                    </ol>
                    <ol class="rule-list plain">
                        <li>В назначенную дату и время Аказа или замещающий его демон, созывает в Цитадель всех претендентов, а так же всех желающих узреть кровавое побоище.</li>
                        <li>После проведения 1 из поединков, демоны обязаны склонить голову перед проводящим и выслушав указания, ожидать окончания следующих поединков.</li>
                        <li>Проигравшие приносят клятву крови об обязательстве исполнения условий дуэли в присутствии на прямую проводящего. Нарушение этой клятвы будет караться строгим выговором.</li>
                    </ol>
                    <p>На этом Дуэль крови будет считаться оконченной.</p>

                    <h3>Правила дуэли крови</h3>
                    <ol class="rule-list plain">
                        <li>Вызвать на бой разрешается только демона равного с вами ранга или выше. Вызывать на бой можно с ранга Хофума.</li>
                        <li>Вызывать на бой Низших лун, Высших Лун и Кровавую Элиту для неподчинения им обычным демонам запрещается.</li>
                        <li>Запрещается вызывать на бой демонов 12-ти лун, на дуэли крови для их унижения или последующим принижении а также неподчинении. Исключение: HDS 1 и выше.</li>
                        <li>У каждого из претендентов есть только 2 отказа, которыми они могут воспользоваться. После их исчерпания вызов на дуэль придётся принять. После проведения дуэли количество отказов сбрасывается обратно до 2.</li>
                        <li>Вызываемый на дуэль должен дать ответ в течение 24 часов, в ином случае он заимеет статус проигравшего.</li>
                        <li>В случае отказа от дуэли, ограничение на вызов отказавшегося — 2 день. Сам отказавшийся так же не может вызвать этого оппонента раньше, чем через 2 день. Если сама дуэль состоялась, участник дуэли что вызвал своего оппонента на дуэль не сможет принимать участие в будущих дуэлях в течении 2 дней. Исключение: Демоны первой тройки лун.</li>
                        <li>Если луна которой отправили вызов на дуэли не явилась на дуэль, то она переносится до тех пор пока луна не сможет явиться на дуэль, либо демон имеет право отправить новую дуэль другому демону без задержки.</li>
                        <li>Запрещено использовать какие либо "Баффы" во время и до дуэли.</li>
                    </ol>
                    <div class="note-block">Примечание: Баффами считаются любые предметы из инвентаря, которые дают какое либо преимущество надо оппонентом. Пример: Монстр, Плотный обед, Вкуснейший Ужин, Кровь, любые хилки по типу арбуза, оливье и т.д.</div>
                    <ol class="rule-list plain" start="9">
                        <li>В случае отсутствия дополнительных запросов на дуэль в течении 48 часов, разрешено провести единственную имеющуюся.</li>
                    </ol>

                    <h3>Регламент дуэлей 12 лун</h3>
                    <p>Дуэль крови меж демонов 12 лун может быть проведена по нескольким причинам, а именно:</p>
                    <ol class="rule-list plain">
                        <li>Решение конфликтов на личной почве</li>
                        <li>Оспаривание приказов</li>
                        <li>Получение личной выгоды</li>
                        <li>Исполнение личных желаний</li>
                    </ol>
                    <h4>Правила дуэлей 12 лун</h4>
                    <ol class="rule-list plain">
                        <li>Срок на получение какой либо выгоды / Выполнение желания не может превышать 1 неделю.</li>
                        <li>У дуэлянтов имеется 24 часа на дачу ответа, в ином случае он будет считаться проигравшим. Исключение: Невозможность ответа на дуэль, отпуск.</li>
                        <li>Слежка за дуэлью допускается лишь Мудзану и первой тройке высших лун. В случае участия в дуэли одного из тройки высших лун, за дуэлью разрешено следить лишь Мудзану / Кокушибо.</li>
                        <li>Запрещено вызывать на дуэль крови для унижения или последующим принижении а также задания / желания в длительной перспективе. Пример: Прислуживание демонам ниже себя на 2+ ступени, прислуживание какому-либо отряду и т.д.</li>
                        <li>Первоначальный регламент дуэли так-же имеет вес в дуэлях 12 лун.</li>
                    </ol>
                </div>
            `
        },
        limits: {
            title: 'Повышение предела',
            html: `
                <div class="info-card">
                    <h3>Пределы Крови</h3>
                    <p>Пределы Крови — модернизированная система повышения предела крови, нацеленная на демонов с рангом Tsukomon. Она позволяет повысить уровень силы демона и заиметь состав крови, сопоставимый по уровню силы с низшими и высшими лунами. Отрядные демоны также могут повышаться по ним, получая новые возможности.</p>
                    <p style="text-align:center;font-size:1.2rem;margin:1.5rem 0;"><strong>Первый предел (HDS 1) → Второй предел (HDS 2) → Третий предел (HDS 3) → Четвёртый предел (HDS 4) → Пятый предел (HDS 5)</strong></p>
                    <div class="note-block">
                        Примечание: При повышениях предела крови с помощью почетаний не зависимо от степени можно закрывать только один пункт.<br>
                        Так же если вы встали на Демона 12 лун / Наборного Шико (до окончания испытательного срока), то наличия Shiko за счёт основной профессии не даёт возможность повышаться по кругам крови.<br>
                        В случае хорошего срока на пределах (4 и 5), есть вероятность получения профессии "Низшая Магия Крови" и "Высшая Магия Крови" на усмотрения Прародителя.<br>
                        Задержка между повышениями предела крови 3 дня. Помеченные пункты жирным шрифтом нельзя пропускать с помощью почтений.
                    </div>
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
        'Otokuma → Demon': '<ol class="rule-list"><li>Пройти проверку клятвы крови.</li><li>Прослушать лекцию (любую) от инструктора+</li><li>Получить одобрение на повышение от инструктора+ (С Дикого на Низшего)</li></ol><p>Дополнение: Демоны что отработали чс остаются на профессии Дикого демона. В отряд можно вступить лишь с ранга Demon</p><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 1 день</span></p>',
        'Demon → Keykon': '<ol class="rule-list"><li>Захватить три точки с одним из демоном состава 12 лун / Прародителем.</li><li>Убить 4 истребителей.</li><li>Принять участие в тренировке от члена Кровавой элиты, Демона 12 лун или Прародителя.</li><li>Пройти обряд просвещения в демоны от инструктора+</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 1 день</span></p>',
        'Keykon → Hofuma': '<ol class="rule-list"><li>Выполнить поручение от одного демона из состава 12 лун.</li><li>Похитить 1 истребителя и выпытать из него информацию (любую) об организации</li><li>Убить 3 истребителя, сделать из их клинков украшение и подарить любому демону</li><li>Получить одобрение от любого из демонов 12 лун</li></ol><div class="note-block">Примечание: При повышении на ранг Hofuma выдаётся "Демон малой крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Hofuma → Chisuma': '<ol class="rule-list"><li>Вызвать на дуэль крови любого демона и сразиться с ним</li><li>Пройти проверку конспирации (Умение использование маскировки) у инструктора+</li><li>Выполнить 1 задание от демона 12 лун и получить от неё одобрение</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Chisuma → Chikuma': '<ol class="rule-list"><li>Побывать на одном из мероприятий (Ивент, событие не относящееся к тренировке) от инструктора+</li><li>Сдать клятву крови Доуме. (Если его нету то Аказе или Кокушибе)</li><li>Проявить инициативу в сборе на диверсию и поучаствовать в ней</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Chikuma → Asakuma': '<ol class="rule-list"><li>Пройти проверку клятву крови от первой тройки лун</li><li>Убить 10 истребителей, из их сделать подарок для 6 высшей луны (Даки или Гютаро)</li><li>Получить признание от D.CMD+</li><li>Поучаствовать в двух любых мероприятий от члена Кровавой элиты / Низшей луны / Высшей луны</li></ol><div class="note-block">Примечание: При повышении на ранг Asakuma выдаётся "Демон средней крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 2 дня</span></p>',
        'Asakuma → Hobura': '<ol class="rule-list"><li>Получить одобрение от одной из первых трёх высших лун</li><li>Похитить истребителя, украсть его катану и хаори.</li><li>Проявить себя на тренировке и получить похвалу от проводящего (Текст/почтение)</li><li>Убить 15 истребителей.</li><li>Побывать на одном из мероприятий от Энму / Руи.</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Hobura → Shateigashira': '<ol class="rule-list"><li>Сделать подарок одному демону из Высших лун и получить положительную реакцию.</li><li>Собрать строй на Вылазку или тренировку.</li><li>Убить 10 истребителей.</li><li>Сразиться с одним из членов Низших лун / Кровавой элиты в битве крови, получив одобрение дуэлянта.</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Shateigashira → Wakagashira': '<ol class="rule-list"><li>Пройти личную тренировку от инструктора+</li><li>Убить 30 истребителей.</li><li>Получить первую степень почтения от Высшей луны.</li><li>Получить одобрение от Прародителя демонов.</li></ol><div class="note-block">Примечание: При повышении на ранг Wakagashira выдаётся "Демон магии крови"</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Wakagashira → Tsukomon': '<ol class="rule-list"><li>Собрать два раза строй на вылазку или тренировку.</li><li>Получить признание от высшей луны.</li><li>Выполнить персональное поручение от прародителя.</li><li>Получить персональное одобрение от прародителя</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'Tsukomon → Shiko': '<div class="note-block">Примечание: По данным критериям демон может повыситься в случае:<br>○ Если он имеет четвёртый предел крови<br>○ Если вы является членом какого либо из отрядов и в вашем отряде ещё никто не повышался до Shiko (В отряде может повыситься на ранг Shiko только один. Если этот демон покидает отряд, то ему возвращается Tsukomon)</div><p>Так же с помощью почтения можно пропустить только один пункт, кроме тех, которые выделены жирным шрифтом</p><ol class="rule-list"><li>Выполнить поручение от трёх первых высших лун.</li><li>Пройти 3 тренировки от 3 разных лун</li><li>Похитить истребителя и по возможности разузнать информацию о голубой паучьей лилии</li><li>Выполнить персональное задание от Руи</li><li>Развить своё искусство демонической крови (15 рп действий + 2 удачных try)</li><li>Вызвать на дуэль крови одного из демонов 12 лун и оставить ему 50% хп</li><li>Получить одобрение от Прародителя</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>'
    };

    const limitDetails = {
        'HDS 1': '<h4>Первый предел</h4><ol class="rule-list"><li>Получить одобрение от 2 любых демонов 12 лун.</li><li>Вызвать на дуэль крови Четвёртый предел/ Пятый предел / Низшую луну и сразиться с ними, получив одобрение.</li><li>Иметь ранг Tsukomon.</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 2': '<h4>Второй предел</h4><ol class="rule-list"><li>Получить одобрение от 2 высших лун.</li><li>Вызвать на дуэль крови любую высшую луну и получить её одобрение (Снести 40 % хп).</li><li>Иметь HDS 1.</li><li>Убить 10 истребителей.</li><li>Выполнить 3 поручения от демонов 12 лун (1 задание — 1 луна).</li></ol><div class="note-block">При повышении на HDS 2 вы получаете профессию "Низшая Магия крови" и право на сборы</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 3': '<h4>Третий предел</h4><ol class="rule-list"><li>Выполнить четыре поручение от разных высших лун.</li><li>Вызвать на дуэль крови Д.КМД+ и победить.</li><li>Иметь HDS 2.</li><li>Провести тренировку для демонов под присмотром любого демона 12 лун.</li><li>Поучаствовать на 2 сборах от высших лун.</li></ol><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 4': '<h4>Четвёртый предел</h4><ol class="rule-list"><li>Выполнить четыре поручение от разных высших лун.</li><li>Вызвать на дуэль крови любую высшую и получить её одобрение (Снести 50 % хп).</li><li>Иметь HDS 3.</li><li>Убить 20 истребителей.</li><li>Пройти специальное испытание от смотрителя за кругами.</li><li>Захватить с демонами 10 точек.</li></ol><div class="note-block">Примечание: При повышении на HDS 4 вы получаете возможность повыситься на ранг Shiko (За этим обратитесь к Прародителю).</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>',
        'HDS 5': '<h4>Пятый предел</h4><ol class="rule-list"><li>Иметь ранг Shiko.</li><li>Получить одобрение от Тройки высших лун.</li><li>Иметь HDS 4.</li><li>Выполнить поручение Прародителя.</li><li>Убить 25 истребителей.</li><li>Поучаствовать на 3 сборах от демонов 12 лун.</li><li>Провести 2 тренировки для демонов.</li><li>Выполнить поручение от 3 высших лун (1 луна — 1 задание).</li><li>Получение почтения 3 уровня.</li><li>Пройти специальное испытание от смотрителя за кругами.</li></ol><div class="note-block">Примечание: При повышении на HDS 5 вы получаете профессию "Высшая Магия Крови".</div><p><span style="background:hsl(var(--primary));padding:0.25rem 0.75rem;border-radius:var(--radius-lg);color:white;">КД: 3 дня</span></p>'
    };

    const territoryRules = {
        natagumo: '<h3>🏔️ Гора Натагумо</h3><div class="note-block">Примечание: Во время нахождения на горе, мы рады любому демону, который может принести нам радость и удовольствие, однако мы хотим подметить один момент, что наше гостеприимство распространяется на демонов, не нарушающих правила и достойно себя показывающих.</div><ol class="rule-list plain"><li>Членам Семьи, а также обычным демонам, что пришли как гости запрещено перечить Младшему Брату. Также посетители обязаны подчиняться любому Члену Семьи.</li><li>Запрещено как либо взаимодействовать с нашими ловушками, а уж тем более ломать их или обезвреживать.</li><li>Если любой из Членов Семьи, не важно по какой причине, сказал вам покинуть Гору Натагумо, у вас есть ровно 10 секунд чтобы убраться. Примечание: Высшие луны могут быть выгнаны по веской причине, а низшие луны обязаны подчиниться приказу уйти.</li><li>Запрещено прыгать по крышам домов, что находятся по пути на Гору, а также тех, что находятся на самой Горе. Исключение: Семья Пауков / Прародитель.</li><li>На Горе Натагумо главные — "Семья Пауков". Никто кроме Господина не смеет приказывать Членам Семьи на их территории.</li><li>Прежде чем явиться в наш дом, необходимо предупредить об этом через телепатию. В любом другом случае любой член семьи имеет полное право прогнать вас. Исключение: Прародитель демонов и высшие луны.</li></ol>',
        otrekshiesya: '<h3>🏠 Дом Отряда Отрёкшихся</h3><div class="note-block">Примечание: Во время нахождения на нашей территории, мы не потерпим неуважительного отношения к нашему уютному уголку, ниже описан свод действующих правил, соблюдение, которых обязательно для каждого нашего гостя.</div><ol class="rule-list plain"><li>Демонам запрещается перечить членам отряда Отрёкшихся на территории дома отрёкшихся. Исключение: Высшие Луны / Прародитель.</li><li>Отрёкшиеся имеют полное право не подчиняться демонам, занимающим более высокое положение в иерархии, находясь в доме, поскольку это дом Редзо Гоку и это его территория. Исключение: Сбор в цитадели / Первая тройка Высших лун / Прародитель.</li><li>Запрещается создавать беспорядок, проявлять неадекватное поведение, находиться вблизи без маскировки в доме и на его территории. Исключение: приказ Старшего самурая / Редзо Гоку / Первой тройки Высших Лун / Прародителя.</li><li>Демонам запрещается посещать дом отрекшихся без разрешения одного из членов отряда. Исключение: Разрешенные гости / Первая тройка Высших лун / Прародитель.</li><li>В доме действует своя иерархия и свои правила, каждый демон посещающий территорию дома отрёкшихся должен выполнять любые требования и просьбы хозяина дома — Редзо Гоку. Исключение: Неадекватный приказ / Первая тройка Высших лун / Прародитель.</li><li>За несоблюдение правил дома, члены отряда Отрекшихся имеют полное право выгнать со своей территории того или иного демона. Исключение: Разрешенные гости дома / Высшие луны / Прародитель.</li></ol>',
        douma: '<h3>⛩️ Храм "Культа Вечного Рая"</h3><ol class="rule-list plain"><li>Храм приветствует всех кто желает просветления или аудиенции со Второй высшей луной. Храм является пристанищем отряда Второй высшей луны.</li><li>Посещение храма для демонов запрещено без маскировки.</li><li>При нахождении на территории Второй высшей необходимо подчиняться любому слову. Исключение: Первая тройка высших лун, Прародитель.</li></ol>'
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
                    <div class="gallery-item" data-terr="douma"><img src="https://iili.io/BWIHr37.png" alt="Храм" loading="lazy"><div class="gallery-label">Храм Доумы</div></div>
                `;
            }
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.addEventListener('click', () => {
                    const t = item.dataset.terr;
                    if (t === 'natagumo') modalBody.innerHTML = territoryRules.natagumo;
                    else if (t === 'otrekshiesya') modalBody.innerHTML = territoryRules.otrekshiesya;
                    else if (t === 'douma') modalBody.innerHTML = territoryRules.douma;
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

    const headerBrand = document.querySelector('.header-brand');
    if (headerBrand) {
        headerBrand.style.cursor = 'pointer';
        headerBrand.addEventListener('click', () => {
            switchTab('main');
            closeMenu();
        });
    }

    renderPage('main');
})();
