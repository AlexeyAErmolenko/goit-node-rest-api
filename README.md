Express <br>
Написати REST API для роботи з колекцією контактів. Для роботи з REST API використовуй [Postman] . <br>
Крок 1 <br>
    Cтвори репозиторій з назвою goit-node-rest-api <br>
    Створи гілку hw02-express з гілки main. <br>
    Встанови модулі командою npm i <br>
Крок 2 <br>
У файл contactsServices.js (знаходиться в папці services) скопіюй функції з файла contacts.js з домашнього завдання до модуля 1. <br>
Крок 3 <br>
Напиши контролери у файлі contactsControllers.js (знаходиться у папці controllers) з урахуванням наведених нижче вимог. <br>
REST API повинен підтримувати такі раути. <br>
GET /api/contacts <br>
    Викликає функцію-сервіс listContacts для роботи з json-файлом contacts.json <br>
    Повертає масив всіх контактів в json-форматі зі статусом 200 <br>
GET /api/contacts/:id <br>
    Викликає функцію-сервіс getContactById для роботи з json-файлом contacts.json <br>
    Якщо контакт за id знайдений, повертає об'єкт контакту в json-форматі зі статусом 200 <br>
    Якщо контакт за id не знайдено, повертає json формату {"message": "Not found"} зі статусом 404 <br>
DELETE /api/contacts/:id <br>
    Викликає функцію-сервіс removeContact для роботи з json-файлом contacts.json <br>
    Якщо контакт за id знайдений і видалений, повертає об'єкт видаленого контакту в json-форматі зі статусом 200 <br>
    Якщо контакт за id не знайдено, повертає json формату {"message": "Not found"} зі статусом 404 <br>
POST /api/contacts <br>
    Отримує body в json-форматі з полями {name, email, phone}. Усі поля є обов'язковими - для валідації створи у файлі contactsSchemas.js (знаходиться у папці schemas) схему з використаням пакета joi <br>
    Якщо в body немає якихось обов'язкових полів (або передані поля мають не валідне значення), повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400 <br>
    Якщо body валідне, викликає функцію-сервіс addContact для роботи з json-файлом contacts.json, з передачею їй даних з body <br>
    За результатом роботи функції повертає новостворений об'єкт з полями {id, name, email, phone} і статусом 201 <br>
