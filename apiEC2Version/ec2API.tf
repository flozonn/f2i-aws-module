provider "aws" {
  region = "eu-west-3"
}
// création de la clé ssh
resource "tls_private_key" "ec2Key" {
  algorithm   = "RSA"
  rsa_bits    = 2048
}

resource "aws_key_pair" "ec2KeyPair" {
  key_name   = "ec2sshkey"
  public_key = tls_private_key.ec2Key.public_key_openssh
}


// création du groupe de sécurité
resource "aws_security_group" "sshConnectionInternetAccess" {
  name        = "sshConnectionInternetAccess"
  description = "Allow SSH access"
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    ipv6_cidr_blocks = []
    prefix_list_ids = []
  }
  
}

resource "aws_instance" "ec2ExpressApp" {
  ami           = "ami-00021ee291bc62064"  # Remplacez par l'AMI souhaité
  instance_type = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.sshConnectionInternetAccess.id}"]
  key_name = "ec2sshkey"
}

output "private_key" {
  value = tls_private_key.ec2Key.private_key_pem
  sensitive = true
}
output "public_ip" {
  value = aws_instance.ec2ExpressApp.public_ip
}

output "arn_ec2" {
  value = aws_instance.ec2ExpressApp.arn
}

// to get the private key 
// terraform output private_key > ec2sshkey.pem