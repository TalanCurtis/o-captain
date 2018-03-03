select u.first_name , u.last_name, u.id, c.id as class_id
from classes c 
join enrollment e on e.class_id = c.id
join users u on u.id = e.user_id
where c.id = $1;