PUT /api/contacts/:id <br>
    Отримує body в json-форматі з будь-яким набором оновлених полів (name, email, phone) (всі поля вимагати в боді як обов'язкові не потрібно: якщо якесь із полів не передане, воно має зберегтись у контакта зі значенням, яке було до оновлення) <br>
    Якщо запит на оновлення здійснено без передачі в body хоча б одного поля, повертає json формату {"message": "Body must have at least one field"} зі статусом 400. <br>
    Передані в боді поля мають бути провалідовані - для валідації створи у файлі contactsSchemas.js (знаходиться у папці schemas) схему з використанням пакета joi. Якщо передані поля мають не валідне значення, повертає json формату {"message": error.message} (де error.message - змістовне повідомлення з суттю помилки) зі статусом 400 <br>
    Якщо з body все добре, викликає функцію-сервіс updateContact, яку слід створити в файлі contactsServices.js (знаходиться в папці services). Ця функція має приймати id контакта, що підлягає оновленню, та дані з body, і оновити контакт у json-файлі contacts.json <br>
    За результатом роботи функції повертає оновлений об'єкт контакту зі статусом 200. <br>
    Якщо контакт за id не знайдено, повертає json формату {"message": "Not found"} зі статусом 404 <br>
Зверни увагy <br>
    Валідацію body можна як здійснювати у контролері, так і створити для цих цілей окрему міддлвару, яка буде викликатись до контролера. Для створення міддлвари можеш скористатись функцією validateBody.js, яку знайдеш у папці helpers <br>
    Для роботи з помилками можна скористатись функцією HttpError.js, яку знайдеш у папці helpers <br>
Якщо вказані функції використовувати не будеш, видали їх з проєкту перед тим, як надсилатимеш роботу на перевірку ментору <br>
 <br>
REST API. MongoDB и Mongoose <br>
Створи гілку 03-mongodb з гілки master. <br>
Продовж створення REST API для роботи з колекцією контактів. <br>
Крок 1 <br>
Створи аккаунт на MongoDB Atlas. Після чого в акаунті створи новий проект і налаштуй безкоштовний кластер. Під час налаштування кластера вибери провайдера і регіон як на скріншоті нижче. Якщо вибрати занадто віддалений регіон, швидкість відповіді сервера буде довше. <br>
Крок 2 <br>
Встанови графічний редактор MongoDB Compass для зручної роботи з базою даних для MongoDB. Налаштуй підключення своєї хмарної бази даних до Compass. У MongoDB Atlas не забудь створити користувача з правами адміністратора. <br>
Крок 3 <br>
Через Compass створи базу даних db-contacts і в ній колекцію contacts. Візьми ссылка на json і за допомогою Compass наповни колекцію contacts (зроби імпорт) його вмістом. <br>
Якщо ви все зробили правильно, дані повинні з'явитися у вашій базі в колекції contacts <br>
Крок 4 <br>
Використовуй вихідний код домашньої работи #2 і заміни зберігання контактів з json-файлу на створену тобою базу даних. <br>
• Напиши код для створення підключення до MongoDB за допомогою Mongoose. <br>
• При успішному підключенні виведи в консоль повідомлення "Database connection successful". <br>
• Обов'язково обробив помилку підключення. Виведи в консоль повідомлення помилки і заверши процес використовуючи process.exit(1). <br>
• У функціях обробки запитів заміни код CRUD-операцій над контактами з файлу, на Mongoose-методи для роботи з колекцією контактів в базі даних. <br>
Схема моделі для колекції contacts: <br>
{ <br>
    name: { <br>
      type: String, <br>
      required: [true, 'Set name for contact'], <br>
    }, <br>
    email: { <br>
      type: String, <br>
    }, <br>
    phone: { <br>
      type: String, <br>
    }, <br>
    favorite: { <br>
      type: Boolean, <br>
      default: false, <br>
    }, <br>
  } <br>
Крок 5 <br>
У нас з'явилося в контактах додаткове поле статусу favorite, яке приймає логічне значення true або false. Воно відповідає за те, що в обраному чи ні знаходиться зазначений контакт. Потрібно реалізувати для оновлення статусу контакту новий роутер <br>
PATCH /api/contacts/:contactId/favorite <br>
• Отримує параметр contactId <br>
• Отримує body в json-форматі c оновленням поля favorite <br>
• Якщо з body все добре, викликає функцію updateStatusContact (contactId, body) (напиши її) для поновлення контакту в базі <br>
• За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем {"message":"Not found"} і статусом 404 <br>
 <br>
Аутентифікація <br>
Створи гілку 04-auth з гілки master. <br>
Продовж створення REST API для роботи з клекцією контактів. Додай логіку аутентифікації / авторизації користувача через JWT. <br>
Крок 1 <br>
У коді створи схему і модель користувача для колекції users. <br>
{ <br>
  password: { <br>
    type: String, <br>
    required: [true, 'Password is required'], <br>
  }, <br>
  email: { <br>
    type: String, <br>
    required: [true, 'Email is required'], <br>
    unique: true, <br>
  }, <br>
  subscription: { <br>
    type: String, <br>
    enum: ["starter", "pro", "business"], <br>
    default: "starter" <br>
  }, <br>
  token: { <br>
    type: String, <br>
    default: null, <br>
  }, <br>
} <br>
Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для цього в схемі контактів додайте властивість <br>
   owner: { <br>
      type: Schema.Types.ObjectId, <br>
      ref: 'user', <br>
    } <br>
Примітка: 'user' - назва колекції, у якій зберігаються користувачі <br>
Крок 2 <br>
Регістрація <br>
Створити ендпоінт /users/register <br>
Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації. <br>
У разі успішної валідації в моделі User створити користувача за даними, які пройшли валідацію. Для засолювання паролів використовуй bcrypt або bcryptjs <br>
    Якщо пошта вже використовується кимось іншим, повернути Помилку Conflict. <br>
    В іншому випадку повернути Успішна відповідь. <br>
Registration request <br>
POST /users/register <br>
Content-Type: application/json <br>
RequestBody: { <br>
  "email": "example@example.com", <br>
  "password": "examplepassword" <br>
} <br>
Registration validation error <br>
Status: 400 Bad Request <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Помилка від Joi або іншої бібліотеки валідації" <br>
} <br>
Registration conflict error <br>
Status: 409 Conflict <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Email in use" <br>
} <br>
Registration success response <br>
Status: 201 Created <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "user": { <br>
    "email": "example@example.com", <br>
    "subscription": "starter" <br>
  } <br>
} <br>
Логін <br>
Створити ендпоінт /users/login <br>
В моделі User знайти користувача за email. <br>
Зробити валідацію всіх обов'язкових полів (email і password). При помилці валідації повернути Помилку валідації. <br>
    В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі збігаються створити токен, зберегти в поточному юзера і повернути Успішна відповідь. <br>
    Якщо пароль або імейл невірний, повернути Помилку Unauthorized. <br>
