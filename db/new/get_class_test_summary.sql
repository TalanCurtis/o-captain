select SUM(m.score) as score, sum(a.max_score) as max_score, c.class_name,  c.id as class_id
from classes c
join assignments a on a.class_id = c.id 
join marks m on m.assignment_id = a.id
where c.user_id = $1 and c.id = $2 and a.kind = 'test'
group by c.class_name, c.id

