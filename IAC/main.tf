resource "aws_vpc" "techno" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "techno-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.techno.id

  tags = {
    Name = "techno-igw"
  }
}

# PUBLIC SUBNET 
resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.techno.id
  cidr_block              = var.public_subnet_a_cidr
  availability_zone       = "ap-southeast-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-a"
  }
}

# PRIVATE SUBNET 
resource "aws_subnet" "private_subnet_a" {
  vpc_id            = aws_vpc.techno.id
  cidr_block        = var.private_subnet_a_cidr
  availability_zone = "ap-southeast-1a"

  tags = {
    Name = "private-subnet-a"
  }
} 

resource "aws_subnet" "private_subnet_b" {
  vpc_id            = aws_vpc.techno.id
  cidr_block        = var.private_subnet_b_cidr
  availability_zone = "ap-southeast-1b"

  tags = {
    Name = "private-subnet-b"
  }
}

# ROUTE TABLE FOR PUBLIC SUBNET
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.techno.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public.id
}


resource "aws_route_table" "private" {
  vpc_id = aws_vpc.techno.id

  tags = {
    Name = "private-rt"
  }
}

resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.private.id
} 

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_subnet_b.id
  route_table_id = aws_route_table.private.id
}

#SECURITY GROUPS
resource "aws_security_group" "ec2_sg" {
  name   = "ec2-sg"
  vpc_id = aws_vpc.techno.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3002
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS SG 
resource "aws_security_group" "rds_sg" {
  name   = "rds-sg"
  vpc_id = aws_vpc.techno.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 INSTANCE

resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "my_key" {
  key_name   = "terraform-key"
  public_key = tls_private_key.my_key.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.my_key.private_key_pem
  filename = "terraform-key.pem"
}

resource "aws_instance" "manager" {
  ami                         = "ami-02289b3fe036fe5cd" 
  instance_type               = "t3.small"
  subnet_id                   = aws_subnet.public_subnet_a.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.my_key.key_name

  tags = {
    Name = "Swarm-Manager"
  }
}

resource "aws_instance" "worker" {
  ami                         = "ami-02289b3fe036fe5cd"
  instance_type               = "t3.small"
  subnet_id                   = aws_subnet.public_subnet_a.id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.my_key.key_name


  tags = {
    Name = "Swarm-Worker"
  }
}

# RDS INSTANCE
resource "aws_db_subnet_group" "db_subnet" {
  name = "techno-db-subnet"

  subnet_ids = [
    aws_subnet.private_subnet_a.id,
    aws_subnet.private_subnet_b.id
  ]

  tags = {
    Name = "db-subnet-group"
  }
}
resource "aws_db_instance" "postgres" {
  identifier        = "techno-postgres"
  engine            = var.engine
  instance_class    = var.instance_class
  allocated_storage = 20

  username = var.username
  password = var.password

  db_subnet_group_name   = aws_db_subnet_group.db_subnet.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]

  publicly_accessible = false
  skip_final_snapshot = true

  tags = {
    Name = "Postgres-DB"
  }
}
