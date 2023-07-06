resource "aws_dynamodb_table" "randomTable" {
  name           = "randomTable"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "randomColumn"
    type = "S"
  }

  global_secondary_index {
    name               = "randomColumnIndex"
    hash_key           = "randomColumn"
    projection_type    = "ALL"
    read_capacity      = 5
    write_capacity     = 5
  }
}

