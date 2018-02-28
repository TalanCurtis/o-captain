insert into assignments(kind, max_score, description, due_date, class_id)
values($1, $2, $3, $4, $5)
returning *;