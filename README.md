# Домашняя работа 5

При использовании API возникает слудеющая ошибка:

Access to fetch at 'http://tasks-api.std-900.ist.mospolytech.ru/api/tasks?api_key=50d2199a-42dc-447d-81ed-d68a443b697e' from origin 'http://localhost:63342' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Эта ошибка связана с политикой Same-Origin Policy, которая является мерой безопасности, реализованной в веб-браузерах. Она ограничивает веб-страницы в доступе к ресурсам с разных источников. Данная ошибка означает, что моя веб-страница на локальном сервере (http://localhost:63342) пытается обратиться к ресурсу (API) на другом домене (http://tasks-api.std-900.ist.mospolytech.ru), и сервер API не отправляет необходимые заголовки для разрешения такого доступа

### Переключение с API на localhost
В файле `main.js` реализован флаг `useApi=true`. При положении в true реализовано взаимодейсвие с API, однако из-за проблем на строне сервера, невозможно полное взаимодействие сайта с ним. 

Именно поэтому был реализован, когда флаг в положении false, весь функционал работает отлично, однако сохроняет на локальном сервере