Login request <br>
POST /users/login <br>
Content-Type: application/json <br>
RequestBody: { <br>
  "email": "example@example.com", <br>
  "password": "examplepassword" <br>
} <br>
Login validation error <br>
Status: 400 Bad Request <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Помилка від Joi або іншої бібліотеки валідації" <br>
} <br>
Login success response <br>
Status: 200 OK <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "token": "exampletoken", <br>
  "user": { <br>
    "email": "example@example.com", <br>
    "subscription": "starter" <br>
  } <br>
} <br>
Login auth error <br>
Status: 401 Unauthorized <br>
ResponseBody: { <br>
  "message": "Email or password is wrong" <br>
} <br>
Крок 3 <br>
Перевірка токена <br>
Створи мідлвар для перевірки токена і додай його до всіх раутів, які повинні бути захищені. <br>
    Мідлвар бере токен з заголовків Authorization, перевіряє токен на валідність. <br>
    У випадку помилки повернути Помилку Unauthorized. <br>
    Якщо валідація пройшла успішно, отримати з токена id користувача. Знайти користувача в базі даних з цим id. <br>
    Якщо користувач існує і токен збігається з тим, що знаходиться в базі, записати його дані в req.user і викликати next(). <br>
    Якщо користувача з таким id НЕ існує або токени не збігаються, повернути Помилку Unauthorized <br>
Middleware unauthorized error <br>
Status: 401 Unauthorized <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Not authorized" <br>
} <br>
Крок 4 <br>
Логаут <br>
Створити ендпоінт /users/logout <br>
Додай в маршрут мідлвар перевірки токена. <br>
    У моделі User знайти користувача за _id. <br>
    Якщо користувача не існує повернути Помилку Unauthorized. <br>
    В іншому випадку, видалити токен у поточного юзера і повернути Успішна відповідь. <br>
Logout request <br>
POST /users/logout <br>
Authorization: "Bearer {{token}}" <br>
Logout unauthorized error <br>
Status: 401 Unauthorized <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Not authorized" <br>
} <br>
Logout success response <br>
Status: 204 No Content <br>
Крок 5 <br>
Поточний користувач - отримати дані юзера по токені <br>
Створити ендпоінт /users/current <br>
Додай в раут мідлвар перевірки токена. <br>
    Якщо користувача не існує повернути Помилку Unauthorized <br>
    В іншому випадку повернути Успішну відповідь <br>
Current user request <br>
GET /users/current <br>
Authorization: "Bearer {{token}}" <br>
Current user unauthorized error <br>
Status: 401 Unauthorized <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Not authorized" <br>
} <br>
Current user success response <br>
Status: 200 OK <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "email": "example@example.com", <br>
  "subscription": "starter" <br>
} <br>
Додаткове завдання - необов'язкове <br>
    Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20). <br>
    Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true) <br>
    Оновлення підписки (subscription) користувача через ендпоінт PATCH /users. Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business'] <br>
 <br>
