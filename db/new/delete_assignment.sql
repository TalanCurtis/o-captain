delete from marks
where assignment_id = $1;
delete from assignments
where id = $1;