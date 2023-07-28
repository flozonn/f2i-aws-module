resource "aws_dynamodb_table" "job_table" {
  name         = "job_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }
  stream_view_type  = "NEW_IMAGE"
  stream_enabled = true
}

resource "aws_dynamodb_table" "content_table" {
  name         = "content_table"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  attribute {
    name = "id"
    type = "S"
  }

}