Робота із зображеннями. Тестування <br>
Створи гілку hw05-avatars з гілки master. <br>
Продовж створення REST API для роботи з колекцією контактів. Додай можливість завантаження аватарки користувача через [Multer] . <br>
Крок 1 <br>
    Створи папку public для роздачі статики. У цій папці зроби папку avatars. <br>
    Налаштуй Express на роздачу статичних файлів з папки public. <br>
    Поклади будь-яке зображення в папку public/avatars і перевір, що роздача статики працює. <br>
    При переході по такому URL браузер відобразить зображення. Shell http://locahost:<порт>/avatars/<ім'я файлу з розширенням>  <br>
Крок 2 <br>
У схему користувача додай нову властивість avatarURL для зберігання зображення. <br>
{ <br>
  ... <br>
  avatarURL: String, <br>
  ... <br>
} <br>
Використовуй пакет gravatar для того, щоб при реєстрації нового користувача відразу згенерувати йому аватар по його email. <br>
Крок 3 <br>
При реєстрації користувача: <br>
• Створюй посилання на аватарку користувача за допомогою gravatar <br>
• Отриманий URL збережи в поле avatarURL під час створення користувача <br>
Крок 4 <br>
Додай можливість поновлення аватарки, створивши ендпоінт /users/avatars і використовуючи метод PATCH. <br>
# Запит <br>
PATCH /users/avatars <br>
Content-Type: multipart/form-data <br>
Authorization: "Bearer {{token}}" <br>
RequestBody: завантажений файл <br>
# Успішна відповідь <br>
Status: 200 OK <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "avatarURL": "тут буде посилання на зображення" <br>
} <br>
# Неуспішна відповідь <br>
Status: 401 Unauthorized <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Not authorized" <br>
} <br>
• Створи папку tmp в корені проекту і зберігай в неї завантажену аватарку. <br>
• Оброби аватарку пакетом jimp і постав для неї розміри 250 на 250 <br>
• Перенеси аватарку користувача з папки tmp в папку public/avatars і дай їй унікальне ім'я для конкретного користувача. <br>
• Отриманий URL /avatars/<ім'я файлу з розширенням> та збережи в поле avatarURL користувача <br>
Додаткове завдання - необов'язкове <br>
    Написати unit-тести для контролера входу (логін) <br>
За допомогою Jest <br>
• відповідь повина мати статус-код 200 <br>
• у відповіді повинен повертатися токен <br>
• у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String <br>
 <br>
Пошта. Вебсокети <br>
Створи гілку hw06-email з гілки master. <br>
Продовжуємо створення REST API для роботи з колекцією контактів. <br>
Додайте верифікацію email користувача після реєстрації за допомогою сервісу SendGrid. <br>
Як процес верифікації повинен працювати <br>
    Після реєстрації, користувач повинен отримати лист на вказану при реєстрації пошту з посиланням для верифікації свого email <br>
    Пройшовши посиланням в отриманому листі, в перший раз, користувач повинен отримати Відповідь зі статусом 200, що буде мати на увазі успішну верифікацію email <br>
    Пройшовши по посиланню повторно користувач повинен отримати Помилку зі статусом 404 <br>
