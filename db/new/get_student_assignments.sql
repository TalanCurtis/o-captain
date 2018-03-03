select m.score , a.max_score, kind, user_id, a.id as assignment_id, m.id as mark_id, a.description
from marks m
join assignments a on a.id = m.assignment_id
where user_id = $1  and class_id = $2
