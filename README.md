# Winter Page

Одностраничное портфолио WinterInside. Проект создан на основе локального **winter-dev-pack**: сохранены Gulp, Nunjucks, Stylus, шрифт Gilroy и зимняя палитра. Исходный `winter-dev-pack` не изменялся.

## Запуск

Нужен Node.js. В папке проекта выполните:

```bash
npm install
npm start
```

`npm start` собирает страницу, запускает локальный сервер и пересобирает файлы после изменений. Адрес выводится в терминале. Для готовой статической версии:

```bash
npm run build
```

Готовые файлы находятся в `build/`. `build/index.html` можно открыть прямо из папки или разместить на статическом хостинге.

## Где что менять

| Задача                                   | Файл                                |
| ---------------------------------------- | ----------------------------------- |
| Заголовок, проекты, навыки и опыт работы | `src/data.json`                     |
| Порядок секций                           | `src/pages/index.njk`               |
| HTML отдельных секций                    | `src/components/`                   |
| Цвета исходного набора                   | `src/styles/partials/variable.styl` |
| Общие правила и дополнительные цвета     | `src/styles/partials/base.styl`     |
| Стили секций по БЭМ                      | `src/styles/blocks/`                |
| Точка входа JavaScript                   | `src/js/app.js`                     |
| Отдельные функции JavaScript             | `src/js/modules/`                   |
| Сборка и локальный сервер                | `gulpfile.mjs`                      |

Для нового проекта добавьте объект в массив `projects` в `src/data.json`. Поле `slug` становится БЭМ-модификатором карточки (`project-slide--slug`); для цвета обложки добавьте правило в `src/styles/blocks/projects.styl`. Поля `coverImage` и `fullImage` указывают на файлы в `src/assets/projects/`: первый показывается в карточке, второй — в прокручиваемом модальном окне. Счётчик карусели вычисляется автоматически. Первым открывается FishArt Tattoo; выбор стартового слайда задан в `src/components/project-slide.njk` и `src/js/modules/carousel.js`.

Навыки хранятся в `skillGroups`, места работы — в `jobs` того же файла. Разделы выведены через `src/components/experience.njk`. Даты и описания основаны на предоставленном резюме; технологии дополнительно сверены с открытыми репозиториями GitHub. Личные контактные данные и сведения о зарплате из резюме на сайт не переносились.

Особые проекты хранятся в массиве `featuredProjects` и выводятся через `src/components/featured-projects.njk`: «Целая птица», «Тихий кордон», Unagrande YogaClub. Для «Тихого кордона» используется постер из локального проекта SilentPerimeter. Превью «Целой птицы» создано по мотивам главного изображения сайта; для Unagrande подготовлена тематическая иллюстрация. Зимняя фотография на главном экране создана специально для этого портфолио и хранится в `src/assets/winter-forest-dark.png`.

Luma представлен отдельным экраном после особых проектов. Его разметка находится в `src/components/luma.njk`, стили — в `src/styles/blocks/luma.styl`. Макет окна приложения собран средствами HTML и CSS по интерфейсу исходного проекта; это декоративное превью. Кнопка «Скачать приложение» отдаёт `src/assets/downloads/Luma.exe` напрямую с сайта, соседняя кнопка ведёт на [репозиторий Luma](https://github.com/WInterInside/Luma). При обновлении приложения замените локальный EXE файлом из [исходного репозитория](https://github.com/WInterInside/Luma/blob/main/Luma.exe).

После карусели избранных проектов следует раздел навыков и опыта, затем особые проекты и Luma. Далее идут отдельные секции библиотек (`libraries.njk`), рабочей сборки (`toolkit.njk`) и HTML-писем (`emails.njk`); их стили находятся в одноимённых файлах `src/styles/blocks/`. Флаги и первая SVG-фигура взяты из авторских репозиториев, ещё три SVG-анимации сделаны для портфолио. Ниже расположен раздел для студентов (`students.njk`) с отдельной ссылкой в меню. Визуальные материалы этих секций лежат в `src/assets/libraries/`.

Ранний вариант зимнего изображения, исходный PNG постера, кадры прежней внутренней галереи и исходные фрагменты длинных снимков остаются локально в `_unused-assets/`. Эта папка не входит в репозиторий и сборку; сайт использует только актуальные файлы из `src/assets/`.

Фотография создана во встроенном режиме ImageGen. Финальный запрос: “Create a dark, atmospheric winter forest photograph for the rear tilted card of a refined developer portfolio website. Tall snow-covered fir and spruce trees at blue hour, dense shadowy evergreens, deep midnight navy and cold slate-blue tones, restrained mist and soft snowfall, subtle natural light filtering through the trees, high contrast enough to read as an evocative landscape at small crop size. Moody, cinematic, sophisticated and realistic; quiet rather than horror. No people, buildings, logos, letters, text, graphics, or borders. Compose vertically with meaningful trees and snowy depth throughout, suitable for a tall rounded card crop.”

Исходный JavaScript разделён на ES-модули. `app.js` импортирует и запускает модули меню, карусели проектов, модального окна, вкладок и появления секций. При сборке Gulp объединяет их в один обычный скрипт `build/js/app.js`, который работает при открытии страницы из папки. Карусель поддерживает кнопки, клавиатуру и свайп; автоматическое переключение проектов приостанавливается, пока открыто модальное окно. Настройка уменьшения движения также учитывается.

Разметка семантичная; классы разделены на блоки, элементы и модификаторы по БЭМ. `prefers-reduced-motion` отключает декоративное движение. Вкладки и меню поддерживают управление клавиатурой и ARIA-атрибуты.

## Проекты и контакты

Ссылки ведут на [репозитории WInterInside](https://github.com/WInterInside). Содержание карточек проверено по открытым репозиториям. Длинные снимки страниц сделаны с локальных сборок этих проектов и сохранены в `src/assets/projects/`; они открываются в модальном окне и прокручиваются. Контактная ссылка Telegram взята из [профиля GitHub](https://github.com/WInterInside).

Перед публикацией укажите абсолютный адрес сайта и картинки для социальных сетей в `src/components/head.njk`; сейчас они оставлены без адреса канонической страницы для локальной версии.
