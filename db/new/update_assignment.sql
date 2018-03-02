update assignments
set (max_score, description) = ($1, $2)
where id = $3; 