Крок 1 <br>
Підготовка інтеграції з SendGrid API <br>
• Зареєструйся на SendGrid. <br>
• Створи email-відправника. Для це в адміністративній панелі SendGrid зайдіть в меню Marketing в підміню senders і в правому верхньому куті натисніть кнопку "Create New Sender". Заповніть поля в запропонованій формі. Збережіть. <br>
Повинен вийде наступний як на картинці результат, тільки з вашим email: <br>
На вказаний email повинно прийти лист верифікації (перевірте спам якщо не бачите листи). Натисніть на посилання в ньому і завершите процес. Результат повинен зміниться на: <br>
• Тепер необхідно створити API токен доступу. Вибираємо меню "Email API", і підміню "Integration Guide". Тут вибираємо "Web API" <br>
Далі необхідно вибрати технологію Node.js <br>
На третьому кроці даємо ім'я нашого токені. Наприклад systemcats, натискаємо кнопку згенерувати і отримуємо результат як на скріншоті нижче. Необхідно скопіювати цей токен (це важливо, тому що більше ви не зможете його подивитися). Після завершити процес створення токена <br>
Отриманий API-токен треба додати в .env файл в нашому проекті <br>
Крок 2 Створення ендпоінта для верифікації email <br>
Додати в модель User два поля verificationToken і verify. Значення поля verify рівне false означатиме, що його email ще не пройшов верифікацію <br>
{ <br>
  verify: { <br>
    type: Boolean, <br>
    default: false, <br>
  }, <br>
  verificationToken: { <br>
    type: String, <br>
    required: [true, 'Verify token is required'], <br>
  }, <br>
} <br>
• створити ендпоінт GET /users/verify/:verificationToken(# verification-request), де по параметру verificationToken ми будемо шукати користувача в моделі User <br>
• якщо користувач з таким токеном не знайдений, необхідно повернути Помилку 'Not Found' <br>
• якщо користувач знайдений - встановлюємо verificationToken в null, а поле verify ставимо рівним true в документі користувача і повертаємо Успішну відповідь <br>
Verification request <br>
GET /auth/verify/:verificationToken <br>
Verification user Not Found <br>
Status: 404 Not Found <br>
ResponseBody: { <br>
  message: 'User not found' <br>
} <br>
Verification success response <br>
Status: 200 OK <br>
ResponseBody: { <br>
  message: 'Verification successful', <br>
} <br>
Крок 3 <br>
Додавання відправки email користувачу з посиланням для верифікації <br>
При створення користувача при реєстрації: <br>
• створити verificationToken для користувача і записати його в БД (для генерації токена використовуйте пакет uuid або nanoid) <br>
• відправити email на пошту користувача і вказати посилання для верифікації email'а ( /users/verify/:verificationToken) в повідомленні <br>
• Так само необхідно враховувати, що тепер логін користувача не дозволено, якщо не верифікувано email <br>
Крок 4 <br>
Додавання повторної відправки email користувачу з посиланням для верифікації <br>
Необхідно передбачити, варіант, що користувач може випадково видалити лист. Воно може не дійти з якоїсь причини до адресата. Наш сервіс відправки листів під час реєстрації видав помилку і т.д. <br>
POST /users/verify <br>
• Отримує body в форматі {email} <br>
• Якщо в body немає обов'язкового поля email, повертає json з ключем {"message":"missing required field email"} і статусом 400 <br>
• Якщо з body все добре, виконуємо повторну відправку листа з verificationToken на вказаний email, але тільки якщо користувач не верифікований <br>
• Якщо користувач вже пройшов верифікацію відправити json з ключем {"message":"Verification has already been passed"} зі статусом 400 Bad Request <br>
Resending an email request <br>
POST /users/verify <br>
Content-Type: application/json <br>
RequestBody: { <br>
  "email": "example@example.com" <br>
} <br>
Resending an email validation error <br>
Status: 400 Bad Request <br>
Content-Type: application/json <br>
ResponseBody:  { <br>
  "message": "Помилка від Joi або іншої бібліотеки валідації" <br>
} <br>
Resending an email success response <br>
Status: 200 Ok <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  "message": "Verification email sent" <br>
} <br>
Resend email for verified user <br>
Status: 400 Bad Request <br>
Content-Type: application/json <br>
ResponseBody: { <br>
  message: "Verification has already been passed" <br>
} <br>
ПРИМІТКА!  Як альтернативу SendGrid можна використовувати пакет nodemailer <br>
Додаткове завдання - необов'язкове <br>
    Напишіть dockerfile для вашої програми
