Области хранения данных:

-   база данных на json-server
-   BFF
-   редакс стор

Сущности приложения:

-   пользователь: БД (список пользователей) BFF (сессия текущего пользователя) стор (отображение в браузере)
-   роль: БД (список ролей) BFF (роль текущей сессии) стор (отображение роли в браузере)
-   статья: БД (список статей) стор(отображение статей в браузере)
-   комментарий: БД (список комментариев) стор(отображение комментариев в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / register_at / role_id
-   роли - roles: id / name /
-   статьи - posts: id / titel / content / image_url / publushed_at
-   коментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

-   сессия текущего пользователя: login / password / role

Схема для редакс стора (на клиенте):

-   user: id / login / roleId / session
-   posts: массив post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-   users: массив user: id / logun / registedAt / role
