resource "aws_dynamodb_table" "user_entities" {
  name           = "user_entities"
  billing_mode   = "PAY_PER_REQUEST"  
  hash_key       = "id"             
  attribute {
    name = "id"
    type = "S"  
  }
}
