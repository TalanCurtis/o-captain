select sum(m.score) as score, sum(a.max_score) as max_score, kind, user_id
from marks m
join assignments a on a.id = m.assignment_id
where user_id = $1  and class_id = $2 and score is not null
group by kind, user_id;
