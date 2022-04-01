/* Задание 3
Подумать над глобальными сущностями. К примеру, сущность «Продукт» в
интернет-магазине актуальна не только для корзины, но и для каталога. Стремиться нужно к
тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, но в
разных местах давал возможность вызывать разные методы
*/

/* Для реализации такой структуры необходимо создать 2 функции-конструктора (класса) - ТоварКаталог и 
ТоварКорзина.
В классе ТоварКаталог задаем базовые свойства товара - имя, описание, цена, скидка
В классе ТоварКорзина задаем свойство count, методы добавления/удаления товара в/из корзины, подсчета
общей стоимости товара в корзине, изменения количества единиц товара в корзине, а также наследуем его
от класса ТоварКаталог.
Создавая обьекты классов ТоварКаталог и ТоварКорзина мы получаем обьекты с одинаковыми базовыми
свойствами, но обьект класса ТоварКорзина содержит свои методы для работы с товарами в контексте корзины
*/