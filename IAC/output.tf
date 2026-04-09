output "manager_ip" {
  value = aws_instance.manager.public_ip
}

output "worker_ip" {
  value = aws_instance.worker.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}