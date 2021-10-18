# Планировщик
### Тестовое задание на Web-разработчика

Доска-календарь для назначения и отслеживания заданий.

Демо: https://elaineir.github.io/test-elma/

Функционал: 
* для получения данных используется Fetch API
* есть кнопки для листания календаря по неделям
* при наведении на задачу отображается всплывающее окно с подсказкой
* можно перетаскивать задачи из backlog конкретному пользователю и на любую дату, начиная с текущего дня
* нельзя назначить задачу на прошедшее число
* можно сменить тему на тёмную и обратно на светлую стандартную, состояние записывается в localStorage
* работает поиск карточек в backlog по ключевому слову

## Как запустить проект:
Для запуска требуется `Node.js`, разработка велась на `v12`

Установка зависимостей:

```
npm install
```

Режим разработчика (live server):

```
npm run start
```

Сборка проекта:

```
npm run build
```