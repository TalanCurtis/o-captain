select u.id as teacher_id,
c.id as class_id, c.class_name as class_name,
e.user_id as student_id,
s.first_name as student_first_name, s.last_name as student_last_name,
a.id as assignment_id, a.max_score as assignment_max, a.description as assignment_desc, a.kind as assignment_kind, a.due_date as assignment_due_date,
m.id as mark_id, m.score as mark_score, m.user_id as mark_student_id
from users u
inner join classes c on u.id = c.user_id
inner join enrollment e on c.id = e.class_id
inner join users s on e.user_id = s.id
inner join assignments a on c.id = a.class_id
inner join marks m on a.id = m.assignment_id
where u.id = $1